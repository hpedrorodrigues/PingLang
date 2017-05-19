export default function Generator(ast) {

    this.ast = ast;

    this.traverseAST = function () {
        const createCallExpression = (object, method, args) => {
            return object + '.' + method + '(\"' + args + '\");';
        };

        let text = '';

        while (this.ast.body.length) {
            let node = this.ast.body.shift();

            if (node.attr.object === 'console') {

                if (node.attr.method === 'log') {
                    text += createCallExpression(node.attr.object, node.attr.method, node.arguments);
                }
            }

            text += '\n';
        }

        return text;
    };

    return this.traverseAST();
}