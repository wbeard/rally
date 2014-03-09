module.exports = Cells;

function Cells(/* Array */ numericArray) {
  //numericArray:
  //              Assumes a multi-dimensional array
  this.height = numericArray.length;
  this.width = numericArray[0].length;
  this.collection = _createCells(numericArray);
}; // Cells

function _createCells(/* Array */arr) {
  var outerArrayLength = arr.length,
      outerCounter = 0,
      returnArray = [];
  for(outerCounter; outerCounter < outerArrayLength; outerCounter++) {
    var innerArray = arr[outerCounter]
        innerArrayLength = innerArray.length,
        innerCounter = 0;
    for(innerCounter; innerCounter < innerArrayLength; innerCounter++) {
      returnArray.push(new Cell(innerArray[innerCounter], innerCounter, outerCounter));
    } // inner array
  }// outer array
  return returnArray;
}; // _createCells

Cells.prototype.find = function(/* number */ x, /* number */ y) {
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
  for(var child in this.collection) {
    if(this.collection.hasOwnProperty(child)) {
      this.collection[child].alive = this.collection[child].flipAlive
    } // if
  }// for
  return this;
} // Cells.flipBoard

Cells.prototype.predictFuture = function() {
  for(var child in this.collection) {
    if(this.collection.hasOwnProperty(child)) {
      this.collection[child].findNeighbors();
      this.collection[child].gameMyLife();
    }// if
  }// for
  return this;
} // Cells.predictFuture

Cells.prototype.print = function() {

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
} // Cells.print

function Cell(/*bool*/ alive, /*number*/ x, /*number*/ y) {
  this.neighbors = [];
  this.alive = alive;
  this.x = x;
  this.y = y;
} // Cell

function isAlive(/*bool*/ alive) {
  return alive;
} // isAlive

Cell.prototype.gameMyLife = function() {
  if(this.alive) {
    this.flipAlive = !(this.neighbors.filter(isAlive).length < 2 || this.neighbors.filter(isAlive).length > 3) || (this.neighbors.filter(isAlive).length >= 2 && this.neighbors.filter(isAlive).length <= 3);
  } else {
    this.flipAlive = this.neighbors.filter(isAlive).length === 3;
  }
} // Cell.gameMyLife

Cell.prototype.findNeighbors = function() {
  var x = this.x,
      y = this.y,
      topNeighbor = cells.find(x, y - 1),
      topRightNeighbor = cells.find(x + 1, y - 1),
      rightNeighbor = cells.find(x + 1, y),
      bottomRightNeighbor = cells.find(x + 1, y + 1),
      bottomNeighbor = cells.find(x, y + 1),
      bottomLeftNeighbor = cells.find(x - 1, y + 1),
      leftNeighbor = cells.find(x - 1, y),
      topLeftNeighbor = cells.find(x - 1, y - 1);

  if (topNeighbor)
    this.neighbors.push(topNeighbor.alive);
  if (topRightNeighbor)
    this.neighbors.push(topRightNeighbor.alive);
  if (rightNeighbor)
    this.neighbors.push(rightNeighbor.alive);
  if (bottomRightNeighbor)
    this.neighbors.push(bottomRightNeighbor.alive);
  if (bottomNeighbor)
    this.neighbors.push(bottomNeighbor.alive);
  if(bottomLeftNeighbor)
    this.neighbors.push(bottomLeftNeighbor.alive);
  if(leftNeighbor)
    this.neighbors.push(leftNeighbor.alive);
  if(topLeftNeighbor)
    this.neighbors.push(topLeftNeighbor.alive);
}; // Cell.findNeighbors