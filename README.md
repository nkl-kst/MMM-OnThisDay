# MMM-OnThisDay

![example workflow name](https://github.com/nkl-kst/MMM-OnThisDay/workflows/CI/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)

This is a module for the awesome [MagicMirror²](https://github.com/MichMich/MagicMirror/). It displays historical events 
from Wikipedia based on the current date.

![Screenshot](screenshot/module.png)

## Install the module

Go to modules folder
```
cd modules/
```

Clone this module from Github
```
git clone https://github.com/nkl-kst/MMM-OnThisDay
```

Switch to newly created module folder
```
cd MMM-OnThisDay/
```

Install dependencies
```
npm install --only=prod
```

After adding this module to your config (see below) restart your MagicMirror.

## Update the module

Go to modules folder

```
cd modules/MMM-OnThisDay
```

Pull changes from Github

```
git pull
```

Install new dependencies

```
npm install --only=prod
```

Since this repository ignores the automatically generated ``package-lock.json``, pulling changes should always work. If not, try to reset your module with ``git reset --hard`` before pulling new changes.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
let config = {
    modules: [
        {
            module: 'MMM-OnThisDay',
            position: "top_right", // All available positions
            config: {
                // See below for configurable options, this is optional
            }
        }
    ]
}
```

## Configuration options

All options are optional so the module works out of the box.

| Option                 | Description
|----------------------- |------------
| `animationSpeed`       | Duration of content refresh animation in seconds.<br><br>**Type:** `Number`<br>**Default:** `1`
| `updateInterval`       | Time between loading new events data in seconds.<br><br>**Type:** `Number`<br>**Default:** `3600` (1 hour)
| `maxWidth`             | Max width of the displayed events content.<br><br>**Type:** `String`<br>**Default:** `400px`
| `textSize`             | CSS class to set the text size, use MagicMirror core classes here<br><br>**Type:** `String`<br>**Default:** `xsmall`

## Language

The global configured language for MagicMirror is used by this module. English will be the fallback, if it doesn't 
support the used language.

Currently supported languages:
- Arabic
- English
- French
- German
- Russian

## Problems

If you have any problems or questions, feel free to open an issue. There are many possible improvements for this module so please let me know if you miss something.

## Developer notes

You can simply create a development environment for modifying this module with Vagrant and Virtualbox:

```
# Run Vagrant virtual machine
vagrant up

# Visit http://localhost within your browser
```

To run all unit tests just fire this command in the module folder

```
# Run tests
npm test
```

## License: MIT

See [LICENSE](LICENSE.txt)
