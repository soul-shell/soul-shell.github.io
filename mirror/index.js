// https://github.com/kittykatattack/learningPixi#displaying

// Coordinates: (0, 0) is the top left corner

const resourceDefs = [
  { name: 'mirry_down_1', url: 'https://johnny-keker.github.io/random-web-game/res/mirry_down_1.png' }
]

let mirrySprite;

PIXI.loader.add(resourceDefs).load(() => {
  const app = new PIXI.Application({ width: 800, height: 600 });

  const resources = PIXI.loader.resources;
  mirrySprite = new PIXI.Sprite(resources['mirry_down_1'].texture);
  mirrySprite.position.set(96, 96);

  app.stage.addChild(mirrySprite);

  app.ticker.add(frame);

  app.renderer.view.style.display = 'block';
  document.body.appendChild(app.view);
});

const state = {
  vx: 0,
  vy: 0
};

function keyboard(key, pressed) {
  switch (key) {
    case 'ArrowUp':
      if (pressed)
        state.vx = 0;
      state.vy = pressed ? -2 : 0;
      break;
    case 'ArrowDown':
      if (pressed)
        state.vx = 0;
      state.vy = pressed ? 2 : 0;
      break;
    case 'ArrowLeft':
      if (pressed)
        state.vy = 0;
      state.vx = pressed ? -2 : 0;
      break;
    case 'ArrowRight':
      if (pressed)
        state.vy = 0;
      state.vx = pressed ? 2 : 0;
      break;
  }
}

document.addEventListener('keydown', (e) => keyboard(e.key, true), false);
document.addEventListener('keyup', (e) => keyboard(e.key, false), false);

function frame(delta) {
  mirrySprite.x += state.vx;
  mirrySprite.y += state.vy;
}
