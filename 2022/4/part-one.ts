import { readInput } from './input';

type Range = [number, number];

async function main() {
  const input = await readInput();
  const result = input
    .map((pair) =>
      pair.map(
        (assignment) => assignment.split('-').map((x) => parseInt(x)) as Range
      )
    )
    .map(([first, second]) => rangeInside(first, second))
    .filter((isInside) => isInside).length;
  console.log(result);
}

function rangeInside(first: Range, second: Range): boolean {
  return (
    (first[0] <= second[0] && first[1] >= second[1]) ||
    (second[0] <= first[0] && second[1] >= first[1])
  );
}
main();
