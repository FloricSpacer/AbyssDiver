"use strict";
/* global assert, AgeEvent, Curse, DoubleTrouble, ShrunkenAssets, Leaky, HardMode, InTheLimelight, BodyChangeEvent */

/**
 * @typedef SugarCubeSetupObject
 * @extends SugarCubeSetupObject
 * @property companionIds
 * @property id2name
 */
setup.companionIds = {
	mc: 0,
	maru: 1,
	lily: 2,
	khemia: 3,
	cherry: 4,
	cloud: 5,
	saeko: 6,
	twin: 7,
	golem: 8,
	bandit: 9,
	ai: 10,
}

setup.creatureIds = {
	BayingGourmetMale : 101,
	BayingGourmetFemale : 102,
	DragonMale: 103,
	DragonFemale: 104,
	Emily: 105,

}

setup.id2name = id => {
	switch (id) {
		case setup.companionIds.mc:
			return State.variables.mc.name;
		case setup.companionIds.maru:
			return State.variables.companionMaru.name;
		case setup.companionIds.lily:
			return State.variables.companionLily.name;
		case setup.companionIds.khemia:
			return State.variables.companionKhemia.name;
		case setup.companionIds.cherry:
			return State.variables.companionCherry.name;
		case setup.companionIds.cloud:
			return State.variables.companionCloud.name;
		case setup.companionIds.saeko:
			return State.variables.companionSaeko.name;
		case setup.companionIds.twin:
			return State.variables.companionTwin.name;
		case setup.companionIds.golem:
			return State.variables.companionGolem.name;
		case setup.companionIds.bandit:
			return State.variables.companionBandit.name;
		case setup.companionIds.ai:
			return State.variables.companionAi.name;
		case setup.creatureIds.BayingGourmetMale:
			return State.variables.creatureBayingGourmetMale.name;
		case setup.creatureIds.BayingGourmetFemale:
			return State.variables.creatureBayingGourmetFemale.name;
		default:
			console.error(`attempted to get name of invalid id ${id}`)
			return '[unknown person (please report this bug to the developers)]'
	}
}

setup.id2companion = id => {
	switch (id) {
		case setup.companionIds.mc:
			return State.variables.mc;
		case setup.companionIds.maru:
			return State.variables.companionMaru;
		case setup.companionIds.lily:
			return State.variables.companionLily;
		case setup.companionIds.khemia:
			return State.variables.companionKhemia;
		case setup.companionIds.cherry:
			return State.variables.companionCherry;
		case setup.companionIds.cloud:
			return State.variables.companionCloud;
		case setup.companionIds.saeko:
			return State.variables.companionSaeko;
		case setup.companionIds.twin:
			return State.variables.companionTwin;
		case setup.companionIds.golem:
			return State.variables.companionGolem;
		case setup.companionIds.bandit:
			return State.variables.companionBandit;
		case setup.companionIds.ai:
			return State.variables.companionAi;
		case setup.creatureIds.BayingGourmetMale:
			return State.variables.creatureBayingGourmetMale;
		case setup.creatureIds.BayingGourmetFemale:
			return State.variables.creatureBayingGourmetFemale;
		default:
			console.error(`attempted to get companion of invalid id ${id}`)
			return '[unknown person (please report this bug to the developers)]'
	}
}

