/* exported assert, maybeParseInt */
function assert(condition, message) {
	if (!condition) {
		console.error(message)
	}
}
