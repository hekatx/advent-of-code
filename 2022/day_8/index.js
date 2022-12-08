const { dir } = require("console");
const fs = require("fs");

// read input
let tree_map = fs
  .readFileSync("input.txt", "utf8")
  .split(/\n/)
  .filter((e) => e !== "");

///////////////////////////////////////////////////////////////////////////////////////////////////
// First part
///////////////////////////////////////////////////////////////////////////////////////////////////

let columns = Array.from({ length: tree_map[0].length }, () => []);

tree_map.forEach((row) => {
  row.split("").forEach((char, j) => {
    columns[j].push(Number(char));
  });
});

let rows = Array.from({ length: tree_map.length }, () => []);

tree_map.forEach((row, i) => {
  row.split("").forEach((char) => {
    rows[i].push(Number(char));
  });
});

let visible_trees = [];

console.log(visible_trees);

for (let row_index = 1; row_index < tree_map.length - 1; row_index++) {
  for (
    let column_index = 1;
    column_index < tree_map[row_index].length - 1;
    column_index++
  ) {
    visible_trees.push(
      isTreeVisible(
        Number(tree_map[row_index][column_index]),
        row_index,
        column_index
      )
    );
  }
}

console.log(Math.max(...visible_trees));

///////////////////////////////////////////////////////////////////////////////////////////////////
// Second part
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// Util functions to parse input
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//

//isTreeVisible(5, 1, 2);

function isTreeVisible(tree, row, column) {
  let top = columns[column].slice(0, row).reverse();
  let bottom = columns[column].slice(row + 1);

  let left = rows[row].slice(0, column).reverse();
  let right = rows[row].slice(column + 1);

  let directions = [top, bottom, left, right];

  let scenic_score = directions
    .map((dir) => {
      let score = 0;
      for (let i = 0; i < dir.length; i++) {
        score++;
        if (dir[i] >= tree) {
          break;
        }
      }
      return score;
    })
    .reduce((p, c) => p * c, 1);
  //console.log({ scenic_score, directions });

  return scenic_score;
}
