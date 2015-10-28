'use strict'

let uniqueSelector = require('../helpers/uniqueSelector.js');

let intialTime = Date.now();
let interval = 400;

module.exports = function(events, obervable) {
	obervable
		.filter((e) => {
			var timeStamp = e.timeStamp,
				time = timeStamp - intialTime;

			if (time > interval) {
				intialTime = Date.now();
				return e;
			}
		})
		.distinctUntilChanged()
		.map((e) => {
			// console.log('MOUSE EVENT: ', e);
			return e;
		})
		.subscribe((e) => {
			console.log(e.clientX + ',' + e.clientY);
			events.push({
				type: 'mouseMove',
				selector: uniqueSelector(e.target),
				x: e.clientX,
				y: e.clientY
			});
		});
};
