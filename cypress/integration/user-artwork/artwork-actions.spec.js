/// <reference types="cypress" />

describe("specific artwork page user actions", () => {
    beforeEach(() => {
        cy.login();

        cy.visit("/artworks/81");
    });

    it("'like' a user's artwork", () => {
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
    });
});
