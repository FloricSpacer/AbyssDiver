/* exported Constellation */
class Constellation {
	/**
	 * Creates a new constellation of curses.
	 * @param {string} name The name of this constellation.
	 * @param {Curse[]} curses The curses in the constellation.
	 * @param {string} [description] A description of this constellation.
	 * @param {Requirement[]} requirements Requirements necessary to take this constellation.
	 */
	constructor(name, curses, description='', requirements=[]) {
		this.name = name;
		this.curses = curses;
		this.description = description;
		this.requirements = requirements;
	}

	clone() {
		return new Constellation(this.name, this.curses, this.description);
	}

	toJSON() {
		return JSON.reviveWrapper(`new Constellation(...$ReviveData$)`, [this.name, this.curses, this.description])
	}

	/**
	 * Tests whether the given character can take this constellation, meaning every curse in it is compatible with the
	 * character's existing curses, every requirement is satisfied by the character, and there is at least one curse
	 * character doesn't have yet.
	 * @param character The character to test.
	 * @return {boolean} true iff the character can take this constellation.
	 */
	canBeTakenBy(character) {
		// if (!this.curses.every(c => character.isCompatible(c))) console.log(`${this.name}: incompatible curse`);
		// if (!this.requirements.every(r => r.isSatisfiedBy(character))) console.log(`${this.name}: unfulfilled requirement`);
		// if (!this.curses.some(c => character.curses.filter(cc => cc instanceof c.constructor).length
		//                           < this.curses.filter(cc => cc instanceof c.constructor).length)) console.log(`${this.name}: no new curses`);
		return this.curses.every(c => character.isCompatible(c)) &&
		       this.requirements.every(r => r.isSatisfiedBy(character)) &&
		       this.curses.some(c => character.curses.filter(cc => cc instanceof c.constructor).length
		                             < this.curses.filter(cc => cc instanceof c.constructor).length);
	}
}
window.Constellation = Constellation

class Requirement {
	clone() {
		return new this.constructor();
	}

	toJSON() {
		return JSON.reviveWrapper(`new ${this.constructor.name}()`);
	}

	/**
	 * Tests this requirement on the given character, returning true iff the character meets the requirement.
	 * @param character The character to test.
	 * @return {boolean} Whether the given character meets this requirement
	 */
	// eslint-disable-next-line no-unused-vars
	isSatisfiedBy(character) {
		return true;
	}

	/**
	 * Returns an error message which explains why this requirement isn't met.
	 * @return {string} The error message.
	 */
	errorMessage() {
		return "[This is a bug. Please report it to the developers.]"
	}
}

class NotGrowingReq extends Requirement {
	isSatisfiedBy(character) {
		return character.heightDir < 1;
	}

	errorMessage() {
		return 'Character may not be locked into height-increasing curses';
	}
}
window.NotGrowingReq = NotGrowingReq;

class NotShrinkingReq extends Requirement {
	isSatisfiedBy(character) {
		return character.heightDir > -1;
	}

	errorMessage() {
		return 'Character may not be locked into height-decreasing curses';
	}
}
window.NotShrinkingReq = NotShrinkingReq;

class HasVaginaReq extends Requirement {
	isSatisfiedBy(character) {
		return character.vagina > 0;
	}

	errorMessage() {
		return 'Character must have a vagina';
	}
}
window.HasVaginaReq = HasVaginaReq;

class HasPenisReq extends Requirement {
	isSatisfiedBy(character) {
		return character.penis > 0;
	}

	errorMessage() {
		return 'Character must have a penis';
	}
}
window.HasPenisReq = HasPenisReq;
