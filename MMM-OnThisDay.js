/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const moduleDefinition = {

    defaults: {

        // Intervals
        animationSpeed: 1,   // 1 sec.
        updateInterval: 3600, // 60 min.

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
     * Events as raw HTML from Wikipedia.
     */
    events: null,

    /**
     * Module scripts.
     *
     * @returns {[string]}
     */
    getScripts: function() {
        return [
            'WikiCssSelectors.js',
        ]
    },

    /**
     * Modules styles.
     *
     * @returns {[string]}
     */
    getStyles: function() {
        return [
            'MMM-OnThisDay.css',
        ];
    },

    getTranslations: function() {
        return {
            en: 'translation/en.json',
            de: 'translation/de.json',
            fr: 'translation/fr.json',
            ar: 'translation/ar.json',
            ru: 'translation/ru.json',
        }
    },

    /**
     * Template.
     *
     * @returns {string} Template name
     */
    getTemplate: function() {
        return 'MMM-OnThisDay.njk';
    },

    /**
     * Template data.
     *
     * @returns {{}} Data to render
     */
    getTemplateData: function() {
        return {
            config: this.config,
            events: this.events,
        };
    },

    getHeader: function() {
        return this.data.header ? this.data.header : this.title;
    },

    start: function() {
        Log.info('MMM-OnThisDay starting...');

        // Check languages
        if (WIKI_CSS_SELECTORS[config.language]) {
            this.usedLanguage = config.language;
        }
        Log.info(`Using language ${this.usedLanguage}.`);
    },

    notificationReceived: function(notification) {

        // DOM ready
        if (notification === 'MODULE_DOM_CREATED') {

            // Initial events load
            this.loadEvents();
        }
    },

    socketNotificationReceived: function(notification, payload) {
        Log.info(`Received socket notification ${notification}.`);

        // Events loaded with node helper
        if (notification === 'EVENTS_LOADED') {

            // No data
            if (!payload.events) {
                Log.warn('No events available.');
                return;
            }

            // Set content
            this.title = payload.title;
            this.events = payload.events;

            // Update module
            Log.info('Update DOM with new title and events ...');
            this.updateDom(this.config.animationSpeed * 1000);
        }
    },

    loadEvents: function() {
        Log.info('Load events ...');

        // Load events in node helper
        this.sendSocketNotification('LOAD_EVENTS', this.usedLanguage);

        // Schedule next load
        this.scheduleRefresh();
    },

    scheduleRefresh: function() {
        setTimeout(() => {
            this.loadEvents();
        }, this.config.updateInterval * 1000)
    }
};

// Register module definition
Module.register('MMM-OnThisDay', moduleDefinition);

// Export module definition for tests
/* istanbul ignore else */
if (typeof module !== 'undefined') {
    module.exports = moduleDefinition;
}
