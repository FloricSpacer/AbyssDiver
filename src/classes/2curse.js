/* global CharEvent, AgeEvent */

/**
 * @typedef SugarCubeSetupObject
 * @extends SugarCubeSetupObject
 * @property allCurses
 * @property curseArray
 * @property curseByNum
 * @property findCurseBy
 */
setup.allCurses = {}
setup.curseArray = []
setup.curseByNum = num => {
	return Reflect.construct(setup.curseArray[num], []);
}
setup.findCurseBy = predicate => {
	let curse = Object.values(setup.allCurses).find(predicate);
	if (curse === undefined) return undefined;

	return Reflect.construct(curse.constructor, []);
}


/* exported Curse */
class Curse extends CharEvent {
	/**
	 * Constructs a new curse.
	 * @param {string} name The name of the curse.
	 * @param {number} corruption The corruption gain of the curse.
	 * @param {string} pic The picture of the curse.
	 * @param {string} type The type of events this Curse creates.
	 * @param {string} appDesc The description that gets added to the player's appearance when they take this curse.
	 * 'none' if the Curse has no mechanical impact and 'other' if the event is Curse-specific,
	 * meaning no other events have similar effects (for example the double penis Curse).
	 */
	constructor(name, corruption, pic, type = 'none', appDesc = '') {
		super(name, type)
		if (this.constructor.name === 'Curse') console.error('Raw Curse constructed');
		this.corruption = corruption;
		this.pic = pic;
		this._appDesc = appDesc;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {*[]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [];
	}

	/**
	 * Clones this curse.
	 * @returns {Curse} A copy of this curse.
	 */
	clone() {
		return Reflect.construct(this.constructor, this._customisationOptions())
			._init(this._internalState());
	}

	/**
	 * Creates a copy of this curse. Unlike clone(), this makes a new Curse, not the same Curse, so e.g., if it is added to
	 * a character, it will be added at the current time, not at the time this Curse was created.
	 * The new Curse has the same customisation options chosen as this curse.
	 * @returns {Curse} A copy of this curse.
	 */
	copy() {
		return Reflect.construct(this.constructor, this._customisationOptions());
	}

	/**
	 * Creates a sugarcube revivable json object from which this Curse can be revived.
	 * @returns {[]} The revivable JSON.
	 */
	toJSON() {
		return JSON.reviveWrapper(
			`new ${this.constructor.name}(${this._customisationOptions().map(v => JSON.stringify(v)).join(', ')})._init($ReviveData$)`,
			this._internalState()
		);
	}

	get corr() {
		return this.corruption;
	}
	set corr(value) {
		this.corruption = value;
	}

	get appDesc() {
		return this._appDesc;
	}

	set appDesc(value) {
		this._appDesc = value;
	}

	get variantPassage() {
		return `${this.name} Variant`;
	}

	get descriptionPassage() {
		return `${this.name} Description`
	}

	/**
	 * Returns the list of Curses this Curse is incompatible with. This Curse may not be taken if any of the Curses in
	 * this array have been taken before or are stored in managed misfortune.
	 * @returns {[string]} The list of incompatible Curses.
	 */
	get incompatibilities() {
		return []
	}

	/**
	 * Returns the maximum number of times this Curse can be taken.
	 * @returns {number} The number of times this Curse can be taken.
	 */
	get maximum() {
		return 1;
	}

	get isWatersports() {
		// despite the seeming senselessness this comparison is necessary to prevent coercion
		return this.constructor.iswatersports === true;
	}
	get isAmputation() {
		// despite the seeming senselessness this comparison is necessary to prevent coercion
		return this.constructor.isamputation === true;
	}
}

class LibidoReinforcementA extends Curse {
	constructor() {
		super('Libido Reinforcement A', 20, 'Curses/libidoreinforcementA.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementA = new LibidoReinforcementA()
State.variables.curse1 = setup.allCurses.LibidoReinforcementA
window.LibidoReinforcementA = LibidoReinforcementA
setup.curseArray.push(LibidoReinforcementA)

class GenderReversalA extends Curse {
	constructor() {
		super('Gender Reversal A', 15, 'Curses/genderreversalA.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalA = new GenderReversalA()
State.variables.curse2 = setup.allCurses.GenderReversalA
window.GenderReversalA = GenderReversalA
setup.curseArray.push(GenderReversalA)

class AssetRobustnessA extends Curse {
	constructor() {
		super('Asset Robustness A', 10, 'Curses/assetrobustnessA.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**0; // 1 cup size / 2cm
	}
}
setup.allCurses.AssetRobustnessA = new AssetRobustnessA()
State.variables.curse3 = setup.allCurses.AssetRobustnessA
window.AssetRobustnessA = AssetRobustnessA
setup.curseArray.push(AssetRobustnessA)

class ClothingRestrictionA extends Curse {
	constructor() {
		super('Clothing Restriction A', 30, 'Curses/clothingrestrictionA.png', 'none',
			  'You cannot bring yourself to wear any accessories anywhere on your body. ');
	}
}
setup.allCurses.ClothingRestrictionA = new ClothingRestrictionA()
State.variables.curse4 = setup.allCurses.ClothingRestrictionA
window.ClothingRestrictionA = ClothingRestrictionA
setup.curseArray.push(ClothingRestrictionA)

class ShrunkenAssets extends Curse {
	constructor() {
		super('Shrunken Assets', 75, 'Curses/shrunkenassets.png', 'gender');
	}

	get incompatibilities() {
		return ['Asset Robustness A', 'Asset Robustness B', 'Asset Robustness C', 'Asset Robustness D', 'Asset Robustness E', 'Asset Robustness F', 'Asset Robustness G'];
	}

	changeBreasts(character, prevBreasts) {
		return Math.min(prevBreasts, 1);
	}

	changePenis(character, prevPenis) {
		return Math.min(prevPenis, 1);
	}
}
setup.allCurses.ShrunkenAssets = new ShrunkenAssets()
State.variables.curse5 = setup.allCurses.ShrunkenAssets
window.ShrunkenAssets = ShrunkenAssets
setup.curseArray.push(ShrunkenAssets)

class HairRemoval extends Curse {
	constructor() {
		super('Hair Removal', 5, 'Curses/hairremoval.png', 'none',
			  '<<if !$mc.hasCurse("Maximum Fluff")>>Your entire body below your nose is completely hairless and smooth. Your eyebrows also look like they have been carefully trimmed. <</if>>');
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevHair) {
		return 0;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return 'hairless, smooth';
	}
}
setup.allCurses.HairRemoval = new HairRemoval()
State.variables.curse6 = setup.allCurses.HairRemoval
window.HairRemoval = HairRemoval
setup.curseArray.push(HairRemoval)

class PermaDye extends Curse {
	constructor(hairColor='turquoise') {
		super('Perma-dye', 5, 'Curses/perma-dye.png', 'none');

		this.hairColor = hairColor;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.hairColor];
	}

	get variation() {
		return this.hairColor;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.hairColor = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeHair(prevHair) {
		return this.hairColor;
	}
}
setup.allCurses.PermaDye = new PermaDye()
State.variables.curse7 = setup.allCurses.PermaDye
window.PermaDye = PermaDye
setup.curseArray.push(PermaDye)

class FreckleSpeckle extends Curse {
	constructor() {
		super('Freckle Speckle', 10, 'Curses/frecklespeckle.png', 'none',
			  'An assortment of freckles are spread over your body. ');
	}
}
setup.allCurses.FreckleSpeckle = new FreckleSpeckle()
State.variables.curse8 = setup.allCurses.FreckleSpeckle
window.FreckleSpeckle = FreckleSpeckle
setup.curseArray.push(FreckleSpeckle)

class KnifeEar extends Curse {
	constructor() {
		super('Knife-ear', 20, 'Curses/knifeear.png', '');
	}

	// eslint-disable-next-line no-unused-vars
	changeEars(prevEars) {
		return 'pointed, elfish';
	}
}
setup.allCurses.KnifeEar = new KnifeEar()
State.variables.curse9 = setup.allCurses.KnifeEar
window.KnifeEar = KnifeEar
setup.curseArray.push(KnifeEar)

class DizzyingHeights extends Curse {
	constructor() {
		super('Dizzying Heights', 5, 'Curses/dizzyingheights.png', 'height');
	}

	changeHeightDirection(prevDir) {
		if (prevDir !== -1 && prevDir !== 1) {
			console.error('Height changed without having set a change direction.');
			return -1;
		}
		return prevDir;
	}

	changeHeight(prevHeight, direction) {
		return prevHeight + 5 * direction;
	}


	get maximum() {
		return 5;
	}
}
setup.allCurses.DizzyingHeights = new DizzyingHeights()
State.variables.curse10 = setup.allCurses.DizzyingHeights
window.DizzyingHeights = DizzyingHeights
setup.curseArray.push(DizzyingHeights)

class IncreasedSensitivity extends Curse {
	constructor() {
		super('Increased Sensitivity', 10, 'Curses/increasedsensitivity.png', 'libido');
	}

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness + 2;
	}
}
setup.allCurses.IncreasedSensitivity = new IncreasedSensitivity()
State.variables.curse11 = setup.allCurses.IncreasedSensitivity
window.IncreasedSensitivity = IncreasedSensitivity
setup.curseArray.push(IncreasedSensitivity)

class RefractoryRefactorization extends Curse {
	constructor() {
		super('Refractory Refactorization', 10, 'Curses/refractoryrefactorization.png', 'libido');
	}

	changeLewdness(prevLewdness, character) {
		if (character.hasCurse(IncreasedSensitivity)) return prevLewdness + 4
		return prevLewdness + 1;
	}
}
setup.allCurses.RefractoryRefactorization = new RefractoryRefactorization()
State.variables.curse12 = setup.allCurses.RefractoryRefactorization
window.RefractoryRefactorization = RefractoryRefactorization
setup.curseArray.push(RefractoryRefactorization)

class LibidoReinforcementB extends Curse {
	constructor() {
		super('Libido Reinforcement B', 25, 'Curses/libidoreinforcementB.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementB = new LibidoReinforcementB()
State.variables.curse13 = setup.allCurses.LibidoReinforcementB
window.LibidoReinforcementB = LibidoReinforcementB
setup.curseArray.push(LibidoReinforcementB)

class GenderReversalB extends Curse {
	constructor() {
		super('Gender Reversal B', 20, 'Curses/genderreversalB.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalB = new GenderReversalB()
State.variables.curse14 = setup.allCurses.GenderReversalB
window.GenderReversalB = GenderReversalB
setup.curseArray.push(GenderReversalB)

class AssetRobustnessB extends Curse {
	constructor() {
		super('Asset Robustness B', 15, 'Curses/assetrobustnessB.png', 'none');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**1;
	}
}
setup.allCurses.AssetRobustnessB = new AssetRobustnessB()
State.variables.curse15 = setup.allCurses.AssetRobustnessB
window.AssetRobustnessB = AssetRobustnessB
setup.curseArray.push(AssetRobustnessB)

class AgeReductionA extends Curse {
	constructor() {
		super('Age Reduction A', 15, 'Curses/agereductionA.png', 'age');
	}

	get variation() {
		console.error('Deprecated variation field used.')
		return this.time;
	}

	age(prevAge) {
		return Math.min(20 * AgeEvent.aYear, prevAge - 2 * AgeEvent.aYear);
	}
}
setup.allCurses.AgeReductionA = new AgeReductionA()
State.variables.curse16 = setup.allCurses.AgeReductionA
window.AgeReductionA = AgeReductionA
setup.curseArray.push(AgeReductionA)

class FluffyEars extends Curse {
	constructor(earType='furry cat') {
		super('Fluffy Ears', 20, 'Curses/fluffyears.png', 'none');

		this.earType = earType;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.earType];
	}

	get variation() {
		return this.earType;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.earType = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeEars(prevEars) {
		return this.earType;
	}
}
setup.allCurses.FluffyEars = new FluffyEars()
State.variables.curse17 = setup.allCurses.FluffyEars
window.FluffyEars = FluffyEars
setup.curseArray.push(FluffyEars)

class FluffyTail extends Curse {
	constructor(tailType='flowing cat') {
		super('Fluffy Tail', 20, 'Curses/fluffytail.png', 'none');
		this.tailType = tailType;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.tailType];
	}

	changeTails(prevTails) {
		return prevTails.concat([this.tailType]);
	}

	get variation() {
		return this.tailType;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.tailType = value;
	}

}
setup.allCurses.FluffyTail = new FluffyTail()
State.variables.curse18 = setup.allCurses.FluffyTail
window.FluffyTail = FluffyTail
setup.curseArray.push(FluffyTail)

class MaximumFluff extends Curse {
	constructor(hairType='cat-furred') {
		super('Maximum Fluff', 30, 'Curses/maximumfluff.png', 'none');
		this.furType = hairType;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.furType];
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevBodyHair) {
		return 2;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return this.furType;
	}

	get variation() {
		return this.furType;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.furType = value;
	}

	get appDesc() {
		return 'Your fluffy fur coat might keep you a little warmer when it gets cold. '
	}
}
setup.allCurses.MaximumFluff = new MaximumFluff();
State.variables.curse19 = setup.allCurses;
window.MaximumFluff = MaximumFluff
setup.curseArray.push(MaximumFluff)

class HeatRut extends Curse {
	constructor() {
		super('Heat/Rut', 20, 'Curses/heat.png', 'libido');
	}

	// libido change is implemented as special-purpose code in Character.libido because it requires accessing
	// global variables and only applies to the main character.
	// We might want to change that.

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness;
		}
		return prevLewdness + 2;
	}
}
setup.allCurses.HeatRut = new HeatRut()
State.variables.curse20 = setup.allCurses.HeatRut
window.HeatRut = HeatRut
setup.curseArray.push(HeatRut)

class Lightweight extends Curse {
	constructor() {
		super('Lightweight', 15, 'Curses/lightweight.png', 'none',
			  'Just a little bit of alcohol turns you into a drunk mess. You\'d better not go out partying without trusted friends nearby. Behavior altering substances in general also have a much stronger effect on you. ');
	}
}
setup.allCurses.Lightweight = new Lightweight()
State.variables.curse21 = setup.allCurses.Lightweight
window.Lightweight = Lightweight
setup.curseArray.push(Lightweight)

class SexSwitcheroo extends Curse {
	constructor() {
		super('Sex Switcheroo', 30, 'Curses/sexswitcheroo.png', 'gender');
	}

	get incompatibilities() {
		return ['Futa Fun']
	}

	// eslint-disable-next-line no-unused-vars
	changePenis(character, prevPenis) {
		if (character.curses.some(c => c instanceof Null)) return 0;
		if (character.osex === 'male') {
			return 0;
		} else {
			return Math.max(character.obreasts * 2, 1);
		}
	}

	// eslint-disable-next-line no-unused-vars
	changeBreasts(character, prevBreasts) {
		if (character.osex === 'male') {
			return character.openis / 2;
		} else {
			return 0;
		}
	}

	// eslint-disable-next-line no-unused-vars
	changeVagina(character, prevVagina) {
		if (character.curses.some(c => c instanceof Null)) return 0;
		if (character.osex === 'male') {
			return 1;
		} else {
			return 0;
		}
	}
}
setup.allCurses.SexSwitcheroo = new SexSwitcheroo()
State.variables.curse22 = setup.allCurses.SexSwitcheroo
window.SexSwitcheroo = SexSwitcheroo
setup.curseArray.push(SexSwitcheroo)

class FutaFun extends Curse {
	constructor() {
		super('Futa Fun', 35, 'Curses/futafun.png', 'gender');
	}

	get incompatibilities() {
		return ['Sex Switcheroo']
	}

	changePenis(character, prevPenis) {
		if (character.curses.some(c => c instanceof Null)) return 0;
		if (character.osex !== 'male') {
			return Math.max(character.obreasts * 2, 1)
		} else {
			return prevPenis
		}
	}

	changeVagina(character, prevVagina) {
		if (character.curses.some(c => c instanceof Null)) return 0;
		return Math.max(prevVagina, 1);
	}

	changeBreasts(character, prevBreasts) {
		if (character.osex === 'male') {
			return Math.max(prevBreasts, character.openis / 2);
		} else {
			return prevBreasts;
		}
	}
}
setup.allCurses.FutaFun = new FutaFun()
State.variables.curse23 = setup.allCurses.FutaFun
window.FutaFun = FutaFun
setup.curseArray.push(FutaFun)

class BlushingVirgin extends Curse {
	constructor() {
		super('Blushing Virgin', 25, 'Curses/blushingvirgin.png', 'none',
			  'You are very shy about nudity, and even getting undressed while no one is looking already feels a bit embarrassing to you. Sex also feels very embarrassing, no matter how many times you might have done it. ');
	}

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness - 8;
	}
}
setup.allCurses.BlushingVirgin = new BlushingVirgin()
State.variables.curse24 = setup.allCurses.BlushingVirgin
window.BlushingVirgin = BlushingVirgin
setup.curseArray.push(BlushingVirgin)

class SubmissivenessRectificationA extends Curse {
	constructor() {
		super('Submissiveness Rectification A', 20, 'Curses/subrectificationA.png', 'libido');
	}

	get incompatibilities() {
		return ['Power Dom']
	}

	changeSubDom(prevSubDom) {
		return prevSubDom + 1;
	}
}
setup.allCurses.SubmissivenessRectificationA = new SubmissivenessRectificationA()
State.variables.curse25 = setup.allCurses.SubmissivenessRectificationA
window.SubmissivenessRectificationA = SubmissivenessRectificationA
setup.curseArray.push(SubmissivenessRectificationA)

class GenderReversalC extends Curse {
	constructor() {
		super('Gender Reversal C', 20, 'Curses/genderreversalC.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalC = new GenderReversalC()
State.variables.curse26 = setup.allCurses.GenderReversalC
window.GenderReversalC = GenderReversalC
setup.curseArray.push(GenderReversalC)

class AssetRobustnessC extends Curse {
	constructor() {
		super('Asset Robustness C', 25, 'Curses/assetrobustnessC.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**2; // 4 cup sizes / 8cm
	}
}
setup.allCurses.AssetRobustnessC = new AssetRobustnessC()
State.variables.curse27 = setup.allCurses.AssetRobustnessC
window.AssetRobustnessC = AssetRobustnessC
setup.curseArray.push(AssetRobustnessC)

class ClothingRestrictionB extends Curse {
	constructor() {
		super('Clothing Restriction B', 40, 'Curses/clothingrestrictionB.png', 'none',
			  'You cannot bring yourself to wear any underwear whatsoever. ');
	}

	get incompatibilities() {
		return ['Crossdress Your Heart'];
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness;
		}
		return prevLewdness + 4;
	}
}
setup.allCurses.ClothingRestrictionB = new ClothingRestrictionB()
State.variables.curse28 = setup.allCurses.ClothingRestrictionB
window.ClothingRestrictionB = ClothingRestrictionB
setup.curseArray.push(ClothingRestrictionB)

class PowerDom extends Curse {
	constructor() {
		super('Power Dom', 25, 'Curses/power dom.png', 'libido',
			  'You are never able to sit back and let someone else take charge, neither in life nor in sex. ');
	}

	get incompatibilities() {
		return ['Submissiveness Rectification A', 'Submissiveness Rectification B']
	}

	changeSubDom(prevSubDom) {
		return prevSubDom - 1;
	}
}
setup.allCurses.PowerDom = new PowerDom()
State.variables.curse29 = setup.allCurses.PowerDom
window.PowerDom = PowerDom
setup.curseArray.push(PowerDom)

class Curse2020 extends Curse {
	constructor() {
		super('20/20000000', 20, 'Curses/20-20.png', 'none',
			  'Your sight is pretty terrible, and you are pretty much blind without glasses. Contacts also feel extremely uncomfortable. ');
	}

}
setup.allCurses.Curse2020 = new Curse2020()
State.variables.curse30 = setup.allCurses.Curse2020
window.Curse2020 = Curse2020
setup.curseArray.push(Curse2020)

class ComicRelief extends Curse {
	constructor() {
		super('Comic Relief', 25, 'Curses/comicrelief.png', 'none',
			  'No one ever seems to take you seriously. You get patronized and talked down to pretty often. ');
	}
}
setup.allCurses.ComicRelief = new ComicRelief()
State.variables.curse31 = setup.allCurses.ComicRelief
window.ComicRelief = ComicRelief
setup.curseArray.push(ComicRelief)

class EqualOpportunity extends Curse {
	constructor() {
		super('Equal Opportunity', 25, 'Curses/equaloppurtunity.png', 'none',
			  'Gender is really not an issue for you when selecting sexual partners. ');
	}
}
setup.allCurses.EqualOpportunity = new EqualOpportunity()
State.variables.curse32 = setup.allCurses.EqualOpportunity
window.EqualOpportunity = EqualOpportunity
setup.curseArray.push(EqualOpportunity)

class AbsolutePregnancy extends Curse {
	constructor() {
		super('Absolute Pregnancy', 35, 'Curses/absolutepregnancy.png', 'none',
			  'Any and all sex you engage in results in pregnancy. ');
	}

	get incompatibilities() {
		return ['Absolute Birth Control'];
	}
}
setup.allCurses.AbsolutePregnancy = new AbsolutePregnancy()
State.variables.curse33 = setup.allCurses.AbsolutePregnancy
window.AbsolutePregnancy = AbsolutePregnancy
setup.curseArray.push(AbsolutePregnancy)

class AbsoluteBirthControl extends Curse {
	constructor() {
		super('Absolute Birth Control', 40, 'Curses/absolutebirthcontrol.png', 'none',
			  'You are completely sterile and cannot have children. ');
	}

	get incompatibilities() {
		return ['Absolute Pregnancy', 'Wacky Wombs', 'Omnitool', ];
	}
}
setup.allCurses.AbsoluteBirthControl = new AbsoluteBirthControl()
State.variables.curse34 = setup.allCurses.AbsoluteBirthControl
window.AbsoluteBirthControl = AbsoluteBirthControl
setup.curseArray.push(AbsoluteBirthControl)

class WackyWombs extends Curse {
	constructor(wombLocation='throat') {
		super('Wacky Wombs', 20, 'Curses/wackywombs.png', 'gender');
		this._wombLocation = wombLocation;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this._wombLocation];
	}

	get incompatibilities() {
		return ['Absolute Birth Control'];
	}

	get maximum() {
		return 2;
	}

	changeWomb(character, prevWomb, extraWombLocations) {
		let location = this._wombLocation;
		if (this._wombLocation === 'vagina' && character.vagina < 1) {
			location = 'urethra';
		}
		let nVagPen = character.vagina + character.penis;
		if (this._wombLocation === 'urethra' && nVagPen < 1) {
			location = 'anus'
		}
		return [prevWomb + 1, extraWombLocations.concat([location])];
	}

	get variation1() {
		return this._wombLocation;
	}

	set variation1(value) {
		console.error('Deprecated variation field used.')
		this._wombLocation = value;
	}

	get variation2() {
		return this._wombLocation;
	}

	set variation2(value) {
		console.error('Deprecated variation field used.')
		this._wombLocation = value;
	}
}
setup.allCurses.WackyWombs = new WackyWombs()
State.variables.curse35 = setup.allCurses.WackyWombs
window.WackyWombs = WackyWombs
setup.curseArray.push(WackyWombs)

class Omnitool extends Curse {
	constructor() {
		super('Omnitool', 25, 'Curses/omnitool.png', 'none');
	}

	get incompatibilities() {
		return ['Absolute Birth Control'];
	}
}
setup.allCurses.Omnitool = new Omnitool()
State.variables.curse36 = setup.allCurses.Omnitool
window.Omnitool = Omnitool
setup.curseArray.push(Omnitool)

class Gooey extends Curse {
	constructor() {
		super('Gooey', 40, 'Curses/gooey.png', 'none');
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return 'sticky, slimy';
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevBodyHair) {
		return 0;
	}
}
setup.allCurses.Gooey = new Gooey()
State.variables.curse37 = setup.allCurses.Gooey
window.Gooey = Gooey
setup.curseArray.push(Gooey)

class RainbowSwirl extends Curse {
	constructor(skinColor='pink', eyeColor='pink') {
		super('Rainbow Swirl', 25, 'Curses/rainbowswirl.png', 'none');
		this.skinColor = skinColor;
		this.eyeColor = eyeColor;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string, string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.skinColor, this.eyeColor];
	}

	get variation() {
		return this.skinColor;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.skinColor = value;
	}

	get variation2() {
		return this.eyeColor;
	}

	set variation2(value) {
		console.error('Deprecated variation field used.')
		this.eyeColor = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinColor(prevSkinColor) {
		return this.skinColor;
	}

	// eslint-disable-next-line no-unused-vars
	changeEyeColor(prevEyeColor) {
		return this.eyeColor;
	}
}
setup.allCurses.RainbowSwirl = new RainbowSwirl()
State.variables.curse38 = setup.allCurses.RainbowSwirl
window.RainbowSwirl = RainbowSwirl
setup.curseArray.push(RainbowSwirl)

class DoublePepperoni extends Curse {
	constructor() {
		super('Double Pepperoni', 20, 'Curses/doublepepperoni.png', 'none',
			  'Your nipples and areolae are rather large and puffy. ');
	}

	// correcting minimum breast size is done in character.js (breastCor()) because it has to happen last.
}
setup.allCurses.DoublePepperoni = new DoublePepperoni()
State.variables.curse39 = setup.allCurses.DoublePepperoni
window.DoublePepperoni = DoublePepperoni
setup.curseArray.push(DoublePepperoni)

class LiteralBlushingVirgin extends Curse {
	constructor() {
		super('Literal Blushing Virgin', 40, 'Curses/literalblushingvirgin.png', 'none',
			  'No matter how many times you have sex, the moment it starts, you always forget your previous experiences, and genuinely believe it is your first time. ');
	}

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness - 16;
	}
}
setup.allCurses.LiteralBlushingVirgin = new LiteralBlushingVirgin()
State.variables.curse40 = setup.allCurses.LiteralBlushingVirgin
window.LiteralBlushingVirgin = LiteralBlushingVirgin
setup.curseArray.push(LiteralBlushingVirgin)

class LibidoReinforcementC extends Curse {
	constructor() {
		super('Libido Reinforcement C', 35, 'Curses/libidoreinforcementC.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementC = new LibidoReinforcementC()
State.variables.curse41 = setup.allCurses.LibidoReinforcementC
window.LibidoReinforcementC = LibidoReinforcementC
setup.curseArray.push(LibidoReinforcementC)

class LactationRejuvenationA extends Curse {
	constructor() {
		super('Lactation Rejuvenation A', 30, 'Curses/lactationA.png', 'none');
	}

	changeLactation(prevLactation) {
		return prevLactation + 1;
	}
}
setup.allCurses.LactationRejuvenationA = new LactationRejuvenationA()
State.variables.curse42 = setup.allCurses.LactationRejuvenationA
window.LactationRejuvenationA = LactationRejuvenationA
setup.curseArray.push(LactationRejuvenationA)

class AssetRobustnessD extends Curse {
	constructor() {
		super('Asset Robustness D', 30, 'Curses/assetrobustnessD.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 6; // 6 cup sizes or 12cm
	}
}
setup.allCurses.AssetRobustnessD = new AssetRobustnessD()
State.variables.curse43 = setup.allCurses.AssetRobustnessD
window.AssetRobustnessD = AssetRobustnessD
setup.curseArray.push(AssetRobustnessD)

class AgeReductionB extends Curse {
	constructor() {
		super('Age Reduction B', 30, 'Curses/agereductionB.png', 'none');
	}

	get variation() {
		console.error('Deprecated variation field used.')
		return this.time;
	}

	age(prevAge) {
		return Math.min(20 * AgeEvent.aYear, prevAge - 3 * AgeEvent.aYear);
	}
}
setup.allCurses.AgeReductionB = new AgeReductionB()
State.variables.curse44 = setup.allCurses.AgeReductionB
window.AgeReductionB = AgeReductionB
setup.curseArray.push(AgeReductionB)

class SleepTight extends Curse {
	constructor() {
		super('Sleep Tight', 45, 'Curses/sleeptight.png', 'none',
			  'You need 12 hours of sleep each night, but at least sleeping is very comforting and pleasurable. you also feel a bit more energized during your waking hours. ');
	}
}
setup.allCurses.SleepTight = new SleepTight()
State.variables.curse45 = setup.allCurses.SleepTight
window.SleepTight = SleepTight
setup.curseArray.push(SleepTight)

class SweetDreams extends Curse {
	constructor() {
		super('Sweet Dreams', 40, 'Curses/sweetdreams.png', 'none',
			  'Every night you have horrifyingly sexy and sexily horrifying wet nightmares, and wake up shaking in fear in a puddle of your own juices. ');
	}
}
setup.allCurses.SweetDreams = new SweetDreams()
State.variables.curse46 = setup.allCurses.SweetDreams
window.SweetDreams = SweetDreams
setup.curseArray.push(SweetDreams)

class HypnoHappytime extends Curse {
	constructor() {
		super('Hypno Happytime', 40, 'Curses/hypnohappytime.png', 'none',
			  'yOu are very susceptiBlE to hYpnosis, and it is not hard to implant suggestions into your MalleablE mind. ');
	}

	growAsset(prevAsset) {
		return prevAsset + 2**0;
	}
}
setup.allCurses.HypnoHappytime = new HypnoHappytime()
State.variables.curse47 = setup.allCurses.HypnoHappytime
window.HypnoHappytime = HypnoHappytime
setup.curseArray.push(HypnoHappytime)

class CrossdressYourHeart extends Curse {
	constructor() {
		super('Crossdress Your Heart', 35, 'Curses/crossdressyourheart.png', 'none',
			  'You can only bring yourself to wear clothing associated with the opposite sex. ');
	}

	get incompatibilities() {
		return ['Futa Fun', 'Clothing Restriction C', 'Clothing Restriction B'];
	}
}
setup.allCurses.CrossdressYourHeart = new CrossdressYourHeart()
State.variables.curse48 = setup.allCurses.CrossdressYourHeart
window.CrossdressYourHeart = CrossdressYourHeart
setup.curseArray.push(CrossdressYourHeart)

class LieDetector extends Curse {
	constructor() {
		super('Lie Detector', 40, 'Curses/liedetector.png', 'none',
			  'No matter how convincing a lie you craft, everyone can tell when you are not being truthful. Others are aware even when you are just omitting information. ');
	}
}
setup.allCurses.LieDetector = new LieDetector()
State.variables.curse49 = setup.allCurses.LieDetector
window.LieDetector = LieDetector
setup.curseArray.push(LieDetector)

class Megadontia extends Curse {
	constructor() {
		super('Megadontia', 30, 'Curses/sharpteeth.png', 'none',
			  'Your teeth are very sharp, and you have a couple of fangs poking out even when your mouth is closed. Some would call it cute, but be careful when making out. ');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 1;
	}
}
setup.allCurses.Megadontia = new Megadontia()
State.variables.curse50 = setup.allCurses.Megadontia
window.Megadontia = Megadontia
setup.curseArray.push(Megadontia)

class Softie extends Curse {
	constructor() {
		super('Softie', 35, 'Curses/softie.png', 'none');
	}

	get incompatibilities() {
		return ['Hard Mode'];
	}

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness - 2;
	}
}
setup.allCurses.Softie = new Softie()
State.variables.curse51 = setup.allCurses.Softie
window.Softie = Softie
setup.curseArray.push(Softie)

class HardMode extends Curse {
	constructor() {
		super('Hard Mode', 35, 'Curses/hardmode.png', 'none');
	}

	get incompatibilities() {
		return ['Softie'];
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness;
		}
		return prevLewdness + 2;
	}
}
setup.allCurses.HardMode = new HardMode()
State.variables.curse52 = setup.allCurses.HardMode
window.HardMode = HardMode
setup.curseArray.push(HardMode)

class LingualLeviathan extends Curse {
	constructor() {
		super('Lingual Leviathan', 30, 'Curses/lingualleviathan.png', 'none',
			  'You have an extremely long, prehensile tongue, making you especially great at oral. ');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 1;
	}
}
setup.allCurses.LingualLeviathan = new LingualLeviathan()
State.variables.curse53 = setup.allCurses.LingualLeviathan
window.LingualLeviathan = LingualLeviathan
setup.curseArray.push(LingualLeviathan)

class TippingTheScales extends Curse {
	constructor(scaleColor='green') {
		super('Tipping the Scales', 45, 'Curses/tippingthescales.png', 'none');
		this.scaleColor = scaleColor
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.scaleColor];
	}

	get variation() {
		return this.scaleColor;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.scaleColor = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return 'reptilian scaled';
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevBodyHair) {
		return 0;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinColor(prevSkinColor) {
		return this.scaleColor;
	}
}
setup.allCurses.TippingTheScales = new TippingTheScales()
State.variables.curse54 = setup.allCurses.TippingTheScales
window.TippingTheScales = TippingTheScales
setup.curseArray.push(TippingTheScales)

class Reptail extends Curse {
	constructor() {
		super('Reptail', 35, 'Curses/reptail.png', 'none');
	}

	changeTails(prevTails) {
		return prevTails.concat(['large, spiked, scaled reptile'])
	}
}
setup.allCurses.Reptail = new Reptail()
State.variables.curse55 = setup.allCurses.Reptail
window.Reptail = Reptail
setup.curseArray.push(Reptail)

class ColdBlooded extends Curse {
	constructor() {
		super('Cold Blooded', 40, 'Curses/coldblooded.png', 'none',
			  'You no longer produce heat on your own, and need external heat sources. Your nights lately involve a lot of cuddling. ');
	}
}
setup.allCurses.ColdBlooded = new ColdBlooded()
State.variables.curse56 = setup.allCurses.ColdBlooded
window.ColdBlooded = ColdBlooded
setup.curseArray.push(ColdBlooded)

class LibidoReinforcementD extends Curse {
	constructor() {
		super('Libido Reinforcement D', 40, 'Curses/libidoreinforcementD.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementD = new LibidoReinforcementD()
State.variables.curse57 = setup.allCurses.LibidoReinforcementD
window.LibidoReinforcementD = LibidoReinforcementD
setup.curseArray.push(LibidoReinforcementD)

class GenderReversalD extends Curse {
	constructor() {
		super('Gender Reversal D', 15, 'Curses/genderreversalD.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalD = new GenderReversalD()
State.variables.curse58 = setup.allCurses.GenderReversalD
window.GenderReversalD = GenderReversalD
setup.curseArray.push(GenderReversalD)

class PleasureRespecificationA extends Curse {
	constructor() {
		super('Pleasure Respecification A', 45, 'Curses/pleasurerespecA.png', 'none',
			  'You can no longer orgasm from masturbation. you can still feel pleasure and work your way towards the edge, but you will always need someone else\'s help to climax. ');
	}
}
setup.allCurses.PleasureRespecificationA = new PleasureRespecificationA()
State.variables.curse59 = setup.allCurses.PleasureRespecificationA
window.PleasureRespecificationA = PleasureRespecificationA
setup.curseArray.push(PleasureRespecificationA)

class ClothingRestrictionC extends Curse {
	constructor() {
		super('Clothing Restriction C', 60, 'Curses/clothingrestrictionC.png', 'none',
			  'You can no longer wear any clothing besides underwear, or clothes skimpy enough that others would consider them underwear. ');
	}

	get incompatibilities() {
		return ['Crossdress Your Heart'];
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness;
		}
		return prevLewdness + 4;
	}

	lewdnessMult(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness * 1.25;
		}
		return prevLewdness * 1.5;
	}
}
setup.allCurses.ClothingRestrictionC = new ClothingRestrictionC()
State.variables.curse60 = setup.allCurses.ClothingRestrictionC
window.ClothingRestrictionC = ClothingRestrictionC
setup.curseArray.push(ClothingRestrictionC)

class MassacreManicure extends Curse {
	constructor() {
		super('Massacre Manicure', 30, 'Curses/massacremanicure.png', 'none',
			  'You have sharp claws instead of fingernails. they are retractable to an extent, but remain a permanent fixture of your hands. ');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 1;
	}
}
setup.allCurses.MassacreManicure = new MassacreManicure()
State.variables.curse61 = setup.allCurses.MassacreManicure
window.MassacreManicure = MassacreManicure
setup.curseArray.push(MassacreManicure)

class DoS extends Curse {
	constructor() {
		super('DoS', 50, 'Curses/dos.png', 'libido',
			  'You feel pleasure when inflicting pain on others, though other sources of pleasure are somewhat dulled. ');
	}

	changeSubDom(prevSubDom) {
		return prevSubDom - 1;
	}
}
setup.allCurses.DoS = new DoS()
State.variables.curse62 = setup.allCurses.DoS
window.DoS = DoS
setup.curseArray.push(DoS)

class DoM extends Curse {
	constructor() {
		super('DoM', 45, 'Curses/dom.png', 'libido',
			  'All pain you feel is converted into pleasure, though other sources of pleasure are somewhat dulled. ');
	}

	changeSubDom(prevSubDom) {
		return prevSubDom + 1;
	}
}
setup.allCurses.DoM = new DoM()
State.variables.curse63 = setup.allCurses.DoM
window.DoM = DoM
setup.curseArray.push(DoM)

class HijinksEnsue extends Curse {
	constructor() {
		super('Hijinks Ensue', 40, 'Curses/hijinxensue.png', 'none',
			  'You get involved in embarrassing sexual situations more often than it is reasonable. You are constantly getting caught in compromising positions, stumbling into other people having sex, suffering wardrobe malfunctions... ');
	}

	lewdnessMult(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness * 1.25;
		}
		return prevLewdness * 1.5;
	}
}
setup.allCurses.HijinksEnsue = new HijinksEnsue()
State.variables.curse64 = setup.allCurses.HijinksEnsue
window.HijinksEnsue = HijinksEnsue
setup.curseArray.push(HijinksEnsue)

class FlowerPower extends Curse {
	constructor() {
		super('Flower Power', 40, 'Curses/flowerpower.png', 'none');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 4;
	}
}
setup.allCurses.FlowerPower = new FlowerPower()
State.variables.curse65 = setup.allCurses.FlowerPower
window.FlowerPower = FlowerPower
setup.curseArray.push(FlowerPower)

class Cellulose extends Curse {
	constructor() {
		super('Cellulose', 35, 'Curses/cellulose.png', 'none');
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return 'smooth, slightly rigid, plant-like'
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevBodyHair) {
		return 0;
	}
}
setup.allCurses.Cellulose = new Cellulose()
State.variables.curse66 = setup.allCurses.Cellulose
window.Cellulose = Cellulose
setup.curseArray.push(Cellulose)

class Chlorophyll extends Curse {
	constructor() {
		super('Chlorophyll', 50, 'Curses/photosynthesis.png', 'none',
			  'You need sunlight every day in order to feel energized; two hours when clothed, or 20 minutes nude. Thankfully, miasma takes care of most of your needs in the Abyss. ');
	}

	changeSkinColor(prevSkinColor) {
		if (!["pale", "tanned", "olive", "brown", "dark brown"].includes(prevSkinColor)) {
			return prevSkinColor;
		}
		return 'green';
	}
}
setup.allCurses.Chlorophyll = new Chlorophyll()
State.variables.curse67 = setup.allCurses.Chlorophyll
window.Chlorophyll = Chlorophyll
setup.curseArray.push(Chlorophyll)

class Pheromones extends Curse {
	constructor() {
		super('Pheromones', 45, 'Curses/pheremones.png', 'none',
			  'You are constantly emitting pheromones that make other people more aroused, especially towards you. Thankfully, it does not cloud their judgment any more than natural arousal. ');
	}
}
setup.allCurses.Pheromones = new Pheromones()
State.variables.curse68 = setup.allCurses.Pheromones
window.Pheromones = Pheromones
setup.curseArray.push(Pheromones)

class Carapacian extends Curse {
	constructor(skinColor='shiny black') {
		super('Carapacian', 50, 'Curses/carapacian.png', 'none');
		this.skinColor = skinColor;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.skinColor];
	}

	get variation() {
		return this.skinColor;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.skinColor = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinType(prevSkinType) {
		return 'hard, shiny, chitin-exoskeleton';
	}

	// eslint-disable-next-line no-unused-vars
	changeBodyHair(prevBodyHair) {
		return 0;
	}

	// eslint-disable-next-line no-unused-vars
	changeSkinColor(prevSkinColor) {
		return this.skinColor;
	}
}
setup.allCurses.Carapacian = new Carapacian()
State.variables.curse69 = setup.allCurses.Carapacian
window.Carapacian = Carapacian
setup.curseArray.push(Carapacian)

class Hemospectrum extends Curse {
	constructor(bloodColor='blue') {
		super('Hemospectrum', 35, 'Curses/hemospectrum.png', 'none');
		this.bloodColor = bloodColor;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.bloodColor];
	}

	get variation() {
		return this.bloodColor;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.bloodColor = value;
	}

	// eslint-disable-next-line no-unused-vars
	changeBlood(prevBlood) {
		return this.bloodColor;
	}

	changeDesc(prevDesc) {
		return prevDesc + `Your blood is now ${this.bloodColor} colored, not a typical color for humans. `
	}
}
setup.allCurses.Hemospectrum = new Hemospectrum()
State.variables.curse70 = setup.allCurses.Hemospectrum
window.Hemospectrum = Hemospectrum
setup.curseArray.push(Hemospectrum)

class WrigglyAntennae extends Curse {
	constructor() {
		super('Wriggly Antennae', 40, 'Curses/wrigglyantennae.png', 'none');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 2;
	}
}
setup.allCurses.WrigglyAntennae = new WrigglyAntennae()
State.variables.curse71 = setup.allCurses.WrigglyAntennae
window.WrigglyAntennae = WrigglyAntennae
setup.curseArray.push(WrigglyAntennae)

class Eggxellent extends Curse {
	constructor() {
		super('Eggxellent', 45, 'Curses/eggxellent.png', 'none');
	}

	changeWomb(character, prevWomb, extraWombLocations) {
		let wombs = prevWomb;
		let locations = extraWombLocations;
		if (character.penis > 0 && !locations.includes('urethra')) {
			wombs += 1;
			locations = locations.concat(['urethra']);
		}
		if (character.doublePenis && locations.count('urethra') < 2) {
			wombs += 1;
			locations = locations.concat(['urethra']);
		}
		return [wombs, locations];
	}
}
setup.allCurses.Eggxellent = new Eggxellent()
State.variables.curse72 = setup.allCurses.Eggxellent
window.Eggxellent = Eggxellent
setup.curseArray.push(Eggxellent)

class SubmissivenessRectificationB extends Curse {
	constructor() {
		super('Submissiveness Rectification B', 35, 'Curses/submissivenessrectificationB.png', 'libido');
	}

	get incompatibilities() {
		return ['Power Dom']
	}

	changeSubDom(prevSubDom) {
		return prevSubDom + 1;
	}
}
setup.allCurses.SubmissivenessRectificationB = new SubmissivenessRectificationB()
State.variables.curse73 = setup.allCurses.SubmissivenessRectificationB
window.SubmissivenessRectificationB = SubmissivenessRectificationB
setup.curseArray.push(SubmissivenessRectificationB)

class LactationRejuvenationB extends Curse {
	constructor() {
		super('Lactation Rejuvenation B', 40, 'Curses/lactationrejuvenationB.png', 'none');
	}

	changeLactation(prevLactation) {
		return prevLactation + 1;
	}
}
setup.allCurses.LactationRejuvenationB = new LactationRejuvenationB()
State.variables.curse74 = setup.allCurses.LactationRejuvenationB
window.LactationRejuvenationB = LactationRejuvenationB
setup.curseArray.push(LactationRejuvenationB)

class PleasureRespecificationB extends Curse {
	constructor() {
		super('Pleasure Respecification B', 55, 'Curses/pleasurerespecB.png', 'none',
			  'You can no longer orgasm from sex with another person, and need to spend some time masturbating after the act to reach climax. ');
	}
}
setup.allCurses.PleasureRespecificationB = new PleasureRespecificationB()
State.variables.curse75 = setup.allCurses.PleasureRespecificationB
window.PleasureRespecificationB = PleasureRespecificationB
setup.curseArray.push(PleasureRespecificationB)

class AgeReductionC extends Curse {
	constructor() {
		super('Age Reduction C', 45, 'Curses/agereductionC.png', 'age');
	}

	get variation() {
		console.error('Deprecated variation field used.')
		return this.time;
	}

	age(prevAge) {
		return Math.min(20 * AgeEvent.aYear, prevAge - 4 * AgeEvent.aYear);
	}
}
setup.allCurses.AgeReductionC = new AgeReductionC()
State.variables.curse76 = setup.allCurses.AgeReductionC
window.AgeReductionC = AgeReductionC
setup.curseArray.push(AgeReductionC)

class Horny extends Curse {
	constructor() {
		super('Horny', 20, 'Curses/horny.png', 'none');
	}

	/* horn inhumanisation handled by code in Character */
	addHorns(prevHorns) {
		return prevHorns + 1;
	}
}
setup.allCurses.Horny = new Horny()
State.variables.curse77 = setup.allCurses.Horny
window.Horny = Horny
setup.curseArray.push(Horny)

class DrawingSpades extends Curse {
	constructor() {
		super('Drawing Spades', 40, 'Curses/drawingspades.png', 'none');
	}

	changeTails(prevTails) {
		return prevTails.concat(['cute, spade-tipped demon']);
	}
}
setup.allCurses.DrawingSpades = new DrawingSpades()
State.variables.curse78 = setup.allCurses.DrawingSpades
window.DrawingSpades = DrawingSpades
setup.curseArray.push(DrawingSpades)

class TattooTally extends Curse {
	constructor() {
		super('Tattoo Tally', 55, 'Curses/tattootally.png', 'none',
			  'You have several small runic tattoos throughout your body, and a larger heart shaped one above your crotch. Everyone who looks at them instinctively knows the full extent of your sexual history. ');
	}
}
setup.allCurses.TattooTally = new TattooTally()
State.variables.curse79 = setup.allCurses.TattooTally
window.TattooTally = TattooTally
setup.curseArray.push(TattooTally)

class Leaky extends Curse {
	constructor() {
		super('Leaky', 55, 'Curses/leaky.png', 'none',
			  `<<nobr>><<set _vagina = $mc.vagina > 0>>
<<set _penis = $mc.penis > 0>>
<<if _vagina || _penis>>
Your <<if _vagina>>pussy is always glistening with lubrication<</if>><<if _vagina && _penis>> and your <</if>><<if _penis>>cock is always leaking precum<</if>>, <<if _vagina && _penis>>so<<else>>and<</if>> it only takes a little motivation to get a real stream going down there.
<</if>><</nobr>>`);
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness;
		}
		if (character.hasCurse(ClothingRestrictionB) || character.hasCurse(ClothingRestrictionC)) {
			return prevLewdness + 2
		}
		return prevLewdness;
	}
}
setup.allCurses.Leaky = new Leaky()
State.variables.curse80 = setup.allCurses.Leaky
window.Leaky = Leaky
setup.curseArray.push(Leaky)

class WanderingHands extends Curse {
	constructor() {
		super('Wandering Hands', 55, 'Curses/wanderinghands.png', 'none',
			  'Whenever you aren\'t paying attention, your hands start rubbing your crotch. ');
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness + 4;
		}
		return prevLewdness + 8;
	}
}
setup.allCurses.WanderingHands = new WanderingHands()
State.variables.curse81 = setup.allCurses.WanderingHands
window.WanderingHands = WanderingHands
setup.curseArray.push(WanderingHands)

class SemenDemon extends Curse {
	/**
	 * Creates a new Semen Demon curse.
	 * @param {'semen' | 'sexual fluids' | 'vaginal fluids'} fluidType The type of fluids the cursed character is required to consume.
	 * @param {number} amount Deprecated: Semen Demon is now taken multiple times by actually taking it multiple times.
	 */
	constructor(fluidType = 'sexual fluids', amount = 1) {
		super('Semen Demon', 20, 'Curses/semendemon.png', 'libido');
		this.fluidType = fluidType;
		if (amount !== 1) console.error('Semen Demon created with invalid amount')
	}

	get maximum() {
		return 4;
	}

	/**
	 * Returns 1
	 * @deprecated To take Semen Demon multiple times, use multiple instances.
	 * @returns {number} The number 1
	 */
	get amount() {
		return 1
	}

	/**
	 * Returns the customisation options chosen for this curse, if any.
	 * @returns {[string, number]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.fluidType, this.amount];
	}

	get variation() {
		return this.fluidType;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.fluidType = value;
	}

	get variation1() {
		return this.amount;
	}

	set variation1(value) {
		console.error('Deprecated variation field used.')
		this.amount = value;
	}

	changeLewdness(prevLewdness, character) {
		let safeConsumption = 0;
		// can supply themselves
		if (character.penis > 0 && this.fluidType !== "vaginal fluids") safeConsumption += 2 * character.fluids / 100;
		if (character.vagina > 0 && this.fluidType !== "semen") safeConsumption += 2 * character.fluids / 100;
		if (character.id === setup.companionIds.mc) {
			// supplied by companions
			safeConsumption += State.variables.hiredCompanions.reduce((v, c) => c.affec >= 15 &&
																		   ((c.penis > 0 && this.fluidType !== 'vaginal fluids') ||
																			(c.vagina > 0 && this.fluidType !== 'semen')
																		   ) ? v + 2 * c.fluids / 100
																			 : v,
																	  safeConsumption);
		}
		if (safeConsumption >= this.amount * 2) return prevLewdness;
		// The case in which the character finds somebody else to help them regularly still isn't covered, but we can't do that mechanically.
		return prevLewdness + this.amount * 3;
	}
}
setup.allCurses.SemenDemon = new SemenDemon();
State.variables.curse82 = setup.allCurses.SemenDemon;
window.SemenDemon = SemenDemon
setup.curseArray.push(SemenDemon)

class Quota extends Curse {
	constructor() {
		super('Quota', 20, 'Curses/quota.png', 'libido');
	}

	get maximum() {
		return 4;
	}

	changeLewdness(prevLewdness, character) {
		if (character.hasCurse(DoubleTrouble)) return prevLewdness;
		if (character.id === setup.companionIds.mc && State.variables.hiredCompanions.some(c => c.affec >= 15)) return prevLewdness;
		// The case in which the character finds somebody else to help them regularly still isn't covered, but we can't do that mechanically.
		return prevLewdness + 3;
	}
}
setup.allCurses.Quota = new Quota()
State.variables.curse83 = setup.allCurses.Quota
window.Quota = Quota
setup.curseArray.push(Quota)

class InTheLimelight extends Curse {
	constructor() {
		super('In the Limelight', 20, 'Curses/inthelimelight.png', 'libido');
	}

	get maximum() {
		return 4;
	}

	changeLewdness(prevLewdness, character) {
		if (character.id === setup.companionIds.mc &&
			State.variables.ownedRelics.some(r => r.name === 'Luminous Phantasmagoria')) {
			return prevLewdness + 2;
		}
		return prevLewdness + 4;
	}

	// limelight mult is in special-purpose code in Character, because the curse can be taken multiple times, but the
	// multiplier should only apply once
	// lewdnessMult(prevLewdness, character) {
	// 	return prevLewdness * 2;
	// }
}
setup.allCurses.InTheLimelight = new InTheLimelight()
State.variables.curse84 = setup.allCurses.InTheLimelight
window.InTheLimelight = InTheLimelight
setup.curseArray.push(InTheLimelight)

class LibidoReinforcementE extends Curse {
	constructor() {
		super('Libido Reinforcement E', 50, 'Curses/libidoreinforcementE.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementE = new LibidoReinforcementE()
State.variables.curse85 = setup.allCurses.LibidoReinforcementE
window.LibidoReinforcementE = LibidoReinforcementE
setup.curseArray.push(LibidoReinforcementE)

class GenderReversalE extends Curse {
	constructor() {
		super('Gender Reversal E', 45, 'Curses/genderreversalE.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalE = new GenderReversalE()
State.variables.curse86 = setup.allCurses.GenderReversalE
window.GenderReversalE = GenderReversalE
setup.curseArray.push(GenderReversalE)

class AssetRobustnessE extends Curse {
	constructor() {
		super('Asset Robustness E', 50, 'Curses/assetrobustnessE.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**3; // 8 cups or 16cm
	}
}
setup.allCurses.AssetRobustnessE = new AssetRobustnessE()
State.variables.curse87 = setup.allCurses.AssetRobustnessE
window.AssetRobustnessE = AssetRobustnessE
setup.curseArray.push(AssetRobustnessE)

class UrineReamplificationA extends Curse {
	static iswatersports = true;
	constructor() {
		super('Urine Reamplification A', 55, 'Curses/urinereamplificationA.png', 'none',
			  'Your bladder capacity has been significantly reduced, you need to be careful to make sure you don\'t have any accidents. ');
	}
}
setup.allCurses.UrineReamplificationA = new UrineReamplificationA()
State.variables.curse88 = setup.allCurses.UrineReamplificationA
window.UrineReamplificationA = UrineReamplificationA
setup.curseArray.push(UrineReamplificationA)

class BarterSystem extends Curse {
	constructor() {
		super('Barter System', 65, 'Curses/bartersystem.png', 'none',
			  'You are unable to process currency, so one of your companions or friends will need to perform any transactions on your behalf, except for when a merchant is willing to trade you an item in exchange for a sexual favor. ');
	}
}
setup.allCurses.BarterSystem = new BarterSystem()
State.variables.curse89 = setup.allCurses.BarterSystem
window.BarterSystem = BarterSystem
setup.curseArray.push(BarterSystem)

class SharedSpace extends Curse {
	constructor() {
		super('Shared Space', 60, 'Curses/sharedspace.png', 'none',
			  'People around you are always happy to grope you, having little regard to giving you any space to yourself. ');
	}
}
setup.allCurses.SharedSpace = new SharedSpace()
State.variables.curse90 = setup.allCurses.SharedSpace
window.SharedSpace = SharedSpace
setup.curseArray.push(SharedSpace)

class Weakling extends Curse {
	constructor() {
		super('Weakling', 65, 'Curses/weakling.png', 'none');
	}

	// handicaps implemented as special-purpose code in Character because it needs to come last.
}
setup.allCurses.Weakling = new Weakling()
State.variables.curse91 = setup.allCurses.Weakling
window.Weakling = Weakling
setup.curseArray.push(Weakling)

class RandomOrgasms extends Curse {
	constructor() {
		super('Random Orgasms', 65, 'Curses/randomorgasms.png', 'none',
			  '<<set $randomOrgasms = $mc.curses.filter(e => e.name === "Random Orgasms").length>><<if setup.activeCurseCount("Random Orgasms") === 1>>Once each day, randomly, you spontaneously orgasm, sometimes in public. <<else>><<print setup.activeCurseCount("Random Orgasms")>> times each day you spontaneously orgasm without any stimulation, sometimes in public. <</if>>');
	}
}
setup.allCurses.RandomOrgasms = new RandomOrgasms()
State.variables.curse92 = setup.allCurses.RandomOrgasms
window.RandomOrgasms = RandomOrgasms
setup.curseArray.push(RandomOrgasms)

class Beastly extends Curse {
	constructor() {
		super('Beastly', 80, 'Curses/beastly.png', 'none',
			  'You tend to behave in a very animalistic way instinctually. People around you tend to assume you\'re more of an animal or a pet than a person to be respected properly. ');
	}

	// conversation handicap implemented as special-purpose code in Character
}
setup.allCurses.Beastly = new Beastly()
State.variables.curse93 = setup.allCurses.Beastly
window.Beastly = Beastly
setup.curseArray.push(Beastly)

class CreatureOfTheNight extends Curse {
	constructor() {
		super('Creature of the Night', 40, 'Curses/creatureofthenight.png', 'none',
			  'You no longer have a pulse and sunlight causes you discomfort, similar to mythological vampires. You also need to drink a small amount of blood to survive, in addition to normal food. ');
	}
}
setup.allCurses.CreatureOfTheNight = new CreatureOfTheNight()
State.variables.curse94 = setup.allCurses.CreatureOfTheNight
window.CreatureOfTheNight = CreatureOfTheNight
setup.curseArray.push(CreatureOfTheNight)

class Minishish extends Curse {
	constructor() {
		super('Minish-ish', 75, 'Curses/minish-ish.png', 'height');
	}

	get incompatibilities() {
		return ['Colossal-able'];
	}

	miniOrGigantify(prevHeight) {
		return prevHeight / 10;
	}

	addSizeHandicap(prevHandicap) {
		// What if all companions are minish-ised too?
		return State.variables.hiredCompanions.length === 0 || prevHandicap;
	}
}
setup.allCurses.Minishish = new Minishish()
State.variables.curse95 = setup.allCurses.Minishish
window.Minishish = Minishish
setup.curseArray.push(Minishish)

class Colossalable extends Curse {
	constructor() {
		super('Colossal-able', 75, 'Curses/colossal-able.png', 'height');
	}

	get incompatibilities() {
		return ['Minish-ish'];
	}

	miniOrGigantify(prevHeight) {
		return prevHeight * 70;
	}

	// eslint-disable-next-line no-unused-vars
	addSizeHandicap(prevHandicap) {
		return true;
	}
}
setup.allCurses.Colossalable = new Colossalable()
State.variables.curse96 = setup.allCurses.Colossalable
window.Colossalable = Colossalable
setup.curseArray.push(Colossalable)

class LibidoReinforcementF extends Curse {
	constructor() {
		super('Libido Reinforcement F', 55, 'Curses/libidoreinforcementF.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementF = new LibidoReinforcementF()
State.variables.curse97 = setup.allCurses.LibidoReinforcementF
window.LibidoReinforcementF = LibidoReinforcementF
setup.curseArray.push(LibidoReinforcementF)

class GenderReversalF extends Curse {
	constructor() {
		super('Gender Reversal F', 50, 'Curses/genderreversalF.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalF = new GenderReversalF()
State.variables.curse98 = setup.allCurses.GenderReversalF
window.GenderReversalF = GenderReversalF
setup.curseArray.push(GenderReversalF)

class AssetRobustnessF extends Curse {
	constructor() {
		super('Asset Robustness F', 60, 'Curses/assetrobustnessF.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**4; // 16 cups or 32cm
	}
}
setup.allCurses.AssetRobustnessF = new AssetRobustnessF()
State.variables.curse99 = setup.allCurses.AssetRobustnessF
window.AssetRobustnessF = AssetRobustnessF
setup.curseArray.push(AssetRobustnessF)

class UrineReamplificationB extends Curse {
	static iswatersports = true;
	constructor() {
		super('Urine Reamplification B', 55, 'Curses/urinereamplificationB.png', 'none');
	}
}
setup.allCurses.UrineReamplificationB = new UrineReamplificationB()
State.variables.curse100 = setup.allCurses.UrineReamplificationB
window.UrineReamplificationB = UrineReamplificationB
setup.curseArray.push(UrineReamplificationB)

class EyeOnThePrize extends Curse {
	static isamputation = true;
	constructor() {
		super('Eye on the Prize', 70, 'Curses/eyeontheprize.png', 'handicap');
	}

	removeEye(prevEyes) {
		return prevEyes - 1;
	}
}
setup.allCurses.EyeOnThePrize = new EyeOnThePrize()
State.variables.curse101 = setup.allCurses.EyeOnThePrize
window.EyeOnThePrize = EyeOnThePrize
setup.curseArray.push(EyeOnThePrize)

class DeafeningSilence extends Curse {
	static isamputation = true;
	constructor() {
		super('Deafening Silence', 90, 'Curses/deafeningsilence.png', 'handicap');
	}

	changeThreatHandicap(prevHandicap) {
		return prevHandicap - 3;
	}

	// conversation handicap handled by special-purpose code in Character
}
setup.allCurses.DeafeningSilence = new DeafeningSilence()
State.variables.curse102 = setup.allCurses.DeafeningSilence
window.DeafeningSilence = DeafeningSilence
setup.curseArray.push(DeafeningSilence)

class TaciturnTurnaround extends Curse {
	static isamputation = true;
	constructor() {
		super('Taciturn Turnaround', 90, 'Curses/taciturnturnaround.png', 'handicap');
	}

	changeThreatHandicap(prevHandicap) {
		return prevHandicap - 3;
	}

	// conversation handicap handled by special-purpose code in Character
}
setup.allCurses.TaciturnTurnaround = new TaciturnTurnaround()
State.variables.curse103 = setup.allCurses.TaciturnTurnaround
window.TaciturnTurnaround = TaciturnTurnaround
setup.curseArray.push(TaciturnTurnaround)

class AmpuQtie extends Curse {
	static isamputation = true;
	constructor(arms = 0, legs = 0) {
		super('Ampu-Q-tie', 45, 'Curses/ampu-Q-tie.png', 'none');
		if (typeof arms === 'string') {
			this.arms = arms.count('A');
			this.legs = arms.count('L');
		} else {
			this.arms = arms;
			this.legs = legs;
		}
	}

	/**
	 * Returns the customisation options chosen for this curse, if any.
	 * @returns {[number, number]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.arms, this.legs];
	}

	get incompatibilities() {
		return ['Arm Army'];
	}

	get variation() {
		let str = '';
		for (let i = 0; i < this.arms; i++) str += 'A';
		for (let i = 0; i < this.legs; i++) str += 'L';
		return str;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.arms = value.count('A');
		this.legs = value.count('L');
	}

	removeLeg(prevLegs) {
		return prevLegs - this.legs;
	}

	removeArm(prevArms) {
		return prevArms - this.arms;
	}
}
setup.allCurses.AmpuQtie = new AmpuQtie()
State.variables.curse104 = setup.allCurses.AmpuQtie
window.AmpuQtie = AmpuQtie
setup.curseArray.push(AmpuQtie)

class NoseGoes extends Curse {
	static isamputation = true;
	constructor() {
		super('Nose Goes', 65, 'Curses/nosegoes.png', 'handicap');
	}

	changeThreatHandicap(prevHandicap) {
		return prevHandicap - 3;
	}
}
setup.allCurses.NoseGoes = new NoseGoes()
State.variables.curse105 = setup.allCurses.NoseGoes
window.NoseGoes = NoseGoes
setup.curseArray.push(NoseGoes)

class ArmArmy extends Curse {
	constructor() {
		super('Arm Army', 15, 'Curses/armarmy.png', 'none');
	}

	get incompatibilities() {
		return ['Ampu-Q-tie'];
	}

	get maximum() {
		return 6;
	}

	removeArm(prevArms) {
		return prevArms + 2;
	}
}
setup.allCurses.ArmArmy = new ArmArmy()
State.variables.curse106 = setup.allCurses.ArmArmy
window.ArmArmy = ArmArmy
setup.curseArray.push(ArmArmy)

class ALittleExtra extends Curse {
	constructor(genital = '') {
		super('A Little Extra', 35, 'Curses/alittleextra.png', 'none');
		this.genitals = genital;
	}

	get incompatibilities() {
		return ['Null'];
	}

	/**
	 * Returns the customisation options chosen for this curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.genitals];
	}

	get variation() {
		return this.genitals;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.genitals = value;
	}

	doublePenis(character, prevDoubled) {
		return prevDoubled || character.vagina === 0 || this.genitals === 'penis';
	}

	changeVagina(character, prevVagina) {
		if (character.penis === 0 || this.genitals === 'vagina') {
			return prevVagina + 1;
		}
		return prevVagina;
	}

	changeWomb(character, prevWomb, extraWombLocations) {
		if (character.penis === 0 || this.genitals === 'vagina') {
			return [prevWomb + 1, extraWombLocations];
		}
		return [prevWomb, extraWombLocations];
	}
}
setup.allCurses.ALittleExtra = new ALittleExtra()
State.variables.curse107 = setup.allCurses.ALittleExtra
window.ALittleExtra = ALittleExtra
setup.curseArray.push(ALittleExtra)

class Null extends Curse {
	constructor() {
		super('Null', 80, 'Curses/null.png', 'gender');
	}

	get incompatibilities() {
		return ['A Little Extra'];
	}

	// eslint-disable-next-line no-unused-vars
	changeVagina(character, prevVagina) {
		return 0;
	}

	// eslint-disable-next-line no-unused-vars
	changePenis(character, prevPenis) {
		return 0;
	}

	// eslint-disable-next-line no-unused-vars
	doublePenis(character, prevDoubled) {
		return false;
	}
}
setup.allCurses.Null = new Null()
State.variables.curse108 = setup.allCurses.Null
window.Null = Null
setup.curseArray.push(Null)

class Seafolk extends Curse {
	constructor() {
		super('Seafolk', 50, 'Curses/seafolk.png', 'handicap');
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 4;
	}

	removeLeg(prevLegs) {
		return prevLegs - 2;
	}
}
setup.allCurses.Seafolk = new Seafolk()
State.variables.curse109 = setup.allCurses.Seafolk
window.Seafolk = Seafolk
setup.curseArray.push(Seafolk)

class TakenForGranite extends Curse {
	constructor() {
		super('Taken for Granite', 75, 'Curses/takenforgranite.png', 'none');
	}
}
setup.allCurses.TakenForGranite = new TakenForGranite()
State.variables.curse110 = setup.allCurses.TakenForGranite
window.TakenForGranite = TakenForGranite
setup.curseArray.push(TakenForGranite)

class DoubleTrouble extends Curse {
	/**
	 *
	 * @param {string} twinName
	 * @param {'inverted' | 'same'} twinType
	 */
	constructor(twinName = 'Nono', twinType = 'same') {
		super('Double Trouble', 60, 'Curses/doubletrouble.png', 'none');
		this.twinName = twinName;
		this.twinType = twinType;
	}

	get variation() {
		return this.twinName;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.twinName = value;
	}

	get variation2() {
		return this.twinType;
	}

	set variation2(value) {
		console.error('Deprecated variation field used.')
		this.twinType = value;
	}
}
setup.allCurses.DoubleTrouble = new DoubleTrouble()
State.variables.curse111 = setup.allCurses.DoubleTrouble
window.DoubleTrouble = DoubleTrouble
setup.curseArray.push(DoubleTrouble)

class Conjoined extends Curse {
	constructor() {
		super('Conjoined', 80, 'Curses/conjoined.png', 'handicap');
	}

	changeThreatHandicap(prevHandicap) {
		return prevHandicap - 6;
	}

	changeMovementHandicap(prevHandicap) {
		return prevHandicap - 6;
	}

	changeCarryHandicap(prevHandicap) {
		return prevHandicap - 2;
	}
}
setup.allCurses.Conjoined = new Conjoined()
State.variables.curse112 = setup.allCurses.Conjoined
window.Conjoined = Conjoined
setup.curseArray.push(Conjoined)

class LibidoReinforcementG extends Curse {
	constructor() {
		super('Libido Reinforcement G', 60, 'Curses/libidoreinforcementG.png', 'libido');
	}

	changeLibido(prevLibido) {
		return prevLibido + 1;
	}
}
setup.allCurses.LibidoReinforcementG = new LibidoReinforcementG()
State.variables.curse113 = setup.allCurses.LibidoReinforcementG
window.LibidoReinforcementG = LibidoReinforcementG
setup.curseArray.push(LibidoReinforcementG)

class GenderReversalG extends Curse {
	constructor() {
		super('Gender Reversal G', 55, 'Curses/genderreversalG.png', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + character.osex === 'male' ? 1 : -1;
	}
}
setup.allCurses.GenderReversalG = new GenderReversalG()
State.variables.curse114 = setup.allCurses.GenderReversalG
window.GenderReversalG = GenderReversalG
setup.curseArray.push(GenderReversalG)

class AssetRobustnessG extends Curse {
	constructor() {
		super('Asset Robustness G', 80, 'Curses/assetrobustnessG.png', 'gender');
	}

	get incompatibilities() {
		return ['Shrunken Assets']
	}

	growAsset(prevAsset) {
		return prevAsset + 2**5; // 32 cups or 64cm
	}
}
setup.allCurses.AssetRobustnessG = new AssetRobustnessG()
State.variables.curse115 = setup.allCurses.AssetRobustnessG
window.AssetRobustnessG = AssetRobustnessG
setup.curseArray.push(AssetRobustnessG)

class Literalization extends Curse {
	constructor() {
		super('Literalization', 140, 'Curses/literalization.png', 'none');
	}
}
setup.allCurses.Literalization = new Literalization()
State.variables.curse116 = setup.allCurses.Literalization
window.Literalization = Literalization
setup.curseArray.push(Literalization)

class ConsentDissent extends Curse {
	constructor() {
		super('Consent Dissent', 120, 'Curses/consentdissent.png', 'none');
	}
}
setup.allCurses.ConsentDissent = new ConsentDissent()
State.variables.curse117 = setup.allCurses.ConsentDissent
window.ConsentDissent = ConsentDissent
setup.curseArray.push(ConsentDissent)

class TheMaxim extends Curse {
	constructor(location = 'anus') {
		super('The Maxim', 110, 'Curses/themaxim.png', 'none');
		this.location = location;
	}

	get variation() {
		return this.location;
	}

	set variation(value) {
		console.error('Deprecated variation field used.')
		this.location = value;
	}

	// libido changes implemented by special-purpose code in Character

	// eslint-disable-next-line no-unused-vars
	changeLewdness(prevLewdness, character) {
		return prevLewdness + 4;
	}
}
setup.allCurses.TheMaxim = new TheMaxim()
State.variables.curse118 = setup.allCurses.TheMaxim
window.TheMaxim = TheMaxim
setup.curseArray.push(TheMaxim)

class AdversePossession extends Curse {
	constructor() {
		super('Adverse Possession', 115, 'Curses/adversepossession.png', 'none');
	}

}
setup.allCurses.AdversePossession = new AdversePossession()
State.variables.curse119 = setup.allCurses.AdversePossession
window.AdversePossession = AdversePossession
setup.curseArray.push(AdversePossession)

class Erased extends Curse {
	constructor() {
		super('Erased', 100, 'Curses/erased.png', 'none');
	}
}
setup.allCurses.Erased = new Erased()
State.variables.curse120 = setup.allCurses.Erased
window.Erased = Erased
setup.curseArray.push(Erased)

class TicklyTentacles extends Curse {
	constructor() {
		super('Tickly Tentacles', 10, 'Curses/ticklytentacles.png', 'none');
	}

	get maximum() {
		return 10;
	}
}
setup.allCurses.TicklyTentacles = new TicklyTentacles()
State.variables.curse121 = setup.allCurses.TicklyTentacles
window.TicklyTentacles = TicklyTentacles
setup.curseArray.push(TicklyTentacles)

class Eyescream extends Curse {
	constructor() {
		super('Eye-scream', 5, 'Curses/eye-scream.png', 'none');
	}

	get maximum() {
		return 20;
	}
}
setup.allCurses.Eyescream = new Eyescream()
State.variables.curse122 = setup.allCurses.Eyescream
window.Eyescream = Eyescream
setup.curseArray.push(Eyescream)

class AMouthful extends Curse {
	constructor() {
		super('A Mouthful', 20, 'Curses/datmouf.png', 'none');
	}

	get maximum() {
		return 5;
	}
}
setup.allCurses.AMouthful = new AMouthful()
State.variables.curse123 = setup.allCurses.AMouthful
window.AMouthful = AMouthful
setup.curseArray.push(AMouthful)

class BelowTheVeil extends Curse {
	constructor() {
		super('Below the Veil', 200, 'Curses/belowtheveil.png', 'none');
	}
}
setup.allCurses.BelowTheVeil = new BelowTheVeil()
State.variables.curse124 = setup.allCurses.BelowTheVeil
window.BelowTheVeil = BelowTheVeil
setup.curseArray.push(BelowTheVeil)

class PrincessProtocol extends Curse {
	constructor() {
		super('Princess Protocol', 25, 'Curses/princessprotocol.png', 'none');
	}
}
setup.allCurses.PrincessProtocol = new PrincessProtocol()
State.variables.curse125 = setup.allCurses.PrincessProtocol
window.PrincessProtocol = PrincessProtocol
setup.curseArray.push(PrincessProtocol)
