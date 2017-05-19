export default function Transformer(ast) {

    this.ast = ast;

    this.generateJSAST = function () {

        let AST = {
            type: 'javascript',
            body: []
        };

        while (this.ast.body.length) {
            let node = this.ast.body.shift();

            if (node.type === 'CallExpression') {

                if (node.name === 'print') {
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

    return this.generateJSAST();
}