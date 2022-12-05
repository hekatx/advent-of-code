const fs = require("fs");

// read input
let input = fs
  .readFileSync("input.txt", "utf8")
  .split(/\n/)
  .filter((e) => e !== "");

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////

const response = input.reduce((count, current_pair) => {
  const [first_pair, second_pair] = current_pair.split(",");
  const [first_start, first_end] = first_pair.split("-");
  const [second_start, second_end] = second_pair.split("-");

  const whole_first_in_second =
    first_start >= second_start && first_end <= second_end;
  const whole_second_in_first =
    second_start >= first_start && second_end <= first_end;

  if (whole_first_in_second || whole_second_in_first) return count + 1;

  return count;
}, 0);

console.log(response);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////
