import { user2 } from '../fixtures/testUsers';

Cypress.config('baseUrl', 'http://localhost:3000/');

it('user 2 releases ether', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user2.key, user2.token);
    }
  });
  cy.get(`[data-test="dashboardButton"]`).click();
  cy.url().should(`contain`, '/dashboard');
  cy
    .contains('Awaiting Release')
    .parent()
    .within(() => cy.contains('View / Message').click());
  cy.contains('Payment confirmed.').should(`contain`, 'Payment confirmed.');
  cy.contains('Release Ether').click();
  cy.get('input[type="text"]').type('All Done.');
  cy.get('input[type="submit"]').click();
  cy
    .contains('How would you rate this transaction?')
    .should(`contain`, 'How would you rate this transaction?');
});
