/// <reference types="cypress" />

describe("dashboard favorites", () => {
    const userId = 33;

    beforeEach(() => {
        cy.intercept("GET", `/api/artworks/users/${userId}/favorites`, {
            statusCode: 200,
            body: {
                favoritesData: [
                    {
                        "artwork_id": 2,
                        "img_url": "art-zen-app/h3chvlxylqdbd3jdu7yw",
                        "title": "Reactive zero tolerance adapter",
                        "img_alt_txt": "User artwork",
                        "favorite_id": 5
                    }
                ]
            }
        });

        cy.login();

        cy.visit("/dashboard/favorites");
    });

    it("displays user's favorite artworks", () => {
        cy.get(".dashboard__favorites")
            .children()
            .should("have.length", 1);

        cy.get(".dashboard__favorites__article__fig__img")
            .should("exist");

        cy.get(".dashboard__favorites__article__fig__img")
            .invoke("attr", "src")
            .should("include", "/art-zen-app/h3chvlxylqdbd3jdu7yw");

        cy.contains("h2", "Reactive zero tolerance adapter")
            .should("exist");

        cy.contains("button", "Delete Favorite")
            .should("exist");
    });
});