/* exported Character */
class Character {
	/**
	 * Creates a new Character object.
	 * @param {Object} o
	 * @param {number} o.id The character's id. Associated IDs can be found in setup.companionIds.
	 * @param {string} o.name The character's name.
	 * @param {number} o.cost The cost to recruit the character, or -1 for unrecruitable characters (like the main
	 *     characters and the golem).
	 * @param {number} o.carry The carry capacity of the character.
	 * @param {number|undefined} o.affec The affection of the character towards the main character. Only required for
	 *     companions.
	 * @param {boolean} o.swap Whether the character has been body-swapped.
	 * @param {string} o.image The path to the image of the character.
	 * @param {string} o.imageIcon The path to the image of the character's icon.
	 * @param {'male' | 'female'} o.mindSex The gender identity of this character.
	 * @param {'male' | 'female'} o.osex The original sex of this character's body (as determined by its genitals).
	 * @param {number} o.obreasts The original breast size of this character's body.
	 * @param {number} o.desiredBreasts The breast size this character would like most.
	 * @param {number} o.openis The original size of this character's body's penis, or 0 if it has no penis.
	 * @param {number} o.ogender The original apparent gender of this body, as a number between 1 (completely male
	 *     expression) and 6 (completely female expression).
	 * @param {number} o.fit How fit this character is, as a number from 0 (weakling) to 10 (peak human performance).
	 * @param {number} o.oheight The original height of this character's body, in cm.
	 * @param {number} o.comfortableHeight The height at which this character feels most comfortable.
	 * @param {number} o.age The chronological age of this character at the beginning of the game.
	 * @param {string} o.appDesc A description of what makes this character's body special. Used when MC gains a
	 *     companion's body to determine how it affects them (narratively).
	 * @param {'darkness'|'spiders'|'wolves'|'snakes'|'insects'|'slime'|'desperation'|'rot'|'unknown'} o.fear What this
	 *     character fears most. 'unknown' is an unknown fear, although its event also fits with fear of the unknown.
	 * @param {string} o.ohair The original color of this character's body's hair.
	 * @param {string} o.oskinColor The original color of this character's body's skin.
	 * @param {string} o.oskinType The original texture of this character's body's skin.
	 * @param {string} o.oears The original shape of this character's body's ears.
	 * @param {string} o.oeyeColor The original color of this character's body's eyes.
	 * @param {string} o.oblood The original color of this character's blood.
	 * @param {number} o.osubdom The original submission/domination factor of this character.
	 * @param {number} o.pregnantT The day in which this character has been impregnated.
	 * @param {number} o.due The day in which this character's pregnancy is due.
	 * @param {number} o.lastBirth The day on which this character's last birth occurred.
	 * @param {boolean} o.tentaclePreg Whether this character is currently impragnated by tentacles.
	 * @param {boolean} o.switched Whether this character has switched bodies.
	 * @param {boolean} o.gestationJumps Tracks character specific gestation jumps for Gestation Jumpstart.
	 * @param {number} o.location Layer at which a character is told to wait.
	 * @param {CharEvent[]} o.events The list of events that affected this character.
	 */
	constructor({id, name, cost=-1, carry, affec=0, swap=false,
		            image, imageIcon, mindSex='male',
		            osex=mindSex, obreasts, desiredBreasts=obreasts,
		            openis, ogender, fit, oheight,
		            comfortableHeight = oheight, age, appDesc = '', fear,
		            ohair, oskinColor, oskinType='', oears='normal human', oeyeColor,
		            oblood='red', osubdom=0, pregnantT=setup.never, due=setup.never,
		            lastBirth=setup.never, tentaclePreg=false, switched=false, gestationJumps=0, location=-1, events=[]}) {
		if ([name, carry, image, imageIcon, obreasts, openis, ogender, fit, oheight, comfortableHeight,
			 age, appDesc, fear, ohair, oskinColor, oeyeColor].includes(undefined)) {
			console.error(`Character constructor called without all required arguments (${name || 'missing name'}).`);
		}

		assert(typeof id === 'number' && id >= 0,
			   `id must be a non-negative number, got ${id} (${name})`);
		this.id = id;
		assert(typeof name === 'string' && name.length > 0,
			   'name must be a non-empty string');
		this.name = name;
		assert(typeof cost === 'number' && cost > -2,
			   'cost must be a nonnegative number, or -1 for un-buyable companions');
		this.cost = cost;
		assert((typeof carry === 'number' || !isNaN(parseInt(carry))) && carry >= 0,
			   'carry must be a nonnegative number');
		this.carry = parseInt(carry);
		assert(typeof affec === 'number' || affec === undefined,
			   'affection must be a number');
		this.affec = affec;
		assert(typeof swap === 'boolean',
			   'swap must be a boolean');
		this.swap = swap;
		assert( typeof image === 'string',
				'image must be a string');
		this.image = image;
		assert( typeof imageIcon === 'string',
				'imageIcon must be a string');
		this._imageIcon = imageIcon;
		assert(['male', 'female'].includes(mindSex),
			   'mindSex must be "male" or "female"');
		this.mindSex = mindSex;
		assert(['male', 'female'].includes(osex),
			   'osex must be "male" or "female"');
		this.osex = osex;
		assert(typeof obreasts === 'number' && obreasts >= 0,
			   'obreasts must be a nonnegative number');
		this.obreasts = obreasts;
		assert(typeof desiredBreasts === 'number' && desiredBreasts >= 0,
			   'desiredBreasts must be a nonnegative number');
		this.desiredBreasts = desiredBreasts;
		assert(typeof openis === 'number' && obreasts >= 0,
			   'openis must be a nonnegative number');
		this.openis = openis;
		assert(typeof ogender === 'number' && ogender >= 1 && ogender <= 6,
			   'ogender must be a number between 1 and 6');
		this.ogender = ogender;
		assert((typeof fit === 'number' || !isNaN(parseInt(fit))),
			   `[${name}] fit must be a number between 0 and 10`);
		this.fit = parseInt(fit);
		assert((typeof oheight === 'number' || !isNaN(parseInt(oheight))) && oheight > 0,
			   'oheight must be a positive number');
		this.oheight = parseInt(oheight);
		assert(typeof comfortableHeight === 'number' && comfortableHeight > 0,
			   'comfortableHeight must be a positive number');
		this.comfortableHeight = comfortableHeight;
		assert((typeof age === 'number' || !isNaN(parseInt(age))) && age > 0,
			   'age must be a positive number');
		this.age = parseInt(age);
		assert(typeof appDesc === 'string',
			   'appDesc must be a string');
		this.appDesc = appDesc;
		assert(['darkness', 'spiders', 'wolves', 'snakes', 'insects',
				'slime', 'desperation', 'rot', 'unknown', ""].includes(fear),
			   `fear must be one of the implemented fears: 'darkness', 'spiders', 'wolves', 'snakes', 'insects', 
		'slime', 'desperation', 'rot', 'unknown'`);
		this.fear = fear;
		assert(typeof ohair === 'string',
			   'ohair must be a string');
		this.ohair = ohair;
		assert(typeof oskinColor === 'string',
			   'oskincolor must be a string');
		this.oskinColor = oskinColor;
		assert(typeof oskinType === 'string',
			   'oskinType must be a string');
		this.oskinType = oskinType;
		assert(typeof oears === 'string',
			   'oears must be a string');
		this.oears = oears;
		assert(typeof oeyeColor === 'string',
			   'oeyecolor must be a string');
		this.oeyeColor = oeyeColor;
		assert(typeof oblood === 'string',
			   'oblood must be a string');
		this.oblood = oblood;
		assert(typeof osubdom === 'number',
			   'osubdom must be a number');
		this.osubdom = osubdom;
		assert(Array.isArray(events),
			   "events must be an array of events");
		this._events = events;
		assert(typeof pregnantT === 'number',
			   'pregnantT must be a number');
		this.pregnantT = pregnantT;
		assert(typeof due === 'number',
			   'due must be a number');
		this.due = due;
		assert(typeof lastBirth === 'number',
			   'lastBirth must be a number')
		this.lastBirth = lastBirth;
		assert(typeof tentaclePreg === 'boolean',
			   'tentaclePreg must be a boolean')
		this.tentaclePreg = tentaclePreg;
		assert(typeof switched === 'boolean',
			   'switched must be a boolean')
		this.switched = switched;
		assert(typeof gestationJumps === 'number',
		'gestationJumps must be a number')
 		this.gestationJumps = gestationJumps;
		assert(typeof location === 'number',
		'location must be a number')
		this.location = location;
	}

	/**
	 * Returns the internal state of this Character, from which another character can be built.
	 * @returns {{mindSex: ("male"|"female"), oears: string, fit: number, comfortableHeight: number, imageIcon: string, oheight: number, id: number, ohair: string, pregnantT: number, events: CharEvent[], fear: ("darkness"|"spiders"|"wolves"|"snakes"|"insects"|"slime"|"desperation"|"rot"|"unknown"), image: string, cost: number, osex: ("male"|"female"), swap: boolean, ogender: number, oblood: string, lastBirth: number, oskinColor: string, oeyeColor: string, desiredBreasts: number, due: number, tentaclePreg: boolean, openis: number, appDesc: string, oskinType: string, name: string, affec: (number|undefined), switched: boolean, carry: number, obreasts: number, age: number, location: number}}
	 */
	_internalState() {
		return {
			id: this.id, name: this.name, cost: this.cost, carry: this.carry, affec: this.affec, swap: this.swap,
			image: this.image, imageIcon: this._imageIcon,
			mindSex: this.mindSex, osex: this.osex, obreasts: this.obreasts,
			desiredBreasts: this.desiredBreasts, openis: this.openis, ogender: this.ogender,
			fit: this.fit, oheight: this.oheight, comfortableHeight: this.comfortableHeight,
			age: this.age, appDesc: this.appDesc, fear: this.fear, ohair: this.ohair,
			oskinColor: this.oskinColor, oskinType: this.oskinType, oears: this.oears,
			oeyeColor: this.oeyeColor, oblood: this.oblood, pregnantT: this.pregnantT, due: this.due, tentaclePreg: this.tentaclePreg,
			lastBirth: this.lastBirth, switched: this.switched, gestationJumps: this.gestationJumps, location: this.location, events: this._events.map(e => e)
		};
	}

	/**
	 * Clones this character.
	 * @returns {Character} A (non-deep) copy of this character.
	 */
	clone() {
		return new Character(this._internalState());
	}

	/**
	 * Creates a sugarcube revivable json object from which this Character can be revived.
	 * @returns {[]} The revivable JSON.
	 */
	toJSON() {
		return JSON.reviveWrapper(`new Character($ReviveData$)`, this._internalState())
	}

	/**
	 * returns whether this character is pregnant.
	 * @returns {boolean} true iff this character is pregnant.
	 */
	get isPregnant() {
		if (this.womb === 0) this.setNotPregnant();
		return this.pregnantT <= State.variables.time
	}

