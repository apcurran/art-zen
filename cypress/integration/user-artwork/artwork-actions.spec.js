/// <reference types="cypress" />

describe("specific artwork page user actions", () => {
    const artworkId = 81;

    before(() => {
        cy.login();

        cy.visit(`/artworks/${artworkId}`);
    });

    it("user should be able to add and remove a like", () => {
        const likeId = 93;
        // stub API res
        cy.intercept("POST", `/api/artworks/${artworkId}/likes`, {
            statusCode: 201,
            body: {
                "likesData": {
                    "like_id": likeId,
                    "user_id": 36
                }
            }
        });

        cy.intercept("DELETE", `/api/artworks/${artworkId}/likes/${likeId}`, {
            statusCode: 200,
            body: {
                message: "Deleted artwork like."
            }
        });

        // add like
        cy.get(".artwork-view__info__social-data__container")
            .first()
            .click();

        cy.get(".artwork-view__info__social-data__totals")
            .first()
            .should("have.text", "1 Likes");

        cy.get(".like-heart-icon")
            .should("have.class", "like-heart-icon--full");

        // remove like
        cy.get(".artwork-view__info__social-data__container")
            .first()
            .click();

        cy.get(".artwork-view__info__social-data__totals")
            .first()
            .should("have.text", "0 Likes");

        cy.get(".like-heart-icon")
            .should("not.have.class", "like-heart-icon--full");
    });

    it("favoriting a user's artwork should increment the counter from 0 to 1", () => {
        cy.intercept("POST", `/api/artworks/${artworkId}/favorites`, {
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

        cy.get(".favorite-star-icon")
            .should("have.class", "favorite-star-icon--full");
    });

    it("user should be able to add and remove a comment", () => {
        const commentId = 61;

        cy.intercept("POST", `/api/artworks/${artworkId}/comments`, {
            statusCode: 201,
            body: {
                commentsData: [
                    {
                        "comment_id": commentId,
                        "user_id": 36,
                        "text": "Test here",
                        "comment_created_at": "2022-03-08T17:26:33.118Z",
                        "comment_username": "John",
                        "comment_avatar_img": "https://res.cloudinary.com/dev-project/image/upload/v1644616038/art-zen-app/user-avatars/alugkzxsgetx1hcjxfmi.png"
                    }
                ]
            }
        });

        cy.intercept("DELETE", `/api/artworks/${artworkId}/comments/${commentId}`, {
            statusCode: 200,
            body: {
                message: "Deleted artwork comment."
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

        cy.get(".artwork-view__comments-total__amt")
            .should("have.text", "1");

        cy.get(".comment-segment__info__delete-btn")
            .contains("span", /delete/i)
            .should("exist")
            .click();

        cy.contains("p", "Test here")
            .should("not.exist");
    });
});
