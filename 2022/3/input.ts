import assert from 'node:assert';
import { readFile } from 'node:fs/promises';

export async function readInput() {
  const input = (await readFile('input.txt', 'utf-8'))
    .toString()
    .trim()
    .split('\n');

  for (let line of input) {
    assert.ok(line.length % 2 === 0);
  }

  return input;
}
