let p = console.log

let mand_col = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
let optional_col = ["cid"]

function main (data) {
  p(p1(data))
  p(p2(data))
}

function p1 (data) {
  let ret = 0
  for (let i=0; i<data.length; i++) {
    if (p1valid(data[i])) ret++
  }

  return ret
}

function p1valid(row) {
    for (let j=0; j<mand_col.length; j++) {
      let s = ` ${mand_col[j]}:`
      if (!row.includes(s)) {
        return false
      }
    }

  return true
}

function p2(data) {
  let ret = 0

  for (let i=0; i<data.length; i++) {
    if (!p1valid(data[i])) continue

    let cols = _parse(data[i])
  }

  return ret
}

// TODO
function p2valid(cols) {
  for (let j=0; j<cols.length; j++) {
    switch(cols[j][0]) {
      case "byr":
        let val = +cols[j][1]
        if (val <1920 || val > 2002) return false
        break;

    }
  }
  return true
}

function _parse(row) {
  return row.split(' ').map(c => {p(c); return c.match(/(.+):(.+)/)}).filter(x => x).map(m => { return [m[1], m[2]]})
}

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let data = []
let row = ""

rl.on('line', function (line) {
  if (line === "") {
    data.push(row)
    row = ""
    return
  }

  row += ` ${line}`
})

rl.on('close', () => {
  data.push(row)
  main(data)
})
