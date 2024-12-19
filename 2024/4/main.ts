import { bold, red, strikethrough } from '@std/fmt/colors'

async function readInput() {
  const input = await Deno.readTextFile('input.txt')
  const lines = input.trim().split('\n')
  return lines.map((line) => line.split(''))
}

interface Point {
  x: number
  y: number
}

function findCharacter(symbol: string, map: string[][]) {
  const coordinates: Point[] = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === symbol) {
        coordinates.push({ x, y })
      }
    }
  }
  return coordinates
}

type Direction = Point
const directions = [
  { x: 0, y: -1 }, // up
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
  { x: 1, y: 0 }, // right
  { x: -1, y: -1 }, // up-left
  { x: 1, y: -1 }, // up-right
  { x: -1, y: 1 }, // down-left
  { x: 1, y: 1 }, // down-right
] satisfies Direction[]

function formatCoordinates(
  char: string,
  point: Point,
  coordinates: Direction[]
) {
  if (coordinates.some(({ x, y }) => x === point.x && y === point.y)) {
    return strikethrough(red(char))
  }
  return char
}

function calculateOffsets(n: number, direction: number) {
  if (direction === 0) {
    return [n - 2, n + 2]
  } else {
    if (direction > 0) {
      return [n - 2, n + 5]
    } else {
      return [n - 5, n + 2]
    }
  }
}

function printXMAS({ x, y }: Point, direction: Direction, map: string[][]) {
  const [leftX, rightX] = calculateOffsets(x, direction.x)
  const [leftY, rightY] = calculateOffsets(y, direction.y)
  const mapSubsection = map
    .map((row, y) => row.map((c, x) => ({ c, x, y })))
    .slice(Math.max(leftY, 0), rightY < map.length ? rightY + 1 : undefined)
    .map((row) =>
      row.slice(Math.max(leftX, 0), row.length ? rightX + 1 : undefined)
    )

  const xmasCoords = [
    {
      x,
      y,
    },
    {
      x: x + direction.x,
      y: y + direction.y,
    },
    {
      x: x + direction.x * 2,
      y: y + direction.y * 2,
    },
    {
      x: x + direction.x * 3,
      y: y + direction.y * 3,
    },
  ]
  const result = mapSubsection
    .map((row) =>
      row
        .map(({ c, x, y }) => formatCoordinates(c, { x, y }, xmasCoords))
        .join(' ')
    )
    .join(' \n')
  console.log(result)
}

function formatDirection(direction: Direction) {
  if (direction.x === 0 && direction.y === -1) {
    return '⬆️'
  }
  if (direction.x === 0 && direction.y === 1) {
    return '⬇️'
  }
  if (direction.x === -1 && direction.y === 0) {
    return '⬅️'
  }
  if (direction.x === 1 && direction.y === 0) {
    return '➡️'
  }
  if (direction.x === -1 && direction.y === -1) {
    return '↖️'
  }
  if (direction.x === 1 && direction.y === -1) {
    return '↗️'
  }
  if (direction.x === -1 && direction.y === 1) {
    return '↙️'
  }
  if (direction.x === 1 && direction.y === 1) {
    return '↘️'
  }
  return '❓'
}

const charsToCheck = ['M', 'A', 'S'] as const

function checkForXmasFromPoint(point: Point, map: string[][]) {
  let count = 0
  for (const direction of directions) {
    let { x, y } = point
    for (const char of charsToCheck) {
      x += direction.x
      y += direction.y
      if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
        break
      }
      if (map[y][x] === char) {
        if (char === 'S') {
          console.log(bold('Direction: '), formatDirection(direction))
          printXMAS(
            { x: x - direction.x * 3, y: y - direction.y * 3 },
            direction,
            map
          )
          count++
          break
        }
      } else {
        break
      }
    }
  }
  return count
}

const relativeChecks = [
  {
    x: -1,
    y: -1,
  },
  {
    x: 1,
    y: -1,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: -1,
    y: 1,
  },
]

const orientations = [
  ['M', 'M', 'S', 'S'],
  ['S', 'M', 'M', 'S'],
  ['S', 'S', 'M', 'M'],
  ['M', 'S', 'S', 'M'],
] as const

function checkForMasInXFromPoint(point: Point, map: string[][]): boolean {
  if (point.x === 35 && point.y === 55) {
    console.log(
      map
        .slice(point.y - 1, point.y + 2)
        .map((row) => row.slice(point.x - 1, point.x + 2).join(''))
        .join('\n')
    )
  }
  orientationLoop: for (const orientation of orientations) {
    let count = 0
    for (let i = 0; i < relativeChecks.length; i++) {
      const { x, y } = relativeChecks[i]
      const newX = point.x + x
      const newY = point.y + y
      if (newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length) {
        break orientationLoop
      }
      if (map[newY][newX] === orientation[i]) {
        count++
      } else {
        break
      }
    }
    if (count === 4) {
      console.log('Found MAS at', point)
      return true
    }
  }
  return false
}

function isEdge(point: Point, map: string[][]) {
  return (
    point.x === 0 ||
    point.y === 0 ||
    point.x === map[0].length - 1 ||
    point.y === map.length - 1
  )
}

if (import.meta.main) {
  console.log('Part one')

  const input = await readInput()
  // let count = 0
  // const allXCharacters = findCharacter('X', input)
  // for (const point of allXCharacters) {
  //   count += checkForXmasFromPoint(point, input)
  // }
  // console.log(`Found "XMAS" ${count} times`)

  console.log('Part two')
  const allACharacters = findCharacter('A', input)
  const masPoints = allACharacters
    .filter((point) => !isEdge(point, input))
    .filter((point) => checkForMasInXFromPoint(point, input)).length
  console.log(`Found "X-MAS" ${masPoints} times`)
}
