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
});