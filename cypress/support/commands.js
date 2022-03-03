/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
    cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/log-in",
        body: {
            email: Cypress.env("testUserEmail"),
            password: Cypress.env("testUserPassword")
        }
    })
    .then((response) => {
        const { accessToken, userId } = response.body;

        window.localStorage.setItem("authToken", accessToken);
        window.localStorage.setItem("userId", userId);
    });
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
