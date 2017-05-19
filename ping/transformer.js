export default function Transformer(ast) {

    this.ast = ast;

    this.generateJSAST = function () {
        return this.ast;
    };

    return this.generateJSAST();
}