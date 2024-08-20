const getPossibleMoves = (square) => {
  const [row, col] = square;
  const possibleMoves = [];

  if (row + 2 < 8) {
    if (col - 1 > -1) possibleMoves.push([row + 2, col - 1]);
    if (col + 1 < 8) possibleMoves.push([row + 2, col + 1]);

    console.log("up 2 rows");
  }

  if (row + 1 < 8) {
    if (col - 2 > -1) possibleMoves.push([row + 1, col - 2]);
    if (col + 2 < 8) possibleMoves.push([row + 1, col + 2]);
    console.log("up 1 rows");
  }

  if (row - 1 > -1) {
    if (col - 2 > -1) possibleMoves.push([row - 1, col - 2]);
    if (col + 2 < 8) possibleMoves.push([row - 1, col + 2]);
    console.log("down 1 rows");
  }

  if (row - 2 > -1) {
    if (col - 1 > -1) possibleMoves.push([row - 2, col - 1]);
    if (col + 1 < 8) possibleMoves.push([row - 2, col + 1]);
    console.log("down 2 rows");
  }

  return possibleMoves;
};
console.log(getPossibleMoves([7, 0]));
