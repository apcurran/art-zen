const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        viewportWidth: 1920,
        viewportHeight: 1080,
        supportFile: "cypress/support/e2e.js",
        testIsolation: false,
    },
});
