/// <reference types="cypress" />

describe("user subscriptions", () => {
    const artistId = 1;
    const userId = 33;

    beforeEach(() => {
        cy.login();
    });

    it("user should be able to subscribe to another user's account", () => {
        // stub API req
        cy.intercept("POST", `/api/users/${artistId}/followers`, {
            statusCode: 201,
            body: {
                addedFollower: {
                    follower_user_id: userId,
                },
            },
        });

        cy.visit(`/artworks/users/${artistId}`);

        // follow a user
        cy.contains("button", /follow/i)
            .should("exist")
            .click()
            .should("have.text", "Following")
            .should("have.class", "user-profile__info__follow-btn--activated");
    });

    it("subscriptions feed should show one artist the user is currently following", () => {
        // stub API req
        cy.intercept("GET", `/api/users/${userId}/subscriptions`, {
            statusCode: 200,
            body: {
                subscriptionsArtworks: [
                    {
                        artwork_id: 1,
                        user_id: 1,
                        title: "Customizable methodical task-force",
                        img_url: "art-zen-app/tgs2west10cu60gfheha",
                        genre: "modern",
                        created_at: "2022-03-09T22:33:05.221Z",
                        img_alt_txt: "User artwork",
                        username: "Amir.Champlin39",
                    },
                ],
            },
        });

        cy.visit("/dashboard/subscriptions")
            .url()
            .should("eq", "http://localhost:3000/dashboard/subscriptions");

        cy.get(".subscriptions-grid").children().should("have.length", 1);
    });
});
