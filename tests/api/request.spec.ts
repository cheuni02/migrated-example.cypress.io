import {expect, test} from "@playwright/test";
import {NetworkRequestsPage} from "../../pages/network-requests.page";

test.describe('Network Requests on https://example.cypress.io/', () => {
   let netReqPage: NetworkRequestsPage;
   test.beforeEach(async ({page}) => {
      netReqPage = new NetworkRequestsPage(page);
      await netReqPage.goto();
   });

   test('test headers and duration of retrieved comments', async () => {
      await netReqPage.scrollToHeader('request');
      /*
         cy.request('https://jsonplaceholder.cypress.io/comments')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(500)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
       */

      const response = await netReqPage.getComments()
      expect(response.status()).toEqual(200);

      const body = await response.json();
      expect(body).toHaveLength(500);
   });
});