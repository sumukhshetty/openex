import { user1 } from './testUsers';

Cypress.config('baseUrl', 'http://localhost:3000/');

it('onboarding box appears on dashboard', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user1.key, user1.token);
    }
  });
  cy.get(`[data-test="dashboardButton"]`).click();
  cy.url().should(`contain`, '/dashboard');
  cy.get(`[data-test="onboardingBox"]`).should('be.visible');
});

it('confirming email changes progress meter', () => {
  cy.visit('/', {
    onBeforeLoad: function(win) {
      win.localStorage.setItem(user1.key, user1.token);
    }
  });
  cy.get(`[data-test="dashboardButton"]`).click();
  cy.url().should(`contain`, '/dashboard');
  cy.get(`[data-test="onboardingConfirmEmail"]`).should('be.visible');
});
