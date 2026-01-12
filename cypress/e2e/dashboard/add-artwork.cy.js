/// <reference types="cypress" />

describe("add artwork -- dashboard", () => {
    beforeEach(() => {
        cy.login();

        cy.visit("/dashboard/add-artwork");
    });

    it("user can fill out form details and submit the form", () => {
        cy.intercept("POST", "/api/artworks", {
            statusCode: 201,
            body: {
                addedArtwork: {
                    artwork_id: 34,
                    img_url: "art-zen-app/urrkbqdtcvle4x6fqxun",
                },
            },
        });

        cy.get("input[id=title]").type("Cartoon Aliens");

        cy.get("select[id=genre]").select("sci-fi");

        cy.get("textarea[id=description]").type(
            "Here is my example description.",
        );

        cy.fixture("images/cartoon-aliens.jpg").as("cartoonAliensImg");

        cy.get('[data-cy="upload"]').should("be.visible");

        cy.get("input[id=artwork-img-alt-txt]").type(
            "Black and white cartoon aliens in a spaceship.",
        );
    });
});
