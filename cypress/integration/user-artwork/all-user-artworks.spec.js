/// <reference types="cypress" />

describe("all user artworks page", () => {
    it("can navigate to another user's artworks page, and the page displays all relevant user info and available artwork cards", () => {
        cy.visit("/artworks/28");

        cy.contains("a", "Jan78")
            .should("exist")
            .click();

        // now on all user artworks page
        cy.get(".user-profile__info__avatar__img")
            .should("exist");

        cy.contains("h2", "Jan78")
            .should("exist");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .first()
            .should("not.be.empty");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .last()
            .should("not.be.empty");

        cy.get(".user-profile__info__bio")
            .should("not.be.empty");

        cy.get(".user-profile__artworks-grid")
            .children()
            .should("have.length.above", 0);
    });
});