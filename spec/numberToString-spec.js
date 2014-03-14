var NumToStringConverter = require("../lib/NumToStringConverter");

describe("Rally Tests", function() {

  /*
  * Number to String Tests
  */
  describe("Number To String Test Suite", function() {
    // Truths
    describe("Truths", function() {

      it("should display Two thousand five hundred twenty three and 04/100 dollars", function() {
        var numToString = new NumToStringConverter(2523.04);
        expect(numToString.print()).toBe("Two thousand five hundred twenty three and 04/100 dollars");
      });

      it("should display Three million two hundred fifty thousand five hundred twenty three and 64/100 dollars", function() {
        var numToString = new NumToStringConverter(3250523.64);
        expect(numToString.print()).toBe("Three million two hundred fifty thousand five hundred twenty three and 64/100 dollars");
      });

      it("should display And 64/100 dollars", function() {
        var numToString = new NumToStringConverter(0.64);
        expect(numToString.print()).toBe("And 64/100 dollars");
      });

      it("should display 0/100 dollars at the end of the string", function() {
        var numToString = new NumToStringConverter(100);
        expect(numToString.print()).toContain("0/100");
      });

    });
    // Errors & Boundary Checks
    describe("Errors & Boundary Checks", function() {

      it("should expect an error to be thrown", function() {
        var constructCall = function() {
          return new NumToStringConverter();
        };
        expect(constructCall).toThrow(new Error("Must pass an argument and must be a number"));
      });

      it("should expect an error if the amount is 1bn or greater", function() {
        var billionCall = function() {
          return new NumToStringConverter(1000000000);
        };
        expect(billionCall).toThrow(new Error("We don't do billions round here."));
      });

    });

  });

});

