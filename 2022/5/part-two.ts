import { getInstructions, getStacks, Instruction, readInput } from './input';

async function main() {
  const [rawStacks, rawInstructions] = await readInput();

  const stacks = getStacks(rawStacks);
  const instructions = getInstructions(rawInstructions);

  for (let instruction of instructions) {
    executeInstruction(stacks, instruction);
  }

  const topCrates = stacks.map((stack) => stack[stack.length - 1]).join('');

  console.log(topCrates);
}

function executeInstruction(stacks: string[][], instruction: Instruction) {
  const { count, from, to } = instruction;
  const liftedCrates: string[] = [];
  for (let c = 0; c < count; c++) {
    let crate = stacks[from].pop();
    if (!crate) {
      throw Error('No crate on stack');
    }
    liftedCrates.push(crate);
  }
  liftedCrates.reverse();
  stacks[to].push(...liftedCrates);
}

main();
