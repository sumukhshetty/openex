import { user1 } from './testUsers'

describe('Complete a Trade', () => {
  Cypress.config('baseUrl', 'http://localhost:3000/')

  it('logs in with a token', () => {
    cy.server()

    cy.visit('/', {
      onBeforeLoad: function(win) {
        // and before the page finishes loading
        // set the id_token in local storage
        win.localStorage.setItem(user1.key, user1.token)
      }
    })

    cy.get(`[data-test="buyEtherButton"]`).click()
    cy
      .get(`[data-test="dashboardMessage"]`)
      .should(
        'contain',
        `In these pages you can view and manage your current advertisements and contacts.`
      )
  })
})
