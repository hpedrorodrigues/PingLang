import {describe, it} from 'mocha';
import {expect} from 'chai';
import Ping from './../ping/compiler';

describe('Ping', function () {

    describe('#compile()', function () {

        it('should return a js code when a simple line with comment is given', function () {
            expect('// Test Test \n').to.equal(Ping.compile('# Test Test'));
        });

        it('should return a js code when a simple line with comments with text and numbers are given', function () {
            expect('// Test 1 \n').to.equal(Ping.compile('# Test 1'));
        });

        it('should return a js code when a simple line with log to stdout with only text is given', function () {
            expect('console.log("Test Test");\n').to.equal(Ping.compile('show \"Test Test\"'));
        });
    });
});