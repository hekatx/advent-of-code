const fs = require("fs");

// read input
let input = fs.readFileSync("input.txt", "utf8");

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////

const game = {
  [["A", "X"]]: 3,
  [["A", "Y"]]: 6,
  [["A", "Z"]]: 0,
  [["B", "X"]]: 0,
  [["B", "Y"]]: 3,
  [["B", "Z"]]: 6,
  [["C", "X"]]: 6,
  [["C", "Y"]]: 0,
  [["C", "Z"]]: 3,
};

const values = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

// split list into arrays per elf
let rounds_results = input
  .split(/\n/)
  // remove weird empty string
  .filter((e) => e !== "")
  .map((round) => {
    const inputs = round.split(" ");
    // first column is elfs input
    const elf_input = inputs[0];
    // second column is our input
    const my_input = inputs[1];
    return game[[elf_input, my_input]] + values[my_input];
  });

// get sum of points
console.log(rounds_results.reduce((p, c) => p + c, 0));

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////

const game_2 = {
  X: 0,
  Y: 3,
  Z: 6,
};

const values_2 = {
  [["A", "X"]]: 3,
  [["A", "Y"]]: 1,
  [["A", "Z"]]: 2,
  [["B", "X"]]: 1,
  [["B", "Y"]]: 2,
  [["B", "Z"]]: 3,
  [["C", "X"]]: 2,
  [["C", "Y"]]: 3,
  [["C", "Z"]]: 1,
};

// split list into arrays per elf
let games_2 = input
  .split(/\n/)
  .filter((e) => e !== "")
  .map((game) => {
    const inputs = game.split(" ");
    const elf_input = inputs[0];
    const my_input = inputs[1];
    return game_2[my_input] + values_2[[elf_input, my_input]];
  });

// get sum of points
console.log(games_2.reduce((p, c) => p + c, 0));
