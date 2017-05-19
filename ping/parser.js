export default function Parser(tokens) {

    this.tokens = tokens;

    this.generateAST = function () {
        return this.tokens;
    };

    return this.generateAST();
}