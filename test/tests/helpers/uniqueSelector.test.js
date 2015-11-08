var uniqueSelector = require('../../../src/helpers/uniqueSelector.js');
var assert = require('assert');
var expect = require('chai').expect;
var $ = require('jquery');
window.$ = $;

var template =
'<div id="uniqueTest">' +
	'<button class="btn1"></button>' +
	'<ul class="list">' +
		'<li></li>' +
		'<li></li>' +
		'<li></li>' +
		'<li></li>' +
		'<li></li>' +
	'</ul>' +
	'<div class="container">' +
		'<p></p>' +
		'<p id="identified"></p>' +
	'</div>' +
	'<form action="">' +
		'<input type="text">' +
		'<textarea name="" id="" cols="30" rows="10"></textarea>' +
	'</form>' +
'</div>';

describe('uniqueSelector', function () {
	var $body = $('body'),
		selectors = [
			".btn1",
			"ul.list",
			"form",
			"input",
			"textarea",
			"#identified",
			"ul.list li:nth-child(2)",
			".container",
			".container p:nth-child(1)"
		]

	before(function() {
		$body.append(template);
	});

	after(function(){
		$('#uniqueTest').remove();
	})

	it('should returun unique identifier for each element', function (done) {

		for (var i = selectors.length - 1; i >= 0; i--) {
			// console.log(selectors[i]);
			var selector = selectors[i],
				$el = $(selector),
				el = $el[0],
				unqSelector = uniqueSelector(el),
				$checkEl = $(unqSelector),
				checkEl = $checkEl[0],
				checkLength = $checkEl.length;

			// console.log(selector + ' / ' + unqSelector);
			expect(el).to.be.deep.equal(checkEl);
			expect(checkLength).to.be.equal(1)
		};

		done();
	});
});
