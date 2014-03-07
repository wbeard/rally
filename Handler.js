module.exports = Handler;

function Handler(/* string || array */ cards, /* object? */options) {


		if(typeof cards === "undefined")
			throw new Error("Provide a hand. Pass as an array or as a string. Delimits by ' ' by default. Feel free to pass a delimiter in the options parameter new Handler('...', { delimiter: ',' })");

		var ranks  = {
				0: {
					rank: 0,
					name: 'High Card',
					regex: '',
					match: function() {
						return true;
					}
				},
				1: {
					rank: 1,
					name: 'One pair',
					match: function(obj) {
						var regex = /(.)\1{1,}/;
						return regex.test(obj.numberVal);
					}
				},
				2: {
					rank: 2,
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
				3: {
					rank: 3,
					name: 'Three of a kind',
					match: function(obj) {
						var regex = /(.)\1{2,}/;
						return regex.test(obj.numberVal);
					}
				},
				4: {
					rank: 4,
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
				5: {
					rank: 5,
					name: 'Flush',
					match: function(obj) {
						var regex = /(.)\1{4,}/;
						return regex.test(obj.suiteVal);
					}
				},
				6: {
					rank: 6,
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
				7: {
					rank: 7,
					name: 'Four of a kind',
					match: function(obj) {
						var regex = /(.)\1{3,}/;
						return regex.test(obj.numberVal);
					}
				},
				8: {
					rank: 8,
					name: 'Straight flush',
					match: function(obj) {
						var chars = "23456789AJKQT",
							hasNumberMatch = chars.match(obj.numberVal),
							regex = /(.)\1{4,}/,
							hasSuiteMatch = regex.test(obj.suiteVal);

						return hasNumberMatch && hasNumberMatch[0].split('').length === 5 && hasSuiteMatch;
					}
				},
				9: {
					rank: 9,
					name: 'Royal flush',
					match: function(obj) {
						var chars = "AJKQT",
							hasNumberMatch = chars.match(obj.numberVal),
							regex = /(.)\1{4,}/,
							hasSuiteMatch = regex.test(obj.suiteVal);

						return hasNumberMatch && hasNumberMatch[0].split('').length === 5 && hasSuiteMatch;
					}
				}

			},
			_hand = _normalizeCardInput(cards);

			function _normalizeCardInput(input, options) {

				var cards = [];

				if(Object.prototype.toString.call(input) !== "[object Array]")
					input = options ? input.split(options.delimeter) : input.split(" ");

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
							suite: card.slice(input[i].length - 1)
						});
					} // if
				} // for

				return cards;

			} // _normalizeCardInput

			function _getCardProperties(key) {
				var arr = [];

				for(var card in _hand) {
					if(_hand.hasOwnProperty(card)) {
						arr.push(_hand[card][key]);
					}
				}

				return arr;
			} // _getCardProperties

			this.rankHand = function() {
				var rankCount = Object.keys(ranks).length - 1,
					handSuites = _getCardProperties("suite").sort().join(''),
					handNumbers = _getCardProperties("value").sort().join(''),
					handObj = {
						numberVal: handNumbers,
						suiteVal: handSuites
					};

				for(rankCount; rankCount >= 0; rankCount--) {
					if(ranks[rankCount].match(handObj)) {
						return "Hand: " + cards + " (" + ranks[rankCount].name + ")";
					}
				}
			}; // rankHand

			return this;
	}