	// I could use a setter for setConsideredPregnant and setNotPregnant instead, but I don't want to confuse people
	// with the somewhat unintuitive behavior that setting pregnant = true would cause a pregnancy to start two weeks
	// ago, and that setting it to true when it's already set resets the pregnancy. Calling the function explicitly
	// makes it clearer that it has side effects.
	/**
	 * Makes this character pregnant from two weeks ago.
	 */
	setConsideredPregnant() {
		if (this.womb === 0) {
			console.error('Can\'t make a character without wombs pregnant.');
			return;
		}
		this.pregnantT = State.variables.time - 14;
		this.due = this.pregnantT + 280 + random(-7, 7);
		this.gestationJumps = 0;
	}

	/**
	 * Makes this character not pregnant.
	 */
	setNotPregnant() {
		this.pregnantT = setup.never;
		this.due = setup.never;
		this.tentaclePreg = false;
		if (State.variables.pregnant_surprise === this){
			State.variables.pregnant_surprise = ""
		} 
		this.gestationJumps = 0;
	}

	/**
	 * Gets the due date of this character
	 * @returns {number} The day in which this character is due.
	 */
	get dueDate() {
		if (this.womb === 0) this.setNotPregnant();
		return this.due;
	}

	/**
	 * Gets the number of days this character has been pregnant.
	 * @returns {number} The number of days elapsed since fertilisation.
	 */
	get daysConsideredPregnant() {
		if (this.womb === 0) this.setNotPregnant();
		return Math.max(State.variables.time - this.pregnantT, 0);
	}

	/**
	 * Gets the number of days left until this character's pregnancy is due.
	 * @returns {number} The number of days left in this character's pregnancy
	 */
	get daysUntilDue() {
		if (!this.isPregnant) return setup.never;
		return Math.max(this.dueDate - State.variables.time, 0);
	}

	get curses() {
		if (this.id === setup.companionIds.twin) return State.variables.mc.curses;
		return this.events.filter(e => e instanceof Curse);
	}

	get events() {
		if (this.id === setup.companionIds.twin) {
			// The twin gets all events (curses and forage effects) of the main character.
			// Except body switch, which needs to be inverted if targeting the twin and omitted otherwise.
			return State.variables.mc._events.map(e => {
				if (!(e instanceof BodyChangeEvent)) {
					return e;
				}
				if (e.next.id === setup.companionIds.twin) {
					let ret = e.clone();
					ret.previous = e.next;
					ret.next = e.previous;
					return ret;
				} else {
					return false;
				}
			}).filter(e => e !== false);
		}
		return this._events;
	}

	set events(value) {
		this._events = value;
	}

	/**
	 * Removes a Curse from this character.
	 * Curses on the main character should always be removed this way to ensure it's removed from the twin too,
	 * not dropped from events manually.
	 * @param {Class | string} curse The name or class of the Curse to remove.
	 * @param {boolean} all Iff all is true, removes all copies of the Curse, not just the last.
	 */
	removeCurse(curse, all = false) {
		let predicate = typeof curse === 'string' ? e => e.name === curse : e => e instanceof curse;
		if (all) {
			this.events = this.events.filter(predicate);
		} else {
			// noinspection JSUnresolvedReference -- findLastIndex exists, I'm not sure why my linter claims it doesn't.
			let i = this.events.findLastIndex(e => typeof curse === 'string' ? e.name === curse : e instanceof curse);
			if (i >= 0) this.events.deleteAt(i);
		}
		if (this.id === setup.companionIds.mc) {
			State.variables.companionTwin.removeCurse(curse, all);
		}
	}

	/**
	 * Adds a Curse to this character. Does not change corruption.
	 * Curses on the main character should always be added this way to ensure the twin gets it too, not inserted
	 * into events manually.
	 * @param {Curse} curse The Curse to add.
	 */
	addCurse(curse) {
		if (curse.time !== State.variables.time) {
			console.warn('Curse added to character at a date differing from the present. This is most likely a bug.')
		}
		this.events.push(curse);
		if (this.id === setup.companionIds.mc && this.hasCurse(DoubleTrouble)) {
			State.variables.companionTwin.addCurse(curse);
		}
	}

	/**
	 * Returns the most recently added copy of the given event, or undefined if this character does not have the given event.
	 * @param {string | Class} event The name of the event to get as a string, or its class.
	 * @returns {CharEvent | undefined} The event in question or undefined if none was found.
	 */
	getEvent(event) {
		let eventIndex = this.events.findLastIndex(typeof event === 'string' ? e => e.name === event : e => e instanceof event);
		if (eventIndex < 0) return undefined;
		return this.events[eventIndex];
	}

	/**
	 * Returns the most recently taken copy of the given Curse, or undefined if this character does not have the given curse.
	 * @param {string | Class} curse The name of the Curse to get as a string, or its class.
	 * @returns {Curse | undefined} The Curse in question or undefined if none was found.
	 */
	getCurse(curse) {
		// noinspection JSValidateTypes -- if the parameter is a Curse name or class, the event we find is always a curse.
		return this.getEvent(curse);
	}

	/**
	 *
	 * @param curse
	 * @returns {boolean}
	 */
	hasCurse(curse) {
		return this.events.some(typeof curse === 'string' ? e => e.name === curse : e => e instanceof curse);
	}

	/**
	 * Returns true iff this character can take the given curse.
	 * @param curse The curse to be checked.
	 * @returns {boolean} Whether the given curse is compatible with this character's curses.
	 */
	isCompatible(curse) {
		return !this.curses.some(c => c.name in curse.incompatibilities);
	}

	
	/**
	 * Returns the character's current age as it would be without age-reducing Curses.
	 * Includes time spent in the Abyss and the effects of the fountain of youth.
	 * @returns {number} The character's biological age.
	 */
	get realAge() {
		let daysElapsed = State.variables.time;
		if (this.id === setup.companionIds.mc && State.variables.eternalYouth < State.variables.time) {
			daysElapsed = State.variables.eternalYouth;
		}
		return (this.age * AgeEvent.aYear + daysElapsed * AgeEvent.aDay) / AgeEvent.aYear;
	}

	/**
	 * Returns the character's apparent age.
	 * @returns {number} The character's apparent age, including age-reducing effects.
	 */
	get appAge() {
		// This code could be simplified a lot if we make eternal youth an event.
		let eternalYouthTime = State.variables.eternalYouth * AgeEvent.aDay;
		let curAge = this.age * AgeEvent.aYear;
		let unitsElapsed = 0;
		for (let event of this.events) {
			if (unitsElapsed < eternalYouthTime) {
				let unitsSinceLastEvent = Math.min(event.time * AgeEvent.aDay, eternalYouthTime) - unitsElapsed;
				curAge += unitsSinceLastEvent;
			}
			curAge = event.age(curAge);
			unitsElapsed = event.time * AgeEvent.aDay;
		}
		let timeSinceLastEvent = 0;
		if (unitsElapsed < eternalYouthTime) timeSinceLastEvent = Math.min(State.variables.time * AgeEvent.aDay, eternalYouthTime) - unitsElapsed;
		curAge = Math.max(curAge + timeSinceLastEvent, settings.appAgeControl * AgeEvent.aYear);
		return curAge / AgeEvent.aYear;
	}

