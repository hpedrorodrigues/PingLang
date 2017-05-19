export default function Generator(ast) {

    const traverseAST = () => {
        const createCallExpression = (object, method, args) => `${object}.${method}(${args});`;
        const createCommentExpression = (args) => `// ${args}`;

        let text = '';

        while (ast.body.length) {
            let node = ast.body.shift();

            if (node.attr.type === 'log') {

                if (node.attr.label === 'log') {
                    if (isNaN(node.arguments)) {
                        text += createCallExpression('console', 'log', `"${node.arguments}"`);
                    } else {
                        text += createCallExpression('console', 'log', node.arguments);
                    }
                }
            } else if (node.attr.type === 'comment') {
                text += createCommentExpression(node.arguments);
            }

            text += '\n';
        }

        return text;
    };

    return traverseAST();
}