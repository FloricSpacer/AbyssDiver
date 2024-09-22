
// LocalStorage Middleware //
console.log("Loaded LocalStorage Middleware");

const originalLocalStorage = window.localStorage;

const LocalStorageMiddleware = {
	log(action, key, value) {
		console.log(`Action: ${action}, Key: ${key}, Value: ${value}`);
	},
	validate(key, value) {
		if (value === null || value === undefined) {
			console.warn(`Invalid value for key: ${key}`);
			return false;
		}
		return true;
	},
	setItem(key, value) {
		if (this.validate(key, value)) {
			originalLocalStorage.setItem(key, JSON.stringify(value));
			this.log('set', key, value);
		}
	},
	getItem(key) {
		const value = originalLocalStorage.getItem(key);
		this.log('get', key, value);
		return value ? JSON.parse(value) : null;
	},
	removeItem(key) {
		this.log('remove', key, originalLocalStorage.getItem(key));
		originalLocalStorage.removeItem(key);
	},
	clear() {
		originalLocalStorage.clear();
		this.log('clear', null, null);
	},
	get length() {
		this.log('length', null, null);
		return originalLocalStorage.length;
	},
	key(index) {
		this.log('key', index, null);
		return originalLocalStorage.key(index);
	}
};

Object.defineProperty(window, 'localStorage', {
	value: LocalStorageMiddleware,
	writable: false // Prevent further overrides
});

// MATCH WITH THIS
// https://github.com/tmedwards/sugarcube-2/blob/v2-develop/src/storage/adapters/webstorage.js

window.hasDefinedMiddleware = false;

window.updateSugarCubeStorageMiddleware = () => {
	if (window.hasDefinedMiddleware == true) {
		console.log("middleware is already defined!");
		return;
	}
	if (window.SugarCube && window.SugarCube.storage) {
		window.hasDefinedMiddleware = true;
		// const original_set = window.SugarCube.storage.set;
		window.SugarCube.storage.set = function(key, value) {
			console.log("storage - set - ", key, value);
			return LocalStorageMiddleware.setItem(key, value);
			// return original_set.call(this, key, value);
		}
		// const original_get = window.SugarCube.storage.get;
		window.SugarCube.storage.get = function(key) {
			console.log("storage - get - ", key);
			return LocalStorageMiddleware.getItem(key);
			//return original_get.call(this, key);
		}
		console.log('SugarCube storage middleware updated.');
	} else {
		console.warn('SugarCube is not loaded.');
	}
};
