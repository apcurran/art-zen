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

    it("gives an error message if the user email does not exist", () => {
        cy.get("input[type=email]")
            .type("fakeemail@gmail.com");

        cy.get("input[type=password]")
            .type(Cypress.env("testUserPassword"));

        cy.get("button[type=submit]")
            .click();

        cy.contains("p", /email is not found./i)
            .should("have.class", "error")
            .should("exist");
    });
});