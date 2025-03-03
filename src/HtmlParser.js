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
        const events = [];

        const domEvents = dom.querySelectorAll(eventsSelector);
        for (const domEvent of domEvents) {
            events.push(this._removeWhitespaces(domEvent.textContent));
        }

        // Check data
        if (events.length <= 0) {
            return {};
        }

        return {
            title: title ? this._removeWhitespaces(title.textContent) : null,
            events: events,
        };
    }

    _removeWhitespaces(text) {
        return text.replace(/\s+/g, ' ').trim();
    }
};
