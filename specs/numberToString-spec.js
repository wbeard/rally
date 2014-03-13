var   numberToStringRep = require("../numberToStringRepresentation")
    , Cells = require("../Cells")
    , Handler = require("../Handler")
    , Spiral = require("../Spiral")
    , template = require("../template");

describe("Rally Tests", function() {

  /*
  * Number to String Tests
  */
  describe("Number To String Test Suite", function() {
    // Truths
    describe("Truths", function() {

      it("should display Two thousand five hundred twenty three and 04/100 dollars", function() {
        expect(numberToStringRep(2523.04)).toBe("Two thousand five hundred twenty three and 04/100 dollars");
      });

      it("should display Three million two hundred fifty thousand five hundred twenty three and 64/100 dollars", function() {
        expect(numberToStringRep(3250523.64)).toBe("Three million two hundred fifty thousand five hundred twenty three and 64/100 dollars");
      });

      it("should display And 64/100 dollars", function() {
        expect(numberToStringRep(0.64)).toBe("And 64/100 dollars");
      });

      it("should display 0/100 dollars at the end of the string", function() {
        expect(numberToStringRep(100)).toContain("0/100");
      });

    });
    // Errors & Boundary Checks
    describe("Errors & Boundary Checks", function() {

      it("should expect an error to be thrown", function() {
        expect(numberToStringRep).toThrow(new Error("Must pass an argument and must be a number"));
      });

      it("should expect an error if the amount is 1bn or greater", function() {
        var billionCall = function() {
          return numberToStringRep(1000000000);
        }
        expect(billionCall).toThrow(new Error("We don't do billions round here."));
      });

    });

  });

});

