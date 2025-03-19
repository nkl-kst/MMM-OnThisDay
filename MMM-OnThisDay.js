/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const moduleDefinition = {
    defaults: {
        language: null,

        // Intervals
        animationSpeed: 1, // 1 sec.
        updateInterval: 3600, // 60 min.

        // Appearance
        maxEvents: null,
        reverseOrder: false,

        // Carousel
        carousel: false,
        carouselInterval: 30, // 30 sec.
        carouselIntervalWordFactor: 1, // 1 sec. (slow reading)
        carouselProgress: false,

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
     * Current event display duration, static or based on word count.
     */
    eventDisplayDuration: null,

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
            eventDisplayDuration: this.eventDisplayDuration,
        };
    },

    getHeader: function () {
        return this.data.header ? this.data.header : this.title;
    },

    start: function () {
        Log.info('MMM-OnThisDay starting...');

        // Check languages
        const configuredLanguage = this.config.language || config.language;
        if (WIKI_CSS_SELECTORS[configuredLanguage]) {
            this.usedLanguage = configuredLanguage;
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
        if (payload.length <= 0) {
            Log.warn('No events available for language ' + this.usedLanguage);
            return;
        }

        // Set content
        this.title = new Date().toLocaleDateString(this.usedLanguage, {
            day: 'numeric',
            month: 'long',
        });

        this.events = payload;

        // Apply reverse config option
        if (this.config.reverseOrder) {
            this.events = this.events.reverse();
        }

        // Apply limit
        if (this.config.maxEvents) {
            this.events = this.events.slice(0, this.config.maxEvents);
        }

        // Carousel mode
        if (this.config.carousel) {
            Log.info('Update DOM in carousel model ...');

            // Reset current carousel timer
            if (this.carouselTimer) {
                clearTimeout(this.carouselTimer);
            }

            // Prepare event years
            this.eventYears = this.events.map((event) => event.year);

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

        // Determine event duration
        const eventText = this.events[this.carouselIndex].text;
        this.eventDisplayDuration = this.getEventDisplayDuration(eventText);

        this.updateDom(this.config.animationSpeed * 1000);

        // Schedule next update
        this.carouselTimer = setTimeout(() => {
            this.updateCarousel();
        }, this.eventDisplayDuration * 1000);
    },

    getEventDisplayDuration(eventText) {
        // Use static value if set
        if (this.config.carouselInterval !== 'auto') {
            return this.config.carouselInterval;
        }

        const words = eventText.match(/\S+/g).length;
        return words * this.config.carouselIntervalWordFactor;
    },
};

// Register module definition
Module.register('MMM-OnThisDay', moduleDefinition);

// Export module definition for tests
/* istanbul ignore else */
if (typeof module !== 'undefined') {
    module.exports = moduleDefinition;
}
