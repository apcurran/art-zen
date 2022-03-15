/// <reference types="cypress" />

describe("my artworks", () => {
    const userId = 33;

    beforeEach(() => {
        cy.login();

        cy.visit(`/dashboard/artworks/users/${userId}`);
    });

    it("profile information should display on the page", () => {
        cy.get(".user-profile__info")
            .children("figure")
            .should("exist");

        cy.contains("h2", "John")
            .should("exist");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .should("have.length", 2);

        cy.get(".user-profile__info__bio")
            .should("not.be.empty");

        cy.get(".user-profile__artworks-grid")
            .children()
            .should("have.length.greaterThan", 0);
    });

    it("deletes a user's artwork", () => {
        const artworkId = 33;

        cy.intercept("DELETE", `/api/artworks/${artworkId}`, {
            statusCode: 200,
            body: {
                message: `Artwork with id, ${artworkId} deleted.`
            }
        });

        cy.get(".user-profile__artworks-grid__article__link")
            .as("myTargetedArtwork")
            .should("have.attr", "href")
            .and("match", /artworks/);

        cy.get("@myTargetedArtwork")
            .next()
            .should("exist")
            .should("have.text", "Delete")
            .click();

        cy.get("@myTargetedArtwork")
            .should("not.exist");
    });
});