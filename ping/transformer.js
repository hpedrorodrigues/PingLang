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
                            object: 'console',
                            method: 'log'
                        },
                        arguments: node.arguments.join(' ')
                    };

                    AST.body.push(newNode);
                }
            }
        }

        return AST;
    };

    return this.generateJSAST();
}