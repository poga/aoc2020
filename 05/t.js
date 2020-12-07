let p = console.log

function main (data) {
  let max = 0
  parse(data).forEach(x => {max = Math.max(max, x[0] * 8 + x[1])})
  p(max)

  let s = []
  parse(data).forEach(x => {
    let id = x[0] * 8 + x[1]
    s[id] = id
  })
  p(JSON.stringify(s))
}

function parse (data) {
  return data.map(x => {
    let row = x.substring(0, 7)
    let col = x.substring(7, 10)

    let rowID = parseInt(row.replace(/B/g, '1').replace(/F/g, '0'), 2)
    let colID = parseInt(col.replace(/R/g, '1').replace(/L/g, '0'), 2)

    return [rowID, colID]
  })
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
