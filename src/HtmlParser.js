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

        // Get items
        const itemSelector = WIKI_CSS_SELECTORS[language].items;
        const items = [];

        if (itemSelector !== undefined) {
            const domItems = dom.querySelectorAll(itemSelector);
            for (const domItem of domItems) {
                items.push(this._removeWhitespaces(domItem.textContent));
            }
        }

        // Check data
        if (!events) {
            return {};
        }

        return {
            title: title ? this._removeWhitespaces(title.textContent) : null,
            events: events.outerHTML,
            items: items,
        };
    }

    _removeWhitespaces(text) {
        return text.replace(/\s+/g, ' ').trim();
    }
};
