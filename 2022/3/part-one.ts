import { readInput } from './input';

const a_code = 'a'.charCodeAt(0);
const A_code = 'A'.charCodeAt(0);

async function main() {
  const input = await readInput();
  const result = input
    .map((bag) => {
      const left = bag.substring(0, bag.length / 2);
      const right = bag.substring(bag.length / 2);

      const itemSet = new Set<string>();
      for (const item of left) {
        if (right.includes(item)) {
          itemSet.add(item);
        }
      }
      const [result] = [...itemSet];
      return result;
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

/*
[
  'Q', 'T', 'P', 'W', 'j', 'p', 'R',
  'g', 'M', 's', 'v', 'N', 'z', 'r',
  'd', 'w', 'D', 'f', 'Z', 'b', 'q',
  'l', 'F', 'B', 't', 'n', 'h', 'H',
  'S', 'V', 'G', 'J', 'L', 'c', 'C',
  'm'
]
*/

main();
