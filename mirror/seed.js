'use strict';

const audioCtx = new AudioContext();
const track = audioCtx.createBufferSource();
let audioStartOffset;

async function init() {
  const soundReq = await fetch('/_sound/seed.mp3');
  const soundBuffer = await soundReq.arrayBuffer();

  track.buffer = await audioCtx.decodeAudioData(soundBuffer);
  track.connect(audioCtx.destination);
  track.start();

  audioStartOffset = audioCtx.currentTime;

  requestAnimationFrame(frame);
}

function frame(time) {
  const trackTime = audioCtx.currentTime - audioStartOffset;

  if (trackTime > 15) {
    track.stop();
    return;
  }
  else if (trackTime > 3.0) {
    const subsecs = Math.round(trackTime * 8);
    if (subsecs % 2 == 1)
      document.body.className = 'body-inverted';
    else
      document.body.className = '';
  }
  else if (trackTime > 2.1)
    document.body.className = 'body-black';

  requestAnimationFrame(frame);
}

init();

