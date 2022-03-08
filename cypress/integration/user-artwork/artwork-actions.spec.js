/// <reference types="cypress" />

describe("specific artwork page user actions", () => {
    beforeEach(() => {
        cy.login();

        cy.visit("/artworks/81");
    });

    it("'liking' a user's artwork should increase the counter from 0 to 1", () => {
        // stub API res
        cy.intercept("POST", "/api/artworks/81/likes", {
            statusCode: 201,
            body: {
                "likesData": {
                    "like_id":93,
                    "user_id":36
                }
            }
        });

        cy.get(".artwork-view__info__social-data__container")
            .first()
            .should("exist")
            .click();

        cy.get(".artwork-view__info__social-data__totals")
            .first()
            .should("have.text", "1 Likes");

        cy.get(".like-heart-icon")
            .should("have.class", "like-heart-icon--full");
    });

    it("favoriting a user's artwork should increment the counter from 0 to 1", () => {
        cy.intercept("POST", "/api/artworks/81/favorites", {
            statusCode: 201,
            body: {
                "favoriteData": {
                    "favorite_id": 70,
                    "user_id": 36
                }
            }
        });

        cy.get(".artwork-view__info__social-data__container")
            .last()
            .should("exist")
            .click();

        cy.get(".artwork-view__info__social-data__totals")
            .last()
            .should("have.text", "1 Favorites");
    });
});
