function Cell(/*bool*/ alive, /*number*/ x, /*number*/ y) {
  'use strict';
  this.neighbors = [];
  this.alive = alive;
  this.x = x;
  this.y = y;

  function isAlive(/*bool*/ alive) {
    return alive;
  } // isAlive

  this.gameMyLife = function() {
    if(this.alive) {
      this.flipAlive = !(this.neighbors.filter(isAlive).length < 2 || this.neighbors.filter(isAlive).length > 3) || (this.neighbors.filter(isAlive).length >= 2 && this.neighbors.filter(isAlive).length <= 3);
    } else {
      this.flipAlive = this.neighbors.filter(isAlive).length === 3;
    }
  }; // Cell.gameMyLife

} // Cell

module.exports = Cell;
