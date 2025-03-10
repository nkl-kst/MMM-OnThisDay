/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const moduleDefinition = {
    defaults: {
        // Intervals
        animationSpeed: 1, // 1 sec.
        updateInterval: 3600, // 60 min.

        // Appearance
        maxEvents: null,
        reverseOrder: false,

        // Carousel
        carousel: false,
        carouselInterval: 30, // 30 sec.

        // Style
        maxWidth: '400px',
        textSize: 'xsmall',
    },

    requiresVersion: '2.1.0', // Required version of MagicMirror

    /**
     * Used language.
     */
    usedLanguage: 'en', // Fallback

    /**
     * Title as string from Wikipedia.
     */
    title: null,

    /**
     * Separate events parsed from the HTML data.
     */
    events: null,

    /**
     * Event years for carousel model.
     */
    eventYears: [],

    /**
     * Index of current event displayed in the carousel mode.
     */
    carouselIndex: -1,

    /**
     * Timer for the current displayed event in the carousel mode.
     */
    carouselTimer: null,

    /**
     * Module scripts.
     *
     * @returns {[string]}
     */
    getScripts: function () {
        // prettier-ignore
        return [
            this.file('src/WikiCssSelectors.js'),
            this.file('src/ProgressUpdater.js'),
        ];
    },

    /**
     * Modules styles.
     *
     * @returns {[string]}
     */
    getStyles: function () {
        // prettier-ignore
        return [
            this.file('style/MMM-OnThisDay.css'),
        ];
    },

    getTranslations: function () {
        return {
            en: 'translation/en.json',
            de: 'translation/de.json',
            fr: 'translation/fr.json',
            ar: 'translation/ar.json',
            ru: 'translation/ru.json',
        };
    },

    /**
     * Template.
     *
     * @returns {string} Template name
     */
    getTemplate: function () {
        return 'template/MMM-OnThisDay.njk';
    },

    /**
     * Template data.
     *
     * @returns {{}} Data to render
     */
    getTemplateData: function () {
        return {
            config: this.config,
            events: this.events,
            eventYears: this.eventYears,
            carouselIndex: this.carouselIndex,
        };
    },

    getHeader: function () {
        return this.data.header ? this.data.header : this.title;
    },

    start: function () {
        Log.info('MMM-OnThisDay starting...');

        // Check languages
        if (WIKI_CSS_SELECTORS[config.language]) {
            this.usedLanguage = config.language;
        }
        Log.info(`Using language ${this.usedLanguage}.`);
    },

    notificationReceived: function (notification) {
        // DOM ready
        if (notification === 'MODULE_DOM_CREATED') {
            // Initial events load
            this.loadEvents();
        }
    },

    socketNotificationReceived: function (notification, payload) {
        Log.info(`Received socket notification ${notification}.`);

        // Events loaded with node helper
        if (notification === 'EVENTS_LOADED') {
            this.handleEventsLoaded(payload);
        }
    },

    loadEvents: function () {
        Log.info('Load events ...');

        // Load events in node helper
        this.sendSocketNotification('LOAD_EVENTS', this.usedLanguage);

        // Schedule next load
        this.scheduleRefresh();
    },

    handleEventsLoaded: function (payload) {
        // No data
        if (payload.events.length <= 0) {
            Log.warn('No events available.');
            return;
        }

        // Set content
        this.title = payload.title;
        this.events = payload.events;

        // Carousel mode
        if (this.config.carousel) {
            Log.info('Update DOM in carousel model ...');

            // Reset current carousel timer
            if (this.carouselTimer) {
                clearTimeout(this.carouselTimer);
            }

            // Parse years from events
            this.parseEventYears(this.events);

            this.updateCarousel();
            return;
        }

        // Update module
        Log.info('Update DOM with new title and events ...');
        this.updateDom(this.config.animationSpeed * 1000);
    },

    scheduleRefresh: function () {
        setTimeout(() => {
            this.loadEvents();
        }, this.config.updateInterval * 1000);
    },

    updateCarousel: function () {
        ++this.carouselIndex;

        // Reset if exceeded
        if (this.carouselIndex >= this.events.length) {
            this.carouselIndex = 0;
        }

        this.updateDom(this.config.animationSpeed * 1000);

        // Schedule next update
        this.carouselTimer = setTimeout(() => {
            this.updateCarousel();
        }, this.config.carouselInterval * 1000);
    },

    parseEventYears(events) {
        // Finds the year at the beginning of a text, followed by a separator and text
        const yearRegex = /^\s*(\d{0,4})\s[-–:]\s.+$/;

        const parsedYears = [];
        for (const event of events) {
            // Cancel if one year couldn't be parsed
            const yearMatch = yearRegex.exec(event);
            if (yearMatch === null) {
                Log.info("Couldn't parse event year for " + event);

                this.eventYears = [];
                return;
            }

            parsedYears.push(yearMatch[1]);
        }

        this.eventYears = parsedYears;
    },
};

// Register module definition
Module.register('MMM-OnThisDay', moduleDefinition);

// Export module definition for tests
/* istanbul ignore else */
if (typeof module !== 'undefined') {
    module.exports = moduleDefinition;
}
