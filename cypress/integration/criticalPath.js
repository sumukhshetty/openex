import { user1 } from './testUsers'
import { user2 } from './testUsers'

Cypress.config('baseUrl', 'http://localhost:3000/')

it.skip('user 1 posts a sell trade', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user1.key, user1.token)
    }
  })

  cy.get(`[data-test="postATradeButton"]`).click()
  cy.get(`[data-test="postASellTrade"]`).click()
  cy.get(`[data-test="postATradeLocation"]`).type(`India`)
  cy.get(`[data-test="postATradeMargin"]`).type(`0`)
  cy.get(`[data-test="postATradePaymentMethod"]`).select(`cash`)
  // create another test for bank transactions
  // cy.get(`[data-test="submitATradeBankInfo"]`).type(`Some Bank`)
  cy.get(`[data-test="submitATradeMinTransaction"]`).type(`1`)
  cy.get(`[data-test="submitATradeMaxTransaction"]`).type(`1`)
  cy.get(`[data-test="submitATradeTerms"]`).type(`Some Terms`)
  cy.get(`[data-test="submitATrade"]`).click()
  cy.url().should(`contain`, '/dashboard')
  cy.contains('Live')
})

it('user 2 bids on the trade', () => {
  // cy.visit('/', {
  //   onBeforeLoad: function(win) {
  //     win.localStorage.setItem(user2.key, user2.token)
  //   }
  // })

  cy.visit('/', {
    onBeforeLoad: win => {
      sim.createAccounts(10, function() {})
      console.log('ether account', web3.eth.accounts)
      // sim.createAccounts(2)
      // sim.setBalance(web3.eth.accounts[0], 123450000, function() {})
      // web3.eth.getBalance(web3.eth.accounts[0], function(err, balance) {
      //   console.log(balance.toNumber())
      // })
    }
  })

  cy.get(`[data-test="buyEtherNavButton"]`).click()
  cy.contains('/dashboard')
})
