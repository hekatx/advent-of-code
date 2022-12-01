const fs = require("fs");

// read input
let input = fs.readFileSync("input.txt", "utf8");

// split list into arrays per elf
let calories_list = input
  .split(/\n\s*\n/)
  .map((x) => x.split(/\n/).reduce((p, c) => p + Number(c), 0));

// get max number of calories carried by one elf
const solution_1 = Math.max(...calories_list);

// get three max number of calories carried in the group
const solution_2 = calories_list
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((p, c) => p + c);

console.log(solution_1);
console.log(solution_2);
