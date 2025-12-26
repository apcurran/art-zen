/// <reference types="cypress" />

describe("edit user profile", () => {
    beforeEach(() => {
        cy.intercept("PATCH", `/api/users/**`, {
            statusCode: 200,
            body: {
                message: "User info updated.",
            },
        }).as("changeUserInfo");

        cy.login();

        cy.visit("/dashboard/user-info");
    });

    it("user should be able to change bio description of profile", () => {
        cy.get(".dashboard-user-info__textarea").clear();

        cy.get(".dashboard-user-info__textarea").type("lorem ipsum");

        cy.contains("button", /update/i).click();

        cy.wait("@changeUserInfo");

        cy.contains(/user info updated/i).should("be.visible");
    });

    // it("user should be able to change avatar image of profile", () => {
    //     cy.fixture("images/doom-suspect.png").as("doomGuy");

    //     cy.get("input[id=avatarImg]").selectFile("@doomGuy");

    //     cy.contains("button", /update/i).click();

    //     cy.contains("User info updated.").should("exist");
    // });
});
