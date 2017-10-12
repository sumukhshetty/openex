import { user2 } from '../fixtures/testUsers';

Cypress.config('baseUrl', 'http://localhost:3000/');

it('user 2 bids on the trade', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user2.key, user2.token);
    }
  });

  cy.get(`[data-test="buyEtherNavButton"]`).click();
  cy.url().should(`contain`, '/buyether');
  cy
    .contains('testUser1 - India')
    .parent()
    .within(() => cy.contains('Buy').click());
  cy.url().should(`contain`, '/selltradeadvertisement');
  cy.get('#fiatAmount').type('100.');
  cy.contains('Send Trade Request').click();
  // cy
  //   .wait(3000)
  //   .url()
  //   .should(`contain`, '/buyether');
});
