describe('User Guide', () => {

   Cypress.config('baseUrl', 'http://localhost:3000/')

   it('loads correctly', () => {

     cy.visit('/')
     cy.get(`[data-test="SupportPageButton"]`).click({force:true})
     cy.get(`[data-test="SupportPage1"]`).click({force:true})
     cy.get(`h1`).should('contain', `The Ezether User Guide`)
   })
  })

  describe('FAQ Page', () => {

     Cypress.config('baseUrl', 'http://localhost:3000/')

     it('loads correctly', () => {

       cy.visit('/')
       cy.get(`[data-test="SupportPageButton"]`).click({force:true})
       cy.get(`[data-test="SupportPage2"]`).click({force:true})
       cy.get(`h1`).should('contain', `Frequently Asked Questions`)
     })
    })
