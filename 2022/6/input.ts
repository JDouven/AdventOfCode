import { readFile } from 'node:fs/promises';

export async function readInput() {
  return (await readFile('input.txt', 'utf-8')).toString().trim();
}
