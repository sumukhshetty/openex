import { user1 } from '../fixtures/testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it('user 1 confirms payment', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user1.key, user1.token)
    }
  })
  cy.get(`[data-test="dashboardButton"]`).click()
  cy.url().should(`contain`, '/dashboard')
  cy
    .contains('Awaiting Payment')
    .parent()
    .within(() => cy.contains('View / Message').click())

  cy.contains('Confirm Payment').click()
  cy.get('input[type="text"]').type('Payment confirmed.')
  cy.get('input[type="submit"]').click()
  cy.contains('Payment confirmed.').should(`contain`, 'Payment confirmed.')
})
