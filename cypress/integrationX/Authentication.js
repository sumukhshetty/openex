import { user1 } from './testUsers'

describe('Dashboard', () => {
  Cypress.config('baseUrl', 'http://localhost:3000/')

  it('does not log me in without a token', () => {
    // first show that by not providing a valid CSRF token
    // that we will get a 403 status code
    cy.visit('/')
    cy.get(`h1`).should(`contain`, `Sell and Buy Ether in India.`)
  })

  it('logs in with a token', () => {
    cy.server()

    cy.visit('/', {
      onBeforeLoad: function(win) {
        // and before the page finishes loading
        // set the id_token in local storage
        win.localStorage.setItem(user1.key, user1.token)
      }
    })

    cy.get(`[data-test="dashboardButton"]`).click()
    cy
      .get(`[data-test="dashboardMessage"]`)
      .should(
        'contain',
        `In these pages you can view and manage your current advertisements and contacts.`
      )
  })
})
