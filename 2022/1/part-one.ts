import { readInput } from './input';

async function main() {
  const input = await readInput();

  const sums = input.map((elf) => {
    return elf
      .split('\n')
      .map((item) => parseInt(item, 10))
      .reduce((sum, v) => sum + v, 0);
  });

  console.log(Math.max(...sums));
}
main();
