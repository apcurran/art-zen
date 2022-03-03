/// <reference types="cypress" />

describe("specific artwork page", () => {
    beforeEach(() => {
        cy.visit("/artworks/81");
    });

    it("displays all relevant artwork info", () => {
        cy.get("img")
            .should("have.class", "artwork-view__info__fig__img");

        cy.contains("h1", "Cartoon Life")
            .should("exist");
        
        cy.contains("a", "tester")
            .should("exist");

        cy.contains("span", /fantasy/i)
            .should("exist");

        cy.get(".artwork-view__info__desc")
            .should("not.be.empty");

        cy.contains("time", "Nov 29th, 2021")
            .should("exist");
    });
});