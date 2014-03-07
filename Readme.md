Rally Exercises
===============

Convert a number to its text representation
-------------------------------------------

### numberToStringRepresentation.js

Usage:

`require('./numberToStringRepresentation')(2523.04);`

logs "Two thousand twenty three and 04/100 dollars"

Rank a poker hand
-----------------

### Handler.js

Usage:

	var Handler = require('./Handler'),
		handlerInstance = new Handler("10s Js Qs Ks As");

	handlerInstance.rankHand();

logs "Hand: 10s Js Qs Ks As (Royal flush)"

Options:

You can pass the cards as an array of strings or as a string delimited by a character. Space is its default delimiter. Specify a special delimiter by passing it in the options like `new Handler("10s,Js,Qs,Ks,As", { delimeter: ","});`.

Spiral
------

### Spiral.js

Usage:
	
	var Spiral = require('./Spiral'),
		spiral = new Spiral(24);

	spiral.print();

logs 24  9 10 11 12
	 23  8  1  2 13
	 22  7  0  3 14
	 21  6  5  4 15
	 20 19 18 17 16

Game of Life
------------

### Cells.js

Usage:

	var Cells = require('./Cells'),
		cells = new Cells([[0,1,0,0,0],[1,0,0,1,1],[1,1,0,0,1],[0,1,0,0,0],[1,0,0,0,1]]);

	cells.print();

logs 	0 0 0 0 0 <br />
		1 0 1 1 1 <br />
		1 1 1 1 1 <br />
		0 1 0 0 0 <br />
		0 0 0 0 0 <br />

Templating engine
-----------------

### template.js

Usage:
	
	var template = require('./template');
		generatedString = template("${activity} is ${adjective}!", {
			activity: 'Coding',
			adjective: 'fun'
		});

Returns:
	"Coding is fun!"