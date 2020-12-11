let p = console.log

let data = []
let line_len = 0


function main (data) {
  p1(data)
  //p2(data)
}

function _get(dp, i) {
  return dp[i] ? dp[i] : 0
}

function p1(data) {
  pdata(data)
  p('---')
  let prev = data
  let n = next(prev, adj, 4)
  while (JSON.stringify(n) !== JSON.stringify(prev)) {
    prev = n
    n = next(prev, adj, 4)
  }
  pdata(n)
  occupied = 0
  for (let i=0; i<n.length; i++) {
    for (let j=0; j<n[i].length; j++) {
      if (n[i][j] === '#') occupied++
    }
  }
  p(occupied)
}

function p2(data) {
  pdata(data)
  p('---')
  let prev = data
  let n = next(prev, adj_los, 5)
  while (JSON.stringify(n) !== JSON.stringify(prev)) {
    prev = n
    n = next(prev, adj_los, 5)
  }
  pdata(n)
  occupied = 0
  for (let i=0; i<n.length; i++) {
    for (let j=0; j<n[i].length; j++) {
      if (n[i][j] === '#') occupied++
    }
  }
  p(occupied)
}

function adj(data, i, j) {
  return [data[i-1][j-1], data[i][j-1], data[i+1][j-1], data[i-1][j], data[i+1][j], data[i-1][j+1], data[i][j+1], data[i+1][j+1]]
}

function los(data, i, j,  i_off, j_off) {
  let i_n = i+i_off
  let j_n = j+j_off
  while (true) {
    if (!data[i_n] || !data[i_n][j_n]) return '.'
    let t = data[i_n][j_n]
    if (t === 'L' || t === '#') {
      return t
    }

    i_n += i_off
    j_n += j_off
  }
}

function adj_los(data, i, j) {
  let ret = [
    los(data, i, j, -1, -1),
    los(data, i, j, 0, -1),
    los(data, i, j, 1, -1),
    los(data, i, j, -1, 0),
    los(data, i, j, 1, 0),
    los(data, i, j, -1, 1),
    los(data, i, j, 0, 1),
    los(data, i, j, 1, 1)
  ]
  return ret
}

// remove padding
function pp(data) {
  let ret = []
  for (let i=1; i<data.length-1; i++) {
    ret.push(data[i].slice(1, data[i].length-1))
  }

  return ret
}

function pdata(data) {
  pp(data).forEach( r => p(r.join('')) )
}

function next(data, los_func, max_occupied_adj) {
  let next = []
  for (let i=0; i<data.length;i++) {
    let row = []
    for (let j=0; j<data[0].length; j++) {
      row.push(data[i][j])

    }
    next.push(row)
  }


  for (let i=1; i<data.length-1; i++) {
    for (let j=1; j<data[i].length; j++) {

      if (data[i][j]==='L') {
        let occupied = false
        los_func(data, i,j).forEach(n => {
          if (n ==='#') {
            occupied = true
          }
        })

        if (occupied) {
          next[i][j] = 'L'
        } else {
          next[i][j] = '#'
        }
      }

      if (data[i][j] === '#') {
        let occupied = 0
        los_func(data, i,j).forEach(n => {
          if (n ==='#') {
            occupied++
          }
        })

        if (occupied >= max_occupied_adj) {
          next[i][j] = 'L'
        } else {
          next[i][j] = '#'
        }
      }
    }
  }

  return next
}

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
rl.on('line', function (line) {
  // load data with padding
  if (line_len === 0) {
    line_len = line.length
    data.push('.'.repeat(line_len+2).split(''))
  }
  data.push(['.', ...line.split(''), '.'])
})

rl.on('close', () => {
  data.push('.'.repeat(line_len+2).split(''))
  main(data)
})
