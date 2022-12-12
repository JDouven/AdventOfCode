import { readInput } from './input';

async function main() {
  const input = await readInput();

  const sumsSorted = input
    .map((elf) => {
      return elf
        .split('\n')
        .map((item) => parseInt(item, 10))
        .reduce((sum, v) => sum + v, 0);
    })
    .sort((a, z) => z - a);

  const top3 = sumsSorted.slice(0, 3);
  const total = top3.reduce((sum, v) => sum + v, 0);
  console.log(total);
}
main();
