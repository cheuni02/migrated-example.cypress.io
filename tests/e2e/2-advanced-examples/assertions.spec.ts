import {expect, Locator, test} from "@playwright/test";
import {AssertionsPage} from "../../../pages/assertions.page";

test.describe('Assertions', () => {
    test.describe('Implicit Assertions', () => {
        let assertionsPage: AssertionsPage;
        let underTest: Locator;

        test.beforeEach(async ({page}) => {
            assertionsPage = new AssertionsPage(page);
            await assertionsPage.goto();
        })

        test('.should() - make an assertion about the current subject', async () => {
            /*
                it(".should() - make an assertion about the current subject", () => {
                // https://on.cypress.io/should
                cy.get(".assertion-table")
                  .find("tbody tr:last")
                  .should("have.class", "success")
                  .find("td")
                  .first()
                  // checking the text of the <td> element in various ways
                  .should("have.text", "Column content")
                  .should("contain", "Column content")
                  .should("have.html", "Column content")
                  // chai-jquery uses "is()" to check if element matches selector
                  .should("match", "td")
                  // to match text content against a regular expression
                  // first need to invoke jQuery method text()
                  // and then match using regular expression
                  .invoke("text")
                  .should("match", /column content/i);

                // a better way to check element's text content against a regular expression
                // is to use "cy.contains"
                // https://on.cypress.io/contains
                cy.get(".assertion-table")
                  .find("tbody tr:last")
                  // finds first <td> element with text content matching regular expression
                  .contains("td", /column content/i)
                  .should("be.visible");

                // for more information about asserting element's text
                // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
              });

             */
            underTest = assertionsPage.assertionsTable.locator('tbody tr').last();
            await expect(underTest).toContainClass('success');
            underTest = underTest.locator('td').first()
            await expect(underTest).toHaveText('Column content');
            await expect(underTest).toContainText('Column content');
            await expect(underTest).toHaveJSProperty('innerHTML', 'Column content');
            await expect(underTest).toHaveJSProperty('tagName', 'TD');
            await expect(underTest).toContainText(/column content/i);
            await expect(underTest).toBeVisible();
        });
        test('.and() - chain multiple assertions together', async () => {
            /*
                it(".and() - chain multiple assertions together", () => {
                  // https://on.cypress.io/and
                  cy.get(".assertions-link")
                    .should("have.class", "active")
                    .and("have.attr", "href")
                    .and("include", "cypress.io");
                });
             */
            underTest = assertionsPage.assertionsLink;
            await expect(underTest).toContainClass('active');
            await expect(underTest).toHaveAttribute('href')
            const href = await underTest.getAttribute('href');
            await expect(href).toMatch('cypress.io')
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