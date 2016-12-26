'use strict';

const squareDimensions = '23';

document.addEventListener('DOMContentLoaded', (event) => {
  // Generate the dynamic game grid and determine number of rows and columns
  createGrid();

  const maxRow = getMaxRow(); // Number of rows
  const maxCol = getMaxColumn(); // Number of columns

  // Starting position and velocity
  let currentUserSquare = '1_1'; // Starting square in the grid
  let velocity = [0, 0]; // Starting velocity

  // Arrow key movement
  document.addEventListener('keydown', (event) => {
    const arrowKeyCodes = [37, 38, 39, 40]; // Arrow keys
    const keyPressed = event.keyCode; // Key player pressed

    if (arrowKeyCodes.includes(keyPressed)) { // Velocity only resets for arrows
      velocity = [0, 0]; // Reset velocity so player can only go one direction
      switch(keyPressed) {
        case 37: // Left
          velocity[0] = -1;
          break;
        case 38: // Up
          velocity[1] = -1;
          break;
        case 39: // Right
          velocity[0] = 1;
          break;
        case 40: // Down
          velocity[1] = 1;
          break;
      }
    }
  });

  // Logic for the game loop
  const gameLoop = setInterval(() => {
    // Determine new positioning
    let position = currentUserSquare.split('_'); // Determine current position
    let newRow = parseInt(position[0]) + velocity[1]; // Change current row
    let newCol = parseInt(position[1]) + velocity[0]; // Change current column

    // Change the current player squares or end the game
    if (newRow < 0 || newRow > maxRow) { // Out of bounds
      clearInterval(gameLoop); // End game
    } else if (newCol < 0 || newCol > maxCol) { // Out of bounds
      clearInterval(gameLoop); // End Game
    } else {
      document.getElementById(currentUserSquare).className = 'col'; // Reset previous player square to be back to the normal color

      currentUserSquare = newRow + '_' + newCol; // Determine id of current position
      document.getElementById(currentUserSquare).className = 'col snake'; // Change the current square to be a player square
    }
  }, 50);

});

function getMaxRow() {
  // Determine the max row id possible
  const rows = document.getElementsByClassName('row');
  return rows.length - 1;
}

function getMaxColumn() {
  // Determine the max column id possible
  const row = document.getElementsByClassName('row')[0];
  const lastCol = row.children[row.children.length - 1];

  return parseInt(lastCol.id.split('_')[1]);
}

function createGrid() {
  // Generate the game grid
  let grid = document.getElementById('grid-container'); // Grab grid div

  // Determine the number of rows and columns that will fit on the grid
  const numCols = Math.floor(grid.offsetWidth / squareDimensions);
  grid.style.width = `${numCols * squareDimensions}px`;
  const numRows = Math.floor(grid.offsetHeight / squareDimensions);
  grid.style.height = `${numRows * squareDimensions}px`;

  // Add rows (which include columns) to the grid
  for (let i = 0; i < numRows; i++) {
    let row = createRow(numCols, i);
    grid.appendChild(row);
  }
}

function createRow(numCols, currentRow) {
  // Create a row div and append columns to it
  let newRow = document.createElement('div');

  newRow.className = 'row';
  newRow.style.height = `${squareDimensions}px`;

  createColumns(newRow, numCols, currentRow);

  return newRow;
}

function createColumns(row, numCols, currentRow) {
  // Create columns and append to the given row
  for (let i = 0; i < numCols; i++) {
    let newCol = document.createElement('div');

    newCol.className = 'col';
    newCol.id = `${currentRow}_${i}`;

    newCol.style.width = `${squareDimensions}px`;
    newCol.style.height = '100%';

    row.appendChild(newCol);
  }
}
