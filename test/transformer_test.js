import Transformer from './../ping/transformer';
import Chai from 'chai';

describe('Transformer', function () {

    describe('#generateJSAST()', function () {

        it('should return a js ast when a simple line with comment tokens are given', function () {
            let ast = {
                type: 'ping',
                body: [
                    {
                        type: 'CommentExpression',
                        label: '#',
                        arguments: 'Test Test '
                    }
                ]
            };

            let jsAST = new Transformer(ast);

            Chai.expect(jsAST).to.deep.equal({
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test Test '}
                ]
            });
        });

        it('should return a js ast when a simple line with comments with text and numbers are given', function () {
            let ast = {
                type: 'ping',
                body: [
                    {type: 'CommentExpression', label: '#', arguments: 'Test 1 '}
                ]
            };

            let jsAST = new Transformer(ast);

            Chai.expect(jsAST).to.deep.equal({
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test 1 '}
                ]
            });
        });

        it('should return a js ast when a simple line with log to stdout with only text is given', function () {
            let ast = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            };

            let jsAST = new Transformer(ast);

            Chai.expect(jsAST).to.deep.equal({
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            });
        });

        it('should return a js ast when logs and comments are given in multiple lines', function () {
            let ast = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            };

            let jsAST = new Transformer(ast);

            Chai.expect(jsAST).to.deep.equal({
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            });
        });
    });
});