	/**
	 * Returns the gender expression of this character as a number between 1 (folly masculine) and 6 (fully feminine)
	 * @returns {number} The gender expression of this character.
	 */
	get gender() {
		let gender = this.ogender;
		for (let event of this.events) {
			gender = event.changeGender(this, gender);
		}

		if (this.daysConsideredPregnant >= 90 && this.daysUntilDue > 0) {
			gender += 1;
		}

		if (this.appAge <= 14 && gender > 5) {
			gender -= 1;
		} else if (this.appAge <= 14 && gender < 2) {
			gender += 1;
		}
		
		if (this.appAge < 12 && gender > 4) {
			gender -= 1;
		} else if (this.appAge < 12 && gender < 3) {
			gender += 1;
		} 
		return Math.clamp(gender, 1, 6)
	}

	/**
	 * Returns the base size of this character's penis. For internal use only.
	 * When writing events involving this character use penisCor instead.
	 * @returns {number} The character's penis' base size.
	 */
	get penis() {
		let penis = this.openis;
		for (let event of this.events) {
			penis = event.changePenis(this, penis);
		}
		return penis;
	}

	/**
	 * Returns the size of this character's penis.
	 * @returns {number} The character's penis' size, or 0 if they don't have one.
	 */
	get penisCor() {
		let penis = this.penis;
		if (penis > 0) {
			let assetChange = 0;
			for (let event of this.events) {
				assetChange = event.growAsset(assetChange);
			}
			penis += assetChange * 2;

			let fullyGrownAge = 18 - (this.gender - 1) / 5; /* 1 year lower for fully feminine characters. */
			if (this.appAge < fullyGrownAge) {
				penis = Math.max(penis * (1 - (fullyGrownAge - this.appAge) / 12), 1);
			}
		}
		for (let event of this.events) {
			penis = event.miniOrGigantify(penis);
		}
		return penis;
	}

	/**
	 * Returns the number of this character's vaginas.
	 * @returns {number} The number of vaginas this character has.
	 */
	get vagina() {
		let vag = this.osex === 'male' ? 0 : 1;
		for (let event of this.events) {
			vag = event.changeVagina(this, vag);
		}
		return vag;
	}

	/**
	 * Returns whether this character has two penises.
	 * @returns {boolean} true iff this character has a double penis.
	 */
	get doublePenis() {
		return this.events.reduce((v, e) => e.doublePenis(this, v), false);
	}

	/**
	 * Returns the sex of this character's body.
	 * @returns {'doll-like' | 'futa' | 'male' | 'female'} The sex of this character's body.
	 */
	get sex() {
		let penis = this.penis
		let vagina = this.vagina
		let breasts = this.breasts

		if (penis === 0 && vagina === 0) return 'doll-like';
		if (penis > 0 && (breasts > 1 || vagina > 0)) return 'futa';//changed breast value to 1 so men with puffy nipples are still considered men
		if (penis > 0) return 'male';
		if (vagina > 0) return 'female';
		// This can only happen if penis or vagina are < 0 somehow
		console.error('character has impossible genitals:');
		console.error(this);
		return 'futa'
	}

	/**
	 * Returns the number of wombs this character has.
	 * @returns {number} The number of wombs in this character's body.
	 */
	get womb() {
		let wombs = this.vagina;
		let extraWombLocations = []
		for (let event of this.events) {
			[wombs, extraWombLocations] = event.changeWomb(this, wombs, extraWombLocations);
		}
		return wombs;
	}

	/**
	 * Returns the location of this character's first additional womb.
	 * @returns {'vagina' | 'urethra' | 'anus' | 'throat'}
	 * @deprecated use extraWombs instead
	 */
	get womb1() {
		let wombs = this.vagina;
		let extraWombLocations = []
		for (let event of this.events) {
			[wombs, extraWombLocations] = event.changeWomb(this, wombs, extraWombLocations);
		}
		return extraWombLocations[0] || '';
	}

	/**
	 * Returns the location of this character's second additional womb.
	 * @returns {'vagina' | 'urethra' | 'anus' | 'throat'}
	 * @deprecated use extraWombs instead
	 */
	get womb2() {
		let wombs = this.vagina;
		let extraWombLocations = []
		for (let event of this.events) {
			[wombs, extraWombLocations] = event.changeWomb(this, wombs, extraWombLocations);
		}
		return extraWombLocations[1] || '';
	}

	/**
	 * Returns the locations of this character's additional wombs.
	 * @returns {['vagina' | 'urethra' | 'anus' | 'throat']}
	 */
	get extraWombs() {
		let wombs = this.vagina;
		let extraWombLocations = []
		for (let event of this.events) {
			[wombs, extraWombLocations] = event.changeWomb(this, wombs, extraWombLocations);
		}
		return extraWombLocations;
	}

	/**
	 * Returns the lactation amount of this character. Between 0 and 2.
	 * @returns {number}
	 */
	get lactation() {
		let lactation = 0;
		for (let event of this.events) {
			lactation = event.changeLactation(lactation);
		}

		/* Boost lactation in the last stages of pregnancy. */
		if (this.isPregnant) {
			if (this.daysConsideredPregnant > 240) lactation += 1
			if (this.daysConsideredPregnant > 270) lactation += 1
		} else if (this.id === setup.companionIds.mc) {
			/* Boost lactation after giving birth until the next menstruation cycle. */
			if (State.variables.menCycleFlag && State.variables.menCycleT - State.variables.time > 0) {
				lactation += 1;
			}
			if (State.variables.menCycleFlag && State.variables.menCycleT - State.variables.time > 30) {
				lactation += 1;
			}
		} else if (this.lastBirth < State.variables.time) {
			/* Boost lactation for a while after giving birth. */
			if (State.variables.time - this.lastBirth < 60) {
				lactation += 1;
			}
			if (State.variables.time - this.lastBirth < 30) {
				lactation += 1;
			}
		}

		/* Maximize Lily's lactation if you're breastfeeding from her. */
		if (this.id === setup.companionIds.lily && State.variables.LilyConvoLac) {
			lactation += 2;
		}

		// Changed 'doll like' condition with no penis no vagina condition to avoid recursion. Can't lactate without nipples
		if (this.penis === 0 && this.vagina === 0) {
			lactation = 0;
		}

		lactation = Math.min(lactation, 2)

		return lactation;
	}

	/**
	 * Returns the base size of this character's breasts. For internal use only.
	 * When writing events involving this character, use breastsCor instead.
	 * @returns {number}
	 */

	
  get breasts() {
	let breasts = this.obreasts;
	let curAge = this.age;
  
	const sexChangingCurse = this.curses.find(curse => curse instanceof SexSwitcheroo || curse instanceof FutaFun);
	if (sexChangingCurse) {
	  breasts = sexChangingCurse.changeBreasts(this, breasts);
	}
	for (let event of this.events) {
	  if (!(event instanceof SexSwitcheroo) && !(event instanceof FutaFun)) {
		breasts = event.changeBreasts(this, breasts);
		let currentBreasts = BreastCorrection(this, breasts, curAge);
		if ((currentBreasts > 0 || this.penis == 0) && !this.hasCurse(ShrunkenAssets)) {
		  breasts = event.growAsset(breasts);
		}
	  }
	}
	for (let event of this.events) {
	  if (event.type == 'age') {
		curAge = this.age * AgeEvent.aYear;
		curAge = event.age(curAge);
	  }
	}
	breasts = BreastCorrection(this, breasts, curAge);
	return breasts;
  }


