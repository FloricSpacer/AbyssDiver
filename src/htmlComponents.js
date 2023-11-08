/* exported toggle, select */
/**
 * Creates an on/off UI element.
 * The element has the following additional functions:
 * - disable() disables the toggle. This will call the callback, so beware of infinite recursion.
 * - enable() enables the toggle. This will call the callback, so beware of infinite recursion.
 * - toggle() toggles the state of the toggle. This will call the callback, so beware of infinite recursion.
 * - state() returns the current state of the element.
 * @param {function} cb The callback to call when the state is changed.
 * @param {boolean} [init] The initial value of the toggle.
 * @returns {HTMLElement} An HTMLElement containing the toggle.
 */
function toggle(cb, init) {
	let container = document.createElement('div');
	container.classList.add('toggle');

	let disabledElem = document.createElement('div');
	disabledElem.textContent = 'Disabled';
	disabledElem.classList.add('toggle-item', 'off');
	if (!init) disabledElem.classList.add('selected');

	let enabledElem = document.createElement('div');
	enabledElem.textContent = 'Enabled';
	enabledElem.classList.add('toggle-item', 'on');
	if (init) enabledElem.classList.add('selected');

	container.append(disabledElem, enabledElem);

	let enabled = !!init;

	function disable() {
		enabled = false;
		enabledElem.classList.remove('selected');
		disabledElem.classList.add('selected');
		cb(false);
	}
	container.disable = disable;
	function enable() {
		enabled = true;
		disabledElem.classList.remove('selected');
		enabledElem.classList.add('selected');
		cb(true);
	}
	container.enable = enable;
	function toggle() {
		if (enabled) {
			disable();
		} else {
			enable();
		}
	}
	container.toggle = toggle;
	function state() {return enabled}
	container.state = state;

	disabledElem.addEventListener('click', disable);
	enabledElem.addEventListener('click', enable);
	return container;
}
window.toggle = toggle;

/**
 * Creates a multiple choice UI element.
 * The element has the following additional functions:
 * - select(value) selects the given value. This will call the callback, so beware of infinite recursion.
 * - state() returns the current state of the element.
 * The provided states can be an array of strings, in which case the same string will be used as value or an
 * object containing the mappings from string to value, in which case the object's keys will be displayed
 * in the UI and the corresponding values sent to the callback upon selection.
 * @param {function} cb The callback to call when the state is changed.
 * @param {[string]|Object.<String, any>} vals The possible values of the form element.
 * @param {any} init The initial value of the toggle.
 * @returns {HTMLElement} An HTMLElement containing the toggle.
 */
function select(cb, vals, init) {
	let container = document.createElement('div');
	container.classList.add('toggle');

	let map = vals;
	if (Array.isArray(vals)) {
		map = {}
		for (let val of vals) {
			map[val] = val;
		}
	}

	let elems = []
	let selected = init;

	function select(val) {
		selected = val;
		for (let elem of elems) {
			elem[0].classList.remove('selected');
			if (elem[1] === val) {
				elem[0].classList.add('selected');
			}
		}
		cb(val);
	}
	container.select = select;
	function state() {return selected}
	container.state = state;

	for (let val in map) {
		let optionElem = document.createElement('div');
		optionElem.textContent = val;
		optionElem.classList.add('toggle-item');
		if (init === map[val]) optionElem.classList.add('selected');
		container.append(optionElem);
		elems.push([optionElem, map[val]]);
		optionElem.addEventListener('click', () => select(map[val]));
	}

	return container;
}
window.select = select;
