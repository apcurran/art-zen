/// <reference types="cypress" />

const userId = 33;

describe("my artworks dashboard tab", () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`/dashboard/artworks/users/${userId}`);
    });

    it("profile information should display on the page", () => {
        cy.get(".user-profile__info").children("figure").should("exist");

        cy.contains("h2", "John").should("exist");

        cy.get(".user-profile__info-sect__totals")
            .children()
            .should("have.length", 2);

        cy.get(".user-profile__info__bio").should("not.be.empty");
    });
});

describe("my artworks add/remove", () => {
    beforeEach(() => {
        cy.login();
    });

    it("should add, then delete an artwork", () => {
        // go to add artwork tab, fill out form, then submit to add the artwork
        cy.visit("/dashboard/add-artwork");

        cy.get("input[id=title]").type("Cartoon Aliens");

        cy.get("select[id=genre]").select("sci-fi");

        cy.get("textarea[id=description]").type(
            "Here is my example description.",
        );

        cy.get("input[type=file]").selectFile(
            "cypress/fixtures/images/cartoon-aliens.jpg",
        );

        cy.get("input[id=artwork-img-alt-txt]").type(
            "Black and white cartoon aliens in a spaceship.",
        );

        cy.contains("button", /upload/i).click();

        cy.contains(/successfully uploaded!/i).should("be.visible");

        // navigate to profile
        cy.visit(`/dashboard/artworks/users/${userId}`);

        // delete the artwork
        cy.get(".user-profile__artworks-grid__article")
            .first()
            .find("button")
            .contains("Delete")
            .click();

        // check the artwork has been deleted
        cy.get("Cartoon Aliens").should("not.exist");
    });
});
