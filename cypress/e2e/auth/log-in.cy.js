/// <reference types="cypress" />

describe("log in page", () => {
    beforeEach(() => {
        // cypress auto-clears cookies and localStorage for each test
        cy.visit("/auth/log-in");
    });

    it("logs a test user into the app, then gets redirected to the user's 'subscriptions' page of the dashboard", () => {
        cy.intercept("POST", "/api/auth/log-in").as("log-in");

        cy.get("input[type=email]").type(Cypress.env("testUserEmail"));

        cy.get("input[type=password]").type(Cypress.env("testUserPassword"));

        cy.get("button[type=submit]").click();

        cy.wait("@log-in");

        cy.url().should("include", "/dashboard/subscriptions");
    });

    it("gives an error message if the user email does not exist", () => {
        cy.intercept("POST", "/api/auth/log-in").as("log-in");

        cy.get("input[type=email]").type("thisdoesnotexist@gmail.com");

        cy.get("input[type=password]").type(Cypress.env("testUserPassword"));

        cy.get("button[type=submit]").click();

        cy.wait("@log-in");

        cy.contains("p", /email is not found./i)
            .should("have.class", "error")
            .should("exist");
    });

    it("gives an error message when the user provides an incorrect password", () => {
        cy.intercept("POST", "/api/auth/log-in").as("log-in");

        cy.get("input[type=email]").type(Cypress.env("testUserEmail"));

        cy.get("input[type=password]").type("myfakepassword");

        cy.get("button[type=submit]").click();

        cy.wait("@log-in");

        cy.contains("p", /invalid password./i)
            .should("have.class", "error")
            .should("exist");
    });

    // it("gives an error message when the user provides a password shorter than 6 characters long", () => {
    //     cy.get("input[type=email]").type(Cypress.env("testUserEmail"));

    //     cy.get("input[type=password]").type("short");

    //     cy.get("button[type=submit]").click();

    //     cy.contains(
    //         "p",
    //         /"password" length must be at least 6 characters long/i,
    //     )
    //         .should("have.class", "error")
    //         .should("exist");
    // });
});
