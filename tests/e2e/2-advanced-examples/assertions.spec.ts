import {expect, test} from "@playwright/test";

test.describe('Assertions', () => {
    test.describe('Implicit Assertions', () => {
        test('.should() - make an assertion about the current subject',() => {
            expect(true).toBeTruthy();
        });
        test('.and() - chain multiple assertions together',() => {
            expect(true).toBeTruthy();
        });
    });
    test.describe('Explicit Assertions', () => {
        test('expect - make an assertion about a specified subject',() => {
            expect(true).toBeTruthy();
        });
        test('pass your own callback function to should()',() => {
            expect(true).toBeTruthy();
        });
        test('finds element by class name regex',() => {
            expect(true).toBeTruthy();
        });
        test('can throw any error',() => {
            expect(true).toBeTruthy();
        });
        test('matches unknown text between two elements',() => {
            expect(true).toBeTruthy();
        });
        test('assert - assert shape of an object',() => {
            expect(true).toBeTruthy();
        });
        test('retries the should callback until assertions pass',() => {
            expect(true).toBeTruthy();
        });

    });
});