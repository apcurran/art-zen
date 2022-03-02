/// <reference types="cypress" />

describe("log in page", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/auth/log-in");
    });

    it("logs a test user into the app, then gets redirected to the user's 'subscriptions' page of the dashboard", () => {
        cy.get("input[type=email]")
            .type(Cypress.env("testUserEmail"));

        cy.get("input[type=password]")
            .type(Cypress.env("testUserPassword"));

        cy.get("button[type=submit]")
            .click();

        cy.url().should("eq", "http://localhost:3000/dashboard/subscriptions");
    });
});