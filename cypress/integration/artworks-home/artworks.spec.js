/// <reference types="cypress" />

describe("artworks home page", () => {
    it("displays artorks when visited", () => {
        cy.visit("/");

        cy.get(".masonry-grid")
            .children()
            .should("have.length.greaterThan", 0);
    });
});