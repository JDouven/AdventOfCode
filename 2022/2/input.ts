import { readFile } from 'node:fs/promises';

export async function readInput() {
  return (await readFile('input.txt', 'utf-8'))
    .toString()
    .trim()
    .split('\n')
    .map((v) => v.split(' '));
}

export const SHAPES: Record<string, number> = {
  A: 1,
  X: 1,
  B: 2,
  Y: 2,
  C: 3,
  Z: 3,
};
