/* exported assert, objMap */
function assert(condition, message) {
	if (!condition) {
		console.error(message)
	}
}

/**
 * @template T, S
 * @callback mapperCallback
 * @param {T} v The value to be mapped.
 * @returns {S} The mapped value.
 */

/**
 * Maps the properties of an object using the provided function.
 * @template T, S
 * @param {Object.<string, T>} obj The object to be mapped.
 * @param {mapperCallback.<T, S>} mapFunction The function which applies the mapping to a single property.
 * @returns {Object.<string, S>} The mapped object
 */
function objMap(obj, mapFunction) {
	let ret = {};
	for (let k in obj) {
		ret[k] = mapFunction(obj[k]);
	}
	return ret;
}
