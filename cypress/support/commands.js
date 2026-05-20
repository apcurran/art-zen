/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
    cy.session("user-session", () => {
        // Fetch and destructure credentials right inside the session setup callback
        cy.env(["testUserEmail", "testUserPassword"]).then(
            ({ testUserEmail, testUserPassword }) => {
                cy.request({
                    method: "POST",
                    url: "/api/auth/log-in",
                    body: {
                        email: testUserEmail,
                        password: testUserPassword,
                    },
                }).then((response) => {
                    const { accessToken, userId } = response.body;

                    window.localStorage.setItem("authToken", accessToken);
                    window.localStorage.setItem("userId", userId);
                });
            },
        );
    });
});

Cypress.Commands.add("mockCloudinaryUpload", (secureUrl) => {
    // Block Cloudinary widget script entirely
    cy.intercept("GET", "https://upload-widget.cloudinary.com/**", {
        statusCode: 204,
    });

    cy.on("window:before:load", (win) => {
        win.cloudinary = {
            createUploadWidget: (options, cb) => {
                return {
                    open: () => {
                        // simulation of Cloudinary img upload
                        cb(null, {
                            event: "success",
                            info: {
                                secure_url: secureUrl,
                            },
                        });
                    },
                };
            },
        };
    });
});
