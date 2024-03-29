/// <reference types="cypress" />

describe("edit user profile", () => {
    const userId = 33;

    beforeEach(() => {
        cy.intercept("PATCH", `/api/users/${userId}`, {
            statusCode: 200,
            body: {
                message: "User info updated."
            }
        });

        cy.login();

        cy.visit("/dashboard/user-info");
    });

    it("user should be able to change bio description of profile", () => {
        cy.get(".dashboard-user-info__textarea")
            .clear()
            .type("lorem ipsum");

        cy.contains("button", /update/i)
            .click();

        cy.contains("User info updated")
            .should("exist");
    });

    it("user should be able to change avatar image of profile", () => {
        cy.fixture("images/doom-suspect.png")
            .as("doomGuy");

        cy.get("input[id=avatarImg]")
            .selectFile("@doomGuy");

        cy.contains("button", /update/i)
            .click();

        cy.contains("User info updated.")
            .should("exist");
    });
});