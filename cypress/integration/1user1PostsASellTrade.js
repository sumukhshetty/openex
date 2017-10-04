import { user1 } from '../fixtures/testUsers';

Cypress.config('baseUrl', 'http://localhost:3000/');

it('user 1 posts a sell trade', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user1.key, user1.token);
    }
  });

  cy.get(`[data-test="postATradeButton"]`).click();
  cy.get(`[data-test="postASellTrade"]`).click();
  cy.get(`[data-test="postATradeLocation"]`).type(`India`);
  cy.get(`[data-test="postATradeMargin"]`).type(`0`);
  cy.get(`[data-test="postATradePaymentMethod"]`).select(`cash`);
  // create another test for bank transactions
  // cy.get(`[data-test="submitATradeBankInfo"]`).type(`Some Bank`)
  cy.get(`[data-test="submitATradeMinTransaction"]`).type(`1`);
  cy.get(`[data-test="submitATradeMaxTransaction"]`).type(`1`);
  cy.get(`[data-test="submitATradeTerms"]`).type(`Some Terms`);
  cy.get(`[data-test="submitATrade"]`).click();
  cy.url().should(`contain`, '/dashboard');
  cy.contains('Live');
});
