import { readFile } from 'node:fs/promises';

export async function readInput() {
  const input = (await readFile('input.txt', 'utf-8')).toString().split('\n\n');

  return input;
}

export const CRATE_SIZE = '[X]'.length;

export function getStacks(rawStacks: string): string[][] {
  const lines = rawStacks.split('\n');
  lines.pop();

  const stacks: string[][] = [];

  for (let line of lines) {
    for (let i = 0; i < line.length; i += CRATE_SIZE + 1) {
      const start = i;
      const end = start + CRATE_SIZE;
      const crate = line.substring(start, end);

      const stackIndex = i / (CRATE_SIZE + 1);
      if (!stacks[stackIndex]) {
        stacks[stackIndex] = Array<string>();
      }
      if (crate.trim()) {
        stacks[stackIndex].push(crate.substring(1, 2));
      }
    }
  }

  for (let stack of stacks) {
    stack.reverse();
  }

  return stacks;
}

export interface Instruction {
  count: number;
  from: number;
  to: number;
}

export function getInstructions(rawInstructions: string): Instruction[] {
  return rawInstructions
    .trim()
    .split('\n')
    .map((line) => {
      const result = /move (\d+) from (\d+) to (\d+)/.exec(line);
      if (!result) {
        throw Error('Regex has no results');
      }
      const [, count, from, to] = result;
      return {
        count: parseInt(count),
        from: parseInt(from) - 1,
        to: parseInt(to) - 1,
      };
    });
}
