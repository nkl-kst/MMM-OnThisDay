const WIKI_CSS_SELECTORS = require('./WikiCssSelectors');

module.exports = class {
    constructor(domParser) {
        this.domParser = domParser;
    }

    parse(html, language) {
        // Create dom
        const dom = this.domParser.fragment(html);

        // Get title
        const titleSelector = WIKI_CSS_SELECTORS[language].title;
        const title = dom.querySelector(titleSelector);

        // Get events
        const eventsSelector = WIKI_CSS_SELECTORS[language].events;
        const events = dom.querySelector(eventsSelector);

        // Check data
        if (!events) {
            return {};
        }

        return {
            title: title ? title.innerHTML : null,
            events: events.outerHTML,
        };
    }
};
