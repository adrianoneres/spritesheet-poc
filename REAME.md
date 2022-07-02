# Spritesheet Proof of Concept

A demonstration of a dynamically generated spritesheet for a [PixiJS](https://www.npmjs.com/package/sharp) application.

## Build spritesheet

First, you need to generate the spritesheet by running the `build.js` script.

```shell
npm install
node ./src/build.js
```

Then, load the `index.html` file in your browser. If you are using Visual Studio Code I suggest [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## How it works

1. Generate a spritesheet and related atlas from the assets in `src/assets` using [spritesheet-js](https://www.npmjs.com/package/spritesheet-js).
2. Sharp the generated spritesheet using [sharp](https://www.npmjs.com/package/sharp), converting it to the `webp` format.
3. Edit the generated atlas to set the `webp` extension in the asset metadata. It also minifies the Atlas JSON file.
4. Load the spritesheet to PixiJS.

All the awesome images used here were kindly borrowed from [Bramble](https://www.bramble.live) and are used in its forest-themed spaces.
