# MMM-OnThisDay

![example workflow name](https://github.com/nkl-kst/MMM-OnThisDay/workflows/CI/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)

This is a module for the awesome [MagicMirror²](https://github.com/MichMich/MagicMirror/). It displays historical events from Wikipedia based on the current date.

Default mode:  
![Default mode](screenshot/default.png)

Carousel mode with optional progress bar:  
![Carousel mode](screenshot/carousel.png)

## Install the module

Go to modules folder

```sh
cd modules
```

Clone this module from Github

```sh
git clone https://github.com/nkl-kst/MMM-OnThisDay
```

Switch to newly created module folder

```sh
cd MMM-OnThisDay
```

Install dependencies

```sh
npm install --only=prod
```

After adding this module to your config (see below) restart your MagicMirror.

## Update the module

Go to modules folder

```sh
cd modules/MMM-OnThisDay
```

Pull changes from Github

```sh
git pull
```

Install new dependencies

```sh
npm install --only=prod
```

Since this repository ignores the automatically generated `package-lock.json`, pulling changes should always work. If not, try to reset your module with `git reset --hard` before pulling new changes.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
let config = {
    modules: [
        {
            module: 'MMM-OnThisDay',
            position: 'top_right', // All available positions
            config: {
                // See below for configurable options, this is optional
            },
        },
    ],
};
```

## Configuration options

All options are optional so the module works out of the box.

| Option                       | Description                                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `language`                   | Events language. If the language is set to `null` (default), the global Mirror language ist used. See [Language](#language).<br><br>**Type:** `String`<br>**Default:** `null` |
| `animationSpeed`             | Duration of content refresh animation in seconds.<br><br>**Type:** `Number`<br>**Default:** `1`                                                                               |
| `updateInterval`             | Time between loading new events data in seconds.<br><br>**Type:** `Number`<br>**Default:** `3600` (1 hour)                                                                    |
| `carousel`                   | Show events in carousel mode (one event at a time).<br><br>**Type:** `Boolean`<br>**Default:** `false`                                                                        |
| `carouselInterval`           | Time between events in carousel mode in seconds. Use `auto` for word count based intervals.<br><br>**Type:** `Number` or `String`<br>**Default:** `30` (30 seconds)           |
| `carouselIntervalWordFactor` | Used to calculate the event display duration when using `carouselInterval: 'auto'`.<br><br>**Type:** `Number`<br>**Default:** `1` (1 second                                   |
| `carouselProgress`           | Display a progress indicator for carousel intervals.<br><br>**Type:** `Boolean`<br>**Default:** `false`                                                                       |
| `maxEvents`                  | Display up to the given number of events if supported.<br><br>**Type:** `Number`<br>**Default:** `null`                                                                       |
| `reverseOrder`               | Display events in reversed order if supported.<br><br>**Type:** `Boolean`<br>**Default:** `false`                                                                             |
| `maxWidth`                   | Max width of the displayed events content.<br><br>**Type:** `String`<br>**Default:** `400px`                                                                                  |
| `textSize`                   | CSS class to set the text size, use MagicMirror core classes here<br><br>**Type:** `String`<br>**Default:** `xsmall`                                                          |

## Language

The global configured language of your MagicMirror is used by default in this module. Use the `language` config option to
change it. See the Wikimedia Feed API reference for [supported languages](https://api.wikimedia.org/wiki/Feed_API/Language_support#Daily_featured_article).

## Styling

MM wraps the module content in a `div` with the module name as a CSS class, e.g. `<div class="MMM-OnThisDay"> ... </div>`. So you could just add something like this to your `css/custom.css`:

```css
.MMM-OnThisDay {
    background: rgba(0, 0, 0, 0.35);
}
```

## Problems

If you have any problems or questions, feel free to open an issue. There are many possible improvements for this module so please let me know if you miss something.

## Developer notes

To run all unit tests just fire this command in the module folder

```sh
# Run tests
npm test
```

## License: MIT

See [LICENSE](LICENSE.txt)
