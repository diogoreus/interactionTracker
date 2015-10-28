let uniqueSelector = require('../helpers/uniqueSelector.js');

module.exports = function(events, obervable) {
	obervable
		.subscribe((e) => {
			events.push({
				type: 'key',
				code: e.keyCode,
				selector: uniqueSelector(e.target)
			});
		});
};
