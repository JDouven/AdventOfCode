import { readInput } from './input';

enum Shape {
  'ROCK' = 1,
  'PAPER',
  'SCISSORS',
}
const shapeMap: Record<string, Shape> = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
};
enum Result {
  'LOSE' = 0,
  'DRAW' = 3,
  'WIN' = 6,
}
const resultMap: Record<string, Result> = {
  X: Result.LOSE,
  Y: Result.DRAW,
  Z: Result.WIN,
};

function getDesiredShape(theirMove: Shape, desiredResult: Result): Shape {
  switch (desiredResult) {
    case Result.LOSE:
      return getLosingShape(theirMove);
    case Result.DRAW:
      return theirMove;
    case Result.WIN:
      return getWinningShape(theirMove);
  }
}

function getWinningShape(otherMove: Shape): Shape {
  switch (otherMove) {
    case Shape.ROCK:
      return Shape.PAPER;
    case Shape.PAPER:
      return Shape.SCISSORS;
    case Shape.SCISSORS:
      return Shape.ROCK;
  }
}

function getLosingShape(otherMove: Shape): Shape {
  switch (otherMove) {
    case Shape.ROCK:
      return Shape.SCISSORS;
    case Shape.PAPER:
      return Shape.ROCK;
    case Shape.SCISSORS:
      return Shape.PAPER;
  }
}

async function main() {
  const input = await readInput();

  const result = input
    .map(([their_shape, result]) => ({
      theirMove: shapeMap[their_shape],
      result: resultMap[result],
    }))
    .map(({ theirMove, result }) => ({
      myMove: getDesiredShape(theirMove, result),
      result,
    }))
    .reduce((a, v) => a + v.myMove + v.result, 0);

  console.log(result);
}
main();
