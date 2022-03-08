/// <reference types="cypress" />

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