	/**
	 * Returns the size of this character's breasts.
	 * @returns {number} The size of this character's breasts in cups, or 0 for flat chests.
	 */
	get breastsCor() {
		return BreastCorrection(this, this.breasts, this.appAge) ;
	}

	/**
	 * Returns the cup size of this character's breasts as a string.
	 * @returns {string} The cup size of this character's breasts, or 'flat' for flat-chested characters (typically men).
	 */
	get breastsLabel() {
		let size = this.breastsCor;
		if (size < 1) return 'flat';
		if (size < 2) return 'AA';
		if (size >= 20) return 'S';
		if (!isFinite(size)) return 'immeasurable';
		// A is the character at code point 64. The following code points contain the rest of the alphabet, in order.
		// Look up an ASCII table for more information (this is unicode not ascii, but the first 128 code points are
		// copied from ascii for compatibility).
		return String.fromCodePoint(63 + Math.floor(size));
	}

	/**
	 * Returns the direction in which height changes are applied to this character.
	 * @returns {number} -1, 0 or 1 for decreasing, unset or increasing respectively.
	 */
	get heightDir() {
		let direction = 0;
		for (let event of this.events) {
			direction = event.changeHeightDirection(direction);
		}
		return direction;
	}

	/**
	 * Returns the height of this character.
	 * @returns {number} The height of this character in cm.
	 */
	get height() {
		let height = this.oheight;
		let direction = 0;
		for (let event of this.events) {
			direction = event.changeHeightDirection(direction);
			height = event.changeHeight(height, direction);
		}
		for (let event of this.events) {
			height = event.miniOrGigantify(height);
		}

		/* Change in height with genderlevel changes and height increases/decreases; it is modeled such that */
		/* 5 cm is always 5 cm with respect to your starting height and irrespective of starting gender.     */
		let adultHeight = this.oheight * (1 - 0.01525 * ((this.gender - 1) - (this.osex === 'female' ? 5 : 0))) +
						  (height - this.oheight) * (1 - 0.01525 * (this.osex === 'female' ? 5 : 0))

		let size_factor = 18 - this.appAge;

		if (size_factor < 0.2 * (this.gender - 1)) {
			return adultHeight;
		}
		if (size_factor <= 6) {
			/* Puberty phase: It shifts for females as theirs ends earlier; for simplicity */
			/* I assumed the start is the same regardless, although this is not entirely   */
			/* correct. I used a polynomial here to simulate the 'reverse growth spurt'.   */
			let gendered_factor = size_factor - 0.2 * (this.gender - 1);
			return adultHeight * (1 -
								  ( 4.70611e-3 - 8.1433e-4 * (this.gender - 1)) * gendered_factor -
								  ( 1.1049e-4  - 1.140e-5  * (this.gender - 1)) * gendered_factor**2 -
								  ( 1.6698e-3  - 1.3722e-4 * (this.gender - 1)) * gendered_factor**3 -
								  (-1.7701e-4  + 2.114e-5  * (this.gender - 1)) * gendered_factor**4);
		}
		if (size_factor <= 15) {
			/* The second phase of linear growth or decline, it's a decent approximation without making things too     */
			/* complicated. It ends at age 3 (originally 4, but changed it to not break the rest of the code). The     */
			/* calculation for the puberty growth spurt is in here to provide a starting point for the linear decline. */
			let gendered_factor = 6 - 0.2 * (this.gender - 1);
			return adultHeight * (1 -
								  ( 4.70611e-3 - 8.1433e-4 * (this.gender - 1)) * gendered_factor -
								  ( 1.1049e-4  - 1.140e-5  * (this.gender - 1)) * gendered_factor**2 -
								  ( 1.6698e-3  - 1.3722e-4 * (this.gender - 1)) * gendered_factor**3 -
								  (-1.7701e-4  + 2.114e-5  * (this.gender - 1)) * gendered_factor**4 -
								  (0.033 + 0.0009 * (this.gender - 1)) * (size_factor - 6));
		}
		console.error('Found character aged less than 3:');
		console.error(this);
		return height;
	}

	/**
	 * Returns the height of this character. Identical to height, but retained for backwards-compatibility.
	 * @returns {number} The height of this character in cm
	 * @deprecated Use height instead
	 */
	get heightCor() {
		return this.height;
	}

	/**
	 * Returns whether this character has a size handicap that increases travel times.
	 * Only has an effect on the main character.
	 * @returns {boolean} true iff this character is handicapped.
	 */
	get hasSizeHandicap() {
		let handicapped = false;
		for (let event of this.events) {
			handicapped = event.addSizeHandicap(handicapped);
		}
		return handicapped;
	}

	/**
	 * Returns the base libido of this character, only including permanent effects and excluding the 2 ground libido.
	 * @returns {number} The strength of this character's base libido.
	 */
	get baseLibido() {
		let libido = 0;
		for (let event of this.events) {
			libido = event.changeLibido(libido);
		}
		return libido;
	}

	/**
	 * Returns the strength of the character's libido.
	 * @returns {number} The strength of this character's libido.
	 */
	get libido() {
		let libido = this.baseLibido + 2;

		if (this.id === setup.companionIds.mc) {
			if (State.variables.lastFlan !== undefined &&
				State.variables.time === State.variables.lastFlan) {
				libido++;
			}
			if (State.variables.menCycleFlag) {
				/* Libido boost around 14 days into the cycle. */
				if (13 <= State.variables.time - State.variables.menCycleT
					&& State.variables.time - State.variables.menCycleT <= 15) {
					libido++;
				}
				/* Libido penalty around 22 days into the cycle. */
				if (20 <= State.variables.time - State.variables.menCycleT
					&& State.variables.time - State.variables.menCycleT <= 24) {
					libido--;
				}
			}
			if (this.curses.some(c => c.name === 'Heat/Rut')
				&& State.variables.time - State.variables.heatCycleT === 14) {
				libido += 2;
			}
			if (this.curses.some(c => c.name === 'The Maxim')) {
				let activity = Math.random() * 2;
				if (libido < 2 && activity > 1) {
					libido += 3;
				}
				if (libido < 4 && activity > 2) {
					libido += 2;
				}
			}
		}
		return libido;
	}

	/**
	 * Returns the amount by which this character's standards are lowered.
	 * @returns {number} The amount by which this character's standards are lowered.
	 */
	get loweredStandards() {
		let lowering = 0;
		for (let event of this.events) {
			lowering = event.lowerStandards(lowering);
		}
		return lowering;
	}

	/**
	 * Returns the submission/dominance value of this character.
	 * @returns {number} The degree of sub/dom-ness of this character.
	 */
	get subdom() {
		let subdom = this.osubdom;
		for (let event of this.events) {
			subdom = event.changeSubDom(subdom);
		}
		return subdom;
	}

	/**
	 * Returns the apparent gender of this character.
	 * @returns {number} The apparent gender of this character.
	 */
	get appGender() {
		let scaleFactor = this.events.reduce((v, e) => e.miniOrGigantify(v), 1);
		let unscaledPenis = this.penisCor / scaleFactor;

		let appGender = 2 * (this.gender - 1)
						- 0.25 * (unscaledPenis - 4)
						+ 0.5 * (this.breastsCor - 3)
						- (this.fit > 2 ? 1 : 0);
		if (this.id === setup.companionIds.mc) {
			appGender += 0.5 * State.variables.colwear + 0.25 * State.variables.scent + 0.5 * State.variables.slwear
			if (State.variables.dollevent2) appGender++;
			else if (this.hasCurse(CrossdressYourHeart )){
				if (State.variables.sex == "male") appGender++;
				else appGender--;
			}
		}
		return appGender;
	}

