var numberToStringRep = require("../src/numberToStringRepresentation");

describe("Correct thousands transaction", function() {
    it("should display Two thousand five hundred twenty three and 04/100 dollars", function() {
      expect(numberToStringRep(2523.04)).toBe("Two thousand five hundred twenty three and 04/100 dollars");
    });
    it("should return undefined", function() {
      expect(numberToStringRep).toThrow(new Error("Must pass an argument and must be a number"));
    });
});