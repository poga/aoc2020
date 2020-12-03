let p = console.log

function main (data) {
  p(p1(data, 3, 1))
  p('--')
  p(p1(data, 1, 1))
  p(p1(data, 3, 1))
  p(p1(data, 5, 1))
  p(p1(data, 7, 1))
  p(p1(data, 1, 2))

  p(p1(data, 1, 1) * p1(data, 3, 1) * p1(data, 5, 1) * p1(data, 7, 1) * p1(data, 1, 2))
}

function p1 (data, right, down) {
  let c = 0
  let y = 0
  for (let x = down; x < data.length; x += down) {
    y = (y + right) % data[0].length
    if (data[x][y] === '#') c++
  }
  return c
}


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
