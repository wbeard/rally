function NumToStringConverter(number) {
	// Casting to a number helps resolve the value
	// to either a number or NaN, which is a falsy value.
	'use strict';

	function recurseWholeNumber(/* number */ number) {
		number = parseInt(number);
		switch(true) {
			case(number === 0):
				return "";
			case(number < 10):
				return ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][number-1] + " ";
			case(number < 20):
				return ["ten", "eleven", "twelve", "thrirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"][number-10] + " ";
			case(number < 100):
				return ["twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"][parseInt(number / 10 - 2)] + " " + recurseWholeNumber(number % 10);
			case(number < 1000):
				return recurseWholeNumber(number / 100) + "hundred " + recurseWholeNumber(number % 100);
			case(number < 1000000):
				return recurseWholeNumber(number / 1000) + "thousand " + recurseWholeNumber(number % 1000);
			default:
				return recurseWholeNumber(number / 1000000) + "million " + recurseWholeNumber(number % 1000000);
		}
	}

	this.print = function () {
		var numberArray = this.number.split("."),
			wholeNumber = numberArray[0],
			remainderNumber = numberArray[1],
			textRepresentation = "";

		textRepresentation += recurseWholeNumber(wholeNumber);

		textRepresentation += "and " + remainderNumber + "/100 dollars";

		return textRepresentation.charAt(0).toUpperCase() + textRepresentation.slice(1).replace(/\s{1,}/g, ' ');
	};

	//Setup

	if(+number) {

		number = parseFloat(+number).toFixed(2);

		if(number > 999999999) {
			throw new Error("We don't do billions round here.");
		}

		return this.number = number;

	} else {

		throw new Error("Must pass an argument and must be a number");

	}

}



module.exports = NumToStringConverter;