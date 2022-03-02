/// <reference types="cypress" />

describe("artworks home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("displays artorks when visited", () => {
        cy.get(".masonry-grid")
            .children()
            .should("have.length.greaterThan", 0);
    });

    it("clicking a card navigates to the unique artwork page", () => {
        cy.get("a[href=\"/artworks/81\"]")
            .should("exist")
            .click();
        
        cy.url()
            .should("eq", "http://localhost:3000/artworks/81");

        cy.contains("h1", "Cartoon Life")
            .should("exist");
    });
});