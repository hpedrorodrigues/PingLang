export default function Transformer(ast) {

    const generateJSAST = () => {

        let AST = {
            type: 'javascript',
            body: []
        };

        while (ast.body.length) {
            let node = ast.body.shift();

            if (node.type === 'CallExpression') {

                if (node.label === 'print') {
                    let newNode = {
                        attr: {
                            type: 'log',
                            label: 'log'
                        },
                        arguments: node.arguments
                    };

                    AST.body.push(newNode);
                }
            } else if (node.type === 'CommentExpression') {
                let newNode = {
                    attr: {
                        type: 'comment',
                        label: 'one_line'
                    },
                    arguments: node.arguments
                };

                AST.body.push(newNode);
            }
        }

        return AST;
    };

    return generateJSAST();
}