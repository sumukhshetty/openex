import { user2 } from '../fixtures/testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it('user 2 releases ether', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user2.key, user2.token)
    }
  })
  cy.get(`[data-test="dashboardButton"]`).click()
  cy.url().should(`contain`, '/dashboard')
  cy
    .contains('Buy Order')
    .parent()
    .within(() => cy.contains('View / Message').click())
  cy.contains('Payment confirmed.').should(`contain`, 'Payment confirmed.')
  cy.contains('Release Ether').click()
  cy
    .get('input[type="text"]')
    .type(
      'Hey you, PERSON TESTING THE APP, accept the transaction in meta mask and WAIT till you see the stars to know that the payment went through.'
    )
  cy.get('input[type="submit"]').click()
})
