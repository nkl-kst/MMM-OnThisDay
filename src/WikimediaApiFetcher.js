module.exports = class {
    async fetch(language) {
        // Build URI
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const uri = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`;

        // Fetch data
        const response = await fetch(uri);

        // Check response
        if (!response.ok) {
            return [];
        }

        const json = await response.json();
        const selectedEvents = json['selected'] || [];

        // Reverse order for backward compatibility
        return selectedEvents.reverse();
    }
};
