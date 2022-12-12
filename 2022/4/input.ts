import { readFile } from 'node:fs/promises';

export async function readInput() {
  const input = (await readFile('input.txt', 'utf-8'))
    .toString()
    .trim()
    .split('\n')
    .map((pair) => pair.split(','));

  return input;
}
