import get from "lodash/get";

export function initAnims(sprite, texture, fps) {
  Object.keys(sprite.states).forEach((state: any) => {
    if (sprite.states[state].directions) {
      Object.keys(sprite.states[state].directions).forEach((direction: any) => {
        addStateFrames(
          sprite,
          state,
          direction,
          sprite.states[state].directions[direction].frames,
          texture,
          fps
        );
      });
    } else {
      addStateFrames(
        sprite,
        state,
        null,
        sprite.states[state].frames,
        texture,
        fps
      );
    }
  });
}

export function initStates(sprite, texture) {
  const states = {};
  const textureFrames = get(
    sprite.scene,
    `textures.list.${texture}.frames`,
    {}
  );

  Object.keys(textureFrames).forEach((frameSetName) => {
    if (frameSetName === "__BASE") {
      return;
    }
    const stateMeta = frameSetName.split("/");
    states[stateMeta[0]] = states[stateMeta[0]] || {};
    if (stateMeta[1].includes(".png")) {
      states[stateMeta[0]].frames = states[stateMeta[0]].frames || [];
      states[stateMeta[0]].frames.push(
        parseInt(stateMeta[1].replace(".png", ""))
      );
    } else {
      states[stateMeta[0]].directions = states[stateMeta[0]].directions || {};
      states[stateMeta[0]].directions[stateMeta[1]] = states[stateMeta[0]]
        .directions[stateMeta[1]] || { frames: [] };
      states[stateMeta[0]].directions[stateMeta[1]].frames.push(
        parseInt(stateMeta[2].replace(".png", ""))
      );
    }
  });
  return states;
}

function addStateFrames(sprite, state, direction, frameSet, texture, fps) {
  let frames = sprite.anims.generateFrameNames(texture, {
    start: 1,
    end: frameSet.length,
    zeroPad: 2,
    prefix: `${state}/` + (direction ? `${direction}/` : ""),
    suffix: ".png",
  });

  sprite.scene.anims.create({
    key: state + (direction ? `/${direction}` : ""),
    frames,
    frameRate: fps,
    repeat: -1,
  });
}
