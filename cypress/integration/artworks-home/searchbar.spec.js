/// <reference types="cypress" />

describe("searchbar", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("displays one artwork when 'Exclusive maximized firmware' phrase is typed into input", () => {
        cy.get(".search-form__input")
            .should("exist")
            .type("Exclusive maximized firmware");

        cy.get("main")
            .children()
            .should("have.length", 1);
    });
});