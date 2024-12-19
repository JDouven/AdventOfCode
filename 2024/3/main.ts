const instructionRegex = /mul\(\d+,\d+\)/gm
const digitRegex = /\d+/g

async function readInput(regex: RegExp) {
  const input = await Deno.readTextFile('input.txt')

  const instructions: string[] = []
  let result
  while ((result = regex.exec(input)) !== null) {
    instructions.push(result[0])
  }
  return instructions
}

function parseInstruction(instruction: string): [number, number] {
  const instructions: number[] = []
  let result
  while ((result = digitRegex.exec(instruction)) !== null) {
    instructions.push(Number(result[0]))
  }
  if (instructions.length !== 2) {
    throw new Error('Invalid instruction')
  }
  return [instructions[0], instructions[1]]
}

const advancedInstructionRegex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/gm

type AdvancedInstruction = string | boolean

function filterInstructions(instructions: AdvancedInstruction[]): string[] {
  const filteredInstructions: string[] = []
  let i = 0
  let enabled = true
  while (i < instructions.length) {
    const instruction = instructions[i]
    if (instruction === true) {
      enabled = true
    } else if (instruction === false) {
      enabled = false
    } else if (enabled) {
      filteredInstructions.push(instruction)
    }
    i++
  }
  return filteredInstructions
}

if (import.meta.main) {
  console.log('Part one')

  const instructions = await readInput(instructionRegex)
  const multiplication = instructions
    .map(parseInstruction)
    .map(([a, b]) => a * b)
    .reduce((acc, curr) => acc + curr, 0)
  console.log('Sum of all multiplications: ', multiplication)

  const advancedInstructions = await readInput(advancedInstructionRegex)
  const filteredInstructions = filterInstructions(
    advancedInstructions.map((i) => {
      if (i === 'do()') {
        return true
      } else if (i === "don't()") {
        return false
      }
      return i
    })
  )

  const advancedMultiplication = filteredInstructions
    .map(parseInstruction)
    .map(([a, b]) => a * b)
    .reduce((acc, curr) => acc + curr, 0)
  console.log('Sum of all advanced multiplications: ', advancedMultiplication)
}
