/// <reference types="cypress" />

describe("log out flow", () => {
    it("should log the test user out", () => {
        cy.clearLocalStorage();

        cy.visit("/auth/log-in");

        cy.get("input[type=email]")
            .type(Cypress.env("testUserEmail"));

        cy.get("input[type=password]")
            .type(Cypress.env("testUserPassword"));

        cy.get("button[type=submit]")
            .click();

        // user now logged in
        cy.contains("button", /log out/i)
            .should("exist")
            .click();

        cy.url()
            .should("eq", "http://localhost:3000/");
    });
});