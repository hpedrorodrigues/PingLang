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
    });
});