export default function(expectation, msg) {
	if (!expectation) {
		throw new Error(typeof msg === 'function' ? msg() : msg);
	}
}
