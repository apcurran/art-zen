/// <reference types="cypress" />

describe("specific artwork page", () => {
    beforeEach(() => {
        cy.visit("/");

        cy.get("a.masonry-grid__link").first().click();
    });

    it("displays all relevant artwork info", () => {
        cy.get("img")
            .should("have.class", "artwork-view__info__fig__img")
            .and("be.visible");

        cy.get("h1").should("exist").and("not.be.empty");

        cy.get("a.artwork-view__info__author").should("exist");

        cy.get("span.chip").should("exist").and("not.be.empty");

        cy.get(".artwork-view__info__desc").should("not.be.empty");

        cy.get(".artwork-view__info__date").should("exist").and("not.be.empty");
    });
});
