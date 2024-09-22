
// LocalStorage Middleware //
// by SPOOKEXE - 22.09.2024 - DD.MM.YYYY

const FFLAG_ENABLE_MIDDLEWARE = true;
// const FFLAG_ENABLE_PAKO_COMPRESS = true;

/*
function encodeToBase64(input) {
	// Convert the string to a UTF-8 encoded string
	const utf8String = encodeURIComponent(input);
	// Use btoa to encode it to Base64
	return btoa(utf8String);
}

function decodeFromBase64(base64) {
	// Decode from Base64
	const decodedString = atob(base64);
	// Convert back from UTF-8 to a normal string
	return decodeURIComponent(decodedString);
}

function pako_compressString(input) {
	const binaryString = new TextEncoder().encode(input); // Convert string to Uint8Array
	const compressed = pako.deflate(binaryString); // Compress
	return compressed; // Returns a Uint8Array
}

function pako_decompressData(compressed) {
	const decompressed = pako.inflate(compressed); // Decompress
	const decodedString = new TextDecoder().decode(decompressed); // Convert back to string
	return decodedString;
}
*/

const SaveFileTrimmer = {
	// trim events
	trim_events(events, max_unique_events) {
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

	// trim a delta-state
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

	// trim a state
	trim_state(state) {
		for (const state_delta of state.delta) {
			SaveFileTrimmer.trim_delta(state_delta);
		}
	},

	// untrim a state
	untrim_state(state) {
	},

	// iterate over all save states
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

	// trim a save file
	trim_save_file(data) {
		//console.log("trim save file");
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.trim_state);
		//console.log(data);
	},

	// untrim a save file
	untrim_save_file(data) {
		//console.log("untrim save file");
		SaveFileTrimmer.iter_save_states(data, SaveFileTrimmer.untrim_state);
		//console.log(data);
	}
}

window.hasDefinedMiddleware = false;
window.updateSugarCubeStorageMiddleware = () => {
	if (window.hasDefinedMiddleware == true) {
		console.log("SugarCube Middleware is already defined!");
		return;
	}

	if (window.SugarCube && window.SugarCube.storage) {
		window.hasDefinedMiddleware = true;
		console.log("Setting up SugarCube Saves Middleware");

		// https://github.com/tmedwards/sugarcube-2/blob/v2-develop/src/storage/adapters/webstorage.js

		//const original_set = window.SugarCube.storage.set;
		window.SugarCube.storage.set = function(key, value) {
			//console.log("storage - set - ", key);
			if (FFLAG_ENABLE_MIDDLEWARE == true) {
				SaveFileTrimmer.trim_save_file(value);
			}
			let serialized_value = window.SugarCube.storage.constructor._serialize(value);
			// TODO: fix this :(
			/*if (FFLAG_ENABLE_PAKO_COMPRESS == true) {
				serialized_value = "$$p$" + pako_compressString(encodeToBase64(serialized_value));
			}*/
			localStorage.setItem(window.SugarCube.storage._prefix + key, serialized_value);
			return true;
		}

		//const original_get = window.SugarCube.storage.get;
		window.SugarCube.storage.get = function(key) {
			//console.log("storage - get - ", key);
			let save_raw = localStorage.getItem(window.SugarCube.storage._prefix + key);
			if (save_raw == null) return null;
			/*if (save_raw.substring(0, 4) == "$$p$") {
				save_raw = pako_decompressData(decodeFromBase64(save_raw.substring(4)));
			}*/
			let saveObject = window.SugarCube.storage.constructor._deserialize(save_raw);
			if (saveObject == null) return null;
			if (FFLAG_ENABLE_MIDDLEWARE == true) {
				SaveFileTrimmer.untrim_save_file(saveObject);
			}
			return saveObject;
		}
	} else {
		console.warn('SugarCube is not loaded.');
	}
};

// auto setup middleware once storage is available
const intervalId = setInterval(() => {
	if (window.SugarCube.storage !== undefined) {
		window.updateSugarCubeStorageMiddleware();
		clearInterval(intervalId); // Clear the interval
	}
}, 10);
