import Parser from './../ping/parser';
import Chai from 'chai';

describe('Parser', function () {

    describe('#generateAST()', function () {

        it('should return an ast when a simple line with comment tokens are given', function () {
            let tokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'}
            ];

            let ast = new Parser(tokens);

            Chai.expect(ast).to.deep.equal({
                type: 'ping',
                body: [
                    {
                        type: 'CommentExpression',
                        label: '#',
                        arguments: 'Test Test '
                    }
                ]
            });
        });

        it('should return an ast when a simple line with comments with text and numbers are given', function () {
            let tokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'}
            ];

            let ast = new Parser(tokens);

            Chai.expect(ast).to.deep.equal({
                type: 'ping',
                body: [
                    {type: 'CommentExpression', label: '#', arguments: 'Test 1 '}
                ]
            });
        });

        it('should return an ast when a simple line with log to stdout with only text is given', function () {
            let tokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'},
                {type: 'double_quotes', value: '"'}
            ];

            let ast = new Parser(tokens);

            Chai.expect(ast).to.deep.equal({
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            });
        });

        it('should return an ast when logs and comments are given in multiple lines', function () {
            let tokens = [
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

            let ast = new Parser(tokens);

            Chai.expect(ast).to.deep.equal({
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test 1'},
                    {type: 'CommentExpression', label: '#', arguments: 'Test 2 '}
                ]
            });
        });
    });
});