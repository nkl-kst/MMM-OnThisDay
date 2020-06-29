/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

/* global Module, Log */

Module.register('MMM-OnThisDay', {

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
     * Available languages, means that there is data to fetch for the node_helper at
     * https://${language}.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday
     */
    availableLanguages: ['en', 'de'],
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
        if (this.availableLanguages.includes(config.language)) {
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

            // Set title
            this.title = payload.title;

            // Unescape
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(payload.events, 'text/html');
            this.events = doc.documentElement.textContent;

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
        setTimeout(() => {
            this.loadEvents();
        }, this.config.updateInterval * 1000)
    },
});
