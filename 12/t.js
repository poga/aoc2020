let p = console.log;

let data = [];

function main(data) {
  let ret = p1(data);
  p(ret);
  p(Math.abs(ret[0][0]) + Math.abs(ret[0][1]));
  ret = p2(data);
  p(ret);
  p(Math.abs(ret[0][0]) + Math.abs(ret[0][1]));
}

function p2(data) {
  let wp = [10, 1]; // relative to ship
  let pos = [0, 0]; // east 0, north 0
  let rad = null;
  data.forEach((x) => {
    switch (x[0]) {
      case "R":
        rad = (360 - x[1]) * (Math.PI / 180);
        wp = [
          Math.round(wp[0] * Math.cos(rad) - wp[1] * Math.sin(rad)),
          Math.round(wp[0] * Math.sin(rad) + wp[1] * Math.cos(rad)),
        ];
        break;
      case "L":
        rad = x[1] * (Math.PI / 180);
        wp = [
          Math.round(wp[0] * Math.cos(rad) - wp[1] * Math.sin(rad)),
          Math.round(wp[0] * Math.sin(rad) + wp[1] * Math.cos(rad)),
        ];
        break;
      case "N":
        wp = [wp[0], wp[1] + x[1]];
        break;
      case "E":
        wp = [wp[0] + x[1], wp[1]];
        break;
      case "W":
        wp = [wp[0] - x[1], wp[1]];
        break;
      case "S":
        wp = [wp[0], wp[1] - x[1]];
        break;
      case "F":
        let move = [wp[0] * x[1], wp[1] * x[1]];
        pos = [pos[0] + move[0], pos[1] + move[1]];
        break;
    }
  });

  return [pos, wp];
}

function p1(data) {
  let dir = [1, 0]; // direction in polar coord
  let pos = [0, 0]; // east 0, north 0
  data.forEach((x) => {
    switch (x[0]) {
      case "R":
        dir = [1, (dir[1] + (360 - x[1])) % 360];
        break;
      case "L":
        dir = [1, (dir[1] + x[1]) % 360];
        break;
      case "N":
        pos = [pos[0], pos[1] + x[1]];
        break;
      case "E":
        pos = [pos[0] + x[1], pos[1]];
        break;
      case "W":
        pos = [pos[0] - x[1], pos[1]];
        break;
      case "S":
        pos = [pos[0], pos[1] - x[1]];
        break;
      case "F":
        // polar to cartesian coord
        let move = [
          x[1] * dir[0] * Math.cos(dir[1] * (Math.PI / 180)),
          x[1] * dir[0] * Math.sin(dir[1] * (Math.PI / 180)),
        ];
        pos = [pos[0] + Math.round(move[0]), pos[1] + Math.round(move[1])];
        break;
    }
  });

  return [pos, dir];
}

let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
rl.on("line", function (line) {
  data.push([line[0], +line.slice(1)]);
});

rl.on("close", () => {
  main(data);
});
