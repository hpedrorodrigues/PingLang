import {describe, it} from 'mocha';
import {expect} from 'chai';
import Transformer from './../ping/transformer';

describe('Transformer', function () {

    describe('#generateJSAST()', function () {

        it('should return a js ast when a simple line with comment tokens are given', function () {
            let expectedJS_AST = {
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test Test '}
                ]
            };

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

            expect(expectedJS_AST).to.deep.equal(Transformer(ast));
        });

        it('should return a js ast when a simple line with comments with text and numbers are given', function () {
            let expectedJS_AST = {
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test 1 '}
                ]
            };

            let ast = {
                type: 'ping',
                body: [
                    {type: 'CommentExpression', label: '#', arguments: 'Test 1 '}
                ]
            };

            expect(expectedJS_AST).to.deep.equal(Transformer(ast));
        });

        it('should return a js ast when a simple line with log to stdout with only text is given', function () {
            let expectedJS_AST = {
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            };

            let ast = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            };

            expect(expectedJS_AST).to.deep.equal(Transformer(ast));
        });

        it('should return a js ast when logs and comments are given in multiple lines', function () {
            let expectedJS_AST = {
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            };

            let ast = {
                type: 'ping',
                body: [
                    {type: 'CallExpression', label: 'print', arguments: 'Test Test'}
                ]
            };

            expect(expectedJS_AST).to.deep.equal(Transformer(ast));
        });
    });
});