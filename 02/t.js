let p = console.log

function main (data) {
  let a = 0
  data.map(p1).forEach(x => {if (x) a++})
  console.log(a)
  let b = 0
  data.map(p2).forEach(x => {if (x) b++})
  console.log(b)
}

function p1 (line) {
  let m = line.match(/(\d+)-(\d+) (.): (.+)/)
  let min = +m[1]
  let max = +m[2]
  let c = m[3]
  let pw = m[4]
  let a = 0
  for (let i = 0; i < pw.length; i++) {
    if (pw.charAt(i) === c) a++
  }

  if (a >= min && a <= max) return true
  return false
}

function p2 (line) {
  let m = line.match(/(\d+)-(\d+) (.): (.+)/)
  let pos1 = +m[1] - 1
  let pos2 = +m[2] - 1
  let c = m[3]
  let pw = m[4]

  return ((pw.charAt(pos1) === c) !== (pw.charAt(pos2) === c))
}

// plumbing
//
let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let data = []

rl.on('line', function (line) {
  data.push(line)
})

rl.on('close', () => {
  main(data)
})
