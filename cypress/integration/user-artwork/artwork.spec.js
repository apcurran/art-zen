/// <reference types="cypress" />

describe("specific artwork page", () => {
    beforeEach(() => {
        cy.visit("/artworks/1");
    });

    it("displays all relevant artwork info", () => {
        cy.get("img")
            .should("have.class", "artwork-view__info__fig__img");

        cy.contains("h1", "Customizable methodical task-force")
            .should("exist");
        
        cy.contains("a", "Amir.Champlin39")
            .should("exist");

        cy.contains("span", /modern/i)
            .should("exist");

        cy.get(".artwork-view__info__desc")
            .should("not.be.empty");

        cy.contains("time", "Mar 9th, 2022")
            .should("exist");
    });
});