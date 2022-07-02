const fs = require('fs');
const path = require('path');
const spritesheet = require('spritesheet-js');
const sharp = require('sharp');

const config = {
  spritesheet: {
    assets: 'src/assets/*.png',
    atlas: path.resolve(__dirname, 'spritesheets', 'spritesheet.json'),
    options: {
      name: 'spritesheet',
      path: 'src/spritesheets',
      format: 'json',
    },
  },
  sharp: {
    quality: 100,
    dropOriginal: true,
    origin: path.resolve(__dirname, 'spritesheets', 'spritesheet.png'),
    destination: path.resolve(__dirname, 'spritesheets', 'spritesheet.webp'),
  },
};

function generateSpritesheet() {
  const timer = 'Create spritesheet';
  console.time(timer);

  return new Promise((resolve, reject) => {
    spritesheet(
      config.spritesheet.assets,
      config.spritesheet.options,
      error => {
        if (error) reject();

        console.timeEnd(timer);
        resolve();
      }
    );
  });
}

async function sharpSpritesheet() {
  const timer = 'Sharp spritesheet';
  console.time(timer);

  await sharp(config.sharp.origin)
    .webp({ quality: config.sharp.quality })
    .toFile(config.sharp.destination);

  if (config.sharp.dropOriginal) {
    fs.unlink(config.sharp.origin, () =>
      console.log('The original spritesheet was removed.')
    );
  }

  console.timeEnd(timer);
}

async function updateAtlas() {
  const timer = 'Update atlas';
  console.time(timer);

  const file = require(config.spritesheet.atlas);
  file.meta.image = `${config.spritesheet.options.name}.webp`;
  const data = JSON.stringify(file, null, 0);

  fs.writeFileSync(config.spritesheet.atlas, data);

  console.timeEnd(timer);
}

(async () => {
  try {
    await generateSpritesheet();
    await sharpSpritesheet();
    await updateAtlas();
  } catch (error) {
    console.error(error);
  }
})();
