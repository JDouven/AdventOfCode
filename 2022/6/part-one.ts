import { readInput } from './input';

async function main() {
  const input = await readInput();

  const lastChars = Array<string>();

  for (let i = 0; i < input.length; i++) {
    if (lastChars.length < 3) {
      lastChars.unshift(input[i]);
    } else if (lastChars.length === 3) {
      if (areUnique(...lastChars, input[i])) {
        const temp = [...lastChars].reverse();
        console.log('Last 4 chars:', temp.join('') + input[i]);

        console.log('Answer:', i + 1);
        return;
      } else {
        lastChars.pop();
        lastChars.unshift(input[i]);
      }
    }
  }
}

main();

function areUnique(...chars: string[]): boolean {
  return chars.every(
    (char, _, arr) => arr.filter((val) => val === char).length === 1
  );
}
