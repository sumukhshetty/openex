const home = 'http://localhost:3000/'

describe('Homepage', () => {
  it('should have the correct title', () => {
    cy.visit(home)
    cy.title().should('eq', 'Ezether Marketplace | Buy Ether in India')
  })
  it('should have to correct title on mobile', () => {
    cy.viewport('iphone-6')
    cy.visit(home)
    cy.title().should('eq', 'Ezether Marketplace | Buy Ether in India')
  })
  it('should have to correct title on tablet', () => {
    cy.viewport('ipad-2', 'portrait')
    cy.visit(home)
    cy.title().should('eq', 'Ezether Marketplace | Buy Ether in India')
  })
  it('should have to correct title on laptop', () => {
    cy.viewport('macbook-13')
    cy.visit(home)
    cy.title().should('eq', 'Ezether Marketplace | Buy Ether in India')
  })
  it('shoud show the correct header on a laptop', () => {
    cy.viewport('macbook-13')
    cy.visit(home)
    cy.contains(`Buy and Sell Ethereum`)
  })
  it('shoud show the login, signup and howThisWork button on a laptop', () => {
    cy.viewport('macbook-13')
    cy.visit(home)
    cy.get(`[data-test="homeLoginButton"]`)
    cy.get(`[data-test="homeSignupButton"]`)
    cy.get(`[data-test="homeHowButton"]`)
  })

  it('shoud NOT show the login, signup and howThisWork button on a tablet', () => {
    cy.viewport('ipad-2', 'portrait')
    cy.visit(home)
    cy.get(`[data-test="homeLoginButton"]`).should('not.be.visible')
    cy.get(`[data-test="homeSignupButton"]`).should('not.be.visible')
    cy.get(`[data-test="homeHowButton"]`).should('not.be.visible')
  })

  it('shoud NOT show the login, signup button on a mobile', () => {
    cy.viewport('iphone-5', 'portrait')
    cy.visit(home)
    cy.get(`[data-test="homeLoginButton"]`).should('not.be.visible')
    cy.get(`[data-test="homeSignupButton"]`).should('not.be.visible')
    cy.get(`[data-test="homeHowButton"]`)
  })
})
