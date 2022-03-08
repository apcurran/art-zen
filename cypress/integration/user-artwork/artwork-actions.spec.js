/// <reference types="cypress" />

describe("specific artwork page user actions", () => {
    before(() => {
        cy.login();

        cy.visit("/artworks/81");
    });

    it("'liking' a user's artwork should increase the counter from 0 to 1", () => {
        // stub API res
        cy.intercept("POST", "/api/artworks/81/likes", {
            statusCode: 201,
            body: {
                "likesData": {
                    "like_id": 93,
                    "user_id": 36
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

    it("comment will be posted below artwork after submitting", () => {
        cy.intercept("POST", "/api/artworks/81/comments", {
            statusCode: 201,
            body: {
                commentsData: [
                    {
                        "comment_id": 61,
                        "user_id": 36,
                        "text": "Test here",
                        "comment_created_at": "2022-03-08T17:26:33.118Z",
                        "comment_username": "John",
                        "comment_avatar_img": "https://res.cloudinary.com/dev-project/image/upload/v1644616038/art-zen-app/user-avatars/alugkzxsgetx1hcjxfmi.png"
                    }
                ]
            }
        });

        cy.get("textarea")
            .type("Hello world!");

        cy.contains("button", /submit/i)
            .click();

        cy.get(".comment-segment")
            .should("exist")
            .contains("h4", "John")
            .should("exist");
            
        cy.get(".comment-segment")
            .contains("time", "Mar 8th, 2022")
            .should("exist");

        cy.get(".comment-segment")
            .contains("p", "Test here")
            .should("exist");

        cy.get(".comment-segment__info__delete-btn")
            .contains("span", /delete/i)
            .should("exist");

        cy.get(".artwork-view__comments-total__amt")
            .should("have.text", "1");
    });
});
