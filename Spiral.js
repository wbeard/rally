module.exports = Spiral;

function Spiral(/*number*/ num) {
  'use strict';

  var directions = {
      up: [0,-1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    },
    oddDirectionSequence = [directions.right, directions.down, directions.left, directions.up],
    evenDirectionSequence = [directions.down, directions.left, directions.up, directions.right];

  this.num = num;

  function matrixDimensions(/* number */ num) {
    'use strict';
    //summary:
    //      determine dimensions of grid.
    //      provides flexibility to move to non-square grid
    var start = parseInt(Math.sqrt(num)),
        down = start,
        up = start;

        for(down; down > 0; down--) {
          if(down * up === num) {
            return {
              width: down,
              height: up
            }// return
          }// if
          for(up; up < num; up++) {
            if(down * up === num) {
              return {
                width: down,
                height: up
              } //return
            } // if
          } // for
        } // for
  }// matrixDimensions

  function validate(/* number */ width, /* number */ height) {
    'use strict';
    if(width !== height) {
      return false;
    } else {
      return true;
    }
  }

  function multiDimensionalArrayFactory(/* number */ width, /* number */ height) {
    'use strict';
    var multiArr = [];

    for(var counter = 0; counter < height; counter++) {
      var arr = new Array(width);
      multiArr.push(arr);
    }

    return multiArr;
  } // multiDimensionalArrayFactory

  function resolveCenterPoint(/* number */ width, /* number */ height) {
    'use strict';
    if(width % 2 === 0) {
      return [parseInt(width/2), parseInt(height/2) - 1];
    } else {
      return [parseInt(width/2), parseInt(height/2)];
    }
  } // resolveCenterPoint

  function makeSpiral(/* number */ num) {
    'use strict';
    var dimensions = matrixDimensions(num+1),
        centerPoint = resolveCenterPoint(dimensions.width, dimensions.height),
        spiralArr = multiDimensionalArrayFactory(dimensions.width, dimensions.height),
        workingX = centerPoint[0],
        workingY = centerPoint[1],
        directionSequence = (num + 1) % 2 === 0 ? evenDirectionSequence : oddDirectionSequence,
        directionCounter = 0,
        //increments is the number of times we've assigned a value to the array in a given direction
        increments = 0,
        //iterations is the number of times increment has reach its incrementsAllowed limit
        //for each two iterations, the number of increments allowed increases by 1
        iterations = 0,
        //incrementsAllowed is the number of times we want to move in a given direction
        incrementsAllowed = 1;

    if (!validate(dimensions.width,dimensions.height))
      throw new Error("Can't create perfect spiral without an equal width and height");

    //set center-point to 0
    spiralArr[workingX][workingY] = 0;

    for(var integerCounter = 1; integerCounter <= num; integerCounter++) {
        //if directionCounter is at 4
        // reset it to zero to avoid out of bounds
        // and to got he right direction!
        if(directionCounter > 3) {
          directionCounter = 0;
        }

        // update our current working coordinates
        // we found our sequence earlier (even vs odd)
        // so directorCounter cooresponds w/ one of its elements
        // 0 index is for X, 1 is for Y
        workingX = workingX + directionSequence[directionCounter][0];
        workingY = workingY + directionSequence[directionCounter][1];

        // set this index to the current integer
        spiralArr[workingX][workingY] = integerCounter;

        // number of times we've assigned in this direction goes up by 1
        increments++;

        // if we've hit our limit, it's time to change directions and increment
        // our number of iterations.
        if(increments === incrementsAllowed) {
          increments = 0;
          directionCounter++;
          iterations++;
        }

        // if this is the second iteration
        // reset iterations and increase how many times we can write
        // in a certain direction
        if(iterations == 2) {
          iterations = 0;
          incrementsAllowed++;
        }

    }

    return spiralArr;
  } // makeSpiral

  this.print = function() {
    'use strict';
    var arr = makeSpiral(this.num),
        outerCounter = 0,
        outerBound = arr.length,
        innerCounter = 0,
        innerBound = arr[0].length;

    for(innerCounter; innerCounter < innerBound; innerCounter++) {
      var displayString = '';
      for(outerCounter; outerCounter < outerBound; outerCounter++) {
        displayString += arr[outerCounter][innerCounter] < 10 ? " " + arr[outerCounter][innerCounter] : + arr[outerCounter][innerCounter];
      }
      console.log(displayString);
      outerCounter = 0;
      displayString = '';
    }
  } // Spiral.print

} // Spiral