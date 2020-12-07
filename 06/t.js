let p = console.log

function main (data) {
  let s = {}
  let ret = 0
  let group_size = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      for (k in s) {
        if (s[k] === group_size) ret++
      }
      s = {}
      group_size = 0
      continue
    }

    group_size++
    data[i].split('').forEach(x => {
      if (!s[x]) s[x] = 0
      s[x]++
    })
  }

  for (k in s) {
    if (s[k] === group_size) ret++
  }

  p(ret)
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
