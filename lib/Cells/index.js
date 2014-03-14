var Cell = require("./Cell");

function Cells(/* Array */ numericArray) {
  'use strict';

  function _createCells(/* Array */arr) {
    var outerArrayLength = arr.length,
        outerCounter = 0,
        returnArray = [];

    for(outerCounter; outerCounter < outerArrayLength; outerCounter++) {
      var innerArray = arr[outerCounter],
          innerArrayLength = innerArray.length,
          innerCounter = 0;

      for(innerCounter; innerCounter < innerArrayLength; innerCounter++) {
        returnArray.push(new Cell(innerArray[innerCounter], innerCounter, outerCounter));
      } // inner array

    }// outer array

    return returnArray;
  } // _createCells

  //numericArray:
  //              Assumes a multi-dimensional array
  this.height = numericArray.length;
  this.width = numericArray[0].length;
  this.collection = _createCells(numericArray);
} // Cells

Cells.prototype.find = function(/* number */ x, /* number */ y) {
  'use strict';
  for(var child in this.collection) {
    if(this.collection.hasOwnProperty(child)) {
      var cell = this.collection[child];
      if (cell.x === x && cell.y === y) {
        return cell;
      } // if
    }// if
  }// for
};// Cells.find

Cells.prototype.flipBoard = function() {
  'use strict';
  for(var child in this.collection) {
    if(this.collection.hasOwnProperty(child)) {
      this.collection[child].alive = this.collection[child].flipAlive;
    } // if
  }// for
  return this;
}; // Cells.flipBoard

Cells.prototype.predictFuture = function() {
  'use strict';
  for(var child in this.collection) {
    if(this.collection.hasOwnProperty(child)) {
      this.findNeighbors(this.collection[child]);
      this.collection[child].gameMyLife();
    }// if
  }// for
  return this;
}; // Cells.predictFuture

Cells.prototype.print = function() {
  'use strict';
  this.predictFuture();
  this.flipBoard();

  var widthBound = this.width,
      heightBound = this.height,
      widthCounter = 0,
      heightCounter = 0,
      numString = "";

  for(heightCounter; heightCounter < heightBound; heightCounter++) {
    for(widthCounter; widthCounter < widthBound; widthCounter++) {
      numString += +this.find(widthCounter, heightCounter).alive + " ";
    }// for
    console.log(numString);
    numString = "";
    widthCounter = 0;
  }// for
}; // Cells.print

Cells.prototype.findNeighbors = function(cell) {
  var x = cell.x,
      y = cell.y,
      topNeighbor = this.find(x, y - 1),
      topRightNeighbor = this.find(x + 1, y - 1),
      rightNeighbor = this.find(x + 1, y),
      bottomRightNeighbor = this.find(x + 1, y + 1),
      bottomNeighbor = this.find(x, y + 1),
      bottomLeftNeighbor = this.find(x - 1, y + 1),
      leftNeighbor = this.find(x - 1, y),
      topLeftNeighbor = this.find(x - 1, y - 1);

    if (topNeighbor) {
      cell.neighbors.push(topNeighbor.alive);
    }
    if (topRightNeighbor) {
      cell.neighbors.push(topRightNeighbor.alive);
    }
    if (rightNeighbor) {
      cell.neighbors.push(rightNeighbor.alive);
    }
    if (bottomRightNeighbor) {
      cell.neighbors.push(bottomRightNeighbor.alive);
    }
    if (bottomNeighbor) {
      cell.neighbors.push(bottomNeighbor.alive);
    }
    if(bottomLeftNeighbor) {
      cell.neighbors.push(bottomLeftNeighbor.alive);
    }
    if(leftNeighbor) {
      cell.neighbors.push(leftNeighbor.alive);
    }
    if(topLeftNeighbor) {
      cell.neighbors.push(topLeftNeighbor.alive);
    }
};

module.exports = Cells;