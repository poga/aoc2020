let p = console.log;

function main(input) {
  p(p1(input, 2020));
  p(p1(input, 30000000));
}

function p1(input, target) {
  let mem = new Array(target);
  let turn = 1;
  let last = null;

  input.forEach((x) => {
    mem[x] = turn;
    last = x;
    turn++;
  });

  last = 0;
  turn++;

  for (let i = turn; i <= target; i++) {
    if (i % 1000 === 0) p(i);
    let next = null;
    if (!mem[last]) {
      next = 0;
    } else {
      next = i - 1 - mem[last];
    }
    mem[last] = i - 1;
    last = next;
  }

  return last;
}

let input = [];

let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  input = line.split(",").map((x) => +x);
});

rl.on("close", () => {
  main(input);
});
