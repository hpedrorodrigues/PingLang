import {describe, it} from 'mocha';
import {expect} from 'chai';
import Lexer from './../ping/lexer';

describe('Lexer', function () {

    describe('#tokenizer()', function () {

        it('should return tokens when a simple line with comments are given', function () {
            let expectedTokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('# Test Test'));
        });

        it('should return tokens when a simple line with comments with text and numbers are given', function () {
            let expectedTokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('# Test 1'));
        });

        it('should return tokens when a simple line with log to stdout with only text is given', function () {
            let expectedTokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'},
                {type: 'double_quotes', value: '"'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('show \"Test Test\"'));
        });

        it('should return tokens when a simple line with log to stdout with text and number is given', function () {
            let expectedTokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'double_quotes', value: '"'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('show \"Test 1\"'));
        });

        it('should return tokens when a log and comments are given in the same line respectively', function () {
            let expectedTokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'double_quotes', value: '"'},
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('show \"Test 1\" # Test Test'));
        });

        it('should return tokens when comments and log are given in the same line respectively', function () {
            let expectedTokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'},
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'double_quotes', value: '"'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('# Test Test show \"Test 1\"'));
        });

        it('should return tokens when comments are given in multiple lines', function () {
            let expectedTokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'new_line'},
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '2'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('# Test 1\n# Test 2'));
        });

        it('should return tokens when logs are given in multiple lines', function () {
            let expectedTokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'double_quotes', value: '"'},
                {type: 'new_line'},
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '2'},
                {type: 'double_quotes', value: '"'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('show "Test 1"\nshow "Test 2"'));
        });

        it('should return tokens when logs and comments are given in multiple lines', function () {
            let expectedTokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'},
                {type: 'double_quotes', value: '"'},
                {type: 'new_line'},
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '2'}
            ];

            expect(expectedTokens).to.deep.equal(Lexer('show "Test 1"\n# Test 2'));
        });
    });
});