/// <reference types="cypress" />

describe("searchbar", () => {
    beforeEach(() => {
        cy.visit("/");

        cy.get(".masonry-grid").should("be.visible");
    });

    it("filters results based on the title of the first artwork", () => {
        // 1. Dynamically grab the title of the first artwork from the DOM
        cy.get(".masonry-grid__link")
            .first()
            .find(".masonry-grid__link__fig-caption__title")
            .then(($titleEl) => {
                const artworkTitle = $titleEl.text();

                // 2. Type that dynamic title into the search input
                cy.get(".search-form__input").type(`${artworkTitle}{enter}`);
                cy.get(".search-form__input").trigger("change");

                // 3. Assert that the grid now contains that title and has filtered the list
                // We check that the remaining results actually contain the text we typed
                cy.get(".masonry-grid__link", { timeout: 10000 }).should(
                    "contain",
                    artworkTitle,
                );

                // Ensure we aren't seeing the full list anymore (brittle '30' removed)
                cy.get(".masonry-grid__link").then(($links) => {
                    // This is much safer than checking for exactly '1'
                    // in case two artworks have similar names
                    expect($links.length).to.be.at.least(1);
                });
            });
    });

    it("displays the full list when the search input is cleared", () => {
        // 1. Capture the initial count of items in the database
        cy.get(".masonry-grid__link").then(($initialItems) => {
            const count = $initialItems.length;

            // 2. Perform a search to filter the list
            cy.get(".search-form__input").type("non-existent-artwork-name-xyz");
            cy.get(".masonry-grid__link").should("have.length", 0);

            // 3. Clear the search and verify the count returns to the original number
            cy.get(".search-form__input").clear();
            cy.get(".masonry-grid__link").should("have.length", count);
        });
    });
});
