export default function Lexer(code) {

    const langTokens = {
        special: {
            NEW_LINE: '*nl*',
            LEFT_PARENTHESIS: '*lp*',
            RIGHT_PARENTHESIS: '*rp*',
            DOUBLE_QUOTES: '*dq*',
            COMMENT: '*c*'
        },
        keywords: {
            PRINT: 'show'
        }
    };

    const _getTokens = () => {
        const prepare = (key) => ` ${key} `;

        return code
            .replace(/[\n\r]/g, prepare(langTokens.special.NEW_LINE))
            .replace(/\(/g, prepare(langTokens.special.LEFT_PARENTHESIS))
            .replace(/\)/g, prepare(langTokens.special.RIGHT_PARENTHESIS))
            .replace(/\"/g, prepare(langTokens.special.DOUBLE_QUOTES))
            .replace(/#/g, prepare(langTokens.special.COMMENT))
            .split(/[\t\f\v ]+/);
    };

    const tokenizer = () => {
        const _tokens = _getTokens(), tokens = [];

        for (let i = 0; i < _tokens.length; i++) {
            const token = _tokens[i];

            if (token.length <= 0) {
                // ignore
            } else if (isNaN(token)) {
                if (token === langTokens.special.NEW_LINE) {
                    tokens.push({type: 'new_line'});
                } else if (token === langTokens.special.LEFT_PARENTHESIS) {
                    tokens.push({type: 'left_parenthesis'});
                } else if (token === langTokens.special.RIGHT_PARENTHESIS) {
                    tokens.push({type: 'right_parenthesis'});
                } else if (token === langTokens.special.DOUBLE_QUOTES) {
                    tokens.push({type: 'double_quotes', value: "\""});
                } else if (token === langTokens.special.COMMENT) {
                    tokens.push({type: 'comment'});
                } else if (token === langTokens.keywords.PRINT) {
                    tokens.push({type: 'keyword', label: 'print', value: langTokens.keywords.PRINT});
                } else if (typeof token === 'string' || token instanceof String || token !== '') {
                    tokens.push({type: 'word', value: token});
                } else {
                    throw new Error(`Unexpected token "${token}"`);
                }
            } else {
                tokens.push({type: 'number', value: token})
            }
        }

        return tokens;
    };

    return tokenizer();
}