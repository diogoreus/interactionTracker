let uniqueSelector = require('../helpers/uniqueSelector.js');

module.exports = function(events, obervable) {
	obervable
		.subscribe((e) => {
			console.log(e.clientX + ',' + e.clientY);
			events.push({
				type: 'click',
				selector: uniqueSelector(e.target)
			});
		});
};
