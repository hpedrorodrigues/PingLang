export default function Lexer(code) {

    this.code = code;

    this.tokenizer = function () {
        return this.code;
    };

    return this.tokenizer();
}