	/**
	 * Returns a description of this character's hair.
	 * @returns {string} A description of this character's hair.
	 */
	get hair() {
		let hair = this.ohair;
		return this.events.reduce((v, e) => e.changeHair(v), hair);
	}

	/**
	 * Returns a description of this character's ears.
	 * The description is a string such as would fit into the phrase "this character has ### ears",
	 * for example "furry cat".
	 * @returns {string} A description of this character's ears.
	 */
	get ears() {
		let ears = this.oears;
		return this.events.reduce((v, e) => e.changeEars(v), ears);
	}

	/**
	 * Returns the quantity of this character's body hair.
	 * 1: normal human
	 * 0: no body hair below the nose (hair removal, scales, exoskeleton...)
	 * 2: full-body hair coverage (maximum fluff)
	 * @returns {number} The level of this character's body hair.
	 */
	get bodyHair() {
		let bodyHair = 1;
		return this.events.reduce((v, e) => e.changeBodyHair(v), bodyHair);
	}

	/**
	 * Returns a description of this character's skin texture.
	 * @returns {string} A description of this character's skin texture
	 */
	get skinType() {
		let skinType = this.oskinType;
		return this.events.reduce((v, e) => e.changeSkinType(v), skinType);
	}

	/**
	 * Returns the color of this character's skin.
	 * @returns {string} The color of this character's skin.
	 */
	get skinColor() {
		let skinColor = this.oskinColor;
		return this.events.reduce((v, e) => e.changeSkinColor(v), skinColor);
	}

	/**
	 * Returns the color of this character's eyes.
	 * @returns {string} The color of this character's eyes.
	 */
	get eyeColor() {
		let eyeColor = this.oeyeColor;
		return this.events.reduce((v, e) => e.changeEyeColor(v), eyeColor);
	}

	/**
	 * Returns a list of this character's tails.
	 * @returns {[string]} A list of strings, each describing one tail this character has.
	 */
	get tail() {
		let tails = [];
		return this.events.reduce((v, e) => e.changeTails(v), tails);
	}

	/**
	 * Returns a description of this character.
	 * @returns {string} A description of this character.
	 */
	get desc() {
		let desc = '';
		return this.events.reduce((v, e) => e.changeDesc(v), desc);
	}

	/**
	 * Returns the color of this character's blood.
	 * @returns {string} The color of this character's blood.
	 */
	get blood() {
		let blood = this.oblood;
		return this.events.reduce((v, e) => e.changeBlood(v), blood);
	}

	/**
	 * Returns the pitch of this character's voice (used to determine text color in conversations).
	 * @returns {number} The pitch of this character's voice.
	 */
	get genderVoice() {
		if (this.id === setup.companionIds.mc && State.variables.colwear) {
			return 99;
		}
		return this.gender;
	}

	/**
	 * Returns part of the CSS used to style conversations involving this character.
	 * @returns {string} A CSS string.
	 */
	get style() {
		return 'border: 2px solid rgb(1, 0, 0);'
	}

	/**
	 * Returns part of the CSS used to style conversations involving this character.
	 * @returns {string} A CSS string.
	 */
	get style1() {
		let r, g, b, a;
		switch (this.gender) {
			case 1:
				r = 40;
				g = 40;
				b = 255;
				break;
			case 2:
				r = 80;
				g = 80;
				b = 240;
				break;
			case 3:
				r = 120;
				g = 100;
				b = 230;
				break;
			case 4:
				r = 165;
				g = 120;
				b = 220;
				break;
			case 5:
				r = 210;
				g = 140;
				b = 210;
				break;
			case 6:
				r = 255;
				g = 160;
				b = 200;
				break;
			default:
				console.error(`${this.name} has invalid gender:`)
				console.error(this);
				r = 255;
				g = 0;
				b = 0;
		}
		let appAge = this.appAge;
		if (appAge > 18) a = 1;
		else if (appAge > 15) a = 0.8;
		else if (appAge > 12) a = 0.6;
		else if (appAge > 9) a = 0.4;
		else a = 0.2;

		return `box-shadow: 0 0 10px 2px rgba(${r}, ${g}, ${b}, ${a});
		background-color: black;`
	}

	/**
	 * Sets the character's original image icon. Has no effect on body-swapped characters.
	 * @param value
	 */
	set imageIcon(value) {
		this._imageIcon = value;
	}

	/**
	 * Returns the path of the image used in icons representing this character.
	 * @returns {string} The path to the image containing this character's icon.
	 */
	get imageIcon() {
		let transformed = this.events.reduce((v, e) => e.changeImageIcon(v), '');
		// as a special exception, anybody who swapped with the bandit is released
		if (transformed === 'Icons/banditIcon.jpg') transformed = 'Icons/banditIcon_released.jpg';
		if (transformed !== '') return transformed;

		if (this.id === setup.companionIds.mc || this.id === setup.companionIds.twin) {
			let image = this.appGender <= 5 ? 'M' : 'F';
			return `Player Icons/player${image}.jpg`;
		}
		/* //Code for apperent gender based portrait switches for most characters
		if (!(this.id === setup.companionIds.bandit || this.id === setup.companionIds.golem || this.id === setup.companionIds.maru)) {
			let image = this.appGender <= 5 ? 'M' : 'F';
			if (this.id === setup.companionIds.mc || this.id === setup.companionIds.twin) {
				return `Player Icons/player${image}.jpg`;
			}else{
				return `Icons/${this.name}Icon${image}.png`
			}
		}*/

		if (this.id === setup.companionIds.bandit && State.variables.BanditConvo0) {
			return 'Icons/banditIcon_released.jpg'
		}

		return this._imageIcon;
	}

	/**
	 * Returns the sexual fluid production of this character, as a percentage of baseline human.
	 * @returns {number} The % of the original sexual fluid production of this character.
	 */
	get fluids() {
		let fluids = 100;

		if (this.id === setup.companionIds.mc) {
			// We should turn this into an event sooner or later
			fluids += State.variables.crumbleFluid;
		}

		if (this.hasCurse(Leaky)) {
			fluids *= 2;
		}

		return fluids;
	}

