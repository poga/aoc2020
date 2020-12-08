let p = console.log


function main (data) {
  data = data.map(x => x.split(' '))
  //p(run(data, 0))
  p(run2(data, 0, 0, {}, null))
}

function run (program, counter) {
  let acc = 0
  let dirty = {}
  for (let i = counter; i < program.length; i++) {
    if (dirty[i]) break

    let [op, arg] = program[i]
    arg = parseInt(arg, 10)
    dirty[i] = true
    switch (op) {
      case "acc":
        acc += arg
        break
      case "nop":
        break
      case "jmp":
        i += arg - 1
    }
  }

  return acc
}

function run2 (program, start_counter, acc, dirty, corrupted) {
  let dirty_break = false
  for (let i = start_counter; i < program.length; i++) {
    if (dirty[i]) {
      dirty_break = true
      break
    }

    let j = i // cache original pos

    let [op, arg] = program[i]
    arg = parseInt(arg, 10)
    switch (op) {
      case "acc":
        acc += arg
        break
      case "nop":
        if (corrupted === i) {
          i += arg - 1
          break
        }
        if (!corrupted) {
          run2(program, i, acc, Object.assign({}, dirty), i)
        }
        break
      case "jmp":
        if (corrupted === i) {
          break
        }
        if (!corrupted) {
          run2(program, i, acc, Object.assign({}, dirty), i)
        }
        i += arg - 1
    }
    dirty[j] = true
  }

  if (!dirty_break) p(acc)

  return dirty_break
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
