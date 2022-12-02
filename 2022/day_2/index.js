const fs = require("fs");

// read input
let input = fs.readFileSync("input.txt", "utf8");

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////
const win_condition = {
  A: "Z",
  B: "X",
  C: "Y",
  X: "C",
  Y: "A",
  Z: "B",
};

const draw_condition = {
  A: "X",
  B: "Y",
  C: "Z",
};

const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

function play_game(my_input, enemy_input) {
  // check if its draw
  if (draw_condition[enemy_input] === my_input) {
    return values[my_input] + 3;
  }

  // check if we lost
  if (win_condition[enemy_input] === my_input) {
    return values[my_input];
  }

  // if we didn't draw and didn't lost, we won
  return values[my_input] + 6;
}

// split list into arrays per elf
let games = input
  .split(/\n/)
  // remove weird empty string
  .filter((e) => e !== "")
  .map((game) => {
    const inputs = game.split(" ");
    // first column is elfs input
    const elf_input = inputs[0];
    // second column is our input
    const my_input = inputs[1];
    return play_game(my_input, elf_input);
  });

// get sum of points
console.log(games.reduce((p, c) => p + c, 0));

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////

// cases where we lose
const lose_condition = {
  A: "C",
  B: "A",
  C: "B",
};

// what we need to play to win
const win_condition_2 = {
  B: "C",
  A: "B",
  C: "A",
};

// values of each play
const values_2 = {
  A: 1,
  B: 2,
  C: 3,
};

function play_game_2(strategy, elf_input) {
  // strategy X means we need to lose
  if (strategy === "X") {
    return values_2[lose_condition[elf_input]];
  }

  // strategy Y means we need to draw so we'll play the same thing as the elf
  if (strategy === "Y") {
    return values_2[elf_input] + 3;
  }

  // Z means we need to win so we check what we need to play in order to win
  return values_2[win_condition_2[elf_input]] + 6;
}

// split list into arrays per elf
let games_2 = input
  .split(/\n/)
  .filter((e) => e !== "")
  .map((game) => {
    const inputs = game.split(" ");
    const elf_input = inputs[0];
    const my_input = inputs[1];
    return play_game_2(my_input, elf_input);
  });

// get sum of points
console.log(games_2.reduce((p, c) => p + c, 0));
