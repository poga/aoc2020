let p = console.log

function main (data) {
  let preamble = 25
  let ret
  for (let i=preamble; i< data.length; i++) {
     ret = invalid(data, data[i], i-preamble, i)
    if (ret) {
      p(ret)
      break
    }
  }

  for (let i=0; i<data.length; i++) {
    for (let j=i+1; j<data.length; j++) {
      let sum = data.slice(i, j).reduce((sum,x) => sum + x, 0)
      if (sum === ret) {
        p(ret, sum, i, j, ...data.slice(i, j))
        let min = Math.min(...data.slice(i, j))
        let max = Math.max(...data.slice(i, j))
        p(min, max, min+max)
        break
      }

      if (sum > ret) break
    }
  }
}

function invalid (data, number, start_idx, end_idx) {
  for (let i=start_idx; i<end_idx; i++) {
    for (let j=start_idx; j<end_idx; j++) {
      if (i === j) continue


      if ( data[i] + data[j] === number) return null
    }
  }

  return number
}


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
