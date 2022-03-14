/// <reference types="cypress" />

describe("user subscriptions", () => {
    const artistId = 1;

    before(() => {
        cy.login();

        cy.visit(`/artworks/users/${artistId}`);
    });

    it("user should be able to subscribe to another user's account", () => {
        // stub API req
        cy.intercept("POST", `/api/users/${artistId}/followers`, {
            statusCode: 201,
            body: {
                addedFollower: {
                    follower_user_id: 33
                }
            }
        });

        // follow a user
        cy.contains("button", /follow/i)
            .should("exist")
            .click()
            .should("have.text", "Following")
            .should("have.class", "user-profile__info__follow-btn--activated");
    });

    it("subscriptions feed should show one artist the user is currently following", () => {
        // stub API req
    });
});