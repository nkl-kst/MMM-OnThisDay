/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const WIKI_CSS_SELECTORS = {
    en: {
        title: '#mp-otd > p',
        events: '#mp-otd > ul',
    },

    de: {
        title: '#ereignisse .hauptseite-box-title',
        events: '#ereignisse > .hauptseite-box-content > ul:first-of-type',
    },

    fr: {
        title: '.portail-droite > .accueil_2017_cadre:nth-child(2) .mw-heading',
        events: '.portail-droite > .accueil_2017_cadre:nth-child(2) > ul',
    },

    ar: {
        title: '.mp-itd > p',
        events: '.mp-itd > ul',
    },

    ru: {
        title: '#main-itd > .main-box-header > .main-header',
        events: '#main-itd > .main-box-content > ul',
    },
};

// Export module definition for node_helper
if (typeof module !== 'undefined') {
    module.exports = WIKI_CSS_SELECTORS;
}
