const atlas = './src/spritesheets/spritesheet.json';

let app = new PIXI.Application({
  width: 1600,
  height: 940,
});

const loader = new PIXI.Loader();
// add the atlas to the loader:
loader.add(atlas);

loader.load((_, resources) => {
  // get the loaded resources from the atlas:
  const sheet = resources[atlas];

  // create a new Sprite for each asset in the atlas and add to the stage:
  Object.entries(sheet.textures).forEach(([_, value]) => {
    const sprite = new PIXI.Sprite(value);
    app.stage.addChild(sprite);
  });
});

document.body.appendChild(app.view);
