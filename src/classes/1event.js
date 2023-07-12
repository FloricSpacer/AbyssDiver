/* ==================================================================================================================
 * IMPORTANT:
 * Constructors of event classes may not change external state or perform expensive operations.
 * They can be called spuriously when cloning objects.
 * For the same reason, they may leave the object uninitialised, but not fail if called without parameters.
 * ================================================================================================================== */

class CharEvent {
	/**
	 * Creates a new event.
	 * @param {string} name The name of the event.
	 * @param {'age' | 'gender' | 'asset' | 'lactation' | 'height' | 'heightdir' | 'libido' | 'standards' | 'lewdness' | 'none' |
	 *     'other'} type The type of the event.
	 */
	constructor(name, type = 'none') {
		if (this.constructor.name === 'CharEvent') console.error('Raw CharEvent created');
		this.name = name;
		this.type = type;
		this.time = State.variables.time;
	}

	/**
	 * Returns the internal state of this CharEvent, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {name: this.name, type: this.type, time: this.time};
	}

	/**
	 * Initialises this CharEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {string} name
	 * @param {'age' | 'asset' | 'lactation' | 'height' | 'heightdir' | 'libido' | 'standards' | 'lewdness' | 'none' |
	 *     'other'} type
	 * @param {number} time
	 * @returns {CharEvent} This object
	 * @protected
	 */
	_init({name, type, time}) {
		this.name = name;
		this.type = type;
		this.time = time;
		return this;
	}

	/**
	 * Clones this event.
	 * @returns {CharEvent} A (non-deep) copy of this event.
	 */
	clone() {
		return Reflect.construct(this.constructor, [])._init(this._internalState());
	}

	/**
	 * Creates a sugarcube revivable json object from which this event can be revived.
	 * @returns {[]} The revivable JSON.
	 */
	toJSON() {
		if (this.constructor.name === 'CharEvent') {
			return JSON.reviveWrapper(
				'console.error("Raw CharEvent deserialised"), new CharEvent()._init($ReviveData$)',
				this._internalState())
		} else {
			return JSON.reviveWrapper(`new ${this.constructor.name}()._init($ReviveData$)`, this._internalState());
		}
	}

	// identity functions for all event types
	age(prevAge) {
		return prevAge;
	}

	changeGender(character, prevGender) {
		return prevGender;
	}

	growAsset(prevAsset) {
		return prevAsset;
	}

	changePenis(character, prevPenis) {
		// used by Curses that add/remove genitals
		return prevPenis;
	}

	doublePenis(character, prevDoubled) {
		// used by A Little Extra and Null
		return prevDoubled;
	}

	changeVagina(character, prevVagina) {
		// used by Curses that add/remove genitals
		return prevVagina;
	}

	changeBreasts(character, prevBreasts) {
		// used by Curses that add/remove breasts
		return prevBreasts;
	}

	changeLactation(prevLactation) {
		return prevLactation;
	}

	changeWomb(character, prevWomb, extraWombLocations) {
		// used by Curses that add/remove genitals
		return [prevWomb, extraWombLocations];
	}

	changeHeightDirection(prevDir) {
		return prevDir;
	}

	// eslint-disable-next-line no-unused-vars
	changeHeight(prevHeight, direction) {
		return prevHeight;
	}

	miniOrGigantify(prevHeight) {
		// used by minish-ish and colossal-able
		// note that this event is applied both to height and penis size
		// must be multiplicative, not additive
		return prevHeight;
	}

	addSizeHandicap(prevHandicap) {
		// used by minish-ish and colossal-able
		return prevHandicap;
	}

	changeLibido(prevLibido) {
		return prevLibido;
	}

	lowerStandards(prevLowering) {
		return prevLowering
	}

	changeSubDom(prevSubDom) {
		return prevSubDom
	}

	changeHair(prevHair) {
		return prevHair;
	}

	changeEars(prevEars) {
		return prevEars;
	}

	changeBodyHair(prevBodyHair) {
		return prevBodyHair;
	}

	changeSkinType(prevSkinType) {
		return prevSkinType;
	}

	changeSkinColor(prevSkinColor) {
		return prevSkinColor;
	}

	changeEyeColor(prevEyeColor) {
		return prevEyeColor;
	}

	changeTails(prevTails) {
		return prevTails;
	}

	changeDesc(prevDesc) {
		return prevDesc;
	}

	changeBlood(prevBlood) {
		return prevBlood;
	}

	changeImageIcon(prevIcon) {
		return prevIcon;
	}

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness;
	}

	addHorns(prevHorns) {
		return prevHorns;
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity;
	}

	removeEye(prevEyes) {
		return prevEyes;
	}

	removeArm(prevArms) {
		return prevArms;
	}

	removeLeg(prevLegs) {
		return prevLegs;
	}

	changeThreatHandicap(prevHandicap) {
		return prevHandicap;
	}

	changeMovementHandicap(prevHandicap) {
		return prevHandicap;
	}

	changeCarryHandicap(prevHandicap) {
		return prevHandicap;
	}
}

