
// LocalStorage Middleware //
console.log("Registering LocalStorage Middleware");

const originalLocalStorage = window.localStorage;

const LocalStorageMiddleware = {
	log(action, key, value) {
		console.log(`Action: ${action}, Key: ${key}`);
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
	trim_events(events, max_unique_events) {
		// console.log(typeof events);
		let pruned_events = [];
		let counter = {};
		for (const item of events) {
			let key = item.name;
			let count = counter[key] || 0;
			if (count > max_unique_events) continue;
			counter[key] = count + 1;
			pruned_events.unshift(item);
		}
		return pruned_events;
	},

	trim_delta(state_delta) {
		// trim static relic variables
		delete state_delta.relics;
		// trim static companion variables
		delete state_delta.companions;
		// trim _events/events (HUGE SPACE SAVER)
		let mc = state_delta['variables']['mc'];
		if (typeof mc === 'object' && mc !== null && Array.isArray(mc) == false) {
			// normal saves
			let value = mc['_events'];
			if (value != undefined && value != null) {
				if (typeof value[0] == "number") {
					value[1] = SaveFileTrimmer.trim_events(value[1], 20);
				} else {
					mc['_events'] = SaveFileTrimmer.trim_events(value, 20);
				}
			}
		} else if (Array.isArray(mc)) {
			// auto save
			if (mc[1][1]['events'] != null && mc[1][1]['events'] != undefined) {
				mc[1][1]['events'] = SaveFileTrimmer.trim_events(mc[1][1]['events'], 20);
			}
		}
	},

	trim_state(state) {
		for (const state_delta of state.delta) {
			SaveFileTrimmer.trim_delta(state_delta);
		}

		// 	// trim multi-static variables
		// 	/*
		// 	// TODO: NEEDS UNTRIM FUNCTIONS
		// 	const array_keys = Object.keys(state_delta.variables);
		// 	for (const key of array_keys) {
		// 		// curse#, relic#, item#
		// 		if (key.match(/curse\d+/) != null || key.match(/relic\d+/) != null || key.match(/item\d+/) != null) {
		// 			delete state_delta.variables[key];
		// 		}
		// 		// companionNAME
		// 		//if (key.includes("companion") && key != "companions") {
		// 		//	delete state_delta.variables[key];
		// 		//}
		// 	}
		// 	*/
	},

	untrim_state(state) {
		// curse1, curse2, curse3, ...
		// relic1, relic2, relic3, ...
		// item1, item2, item3, ...
	},

	iter_save_states(data, callback) {
		// autosave trim
		if (Object.hasOwn(data, 'autosave')) {
			if (data.autosave != null) callback(data.autosave.state);
		}
		// save slot trims
		if (Object.hasOwn(data, 'slots')) {
			for (const slot_data of data.slots) {
				if (slot_data != null) callback(slot_data.state);
			}
		}
	},

	trim(data) {
		console.log("trim save file");
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.trim_state);
		console.log(data);
	},

	untrim(data) {
		console.log("untrim save file");
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.untrim_state);
		console.log(data);
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

		window.SugarCube.storage.set = function(key, value) {
			console.log("storage - set - ", key);
			SaveFileTrimmer.trim(value);
			const serial_value = window.SugarCube.storage.constructor._serialize(value);
			LocalStorageMiddleware.setItem(window.SugarCube.storage._prefix + key, serial_value);
			return true;
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
