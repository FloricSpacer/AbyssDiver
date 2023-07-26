/* exported toggle */
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
