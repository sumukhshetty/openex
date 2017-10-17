import { user2 } from '../fixtures/testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it('user 2 sends payment', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user2.key, user2.token)
    }
  })

  cy.get(`[data-test="dashboardButton"]`).click()
  cy.url().should(`contain`, '/dashboard')
  cy
    .contains('Awaiting Payment')
    .parent()
    .within(() => cy.contains('View / Message').click())
  cy.url().should(`contain`, '/activetrade')
  cy.contains('Confirm Payment').click()
  cy
    .contains('Waiting for seller to release ether')
    .should(`contain`, 'Waiting for seller to release ether')
  cy.get('input[type="text"]').type('Payment sent.')
  cy.get('input[type="submit"]').click()
  cy.contains('Payment sent.').should(`contain`, 'Payment sent.')
})
