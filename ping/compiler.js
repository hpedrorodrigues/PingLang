import Lexer from './lexer';
import Parser from './parser';
import Transformer from './transformer';
import Generator from './generator';

const Ping = {
    VERSION: '1.0.0',
    lexer: Lexer,
    parser: Parser,
    transformer: Transformer,
    generator: Generator,
    compile: function (code) {
        return this.generator(this.transformer(this.parser(this.lexer(code))));
    }
};

export default Ping;