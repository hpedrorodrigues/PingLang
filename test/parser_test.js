import {describe, it} from 'mocha';
import {expect} from 'chai';
import Parser from './../ping/parser';

describe('Parser', function () {

    describe('#generateAST()', function () {

        it('should return an ast when a simple line with comment tokens are given', function () {
            let expectedAST = {
                type: 'ping',
                body: [
                    {
                        type: 'CommentExpression',
                        label: '#',
                        arguments: 'Test Test '
                    }
                ]
            };

            let tokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'}
            ];

            expect(expectedAST).to.deep.equal(Parser(tokens));

        });

        it('should return an ast when a simple line with comments with text and numbers tokens are given', function () {
            let expectedAST = {
                type: 'ping',
                body: [
                    {type: 'CommentExpression', label: '#', arguments: 'Test 1 '}
                ]
            };

            let tokens = [
                {type: 'comment'},
                {type: 'word', value: 'Test'},
                {type: 'number', value: '1'}
            ];

            expect(expectedAST).to.deep.equal(Parser(tokens));
        });

        it('should return an ast when a simple line with log to stdout with only text tokens are given', function () {
            let expectedAST = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            };

            let tokens = [
                {type: 'keyword', label: 'print', value: 'show'},
                {type: 'double_quotes', value: '"'},
                {type: 'word', value: 'Test'},
                {type: 'word', value: 'Test'},
                {type: 'double_quotes', value: '"'}
            ];

            expect(expectedAST).to.deep.equal(Parser(tokens));
        });

        it('should return an ast when logs and comments tokens are given in multiple lines', function () {
            let expectedAST = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test 1'},
                    {type: 'CommentExpression', label: '#', arguments: 'Test 2 '}
                ]
            };

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

            expect(expectedAST).to.deep.equal(Parser(tokens));
        });
    });
});