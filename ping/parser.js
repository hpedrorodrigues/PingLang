export default function Parser(tokens) {

    this.tokens = tokens;

    this.generateAST = function () {
        const findCommentArguments = () => {
            let token = this.tokens.shift(), args = [];

            while (token && token.type !== 'new_line') {
                args.push(token.value);
                token = this.tokens.shift();
            }

            return args;
        };

        const findStringArguments = (keyword) => {
            let token = this.tokens.shift(), args = [];

            if (token.type !== 'double_quotes') {
                throw new Error('Only strings are supported by "' + keyword + '" method!');
            }

            token = this.tokens.shift();

            while (token.type !== 'double_quotes') {
                args.push(token.value);
                token = this.tokens.shift();
            }

            return args;
        };

        let AST = {
            type: 'ping',
            body: []
        };

        while (this.tokens.length) {
            let token = this.tokens.shift();

            if (token.type === 'keyword') {
                if (token.value === 'print') {
                    let expression = {
                        type: 'CallExpression',
                        name: 'print',
                        arguments: findStringArguments(token.value)
                    };

                    AST.body.push(expression)
                } else {
                    throw new Error('Unsupported keyword "' + token.value + '"');
                }
            } else if (token.type === 'comment') {
                let expression = {
                    type: 'CommentExpression',
                    name: '#',
                    arguments: findCommentArguments()
                };

                AST.body.push(expression)
            } else if (token.type === 'new_line') {
                // ignore
            } else {
                throw new Error('Unsupported token "' + token.value + '"');
            }
        }

        return AST;
    };

    return this.generateAST();
}