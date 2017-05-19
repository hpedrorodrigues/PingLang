import {describe, it} from 'mocha';
import {expect} from 'chai';
import Generator from './../ping/generator';

describe('Generator', function () {

    describe('#traverseAST()', function () {

        it('should return a js code when a simple line with comment tokens are given', function () {
            let ast = {
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test Test '}
                ]
            };

            expect('// Test Test \n').to.equal(Generator(ast));
        });

        it('should return a js ast when a simple line with comments with text and numbers are given', function () {
            let ast = {
                type: 'javascript',
                body: [
                    {attr: {type: 'comment', label: 'one_line'}, arguments: 'Test 1 '}
                ]
            };

            expect('// Test 1 \n').to.deep.equal(Generator(ast));
        });

        it('should return a js ast when a simple line with log to stdout with only text is given', function () {
            let ast = {
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            };

            expect('console.log("Test Test");\n').to.deep.equal(Generator(ast));
        });

        it('should return a js ast when logs and comments are given in multiple lines', function () {
            let ast = {
                type: 'javascript',
                body: [
                    {attr: {type: 'log', label: 'log'}, arguments: 'Test Test'}
                ]
            };

            expect('console.log("Test Test");\n').to.deep.equal(Generator(ast));
        });
    });
});