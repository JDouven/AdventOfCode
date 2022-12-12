import { readInput } from './input';

type Range = [number, number];

async function main() {
  const input = await readInput();

  const result = input.map((pair) =>
    pair.map((assignment) =>
      getRange(assignment.split('-').map((x) => parseInt(x)) as Range)
    )
  );
  console.log(
    result
      .map(([first, second]) => overlapping(first, second))
      .filter((overlapping) => overlapping).length
  );
}

function overlapping(first: number[], second: number[]): boolean {
  return first.some((x) => second.includes(x));
}

function getRange(range: Range): number[] {
  const array = Array<number>();
  for (let i = range[0]; i <= range[1]; i++) {
    array.push(i);
  }

  return array;
}

main();
