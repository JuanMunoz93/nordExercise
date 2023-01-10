const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "cypress/cucumber-json",
    reportPath: "./reports/cucumber-report.html",
    metadata: {
        browser: {
            name: "undefined",
            version: "undefined",
        },
        device: "unknown",
        platform: {
            name: "unknown",
            version: "unknown",
        },
    },
});