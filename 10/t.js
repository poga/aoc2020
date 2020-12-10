let p = console.log

function main (data) {
  p1(data)
  p(p2(data))
}

function p2(data) {
  data = data.sort((x, y) => x - y)
  // dp
  let dp = {} //
  dp[0] = 1 // first is always there
  let max = 0
  for (let i=0; i<data.length; i++) {
    let j = data[i]
    dp[j] = _get(dp, j-1) + _get(dp, j-2) + _get(dp, j-3)
    max = j
  }
  p(dp)

  return dp[max]
}

function _get(dp, i) {
  return dp[i] ? dp[i] : 0
}

function p1(data) {
  let dist = {}
  data = data.sort((x, y) => x - y)
  dist[1] = 1
  for (let i=1; i<data.length; i++) {
    let delta = data[i] - data[i-1]
    if (!dist[delta]) dist[delta] = 0
    dist[delta]++
  }
  dist[3]++
  p(dist)
  p(dist[3] * dist[1])
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
