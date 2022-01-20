/* Magic Mirror
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
        title: '#ereignisse > .hauptseite-box-title',
        events: '#ereignisse > .hauptseite-box-content > ul:first-of-type',
    },

    fr: {
        title: '.portail-droite > .accueil_2017_cadre:nth-child(2) .mw-headline',
        events: '.portail-droite > .accueil_2017_cadre:nth-child(2) > ul',
    },
    
    ar: {
        title: '.mp-itd > p',
        events: '.mp-itd > ul',
    },

    ru: {
        title: '#main-itd > .main-header.main-box-header',
        events: '#main-itd > ul',
    },
};

// Export module definition for node_helper
if (typeof module !== 'undefined') {
    module.exports = WIKI_CSS_SELECTORS;
}
