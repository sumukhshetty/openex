describe('Homepage', () => {
  Cypress.config('baseUrl', 'http://localhost:3000/')

  it('WhyUseOurPlatform section loads correctly', () => {
    cy.visit('/')
    cy.get(`h2`).should('contain', `Why Use our Platform`)
  })
})

// test to make sure different countries get redirect to teh appropriate landing page
