describe('Dashboard', () => {

   Cypress.config('baseUrl', 'http://localhost:3000/')


  it('does not log me in without a token', () => {
    // first show that by not providing a valid CSRF token
    // that we will get a 403 status code
    cy.visit('/')
    cy.get(`h1`).should(`contain`, `Buy and Sell Ethereum`)
  })


  it('logs in with a token', () => {
    cy.server()

              cy.visit('/', {
             onBeforeLoad: function(win){
               // and before the page finishes loading
               // set the id_token in local storage
               win.localStorage.setItem(`firebase:authUser:AIzaSyBxtILkIukG_LkLjLh9lH2P5M-Y5wHLuCo:[DEFAULT]`, `{"uid":"0xbe163582bf071c1b301eba82dbe7649f2068eb43","displayName":"joshpitzalis","photoURL":null,"email":null,"emailVerified":false,"identifierNumber":null,"isAnonymous":false,"providerData":[],"apiKey":"AIzaSyBxtILkIukG_LkLjLh9lH2P5M-Y5wHLuCo","appName":"[DEFAULT]","authDomain":"ezether-staging.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyBxtILkIukG_LkLjLh9lH2P5M-Y5wHLuCo","refreshToken":"APRrRCKBJeE4z54okqODuEq5GfhNoh58Y6tkKnbUogUoaGMQq-xGAaKI-u9e1hQpdYuhNW49ul6WZG8H8xO5-T5w4BYDizKx_IRNnKhzfk3aueokPZnwlV5LBq6cFuPaslwIcIFVigBlCsZvQ85ckZm5RV2RhCZz4hU6fSr2cvB6dz2oYiCo08SePpMWEv0XDPqAeeAM8mU3","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmZmMyZDIwNjYyYjM1ZGQ0MTZlNDExMDQ4N2YxM2Q5MDY2MWE3YjEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXpldGhlci1zdGFnaW5nIiwibmFtZSI6Impvc2hwaXR6YWxpcyIsImF1ZCI6ImV6ZXRoZXItc3RhZ2luZyIsImF1dGhfdGltZSI6MTUwNTkwNzY4MCwidXNlcl9pZCI6IjB4YmUxNjM1ODJiZjA3MWMxYjMwMWViYTgyZGJlNzY0OWYyMDY4ZWI0MyIsInN1YiI6IjB4YmUxNjM1ODJiZjA3MWMxYjMwMWViYTgyZGJlNzY0OWYyMDY4ZWI0MyIsImlhdCI6MTUwNTkwNzY4MSwiZXhwIjoxNTA1OTExMjgxLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.dYNilHbxPGJuNr1wsQy4eb2t0CbbbeeaukI2yEBx2RAd1qMFatEwK2ipRKUQ3jz_QRcSNOexKRxAb-1kuyd6jGgm5rZ_Z_t2bhEnkz6UlwKdUElX-wyuJDrx7ur6EHVGOCCPknG7_vy2lDWlIAt47nhn3H9wlb-SrBpZ3lVG4sT8xRHI1_8P-HWelnLsFr4PVUOjfzybCp6Q-_c-rVdTtazpT2MMn5-rl-y_GIHoj76eg-RO5XA04rW-WMTQlv-nprTGOjTWPVcTcDQ6BGCe_phkc7TiigOOub8fCijgQ7LxrS3LKRBmi8Nsbj4amZIDI9u7kL8mIzu-Q7XQdvMjuQ","expirationTime":1505911281326},"redirectEventId":null}`)
             }
           })
           cy.get(`h1`).contains(`It Seems like you are the first one here from your country.`)
        // cy.get(`[data-test="dashboardButton"]`).click({ force: true })
        // cy.url().should('contain', '/dashboard')

      })


    // cy
    //   .get(`[data-test="dashboardButton"]`)
    //   .wait(3000)
    //   .click()
    // cy.get(`[data-test="dashboardButton"]`).click()
    // cy.get(`[data-test="dashboardMessage"]`).should(
    //   'eq',
    //   `In these pages you can view and manage your current advertisements and
    // contacts.`
    // )
  })
