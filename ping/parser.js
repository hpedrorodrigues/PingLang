export default function Parser(tokens) {

    const generateAST = () => {
        const findCommentArguments = () => {
            let token = tokens.shift(), args = [];

            while (token && token.type !== 'new_line') {
                args.push(token.value);
                token = tokens.shift();
            }

            return args.reduce((result, arg, index, arr) => {
                if (arg === '"') {
                    return {value: `${result.value}"`, open_quotes: true};
                } else if (result.open_quotes && arr[index + 1] === '"') {
                    return {value: result.value + arg, open_quotes: false};
                } else {
                    return {value: result.value + arg + " ", open_quotes: result.open_quotes};
                }
            }, {value: ''}).value;
        };

        const findStringArguments = (keyword) => {
            let token = tokens.shift();

            if (token.type === 'number') {
                return token.value;
            }

            let args = [];

            if (token.type !== 'double_quotes') {
                throw new Error(`Only strings and numbers are supported by "${keyword}" method!'`);
            }

            token = tokens.shift();

            while (token.type !== 'double_quotes') {
                args.push(token.value);
                token = tokens.shift();
            }

            return args.join(' ');
        };

        let AST = {
            type: 'ping',
            body: []
        };

        while (tokens.length) {
            let token = tokens.shift();

            if (token.type === 'keyword') {
                if (token.label === 'print') {
                    let expression = {
                        type: 'CallExpression',
                        label: 'print',
                        arguments: findStringArguments(token.value)
                    };

                    AST.body.push(expression);
                } else {
                    throw new Error(`Unsupported keyword "${token.value}"`);
                }
            } else if (token.type === 'comment') {
                let expression = {
                    type: 'CommentExpression',
                    label: '#',
                    arguments: findCommentArguments()
                };

                AST.body.push(expression)
            } else if (token.type === 'new_line') {
                // ignore
            } else {
                throw new Error(`Unsupported token "${token.value}"`);
            }
        }

        return AST;
    };

    return generateAST();
}