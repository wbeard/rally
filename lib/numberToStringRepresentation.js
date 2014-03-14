module.exports = function(/* number */ number) {
	// Casting to a number helps resolve the value
	// to either a number or NaN, which is a falsy value.
	'use strict';
	if(!+number) {
		throw new Error("Must pass an argument and must be a number");
	}

	number = parseFloat(+number).toFixed(2);

	if(number > 999999999) {
		throw new Error("We don't do billions round here.");
	}

	return resolveNumberToText(number);

}

function resolveNumberToText(/* number */ number) {
	'use strict';
	var numberArray = number.split("."),
		wholeNumber = numberArray[0],
		remainderNumber = numberArray[1],
		textRepresentation = "";

	textRepresentation += recurseWholeNumber(wholeNumber);

	textRepresentation += "and " + remainderNumber + "/100 dollars";

	return textRepresentation.charAt(0).toUpperCase() + textRepresentation.slice(1).replace(/\s{1,}/g, ' ');
}

function recurseWholeNumber(/* number */ number) {
	'use strict';
	number = parseInt(number);
	switch(true) {
		case(number == 0):
			return "";
			break;
		case(number < 10):
			return ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][number-1] + " ";
			break;
		case(number < 20):
			return ["ten", "eleven", "twelve", "thrirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"][number-10] + " ";
			break;
		case(number < 100):
			return ["twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"][parseInt(number / 10 - 2)] + " " + recurseWholeNumber(number % 10);
			break;
		case(number < 1000):
			return recurseWholeNumber(number / 100) + "hundred " + recurseWholeNumber(number % 100);
			break;
		case(number < 1000000):
			return recurseWholeNumber(number / 1000) + "thousand " + recurseWholeNumber(number % 1000);
			break;
		default:
			return recurseWholeNumber(number / 1000000) + "million " + recurseWholeNumber(number % 1000000);
	}
}