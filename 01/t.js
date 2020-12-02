let p = console.log

function main (data) {
  data.sort()
  p(p1(data, null, 2020))
  p(p2(data, 2020))
}

function p1 (data, skip, goal) {
  let range_start = 0
  let range_end = data.length - 1

  while (true) {
    if (skip === range_start) {
      range_start++
      continue
    }
    if (skip === range_end) {
      range_end--
      continue
    }

    if (range_start > data.length - 1) break
    if (range_end < 0) break

    let x = data[range_start]
    let y = data[range_end]

    if (x + y === goal) {
      p(x, y, x * y)
      return x * y
    }

    if (x + y < goal) {
      range_start++
    } else if (x + y > goal) {
      range_end--
    }

    if (range_start === range_end) break
  }
}

function p2 (data, goal) {
  let i = 0

  while (i <= data.length) {
    let ret = p1(data, i, goal - data[i])
    if (ret) {
      return ret * data[i]
    }
    i++
  }
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
  data.push(+line)
})

rl.on('close', () => {
  main(data)
})
