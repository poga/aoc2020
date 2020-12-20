let p = console.log;

let rules = [];
let my_ticket = null;
let tickets = [];

function main() {
  p(rules);
  p(my_ticket);
  p(tickets);
  p(p2());
}

function p2() {
  let valids = [];
  for (let i = 0; i < tickets.length; i++) {
    let ticket = tickets[i];
    let valid = false;
    ticket.forEach((val) => {
      rules.forEach((rule) => {
        rule.forEach((range) => {
          if (range[0] <= val && range[1] >= val) {
            valid = true;
          }
        });
      });
    });
    if (valid) valids.push(ticket);
  }

  p(valids);
  let result = [];
  for (let i = 0; i <= valids[0].length; i++) {
    let candidates = [];
    rules.forEach((rule) => {
      candidates.push(rule);
    });
    result[i] = candidates;
  }

  function allSolved(result) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].length > 1) return false;
    }
    return true;
  }

  while (!allSolved(result)) {
    for (let col = 0; col < valids[0].length; col++) {
      // skip fixed col
      if (fixed_rules[col]) continue;

      for (let r = 0; r < result[col].length; r++) {
        let rule = result[col][r];
        let matched = false;
        for (let i = 0; i < valids.length; i++) {
          let val = valids[i][col];
          p(rule, val);

          rule.forEach((range) => {
            if (val >= range[0] && val <= range[1]) {
              p("matched", val, rule);
              matched = true;
            }
          });

          if (matched) break;
        }
        if (matched) {
          matched_rule.push(rule);
          matched_rule_idx.push(r);
          break;
        }
      }
      p("possible for", col, matched_rule.length);
      if (matched_rule.length === 1) {
        p("fixed", col, matched_rule);
        fixed_rules[col] = matched_rule[0];
        possible_rules = possible_rules.splice(matched_rule_idx[0], 1);
        found = true;
        break;
      }
    }
    p(fixed_rules);
  }

  return result;
}

function p1() {
  let errors = 0;
  tickets.forEach((ticket) => {
    ticket.forEach((val) => {
      valid = false;
      rules.forEach((rule) => {
        rule.forEach((range) => {
          if (range[0] <= val && range[1] >= val) {
            valid = true;
          }
        });
      });

      if (!valid) {
        p(val);
        errors += val;
      }
    });
  });
  return errors;
}

let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let state = "rule";

rl.on("line", function (line) {
  if (line === "your ticket:") {
    state = "my_ticket";
    return;
  } else if (line === "nearby tickets:") {
    state = "tickets";
    return;
  } else if (line.includes(":")) {
    state = "rule";
  }

  if (!line) return;

  switch (state) {
    case "rule":
      p(line.split(":"));
      let range = line
        .split(":")[1]
        .split(" or ")
        .map((x) => x.split("-").map((x) => +x));
      let name = line.split(":")[0].trim();
      rules.push(
        range.map((r) => {
          return [...r, name];
        })
      );
      break;
    case "my_ticket":
      my_ticket = line.split(",").map((x) => +x);
      break;
    case "tickets":
      tickets.push(line.split(",").map((x) => +x));
      break;
  }
});

rl.on("close", () => {
  main();
});
