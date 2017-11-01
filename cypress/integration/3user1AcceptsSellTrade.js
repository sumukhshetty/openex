import { user1 } from '../fixtures/testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it('user 1 accepts the bid', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user1.key, user1.token)
    }
  })
  cy.get(`[data-test="dashboardButton"]`).click()
  cy.url().should(`contain`, '/dashboard')
  cy
    .contains('Awaiting Seller Confirmation')
    .parent()
    .within(() => cy.contains('View / Message').click())

  cy.contains('Confirm Trade').click()
  cy
    .contains('Please accept the transaction in MetaMask')
    .should(`contain`, 'Please accept the transaction in MetaMask')
  cy
    .get('input[type="text"]')
    .type(
      'PERSON RUNNING TESTS, wait for the metamask pop up and approve the transaction before proceeding'
    )
  cy.get('input[type="submit"]').click()
  cy
    .contains(
      'PERSON RUNNING TESTS, wait for the metamask pop up and approve the transaction before proceeding'
    )
    .should(
      `contain`,
      'PERSON RUNNING TESTS, wait for the metamask pop up and approve the transaction before proceeding'
    )
})
