import { user2 } from '../fixtures/testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it('user 2 bids on the trade', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user2.key, user2.token)
    }
  })

  cy.get(`[data-test="sellEtherNavButton"]`).click()
  cy.url().should(`contain`, '/sellether')
  cy.contains('10 - 1000').parent().within(() => cy.contains('Sell').click())
  cy.url().should(`contain`, '/buytradeadvertisement')
  cy.get('#fiatAmount').type('100.')
  cy.contains('Send Trade Request').click()
  // ERROR sendSellerCreatesPurchaseRequestNotification unknown error happening here
  // cy.url().should(`contain`, '/dashboard');
})

it('user 2 releases payment', () => {
  cy.visit('/', {
    onBeforeLoad: function (win) {
      win.localStorage.setItem(user2.key, user2.token)
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
      'Trade funded. PERSON RUNNING TEST, wait to confirm the trade in the metamask popup. If this is blue, ignore me. '
    )
  cy.get('input[type="submit"]').click()
  cy
    .contains(
      'Trade funded. PERSON RUNNING TEST, wait to confirm the trade in the metamask popup. If this is blue, ignore me. '
    )
    .should(
      `contain`,
      'Trade funded. PERSON RUNNING TEST, wait to confirm the trade in the metamask popup. If this is blue, ignore me. '
    )
})
