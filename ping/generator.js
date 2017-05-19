export default function Generator(ast) {

    this.ast = ast;

    this.traverseAST = function () {
        return this.ast;
    };

    return this.traverseAST();
}