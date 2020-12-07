let p = console.log

let regex = /(.+) bags contain (.+)/

let colors = {}

function main (data) {
  //p1(data)
  p2(data)
}

function p2 (data) {
  let graph = {}
  data.forEach(x => {
    if (x.includes("no")) {
      let color = x.match(/(.+) bags contain no other bags./)[1]
      graph[color] = []
    }
    else {
      let m = (x.match(regex))
      if (!graph[m[1]]) graph[m[1]] = []

      let rest = m[2].split(',').map(x => x.match(/(\d+) (.+) bag/))
      rest.forEach(r => {
        graph[m[1]].push([r[1], r[2]])
      })
    }
  })

  p(f(graph, 'shiny gold'))
}

function f (graph, color) {
  p(color, graph[color])
  return graph[color].reduce((sum, next_color_pair) => {
    let [count, next_color] = next_color_pair
    return sum + count * (f(graph, next_color) + 1)
  }, 0)
}

function p1 (data) {
  let graph = {}
  data.forEach(x => {
    if (x.includes("no")) p(x)
    else {
      let m = (x.match(regex))

      let rest = m[2].split(',').map(x => x.match(/(\d+) (.+) bag/))
      rest.forEach(r => {
        if (!graph[r[2]]) graph[r[2]] = new Set()
        colors[r[2]] = true
        graph[r[2]].add(m[1])
      })

      colors[m[1]] = true
      colors[rest[2]] = true
    }
  })

  let start = graph['shiny gold']
  let last = start.size
  do {
    let next = start
    start.forEach(x => {
      if (graph[x]) {
        graph[x].forEach(y => {
          next.add(y)
        })
      }
    })
    last = start
    start = next
  } while (start.size != last.size)
  p(start.size)
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
