/// <reference types="cypress" />

describe("sign up flow", () => {
    it("signs a new user up", () => {
        // stub API req
        cy.intercept("POST", "/api/auth/sign-up", {
            statusCode: 201,
            body: {
                message: "New user created.",
            },
        });

        cy.visit("/auth/sign-up");

        cy.env(["testUsername", "testUserEmail", "testUserPassword"]).then(
            ({ testUsername, testUserEmail, testUserPassword }) => {
                cy.get("input[name=username]").type(testUsername);
                cy.get("input[name=email]").type(testUserEmail);
                cy.get("input[name=password]").type(testUserPassword, {
                    log: false,
                });

                cy.contains("button", /submit/i).click();
                cy.url().should("include", "/auth/log-in");
            },
        );
    });
});
