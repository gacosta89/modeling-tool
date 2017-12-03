var WAIT = 1000;

module.exports = {
    'Smoketest' (browser) {
        browser
            .url(`${browser.launchUrl}/`)
            .waitForElementVisible('body', WAIT)
            .assert.containsText('body', 'HELLO WORLD')
            .end();
    }
};
