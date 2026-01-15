/// <reference types="cypress" />

describe("my artworks dashboard tab", () => {
    beforeEach(() => {
        cy.login();

        cy.window().then((win) => {
            const userId = win.localStorage.getItem("userId");
            cy.wrap(userId).as("userId");
        });
    });

    it("profile information should display on the page", () => {
        cy.get("@userId").then((userId) => {
            cy.visit(`/dashboard/artworks/users/${userId}`);

            cy.get(".user-profile__info").children("figure").should("exist");

            cy.get(".user-profile__info")
                .contains("h2", /john/i)
                .should("exist");

            cy.get(".user-profile__info-sect__totals")
                .children()
                .should("have.length", 2);

            cy.get(".user-profile__info__bio").should("not.be.empty");
        });
    });
});

describe("my artworks add/remove", () => {
    beforeEach(() => {
        cy.login();

        cy.window().then((win) => {
            const userId = win.localStorage.getItem("userId");
            cy.wrap(userId).as("userId");
        });
    });

    it("user can delete an artwork from the dashboard 'My Artworks' tab", () => {
        cy.get("@userId").then((userId) => {
            // GET request with nested structure
            cy.intercept("GET", `/api/artworks/users/${userId}`, {
                statusCode: 200,
                body: {
                    userData: {
                        username: "johndoe",
                        avatar_img_url:
                            "https://res.cloudinary.com/demo/image/upload/sample.png",
                        bio_description: "lorem ipsum, update here!!",
                    },
                    followerData: [],
                    artworkData: [
                        {
                            artwork_id: 1,
                            user_id: Number(userId),
                            artwork_img_url: "art-zen-app/tlx992cfy7khritthx2l",
                            img_alt_txt: "Cartoon Aliens",
                            img_width: 640,
                            img_height: 376,
                        },
                    ],
                },
            }).as("getArtworks");

            cy.intercept("DELETE", "**/api/artworks/1", {
                statusCode: 204,
            }).as("deleteArtwork");

            cy.visit(`/dashboard/artworks/users/${userId}`);

            cy.wait("@getArtworks");

            cy.get(".user-profile__artworks-grid__article")
                .should("be.visible")
                .within(() => {
                    cy.contains("button", /delete/i).click();
                });

            cy.wait("@deleteArtwork");
            cy.get(".user-profile__artworks-grid__article").should("not.exist");
        });
    });
});
