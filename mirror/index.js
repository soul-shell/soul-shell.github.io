// https://github.com/kittykatattack/learningPixi#displaying

// Coordinates: (0, 0) is the top left corner

const TARGET_FPS = 30;
const FPS_DELTA = 120 / TARGET_FPS; /* the ticker runs at 60 FPS */

const resources = PIXI.loader.resources;
const resourceDefs = [
  { name: 'bg', url: 'https://images.pexels.com/photos/1932264/pexels-photo-1932264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=900' },
  { name: 'bun-left-1', url: 'res/bun-left-1.png' },
  { name: 'bun-left-2', url: 'res/bun-left-2.png' },
  { name: 'bun-left-3', url: 'res/bun-left-3.png' }
]

let bun;
let bunSprites;

PIXI.loader.add(resourceDefs).load(() => {
  const app = new PIXI.Application({ width: 900, height: 600 });

  const bg = new PIXI.Sprite(resources['bg'].texture);

  bun = new PIXI.Sprite(resources['bun-left-1'].texture);
  bun.position.set(96, 96);

  app.stage.addChild(bg);
  app.stage.addChild(bun);

  app.ticker.add(frameTick);

  app.renderer.view.style.display = 'block';
  document.body.appendChild(app.view);

  document.addEventListener('keydown', (e) => keyboard(e.key, true), false);
  document.addEventListener('keyup', (e) => keyboard(e.key, false), false);
});

const state = {
  frameTick: 0,
  direction: 'left',
  vel: 0
};

function keyboard(key, pressed) {
  if (!key.startsWith('Arrow'))
    return;

  if (!pressed)
    state.vel = 0;
  else {
    state.vel = 4;
    switch (key) {
      case 'ArrowUp':
        state.direction = 'up';
        break;
      case 'ArrowDown':
        state.direction = 'down';
        break;
      case 'ArrowLeft':
        state.direction = 'left';
        break;
      case 'ArrowRight':
        state.direction = 'right';
        break;
    }
  }
}

/* https://www.pixiplayground.com/#/edit/oGvDC6wt~XQ_xBT6Ssb10 */
let elapsed = 0;
function frameTick(delta) {
  elapsed += delta;

  if (elapsed >= FPS_DELTA) {
    frame();
    elapsed = 0;
  }
}

function frame() {
  if (state.vel > 0) {
    state.frameTick += 1;
    if (state.frameTick === 1)
      bun.texture = resources['bun-left-1'].texture;
    else if (state.frameTick === 3)
      bun.texture = resources['bun-left-2'].texture;
    else if (state.frameTick === 6)
      bun.texture = resources['bun-left-3'].texture;
    else if (state.frameTick === 7)
      state.frameTick = 0;

    switch (state.direction) {
      case 'up':
        bun.y -= state.vel;
        break;
      case 'down':
        bun.y += state.vel;
        break;
      case 'left':
        bun.x -= state.vel;
        break;
      case 'right':
        bun.x += state.vel;
        break;
    }
  }
  else {
    bun.texture = resources['bun-left-1'].texture;
  }
}
