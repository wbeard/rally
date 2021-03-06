var ranks  = [
	{
		name: 'High Card',
		regex: '',
		match: function() {
			return true;
		}
	},
  {
		name: 'One pair',
		match: function(obj) {
			var regex = /(.)\1{1,}/;
			return regex.test(obj.numberVal);
		}
	},
  {
    name: 'Two pair',
		match: function(obj) {
			var regex = /(.)\1{1,}/,
				hasMatch = obj.numberVal.match(regex);
			if(hasMatch) {
				var remainingText = obj.numberVal.split(hasMatch[0]).join('');
				var newRegex = /(.)\1{1,}/,
					hasSecondMatch = remainingText.match(newRegex);
				if(hasSecondMatch) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	},
	{
		name: 'Three of a kind',
		match: function(obj) {
			var regex = /(.)\1{2,}/;
			return regex.test(obj.numberVal);
		}
	},
	{
		name: 'Straight',
		match: function(obj) {
			var chars = "23456789AJQKT",
				hasMatch = chars.match(obj.numberVal);
			if(hasMatch && hasMatch[0].split('').length === 5) {
				return true;
			} else {
				return false;
			}
		}
	},
  {
		name: 'Flush',
		match: function(obj) {
			var regex = /(.)\1{4,}/;
			return regex.test(obj.suiteVal);
		}
	},
  {
		name: 'Full house',
		match: function(obj) {
			var regex = /(.)\1{2,}/,
				hasMatch = obj.numberVal.match(regex);
			if(hasMatch) {
				var remainingText = obj.numberVal.split(hasMatch[0]).join('');
				var newRegex = /(.)\1{1,}/,
					hasSecondMatch = remainingText.match(newRegex);
				if(hasSecondMatch) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	},
  {
		name: 'Four of a kind',
		match: function(obj) {
			var regex = /(.)\1{3,}/;
			return regex.test(obj.numberVal);
		}
	},
  {
		name: 'Straight flush',
		match: function(obj) {
			var chars = "23456789AJKQT",
				hasNumberMatch = chars.match(obj.numberVal),
				regex = /(.)\1{4,}/,
				hasSuiteMatch = regex.test(obj.suiteVal);

			return hasNumberMatch && hasNumberMatch[0].split('').length === 5 && hasSuiteMatch;
		}
	},
	{
		name: 'Royal flush',
		match: function(obj) {
			var chars = "AJKQT",
				hasNumberMatch = chars.match(obj.numberVal),
				regex = /(.)\1{4,}/,
				hasSuiteMatch = regex.test(obj.suiteVal);

			return hasNumberMatch && hasNumberMatch[0].split('').length === 5 && hasSuiteMatch;
		}
	}
];

function Handler(/* string || array */ cards, /* object? */options) {
	'use strict';
	if(typeof cards === "undefined") {
		throw new Error("Provide a hand. Pass as an array or as a string. Delimits by ' ' by default. Feel free to pass a delimiter in the options parameter new Handler('...', { delimiter: ',' })");
  }

  function _normalizeCardInput( /* string || array */ input, /* object? */ options) {
    var cards = [];

    if(Object.prototype.toString.call(input) !== "[object Array]") {
      input = options ? input.split(options.delimeter) : input.split(" ");
    }

    for(var i in input) {
      if(input.hasOwnProperty(i)) {
        var card = input[i],
          normalizeValue = '';
        if (card.slice(0, card.length - 1) === "10") {
          normalizeValue = "T";
        } else {
          normalizeValue = card.slice(0, card.length - 1);
        }
        cards.push({
          value: normalizeValue,
          suite: card.slice(card.length - 1)
        });
      } // if
    } // for

    return cards;

  } // _normalizeCardInput

	this.input = cards;
	this.hand = _normalizeCardInput(cards, options);



} // Handler

Handler.prototype.getCardProperties = function(/*string*/ key) {
	'use strict';

	var arr = [];

	for(var card in this.hand) {
		if(this.hand.hasOwnProperty(card)) {
			arr.push(this.hand[card][key]);
		}
	}

	return arr;
}; // _getCardProperties

Handler.prototype.rankHand = function() {
	'use strict';

	var rankCount = ranks.length - 1,
		handSuites = this.getCardProperties("suite").sort().join(''),
		handNumbers = this.getCardProperties("value").sort().join(''),
		handObj = {
			numberVal: handNumbers,
			suiteVal: handSuites
		};

	for(rankCount; rankCount >= 0; rankCount--) {
		if(ranks[rankCount].match(handObj)) {
			return "Hand: " + this.input + " (" + ranks[rankCount].name + ")";
		}
	}
}; // rankHand

module.exports = Handler;