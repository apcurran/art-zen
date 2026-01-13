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

        cy.mockCloudinaryUpload(
            "https://res.cloudinary.com/test/image/upload/avatar-fake.jpg",
        );

        cy.visit("/dashboard/user-info");
    });

    it("user should be able to change bio description of profile", () => {
        cy.get(".dashboard-user-info__textarea").clear();

        cy.get(".dashboard-user-info__textarea").type("lorem ipsum");

        cy.contains("button", /update/i).click();

        cy.wait("@changeUserInfo");

        cy.contains(/user info updated/i).should("be.visible");
    });

    it("user should be able to change avatar image of profile", () => {
        // trigger Cloudinary widget (mocked functionality)
        cy.get('[data-cy="upload-avatar"]').click();

        cy.contains("button", /update/i).click();

        cy.wait("@changeUserInfo").its("request.body").should("include", {
            avatarUrl:
                "https://res.cloudinary.com/test/image/upload/avatar-fake.jpg",
        });

        cy.contains(/user info updated/i).should("be.visible");
    });
});