window.CharEvent = CharEvent;

/* exported GenderEvent */
class GenderEvent extends CharEvent {
	/**
	 * Creates a new gender reversal event.
	 * @param {string} name The name of the event.
	 */
	constructor(name) {
		super(name, 'gender');
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState()};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} byTime
	 * @returns {GenderEvent} This object
	 * @protected
	 */
	_init({superState}) {
		super._init(superState);
		return this;
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}

window.GenderEvent = GenderEvent;

/* exported AgeEvent */
class AgeEvent extends CharEvent {
	/**
	 * Creates a new age reversal event.
	 * @param {string} name The name of the event.
	 * @param {number} years The number of years by which this event de-aged the character.
	 * @param {number} months The number of months by which this event de-aged the character.
	 * @param {number} days The number of days by which this event de-aged the character.
	 */
	constructor(name, {years = 0, months = 0, days = 0} = {years: 0, months: 0, days: 0}) {
		super(name, 'age');
		this.byTime = years * AgeEvent.aYear + months * AgeEvent.aMonth + days * AgeEvent.aDay;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), byTime: this.byTime};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} byTime
	 * @returns {AgeEvent} This object
	 * @protected
	 */
	_init({superState, byTime}) {
		super._init(superState);
		this.byTime = byTime;
		return this;
	}

	age(prevAge) {
		return prevAge - this.byTime;
	}
}

window.AgeEvent = AgeEvent;
// Poor man's class variables
/* The Gregorian calendar has 97 leap years in every 400-year cycle. Thus, the average length of a year is */
/* 365 + 97 / 400 = 365.2425 days, and the average length of a month is 365.2425 / 12 = 30.436875 days. By */
/* dividing each year into 1600 * 365.2425 = 12 * 48699 = 584388 units, we can avoid floating point errors. */
AgeEvent.aDay = 1600;
AgeEvent.aMonth = 48699;
AgeEvent.aYear = 584388;

/* exported DollTransformation */
class DollTransformation extends AgeEvent {
	constructor() {
		super('Doll Transformation', {years: 2});
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState()};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @returns {DollTransformation} This object
	 * @protected
	 */
	_init({superState}) {
		super._init(superState);
		return this;
	}

	age(prevAge) {
		return Math.min(17 * AgeEvent.aYear, prevAge - 2 * AgeEvent.aYear)
	}
}

window.DollTransformation = DollTransformation

/* exported AssetEvent */
class AssetEvent extends CharEvent {
	/**
	 * Creates a new Asset growth event.
	 * @param {string} name The name of the event.
	 * @param {number} sizes The number of sizes by which assets are increased (one size is a cup for breasts and 2.5cm
	 *     for penises)
	 */
	constructor(name, sizes) {
		super(name, 'asset');
		this.sizes = sizes
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), sizes: this.sizes};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} sizes
	 * @returns {AssetEvent} This object
	 * @protected
	 */
	_init({superState, sizes}) {
		super._init(superState);
		this.sizes = sizes;
		return this;
	}

	growAsset(prevAsset) {
		return prevAsset + this.sizes;
	}
}

window.AssetEvent = AssetEvent;

/* exported LactationEvent */
class LactationEvent extends CharEvent {
	/**
	 * Creates a new lactation-inducing event.
	 * @param {string} name The name of the event.
	 * @param {number} amount The magnitude of the effect.
	 */
	constructor(name, amount) {
		super(name, 'lactation');
		this.amount = amount;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), amount: this.amount};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} amount
	 * @returns {LactationEvent} This object
	 * @protected
	 */
	_init({superState, amount}) {
		super._init(superState);
		this.amount = amount;
		return this;
	}

	changeLactation(prevLactation) {
		return prevLactation + this.amount;
	}
}

window.LactationEvent = LactationEvent;

/* exported HeightDirectionEvent */
class HeightDirectionEvent extends CharEvent {
	/**
	 * Creates a new height-change direction event.
	 * @param {1 | -1} direction The direction of future height changes.
	 */
	constructor(direction = -1) {
		super('Height Direction Change', 'heightdir');
		this.heightdir = direction;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), heightdir: this.heightdir};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} heightdir
	 * @returns {HeightDirectionEvent} This object
	 * @protected
	 */
	_init({superState, heightdir}) {
		super._init(superState);
		this.heightdir = heightdir;
		return this;
	}

	changeHeightDirection(prevDir) {
		if (prevDir === -1 || prevDir === 1) {
			console.warn('height direction changed multiple times');
		}
		return this.heightdir;
	}
}

