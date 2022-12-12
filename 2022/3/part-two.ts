import { readInput } from './input';

const a_code = 'a'.charCodeAt(0);
const A_code = 'A'.charCodeAt(0);

async function main() {
  const input = await readInput();
  const groups: string[][] = [];

  for (let i = 0; i < input.length; i = i + 3) {
    groups.push([input[i], input[i + 1], input[i + 2]]);
  }

  const result = groups
    .map((group) => {
      const first = group[0];
      const second = group[1];
      const third = group[2];
      return intersection(first, second, third);
    })
    .map((c) => {
      if (/[a-z]/.test(c)) {
        return c.charCodeAt(0) - a_code + 1;
      } else {
        return c.charCodeAt(0) - A_code + 27;
      }
    })
    .reduce((a, v) => a + v);

  console.log(result);
}

function intersection(...bags: string[]): string {
  const count: { [key: string]: number } = {};

  for (const bag of bags) {
    const unique = new Set(bag);
    for (const item of unique) {
      if (Object.keys(count).includes(item)) {
        count[item]++;
      } else {
        count[item] = 1;
      }
    }
  }
  return Object.entries(count)
    .filter(([_, amount]) => amount === bags.length)
    .map(([char]) => char)[0];
}

main();