	/**
	 * Returns the lewdness of this character. Only meaningful for the main character.
	 * @returns {number} The lewdness of this character.
	 */
	get lewdness() {
		let lewdness = this.baseLibido * 8;
		let mult = 1;
		let hasLuminous = false;
		if (this.id === setup.companionIds.mc) {
			hasLuminous = State.variables.luminousWear;

			lewdness += State.variables.algalSize;
			if (State.variables.algalSize > 30) lewdness += 2;
			if (State.variables.algalSize > 60) lewdness += 4;
			if (State.variables.algalSize > 120) lewdness += 8;
			if (State.variables.foodL6 > 11) lewdness += 2;
			if (State.variables.foodL6 > 30) lewdness += 4;
			if (State.variables.foodL6 > 60) {
				lewdness += 4;
				mult *= 2;
			}
		}

		if (!hasLuminous) {
			if (this.fluids > 400) lewdness += 2;
			if (this.breastsCor > 5) lewdness += 2;
			if (this.breastsCor > 8) lewdness += 4;
			if (this.breastsCor > 12) lewdness += 6;
			let penisMult = this.hasCurse(HardMode) ? 2 : 1
			if (this.penis > 16) lewdness += 2 * penisMult;
			if (this.penis > 30) lewdness += 4 * penisMult;
			if (this.penis > 50) lewdness += 8 * penisMult;
		}

		mult = this.events.reduce((v, e) => e.lewdnessMult(v, this), mult)
		if (this.hasCurse(InTheLimelight)) mult *= hasLuminous ? 1.5 : 2;

		return this.events.reduce((v, e) => e.changeLewdness(v, this), lewdness) * mult;
	}

	/**
	 * Returns the number of horns on this character.
	 * @returns {number} The number of horns this character has.
	 */
	get horns() {
		return this.events.reduce((v, e) => e.addHorns(v), 0);
	}

	/**
	 * Returns the inhumanity level of this character.
	 * @returns {number} The inhumanity of this character.
	 */
	get inhuman() {
		let inhuman = 0;
	
		const humanSkinColors = [
			'pale', 'tanned', 'olive', 'brown', 'dark brown',
			'fair', 'ivory', 'beige', 'light peach', 'pinkish', 'light tan',
			'golden', 'honey', 'caramel', 'bronze', 'light brown', 'medium brown',
			'warm brown', 'reddish brown', 'chestnut', 'amber', 'cocoa', 'espresso',
			'deep brown', 'mahogany', 'sable', 'ebony', 'cool brown', 'ash brown',
			'copper', 'nutmeg', 'cinnamon', 'sand', 'ochre', 'sienna', 'almond',
			'black', 'white'
		];
	
		if (this.ears !== 'normal human') inhuman++;
		if (this.skinType !== '' && this.skinType !== 'hairless, smooth') inhuman += 4;
		if (this.blood !== 'red') inhuman += 2;
		if (this.horns > 0) inhuman += 2;
		if (this.horns > 1) inhuman += 1;
		if (this.height > 300) inhuman += 1;
		if (this.height < 100) inhuman += 1;
		if (this.height > 1000) inhuman += 1;
		if (this.height < 50) inhuman += 1;
		if (State.variables.PulseBloomUse == "Monster") inhuman += 10;
		inhuman += this.tail.length * 2;
		inhuman = this.events.reduce((v, e) => e.inhumanise(v), inhuman);
	
		if (!humanSkinColors.includes(this.skinColor.toLowerCase())) {
			inhuman += 2;
		}
	
		if (this.id === setup.companionIds.mc && State.variables.LuminousWear) inhuman /= 4;
	
		return inhuman;
	}
	

	/**
	 * Returns the level of conversation handicap of this character.
	 * 0: no handicap
	 * 1: small handicap
	 * 2: large handicap
	 * Only meaningful for the main character.
	 * @returns {number} The level of conversation handicap of this character.
	 */
	get conversationHandicap() {
		if (State.variables.WhispersWear) return 0;
		if (this.curses.some(c => c.name === 'Deafening Silence')) return 2;
		if (this.curses.some(c => c.name === 'Beastly')) return 1;
		if (this.curses.some(c => c.name === 'Taciturn Turnaround')) return 1;
		return 0;
	}

	/**
	 * Returns the penalty to the threat of this character.
	 * @returns {number} The penalty or bonus to this character's threat.
	 */
	get threatHandicap() {
		let handicap = 0;
		let eyes = this.eyeCount;
		if (eyes < 2) {
			if (this.id !== setup.companionIds.mc || !State.variables.BionicEye) {
				handicap -= 3;
				if (this.id === setup.companionIds.mc && State.variables.BDwear) {
					handicap += 1;
				}
			}
		}
		if (this.extraEyes === 0) {
			if (eyes < 1) {
				if (this.id !== setup.companionIds.mc || !State.variables.BionicEye) {
					handicap -= 5;
					if (this.id === setup.companionIds.mc && State.variables.BDwear) {
						handicap += 3;
					}
				}
			}
		} else if (eyes < 1) {
			handicap -= 1
		}
		handicap = this.events.reduce((v, e) => e.changeThreatHandicap(v), handicap)

		let height = this.height
		if (height > 215) {
			handicap += Math.min(Math.floor(((height - 170) / 170 - 1) * 5), 7);
		} else if (height < 125) {
			handicap += Math.max(Math.floor(((height - 170) / height - 1) * 5), -7);
		}

		if (this.id === setup.companionIds.khemia && State.variables.convo.khemiaAegis === 1) handicap += 5;

		if (this.id === setup.companionIds.mc) {
			if (State.variables.BDwear) handicap += 1;
			if (State.variables.BionicArm) handicap += 8;
			if (State.variables.AegisWear) handicap += 5;
			if (State.variables.aawear || State.variables.devouredRelics.some(r => r === 'Acrobatic Accord')) handicap += 1;
		}

		let trueFitness = this.curses.some(c => c.name === 'Weakling') ? 0 : this.fit;
		handicap += trueFitness / 2

		let arms = this.armCount;
		let legs = this.legCount;
		let armsLegsLost = ''
		if (arms < 2) armsLegsLost += 'A';
		if (arms < 1) armsLegsLost += 'A';
		if (this.id !== setup.companionIds.mc || !State.variables.DaedalusEquip) {
			if (legs < 2) armsLegsLost += 'L';
			if (legs < 1) armsLegsLost += 'L';
		}

		switch (armsLegsLost) {
			case '':
				break;
			case 'A':
				handicap -= 2;
				break;
			case 'AA':
				handicap -= 7;
				break;
			case 'L':
				handicap -= 3;
				break;
			case 'AL':
				handicap -= 7;
				break;
			case 'LL':
				handicap -= 7;
				break;
			case 'ALL':
				handicap -= 8;
				break;
			case 'AAL':
				handicap -= 9;
				break;
			case 'AALL':
				handicap -= 10;
				break;
		}
		if (arms > 2) handicap -= 2 * (arms - 2);

		if (this.id === setup.companionIds.mc) {
			if (State.variables.menstruating) {
				handicap -= 2;
			}

			if (this.isPregnant) {
				if (this.daysConsideredPregnant >= 240) {
					handicap -= 4;
				} else if (this.daysConsideredPregnant >= 180) {
					handicap -= 3;
				} else if (this.daysConsideredPregnant >= 120) {
					handicap -= 2;
				} else if (this.daysConsideredPregnant > 90) {
					// nothing
				} else if (this.daysConsideredPregnant >= 45) {
					handicap -= 1;
				}
			}
			if (State.variables.MaximCycleT_flag) {
				if (State.variables.MaximCycleT - State.variables.time >= 28) {
					handicap -= 2;
				} else if (State.variables.MaximCycleT - State.variables.time >= 14) {
					handicap -= 1;
				}
			}
		}
		return Math.max(-10, handicap);
	}

	/**
	 * Returns the penalty to the threat of this character.
	 * @returns {number} The penalty or bonus to this character's threat.
	 */
	get HandicapThreat() {
		return this.threatHandicap;
	}

