let p = console.log;

function main(ts, ids, p2_ids) {
  let ret = p1(
    ts,
    ids.sort((x, y) => x - y)
  );
  p(ret[0] * ret[1]);
  ret = p2(p2_ids);
  p(ret);
}

function p1(ts, ids) {
  let min_wait = null;
  let min_wait_id = null;
  ids.forEach((id) => {
    let wait = Math.ceil(ts / id) * id - ts;
    if (!min_wait) {
      min_wait = wait;
      min_wait_id = id;
    } else if (min_wait > wait) {
      min_wait = wait;
      min_wait_id = id;
    }
  });

  return [min_wait, min_wait_id];
}

function p2(ids) {
  let buses = ids
    .map((x, i) => [x, i])
    .filter((x) => x[0] !== "x")
    .map(([x, offset]) => [offset, x])
    .sort((x, y) => y[1] - x[1]);
  let step = buses[buses.length - 1][1];
  p(buses);

  let t = 0;
  while (true) {
    t += step;
    step = 1;
    let found = true;
    for (let i = 0; i < buses.length; i++) {
      let [offset, id] = buses[i];
      if ((t + offset) % id !== 0) {
        found = false;
        break;
      }
      //p("matched", t, "with busID", id, "at offset", offset, "=", t + offset);
      step = Math.max(step, step * id);
    }

    if (found) break;
  }

  return t;
}

let ts = null;
let ids = [];
let p2_ids = [];

let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
rl.on("line", function (line) {
  if (!ts) {
    ts = +line;
  } else {
    ids = line
      .split(",")
      .filter((x) => x !== "x")
      .map((x) => +x);
    p2_ids = line.split(",").map((x) => (x === "x" ? x : +x));
  }
});

rl.on("close", () => {
  main(ts, ids, p2_ids);
});
