const home = 'http://localhost:3000/'

describe('Login page link works', () => {
  it('should have the correct title', () => {
    cy.visit(home)
    cy.get(`[data-test="navLogin"]`).click()
    cy.url().should('include', 'login')
    cy.get(`[data-test="loginButton"]`).click()
    cy.url().should('include', 'dashboard')
  })
})
