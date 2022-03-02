/// <reference types="cypress" />

describe("sign up flow", () => {

    it("signs a new user up", () => {
        // stub API req
        cy.intercept("POST", "/api/auth/sign-up", {
            statusCode: 201,
            body: {
                message: "New user created."
            }
        });
    
        cy.visit("/auth/sign-up");
    
        cy.get("input[name=username]")
            .type(Cypress.env("testUsername"));
    
        cy.get("input[name=email]")
            .type(Cypress.env("testUserEmail"));
    
        cy.get("input[name=password]")
            .type(Cypress.env("testUserPassword"));
    
        cy.contains("button", /submit/i)
            .click();
    
        cy.url().should("eq", "http://localhost:3000/auth/log-in");
    });
});