	/**
	 * Returns the penalty to the movement of this character.
	 * @returns {number} The penalty or bonus to this character's movement.
	 */
	get movementHandicap() {
		let handicap = 0;
		let eyes = this.eyeCount;
		if (eyes < 2) {
			if (this.id !== setup.companionIds.mc || !State.variables.BionicEye) {
				handicap -= 1;
			}
		}
		if (eyes < 1 && this.extraEyes === 0) {
			if (this.id !== setup.companionIds.mc || !State.variables.BionicEye) {
				handicap -= 4;
				if (this.id === setup.companionIds.mc && State.variables.BDwear) {
					handicap += 3;
				}
			}
		}
		handicap = this.events.reduce((v, e) => e.changeMovementHandicap(v), handicap)

		if (this.id === setup.companionIds.mc) {
			if (State.variables.BionicArm) handicap += 3;
			if (State.variables.aawear) handicap += 1;
		}

		let trueFitness = this.curses.some(c => c.name === 'Weakling') ? -8 : this.fit;

		if (trueFitness < -4 || trueFitness > 4) {
			let handicapChange = (-1 * Math.trunc(trueFitness / 5));
			handicap -= handicapChange;
		}

		let arms = this.armCount;
		let legs = this.legCount;
		let armsLegsLost = ''
		if (arms < 2) armsLegsLost += 'A';
		if (arms < 1) armsLegsLost += 'A';
		if ((this.id !== setup.companionIds.mc || !State.variables.DaedalusEquip) && State.variables.currentLayer !== 9) {
			if (legs < 2) armsLegsLost += 'L';
			if (legs < 1) armsLegsLost += 'L';
		}

		switch (armsLegsLost) {
			case '':
				break;
			case 'A':
				handicap -= 1;
				break;
			case 'AA':
				handicap -= 3;
				break;
			case 'L':
				handicap -= 5;
				break;
			case 'AL':
				handicap -= 8;
				break;
			case 'LL':
				handicap -= 9;
				break;
			case 'ALL':
				handicap -= 10;
				break;
			case 'AAL':
				handicap -= 9;
				break;
			case 'AALL':
				handicap -= 10;
				break;
		}

		if (this.id === setup.companionIds.mc) {
			if (this.isPregnant) {
				if (this.daysConsideredPregnant >= 240) {
					handicap -= 3;
				} else if (this.daysConsideredPregnant >= 180) {
					handicap -= 2;
				} else if (this.daysConsideredPregnant >= 120) {
					handicap -= 1;
				} else if (this.daysConsideredPregnant > 90) {
					// nothing
				} else if (this.daysConsideredPregnant >= 45) {
					handicap -= 2;
				} else if (this.daysConsideredPregnant >= 35) {
					handicap -= 1;
				}
			}
			if (State.variables.MaximCycleT_flag) {
				if (State.variables.MaximCycleT - State.variables.time >= 28) {
					handicap -= 3;
				} else if (State.variables.MaximCycleT - State.variables.time >= 14) {
					handicap -= 2;
				}
			}

			if (State.variables.DaedalusEquip) {
				handicap = Math.max(0, handicap);
			}
		}
		return Math.max(-10, handicap);
	}

	/**
	 * Returns the penalty to the movement of this character.
	 * @returns {number} The penalty or bonus to this character's movement.
	 */
	get HandicapMovement() {
		return this.movementHandicap;
	}

	/**
	 * Returns the penalty to the carry capacity of this character.
	 * @returns {number} The penalty or bonus to this character's carry capacity.
	 */
	get carryHandicap() {
		let handicap = 0;
		handicap = this.events.reduce((v, e) => e.changeCarryHandicap(v), handicap)

		if (this.id === setup.companionIds.mc) {
			if (State.variables.BionicArm) handicap += 100;
		}

		let arms = this.armCount;
		let legs = this.legCount;
		let armsLegsLost = ''
		if (arms < 2) armsLegsLost += 'A';
		if (arms < 1) armsLegsLost += 'A';
		if (this.id !== setup.companionIds.mc || !State.variables.DaedalusEquip) {
			if (legs < 2) armsLegsLost += 'L';
			if (legs < 1) armsLegsLost += 'L';
		}

		switch (armsLegsLost) {
			case '':
				break;
			case 'A':
				handicap -= 2;
				break;
			case 'AA':
				handicap -= 7;
				break;
			case 'L':
				handicap -= 3;
				break;
			case 'AL':
				handicap -= 7;
				break;
			case 'LL':
				handicap -= 7;
				break;
			case 'ALL':
				handicap -= 9;
				break;
			case 'AAL':
				handicap -= 10;
				break;
			case 'AALL':
				handicap -= 10;
				break;
		}
		if (arms > 2) handicap -= (arms - 2);

		if (this.id === setup.companionIds.mc) {
			if (this.isPregnant) {
				if (this.daysConsideredPregnant >= 240) {
					handicap -= 5;
				} else if (this.daysConsideredPregnant >= 180) {
					handicap -= 3;
				} else if (this.daysConsideredPregnant >= 120) {
					handicap -= 2;
				} else if (this.daysConsideredPregnant > 90) {
					// nothing
				} else if (this.daysConsideredPregnant >= 45) {
					handicap -= 3;
				} else if (this.daysConsideredPregnant >= 35) {
					handicap -= 2;
				}
			}
			if (State.variables.MaximCycleT_flag) {
				if (State.variables.MaximCycleT - State.variables.time >= 28) {
					handicap -= 3;
				} else if (State.variables.MaximCycleT - State.variables.time >= 14) {
					handicap -= 2;
				}
			}
		}
		return Math.max(-10, handicap);
	}

	/**
	 * Returns the number of regular eyes this character has.
	 * @returns {number} The number of eyes on this character.
	 */
	get eyeCount() {
		let eyes = this.events.reduce((v, e) => e.removeEye(v), 2);
		if (this.id === setup.companionIds.mc && State.variables.BionicEye && eyes < 2) eyes++;
		return eyes;
	}

	/**
	 * Returns the number of arms this character has.
	 * @returns {number} The number of arms on this character.
	 */
	get armCount() {
		let arms = this.events.reduce((v, e) => e.removeArm(v), 2);
		if (this.id === setup.companionIds.mc && State.variables.BionicArm && arms < 2) arms++;
		return arms;
	}

	/**
	 * Returns the number of legs this character has.
	 * @returns {number} The number of legs on this character.
	 */
	get legCount() {
		return this.events.reduce((v, e) => e.removeLeg(v), 2);
	}

	get tentacles() {
		return this.events.reduce((v, e) => e.addTentacle(v), 0);
	}

	get extraEyes() {
		return this.events.reduce((v, e) => e.addExtraEye(v), 0);
	}

	get extraMouths() {
		return this.events.reduce((v, e) => e.addMouth(v), 0);
	}

	get hasPurityGene() {
		return ![setup.companionIds.mc, setup.companionIds.twin, setup.companionIds.bandit].includes(this.id)
	}

	get foodConsumption() {
		if (this.hasPurityGene) return 0;
		return this.events.reduce((v, e) => e.changeFoodConsumption(v), 1);
	}
}
window.Character = Character;
