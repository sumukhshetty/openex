import { user1 } from '../fixtures/testUsers';

Cypress.config('baseUrl', 'http://localhost:3000/');

it('user 1 releases ether', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user1.key, user1.token);
    }
  });
  cy.get(`[data-test="dashboardButton"]`).click();
  cy.url().should(`contain`, '/dashboard');
  cy
    .contains('Awaiting Release')
    .parent()
    .within(() => cy.contains('View / Message').click());
  cy.contains('Payment sent.').should(`contain`, 'Payment sent.');
  cy.contains('Release Ether').click();
  cy.get('input[type="text"]').type('All Done.');
  cy.get('input[type="submit"]').click();
  cy
    .contains('How would you rate this transaction?')
    .should(`contain`, 'How would you rate this transaction?');
});
