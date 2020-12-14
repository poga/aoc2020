let p = console.log;

function main (lines) {
  p1(lines)
  p2(lines)
}

function p1 (lines) {
  let masks = undefined
  let mem = {}

  for (line of lines) {
    if (line.startsWith("mask")) {
      mask_str = line.split('=')[1].trim()
      masks = getMasks(mask_str)
    } else {
      let m = line.match(/mem\[(\d+)\] = (\d+)/)
      let [loc, val] = [+m[1], +m[2]]
      val = BigInt(val)
      masks.forEach(m => {
        if (m[0] === 'and') {
          val = BigInt(val & m[1])
        } else if (m[0] === 'or') {
          val = BigInt(val | m[1])
        }
      })

      mem[loc] = val
    }
  }

  let sum = BigInt(0)
  for (let k in mem) {
    sum += mem[k]
  }
  p(sum)
}

function toBinaryArray (n) {
  let a = n.toString(2).split('')
  let pad = 36 - a.length
  return '0'.repeat(pad).split('').concat(a)
}

function p2 (lines) {
  let mem = {}

  let raw_mask = undefined
  for (line of lines) {
    if (line.startsWith("mask")) {
      mask_str = line.split('=')[1].trim()
      raw_mask = mask_str
    } else {
      let m = line.match(/mem\[(\d+)\] = (\d+)/)
      let [loc, val] = [+m[1], +m[2]]
      val = BigInt(val)

      let addrs = expand(raw_mask.split(''), toBinaryArray(loc))
      for (let addr of addrs) {
        mem[addr] = val
      }
    }
  }

  let sum = BigInt(0)
  for (let k in mem) {
    sum += mem[k]
  }
  p(sum)
}

function expand (mask, loc) {
  // fix 1s
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '1') loc[i] = '1'
  }

  let addrs = new Set([parseInt(loc.join(''), 2)])
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') {
      let next = new Set()
      for (let addr of addrs) {
        addr = toBinaryArray(addr)
        addr[i] = '0'
        next.add(parseInt(addr.join(''), 2))
        addr[i] = '1'
        next.add(parseInt(addr.join(''), 2))
      }
      addrs = union(addrs, next)
    }
  }

  return addrs
}

function union (setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.add(elem)
  }
  return _union
}


function getMasks (mask_str) {
  let masks = []
  for (let i = 0; i < mask_str.length; i++) {
    let c = mask_str.charAt(i)
    if (c === 'X') continue

    if (c === '0') {
      let t = 'and'
      let mask = "1".repeat(mask_str.length).split('')
      mask[i] = '0'
      masks.push([t, BigInt(parseInt(mask.join(''), 2))])
    } else if (c === '1') {
      let t = 'or'
      let mask = "0".repeat(mask_str.length).split('')
      mask[i] = '1'
      masks.push([t, BigInt(parseInt(mask.join(''), 2))])
    }
  }

  return masks
}

let lines = []

let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
rl.on("line", function (line) {
  lines.push(line)
});

rl.on("close", () => {
  main(lines);
});
