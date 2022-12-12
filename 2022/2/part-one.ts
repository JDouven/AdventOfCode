import { readInput, SHAPES } from './input';

// win  = 6
// draw = 3
// lose = 0

// rock     = 1
// paper    = 2
// scissors = 3

async function main() {
  const input = await readInput();

  const rounds = input.map(([their_shape, my_shape]) => {
    const theirs = SHAPES[their_shape];
    const mine = SHAPES[my_shape];
    const diff = Math.abs(theirs - mine);

    if (theirs === mine) {
      return mine + 3;
    } else if ((diff === 1 && mine > theirs) || (mine === 1 && theirs === 3)) {
      return mine + 6;
    } else {
      return mine;
    }
  });

  console.log(rounds.reduce((a, v) => a + v, 0));
}

main();
