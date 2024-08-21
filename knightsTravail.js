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
console.log("[0, 0] possiblemoves -> ", getPossibleMoves([0, 0]));

console.log("[1, 2] possiblemoves -> ", getPossibleMoves([1, 2]));

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
// console.log(boardGraph);

// const knightTravails = (start, end) => {
//   const [start_row, start_col] = start;
//   const [end_row, end_col] = end;
//   let visited = [];
//   let queue = [];
//   queue.push([start_row, start_col]);

//   // while (queue.length > 0) {
//   const visitedSquare = queue.shift();
//   console.log("Visitied: ", visitedSquare);
//   visited.push(visitedSquare);
//   const [visited_row, visited_col] = visitedSquare;
//   const nextMoves = boardGraph.getMove(visitedSquare);
//   nextMoves.forEach((move) => {
//     const [next_row, next_col] = move;
//     if (next_row === end_row && next_col === end_col) {
//       console.log("found end: ", move);
//       return;
//     } else {
//       if (!visited.includes([next_row, next_col])) {
//         visited.push(move);
//         queue.push(move);
//       }
//     }
//   });

//   console.log("queue", queue);
//   // }
// };

// // knightTravails([0, 0], [1, 2]);

const knightTravails = (start, end) => {
  const graph = buildAdjacencyList();
  let parentMap = {};
  let visited = [start.toString()];
  let queue = [[start]];

  const [end_row, end_col] = end;

  while (queue.length > 0) {
    const path = queue.shift();
    const currentSquare = path[path.length - 1];

    const [curr_row, curr_col] = currentSquare;

    if (curr_row === end_row && curr_col === end_col) {
      console.log("found end: ", currentSquare);
      return buildPath(start, end, parentMap);
    }

    const nextMoves = graph.getMove(currentSquare);
    nextMoves.forEach((move) => {
      if (!visited.includes(move.toString())) {
        visited.push(move.toString());
        queue.push([...path, move]);
        parentMap[move.toString()] = currentSquare.toString();
      }
    });
  }
  return "No Path Found";
};

const buildPath = (start, end, parentMap) => {
  let path = [];

  while (end.toString() !== start.toString()) {
    path.push(end);
    end = parentMap[end.toString()];
  }
  path.push(start);
  return path.reverse();
};

console.log("Shortest Path", knightTravails([0, 0], [3, 4]));
