async function readInput() {
  const input = await Deno.readTextFile('input.txt')
  const lines = input.trim().split('\n')
  const a = []
  const b = []
  for (const line of lines) {
    const [x, y] = line.split(/\s+/)
    a.push(Number(x))
    b.push(Number(y))
  }
  a.sort()
  b.sort()
  return [a, b]
}

function calculateDistance(a: number, b: number) {
  if (a > b) {
    return a - b
  }
  return b - a
}

async function partOne() {
  console.log('Part one')
  const [a, b] = await readInput()

  if (a.length !== b.length) {
    console.log("Length of lists doesn't match")
    Deno.exit(1)
  }

  let distance = 0
  for (let i = 0; i < a.length; i++) {
    distance += calculateDistance(a[i], b[i])
  }
  console.log('Total distance: ', distance)
}

function countOccurences(value: number, arr: number[]) {
  return arr.filter((x) => x === value).length
}

async function partTwo() {
  console.log('Part two')
  const [a, b] = await readInput()

  let score = 0
  for (const n of a) {
    score += countOccurences(n, b) * n
  }

  console.log('Score: ', score)
}

if (import.meta.main) {
  await partOne()

  await partTwo()
}
