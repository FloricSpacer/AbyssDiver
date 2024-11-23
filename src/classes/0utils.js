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

/**
 * Breast correction function
 * Returns a character's cupsize after correcting for age, pregnancy, menstruation cycle and lactation activity
 * @param prevBreast 	The uncorrected cupsize of the character
 * @param age 			The current apperent age of the character
 * @returns {number} 	The corrected cupsize
 */
function BreastCorrection(character, breastSize,age) {
	let fullyGrownAge = 18 - (character.gender - 1) / 5; // 1 year lower for fully feminine characters.
	if (age < fullyGrownAge) {
		breastSize = breastSize * Math.max(1 - (fullyGrownAge - age) / 10, 0);
	}
	
	if (!character.hasCurse(ShrunkenAssets)) {
		/*let assetChange = 0;
		for (let event of this.events) {
			assetChange = event.growAsset(assetChange);
		}

		if (breastSize > 0 || breastsGrowAnyway) {
			breastSize += assetChange;
		}*/

		if (character.daysConsideredPregnant >= 90) breastSize += 0.5;
		if (character.daysConsideredPregnant >= 120) breastSize += 0.5;

		if (character.id === setup.companionIds.mc && !character.isPregnant) {
			if (State.variables.menCycleFlag) {
				// Boost breast size after day 20 of the menstruation cycle.
				if (State.variables.time - State.variables.menCycleT - State.variables.menCycleVar > 20) {
					breastSize += 0.5;
				}
				// Boost breast size after giving birth until the next menstruation cycle.
				if (State.variables.menCycleT - State.variables.time > 0) {
					breastSize += 0.5;
				}
				if (State.variables.menCycleT - State.variables.time > 30) {
					breastSize += 0.5;
				}
			}
		} else if (!character.isPregnant && character.lastBirth < State.variables.time) {
			// Boost breast size for a while after giving birth.
			if (State.variables.time - character.lastBirth < 60) {
				breastSize += 0.5;
			}
			if (State.variables.time - character.lastBirth < 30) {
				breastSize += 0.5;
			}
		}
		breastSize += character.lactation;
	}

	
	return breastSize;
}

