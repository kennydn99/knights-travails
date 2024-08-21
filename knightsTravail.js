class AdjacencyList {
  constructor() {
    this.list = {};
  }

  addSquare(square) {
    this.list[square] = getPossibleMoves(square);
  }

  getMove(square) {
    return this.list[square];
  }
}

const getPossibleMoves = (square) => {
  const [row, col] = square;
  const possibleMoves = [];
  const allMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  allMoves.forEach(([x, y]) => {
    const newRow = row + x;
    const newCol = col + y;

    if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7)
      possibleMoves.push([newRow, newCol]);
  });

  return possibleMoves;
};
console.log(getPossibleMoves([1, 2]));

const buildAdjacencyList = () => {
  const graph = new AdjacencyList();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      graph.addSquare([i, j]);
    }
  }
  return graph;
};

const boardGraph = buildAdjacencyList();
console.log(boardGraph);

const knightTravails = (start, end) => {
  const [start_row, start_col] = start;
  const [end_row, end_col] = end;

  let queue = [];
  queue.push([start_row, start_col]);

  // while (queue.length > 0) {
  const visitedSquare = queue.shift();
  console.log("Visitied: ", visitedSquare);
  const nextMoves = boardGraph.getMove(visitedSquare);
  nextMoves.forEach((move) => queue.push(move));

  console.log("queue", queue);
  // }
};

knightTravails([0, 0], [1, 2]);
