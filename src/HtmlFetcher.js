module.exports = class {
    async fetch(language) {
        // Wiki URL
        const uri = `https://${language}.wikipedia.org`;

        // Fetch and return content
        return (await fetch(uri)).text();
    }
};
