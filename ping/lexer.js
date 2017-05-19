export default function Lexer(code) {

    this.code = code;

    this.langTokens = {
        special: {
            NEW_LINE: '*nl*',
            LEFT_PARENTHESIS: '*lp*',
            RIGHT_PARENTHESIS: '*rp*',
            DOUBLE_QUOTES: '*dq*'
        },
        keywords: {
            PRINT: 'show'
        }
    };

    this._getInitialTokens = function () {
        const prepare = (key) => {
            return ' ' + key + ' ';
        };

        return this.code
            .replace(/[\n\r]/g, prepare(this.langTokens.special.NEW_LINE))
            .replace(/\(/g, prepare(this.langTokens.special.LEFT_PARENTHESIS))
            .replace(/\)/g, prepare(this.langTokens.special.RIGHT_PARENTHESIS))
            .replace(/\"/g, prepare(this.langTokens.special.DOUBLE_QUOTES))
            .split(/[\t\f\v ]+/);
    };

    this.tokenizer = function () {
        const _tokens = this._getInitialTokens(), tokens = [];

        for (let i = 0; i < _tokens.length; i++) {
            const token = _tokens[i];
            if (token.length <= 0) {
                // ignore
            } else if (isNaN(token)) {
                if (token === this.langTokens.special.NEW_LINE) {
                    tokens.push({type: 'new_line'});
                } else if (token === this.langTokens.special.LEFT_PARENTHESIS) {
                    tokens.push({type: 'left_parenthesis'});
                } else if (token === this.langTokens.special.RIGHT_PARENTHESIS) {
                    tokens.push({type: 'right_parenthesis'});
                } else if (token === this.langTokens.special.DOUBLE_QUOTES) {
                    tokens.push({type: 'double_quotes'});
                } else if (token === this.langTokens.keywords.PRINT) {
                    tokens.push({type: 'keyword', value: 'print'});
                } else if (typeof token === 'string' || token instanceof String || token !== '') {
                    tokens.push({type: 'word', value: token});
                } else {
                    throw new Error('Unexpected token "' + token + '"');
                }
            } else {
                tokens.push({type: 'number', value: token})
            }
        }

        return tokens;
    };

    return this.tokenizer();
}