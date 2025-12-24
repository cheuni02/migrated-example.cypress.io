import {Cookie, expect, test} from "@playwright/test";
import {CookiesPage} from "../../../pages/cookies.page";

test.describe('cookies', () => {

   let cookiesPage: CookiesPage;
   let cookies: Array<Cookie>;
   test.beforeEach(async ({page}) => {
      cookiesPage = new CookiesPage(page);
      await cookiesPage.goto();
      await cookiesPage.clearCookies();
   });

   test('cy.getCookie() - get a browser cookie', async () => {
      /*
         it("cy.getCookie() - get a browser cookie", () => {
         // https://on.cypress.io/getcookie
         cy.get("#getCookie .set-a-cookie").click();

         // cy.getCookie() yields a cookie object
         cy.getCookie("token").should("have.property", "value", "123ABC");
         });
       */
      await cookiesPage.setACookieButton.click();
      cookies = await cookiesPage.getCookies();
      expect(cookies.find(c => c.name === 'token')?.value)?.toEqual('123ABC');
   });

   test('cy.getCookies() - get browser cookies for the current domain', async () => {
      /*
         it("cy.getCookies() - get browser cookies for the current domain", () => {
         // https://on.cypress.io/getcookies
         cy.getCookies().should("be.empty");

         cy.get("#getCookies .set-a-cookie").click();

         // cy.getCookies() yields an array of cookies
         cy.getCookies()
         .should("have.length", 1)
         .should((cookies) => {
         // each cookie has these properties
         expect(cookies[0]).to.have.property("name", "token");
         expect(cookies[0]).to.have.property("value", "123ABC");
         expect(cookies[0]).to.have.property("httpOnly", false);
         expect(cookies[0]).to.have.property("secure", false);
         expect(cookies[0]).to.have.property("domain");
         expect(cookies[0]).to.have.property("path");
         });
         });
       */
      cookies = await cookiesPage.getCookies();
      expect(cookies).toEqual([]);
      await cookiesPage.setACookieButton.click();
      cookies = await cookiesPage.getCookies();
      expect(cookies.length).toEqual(1);
      expect(cookies[0]).toHaveProperty('name', 'token');
      expect(cookies[0]).toHaveProperty('value', '123ABC');
      expect(cookies[0]).toHaveProperty('httpOnly', false);
      expect(cookies[0]).toHaveProperty('secure', false);
      expect(cookies[0]).toHaveProperty('domain');
      expect(cookies[0]).toHaveProperty('path');
   });
});