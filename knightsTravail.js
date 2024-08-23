// Adjaceency List to represent graph of all chess board moves by knight piece
class AdjacencyList {
  // Initialize with empty 'list' object
  constructor() {
    this.list = {};
  }
  // method to add possible moves for a given starting square to the 'list'
  addSquare(square) {
    this.list[square] = getPossibleMoves(square);
  }
  // return a given square/position's possible moves
  getMove(square) {
    return this.list[square];
  }
}

// Function to generate all valid moves given a square/position on the board
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

  // Generate all moves for the knight then filter if it is valid
  allMoves.forEach(([x, y]) => {
    const newRow = row + x;
    const newCol = col + y;

    if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7)
      possibleMoves.push([newRow, newCol]);
  });

  return possibleMoves;
};

// Method to create complete graph for all squares of chess board and their possible moves
const buildAdjacencyList = () => {
  const graph = new AdjacencyList();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      graph.addSquare([i, j]);
    }
  }
  return graph;
};

// Return shortest path a knight can traverse given a start and end position
const knightMoves = (start, end) => {
  // Initialize graph, parentMap, visited, queue
  const graph = buildAdjacencyList();
  let parentMap = {};
  // Visitied represents squares of the board that have been traversed
  let visited = [start];
  // queue is a list of paths
  let queue = [[start]];

  const [end_row, end_col] = end;

  while (queue.length > 0) {
    // Dequeue first path of queue
    const path = queue.shift();
    // Extract last square in the path
    const currentSquare = path[path.length - 1];

    const [curr_row, curr_col] = currentSquare;
    // Check if current sqaure is the same as end position
    if (curr_row === end_row && curr_col === end_col) {
      return buildPath(start, end, parentMap);
    }

    // Get possibleMoves of current square
    const nextMoves = graph.getMove(currentSquare);
    // For each possible move, check if it has not been visited (avoid cycles)
    nextMoves.forEach((move) => {
      if (!visited.some((v) => v[0] === move[0] && v[1] === move[1])) {
        // Add non visitied move to visited list
        visited.push(move);
        // Add copy of path followed by curent move to the queue
        queue.push([...path, move]);
        // Map the current move to its parent square (previous move)
        parentMap[move.toString()] = currentSquare;
      }
    });
  }
  return "No Path Found";
};

// Method to construct path taken from start to end
const buildPath = (start, end, parentMap) => {
  // initialize
  let path = [];
  // While end and start are not equal in value, add the end position to path
  // Then update end to be its parent or previous square
  while (end.toString() !== start.toString()) {
    path.push(end);
    end = parentMap[end.toString()];
  }
  // Add start to the path
  path.push(start);
  // Reverse order of path
  return path.reverse();
};

let output = knightMoves([0, 0], [7, 0]);
console.log("knightMoves([0, 0], [7, 0])");
console.log(`You made it in ${output.length} moves!  Here's your path:`);
output.forEach((step) => console.log(step));
