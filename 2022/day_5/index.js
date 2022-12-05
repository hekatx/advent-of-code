const fs = require("fs");

const CRATE_STR_LENGTH = 3;

// read input
let input = fs.readFileSync("input.txt", "utf8").split(/\n/);

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////

let [crate_stacks, instructions] = parse(input);

instructions.forEach(({ quantity, from_index, to_index }) => {
  const moved_crates = crate_stacks[from_index].splice(0, quantity).reverse();
  crate_stacks[to_index].unshift(...moved_crates);
});

const message = crate_stacks.reduce((message, stack) => {
  const stack_top_crate = stack[0];
  if (stack[0]) return message + stack_top_crate[1];
  return message;
}, "");

console.log(message);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////

let [crate_stacks_2, instructions_2] = parse(input);

instructions_2.forEach(({ quantity, from_index, to_index }) => {
  const moved_crates = crate_stacks_2[from_index].splice(0, quantity);
  crate_stacks[to_index].unshift(...moved_crates);
});

const message_2 = crate_stacks.reduce((message, stack) => {
  const stack_top_crate = stack[0];
  if (stack[0]) return message + stack_top_crate[1];
  return message;
}, "");

console.log(message_2);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Util functions to parse input
///////////////////////////////////////////////////////////////////////////////////////////////////

function make_stacks(input, number_of_stacks) {
  let stacks_list = [];
  for (let i = 0; i < number_of_stacks; i++) {
    stacks_list.push([]);
  }

  input.forEach((line) => {
    let crate_index = 0;
    stacks_list.forEach((stack) => {
      const crate = line
        .slice(crate_index, crate_index + CRATE_STR_LENGTH)
        .trim();
      if (crate !== "") stack.push(crate);
      crate_index += CRATE_STR_LENGTH + 1;
    });
  });

  return stacks_list;
}

function parse(input) {
  const separator_index = input.indexOf("");
  if (!separator_index) throw "Shits fucked:(";

  const crates = input.slice(0, separator_index);
  const crates_indexes_line = crates.pop().trim();
  const stacks = make_stacks(
    crates,
    crates_indexes_line[crates_indexes_line.length - 1]
  );

  const instructions = input
    .slice(separator_index + 1, input.length - 1)
    .map((line) => {
      const line_array = line.split(" ");
      return {
        quantity: Number(line_array[1]),
        from_index: line_array[3] - 1,
        to_index: line_array[5] - 1,
      };
    });

  return [stacks, instructions];
}
