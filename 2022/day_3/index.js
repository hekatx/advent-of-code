const fs = require("fs");

// read input
let input = fs
  .readFileSync("input.txt", "utf8")
  .split(/\n/)
  .filter((e) => e !== "");

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////

// get score by shifting the charcodes
function calculatePriority(letter) {
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt(0) - 38;
  }
  return letter.charCodeAt(0) - 96;
}

// first part function
function getPriority(string) {
  // just proceed if string length is even
  if (string.length % 2 === 0) {
    // get second half of the string
    let second = Array.from(string).splice(string.length / 2);
    for (let i = 0; i < string.length; i++) {
      // if curr char exists on second half, calculate the score
      if (second.includes(string[i])) {
        return calculatePriority(string[i]);
      }
    }
  }

  return 0;
}

let result = input.reduce((p, c) => p + getPriority(c), 0);

console.log(result);

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////

let res = 0;

// label the loop so we can operate over it
outerLoop: for (let i = 2; i < input.length; i += 3) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i - 1].includes(input[i]) && input[i - 2].includes(input[i])) {
      res += calculatePriority(input[i]);
      // if a char is found in the three strings, skip to the next three strings
      continue outerLoop;
    }
  }
}

console.log(res);
