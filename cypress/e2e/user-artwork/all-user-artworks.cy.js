/// <reference types="cypress" />

describe("all user artworks page", () => {
    it("can navigate to another user's artworks page, and the page displays all relevant user info and available artwork cards", () => {
        cy.visit("/");

        // click first card
        cy.get("a.masonry-grid__link").first().click();

        // go to all artworks by clicking on artist name link
        cy.get("a.artwork-view__info__author").should("exist").click();

        // now on all user artworks page
        cy.get(".user-profile__info__avatar__img")
            .should("exist")
            .and("be.visible");

        cy.get(".user-profile__info-sect")
            .find("h2")
            .should("exist")
            .and("not.be.empty");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .first()
            .should("not.be.empty");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .last()
            .should("not.be.empty");

        cy.get(".user-profile__info__bio").should("not.be.empty");

        cy.get(".user-profile__artworks-grid")
            .children()
            .should("have.length.above", 0);
    });
});
