'use strict';

function contains(arrayLike, stringOrRegex) {
	if ('string' === typeof stringOrRegex) {
		return arrayLike.indexOf(stringOrRegex) > -1;
	}

	const match = arrayLike.find(function(item) {
		return item.match(stringOrRegex);
	});

	return (match !== undefined);
}

function hasProperty(objectLike, stringOrRegex) {
	if ('string' === typeof stringOrRegex) {
		return objectLike.hasOwnProperty(stringOrRegex);
	}

	return contains(Object.keys(objectLike), stringOrRegex);
}

function getMatchingValue(objectLike, stringOrRegex) {
	if ('string' === typeof stringOrRegex) {
		return objectLike[stringOrRegex];
	}

	const keys = Object.keys(objectLike);
	for (var i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (key.match(stringOrRegex)) {
			return objectLike[key];
		}
	}
}

function getMatchingValuesByAll(arrayLike, arrayOfStringOrRegex, propertyToMatch) {
	if (!Array.isArray(arrayOfStringOrRegex) || !propertyToMatch) {
		return [];
	}

	const vals = [];
	for (var i = 0; i < arrayLike.length; i++) {
		var like = arrayLike[i];

		if (arrayOfStringOrRegex.every(
			function(y) {
				return contains(like[propertyToMatch], y);
			})
		) {
			vals.push(like);
		}
	}

	return vals;
}

module.exports = {
	contains: contains,
	hasProperty: hasProperty,
	getMatchingValue: getMatchingValue,
	getMatchingValuesByAll: getMatchingValuesByAll
};
