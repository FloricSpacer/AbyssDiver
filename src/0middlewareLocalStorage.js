
// LocalStorage Middleware //
console.log("Loaded LocalStorage Middleware");

const originalLocalStorage = window.localStorage;

const LocalStorageMiddleware = {
	log(action, key, value) {
		//console.log(`Action: ${action}, Key: ${key}, Value: ${value}`);
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
			originalLocalStorage.setItem(key, value);
			this.log('set', key, value);
		}
	},
	getItem(key) {
		const value = originalLocalStorage.getItem(key);
		this.log('get', key, value);
		return value;
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

const SaveFileTrimmer = {
	trim_state(state) {
		for (const state_delta of state.delta) {
			// trim static relic variables
			delete state_delta.relics;
			// trim static companion variables
			// delete state_delta.companions;
			// trim multi-static variables

			/**
			// TODO: NEEDS UNTRIM FUNCTIONS
			const array_keys = Object.keys(state_delta.variables);
			for (const key of array_keys) {
				// curse#, relic#, item#
				if (key.match(/curse\d+/) != null || key.match(/relic\d+/) != null || key.match(/item\d+/) != null) {
					delete state_delta.variables[key];
				}
				// companionNAME
				//if (key.includes("companion") && key != "companions") {
				//	delete state_delta.variables[key];
				//}
			}
			**/
		}
	},

	untrim_state(state) {
		// curse1, curse2, curse3, ...
		// relic1, relic2, relic3, ...
		// item1, item2, item3, ...
	},

	iter_save_states(data, callback) {
		// autosave trim
		if (Object.hasOwn(data, 'autosave')) {
			if (data.autosave != null) {
				callback(data.autosave.state);
			}
		}
		// save slot trims
		if (Object.hasOwn(data, 'slots')) {
			for (const slot_data of data.slots) {
				if (slot_data != null) {
					callback(slot_data.state);
				}
			}
		}
	},

	trim(data) {
		console.log("trim save file");
		console.log(data);
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.trim_state);
	},

	untrim(data) {
		console.log("untrim save file");
		console.log(data);
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.untrim_state);
	}
}

window.hasDefinedMiddleware = false;

window.updateSugarCubeStorageMiddleware = () => {
	if (window.hasDefinedMiddleware == true) {
		console.log("middleware is already defined!");
		return;
	}
	if (window.SugarCube && window.SugarCube.storage) {
		window.hasDefinedMiddleware = true;
		console.log('SugarCube storage middleware setup.');
		
		// MATCH WITH THIS
		// https://github.com/tmedwards/sugarcube-2/blob/v2-develop/src/storage/adapters/webstorage.js

		// const original_set = window.SugarCube.storage.set;
		// window.SugarCube.storage.set = original_set;
		// return original_set(key, value);

		// const original_get = window.SugarCube.storage.get;
		// return original_get(key);

		window.SugarCube.storage.set = function(key, value) {
			console.log("storage - set - ", key);
			try {
				SaveFileTrimmer.trim(value);
				const serial_value = window.SugarCube.storage.constructor._serialize(value);
				LocalStorageMiddleware.setItem(window.SugarCube.storage._prefix + key, serial_value);
				return true;
			} catch (ex) {
				console.error(ex);
				return false;
			}
		}

		window.SugarCube.storage.get = function(key) {
			console.log("storage - get - ", key);
			const saveRaw = LocalStorageMiddleware.getItem(window.SugarCube.storage._prefix + key);
			const saveObject = saveRaw == null ? null : window.SugarCube.storage.constructor._deserialize(saveRaw);
			if (saveObject != null) {
				SaveFileTrimmer.untrim(saveObject);
			}
			return saveObject;
		}

	} else {
		console.warn('SugarCube is not loaded.');
	}
};
