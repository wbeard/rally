module.exports = Cells;

function Cells(/* Array */ numericArray) {
  //numericArray:
  //              Assumes a multi-dimensional array

  this.height = numericArray.length;
  this.width = numericArray[0].length;

  this.find = function(/* number */ x, /* number */ y) {
    for(var child in this.collection) {
      if(this.collection.hasOwnProperty(child)) {
        var cell = this.collection[child];
        if (cell.x === x && cell.y === y) {
          return cell;
        } // if
      }// if
    }// for
  };// find()


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
  }; // _createCells()

  this.collection = _createCells(numericArray);


  this.flipCells = function() {
    for(var child in this.collection) {
      if(this.collection.hasOwnProperty(child)) {
        this.collection[child].gameMyLife();
      }// if
    }// for
    return this;
  }

  this.flipBoard = function() {
    for(var child in this.collection) {
      if(this.collection.hasOwnProperty(child)) {
        this.collection[child].alive = this.collection[child].flipAlive
      } // if
    }// for
    return this;
  }

  this.resolveCellNeighbors = function() {
    for(var child in this.collection) {
      if(this.collection.hasOwnProperty(child)) {
        this.collection[child].findNeighbors();
      }// if
    }// for
    return this;
  }

  this.print = function() {

    this.resolveCellNeighbors();
    this.flipCells();
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
  }

};

function Cell(/*bool*/ alive, /*number*/ x, /*number*/ y) {
  this.neighbors = [];
  this.findNeighbors = function() {
        var topNeighbor = cells.find(x, y - 1),
            topRightNeighbor = cells.find(x + 1, y - 1),
            rightNeighbor = cells.find(x + 1, y),
            bottomRightNeighbor = cells.find(x + 1, y + 1),
            bottomNeighbor = cells.find(x, y + 1),
            bottomLeftNeighbor = cells.find(x - 1, y + 1),
            leftNeighbor = cells.find(x - 1, y),
            topLeftNeighbor = cells.find(x - 1, y - 1);

        if (topNeighbor)
          this.neighbors.push(topNeighbor);
        if (topRightNeighbor)
          this.neighbors.push(topRightNeighbor);
        if (rightNeighbor)
          this.neighbors.push(rightNeighbor);
        if (bottomRightNeighbor)
          this.neighbors.push(bottomRightNeighbor);
        if (bottomNeighbor)
          this.neighbors.push(bottomNeighbor);
        if(bottomLeftNeighbor)
          this.neighbors.push(bottomLeftNeighbor);
        if(leftNeighbor)
          this.neighbors.push(leftNeighbor);
        if(topLeftNeighbor)
          this.neighbors.push(topLeftNeighbor);
      };

  this.alive = alive;
  this.x = x;
  this.y = y;

  function isAlive(cell) {
    return cell.alive;
  }
  
  this.gameMyLife = function() {
    if(this.alive) {
      this.flipAlive = !(this.neighbors.filter(isAlive).length < 2 || this.neighbors.filter(isAlive).length > 3) || (this.neighbors.filter(isAlive).length >= 2 && this.neighbors.filter(isAlive).length <= 3);
    } else {
      this.flipAlive = this.neighbors.filter(isAlive).length === 3;
    }
  }

}