window.HeightDirectionEvent = HeightDirectionEvent;

/* exported HeightEvent */
class HeightEvent extends CharEvent {
	/**
	 * Creates a new height-affecting event.
	 * @param {string} name The name of the event.
	 * @param {number} amount The height change in cm.
	 */
	constructor(name, amount) {
		super(name, 'lactation');
		this.amount = amount;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), amount: this.amount};
	}

	/**
	 * Initialises this HeightEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} amount
	 * @returns {HeightEvent} This object
	 * @protected
	 */
	_init({superState, amount}) {
		super._init(superState);
		this.amount = amount;
		return this;
	}

	changeHeightDirection(prevDir) {
		if (prevDir !== -1 && prevDir !== 1) {
			console.error('Height changed without having set a change direction.');
			return -1;
		}
		return prevDir;
	}

	changeHeight(prevHeight, direction) {
		return prevHeight + direction * this.amount;
	}
}

window.HeightEvent = HeightEvent;

/* exported LibidoEvent */
class LibidoEvent extends CharEvent {
	/**
	 * Creates a new libido-enhancing event.
	 * @param {string} name The name of the event.
	 * @param {number} amount The number of stages by which to increase the character's libido.
	 */
	constructor(name, amount) {
		super(name, 'libido');
		this.amount = amount;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), amount: this.amount};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} amount
	 * @returns {LibidoEvent} This object
	 * @protected
	 */
	_init({superState, amount}) {
		super._init(superState);
		this.amount = amount;
		return this;
	}

	changeLibido(prevLibido) {
		return prevLibido + this.amount;
	}
}

window.LibidoEvent = LibidoEvent;

/* exported StandardsEvent */
class StandardsEvent extends CharEvent {
	/**
	 * Creates a new standards-lowering event.
	 * @param {string} name The name of the event.
	 * @param {number} amount The number of stages by which to reduce the character's standards.
	 */
	constructor(name, amount) {
		super(name, 'standards');
		this.amount = amount;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), amount: this.amount};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} amount
	 * @returns {StandardsEvent} This object
	 * @protected
	 */
	_init({superState, amount}) {
		super._init(superState);
		this.amount = amount;
		return this;
	}

	lowerStandards(prevStandards) {
		return prevStandards + this.amount;
	}
}

window.StandardsEvent = StandardsEvent;

/* exported BodyChangeEvent */
class BodyChangeEvent extends CharEvent {
	/**
	 * Creates a new body-switching event.
	 * @param {string} name The name of the event.
	 * @param {Character} previous The previous body of this character.
	 * @param {Character} next The new body of this character.
	 */
	constructor(name, previous, next) {
		super(name, 'other');
		this.previous = previous;
		this.next = next;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), previous: this.previous, next: this.next};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {Character} previous
	 * @param {Character} next
	 * @returns {BodyChangeEvent} This object
	 * @protected
	 */
	_init({superState, previous, next}) {
		super._init(superState);
		this.previous = previous;
		this.next = next;
		return this;
	}

	// eslint-disable-next-line no-unused-vars
	changeImageIcon(prevIcon) {
		return this.next._imageIcon;
	}

	changeDesc(prevDesc) {
		return prevDesc + this.next.appDesc;
	}
}

window.BodyChangeEvent = BodyChangeEvent;

/* exported LewdnessEvent */
class LewdnessEvent extends CharEvent {
	/**
	 * Creates a new lewdness-enhancing event.
	 * @param {string} name The name of the event.
	 * @param {number} amount The number of stages by which to increase the character's lewdness.
	 * @param {boolean} preventedByLuminousGear Whether the effects of this event can be prevented or mitigated by the
	 *     luminous gear.
	 */
	constructor(name, amount, preventedByLuminousGear = false) {
		super(name, 'lewdness');
		this.amount = amount;
		this.preventable = preventedByLuminousGear;
	}

	/**
	 * Returns the internal state of this event, from which another event can be built.
	 * @returns {any} The internal state of this event.
	 * @protected
	 */
	_internalState() {
		return {superState: super._internalState(), amount: this.amount, preventable: this.preventable};
	}

	/**
	 * Initialises this AgeEvent with the given internal state. Intended to be used only on new, empty objects while
	 * cloning.
	 * @param {any} superState
	 * @param {number} amount
	 * @param {boolean} preventable
	 * @returns {LewdnessEvent} This object
	 * @protected
	 */
	_init({superState, amount, preventable}) {
		super._init(superState);
		this.amount = amount;
		this.preventable = preventable;
		return this;
	}

	changeLewdness(prevLewdness, character) {
		let luminous = character === State.variables.mc && State.variables.LuminousWear
		if (luminous && this.preventable) return prevLewdness;
		return prevLewdness + this.amount;
	}
}

window.LewdnessEvent = LewdnessEvent;
