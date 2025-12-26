/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
    cy.session("user-session", () => {
        cy.request({
            method: "POST",
            url: "/api/auth/log-in",
            body: {
                email: Cypress.env("testUserEmail"),
                password: Cypress.env("testUserPassword"),
            },
        }).then((response) => {
            const { accessToken, userId } = response.body;

            window.localStorage.setItem("authToken", accessToken);
            window.localStorage.setItem("userId", userId);
        });
    });
});
