/* global CharEvent, AgeEvent, Creepify */
// noinspection JSUnusedGlobalSymbols

// TODO: descriptionMitigated fields in all curses are written by Annonymus and not reviewed/edited by anybody else (xxx)

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
	 * @param {string} type The type of events this Curse creates.
	 * 'none' if the Curse has no mechanical impact and 'other' if the event is Curse-specific,
	 * meaning no other events have similar effects (for example the double penis Curse).
	 * @param {string} [appDesc] The description that gets added to the player's appearance when they take this curse.
	 */
	constructor(name, type = 'none', appDesc = '') {
		super(name, type)
		if (this.constructor === Curse) console.error('Raw Curse constructed');
		this.corruption = this.constructor.corruption;
		this._appDesc = appDesc;
	}

	_internalState() {
		return Object.assign({corruption: this.corruption}, super._internalState())
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
	 * Creates a copy of this curse. Unlike clone(), this makes a new Curse, not the same Curse, so e.g. if it is added to
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

	get pic() {
		return this.constructor.picture;
	}
	get picture() {
		return this.constructor.picture;
	}

	get description() {
		if (!State.variables.curseMitigation) { // TODO: check if the mitigation nadir reward is active
			return this.constructor.description;
		} else {
			return this.constructor.descriptionMitigated;
		}
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

	/**
	 * Returns the list of Curses this Curse is incompatible with. This Curse may not be taken if any of the Curses in
	 * this array have been taken before or are stored in managed misfortune.
	 * @returns {[string]} The list of incompatible Curses.
	 */
	static get incompatibilities() {
		return []
	}

	/**
	 * Returns the list of Curses this Curse is incompatible with. This Curse may not be taken if any of the Curses in
	 * this array have been taken before or are stored in managed misfortune.
	 * @returns {[string]} The list of incompatible Curses.
	 */
	get incompatibilities() {
		return this.constructor.incompatibilities;
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
	static corruption = 20;
	static curseName = 'Libido Reinforcement A';
	static description = `Gives one level of the Libido Reinforcement Curse, which boosts your sex drive according to how many Libido Reinforcement effects you've taken.`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse, which boosts your sex drive according to how many Libido Reinforcement effects you've taken.\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`
	static picture = 'Curses/libidoreinforcementA.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement A', 'libido');
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
	static corruption = 15;
	static curseName = 'Gender Reversal A';
	static description = `Gives one level of Gender Reversal, which causes gradual changes in your body that cause you to appear as the gender opposite to what you were assigned at birth. No effect on penis or boob size.`;
	static descriptionMitigated = `Gives one level of Gender Reversal, which causes gradual changes in your body that cause you to appear as the gender opposite to what you were assigned at birth. No effect on penis or boob size.\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalA.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal A', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalA = new GenderReversalA()
State.variables.curse2 = setup.allCurses.GenderReversalA
window.GenderReversalA = GenderReversalA
setup.curseArray.push(GenderReversalA)

class AssetRobustnessA extends Curse {
	static corruption = 10;
	static curseName = 'Asset Robustness A';
	static description = `Grows your boobs by about 1 cup size and/or increases your penis size by about 2.5cm (1in), depending on what's applicable. For all Asset Robustness Curses, band and sizes and girth are scaled appropriately, and your assets will grow back to their new, increased size if surgically reduced.`;
	static descriptionMitigated = `Grows your boobs by about 1 cup size and/or increases your penis size by about 2.5cm (1in), depending on what's applicable. For all Asset Robustness Curses, band and sizes and girth are scaled appropriately, and your assets will grow back to their new, increased size if surgically reduced.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessA.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness A', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 30;
	static curseName = 'Clothing Restriction A';
	static description = `Prevents you from ever wearing anything that would commonly be considered an "accessory." Includes scarves, hats, piercings, pasties, jewelry, and so on. Kind of a bummer. Doesn't include items serving a specific necessary purpose, like prescription glasses. None of the Clothing restriction Curses include Relics if they are worn with the intention of making use of their effect.`;
	static descriptionMitigated = `Prevents you from ever wearing anything that would commonly be considered an "accessory." Includes scarves, hats, piercings, pasties, jewelry, and so on. Kind of a bummer. Doesn't include items serving a specific necessary purpose, like prescription glasses. None of the Clothing restriction Curses include Relics if they are worn with the intention of making use of their effect.\n\nThanks to the effects of the Shifting Obelisk, you can wear functional but not strictly necessary items, such as sun hats, for as long as they perform a useful function (e.g. you'd have to take the sun hat off indoors). Also allows you to wear accessories to better comply with effects of other curses, e.g. because you have Submissiveness Rectification and have been ordered to.`;
	static picture = 'Curses/clothingrestrictionA.png';
	static type = 'none';
	constructor() {
		super('Clothing Restriction A', 'none',
		      'You cannot bring yourself to wear any accessories anywhere on your body. ');
	}
}
setup.allCurses.ClothingRestrictionA = new ClothingRestrictionA()
State.variables.curse4 = setup.allCurses.ClothingRestrictionA
window.ClothingRestrictionA = ClothingRestrictionA
setup.curseArray.push(ClothingRestrictionA)

class ShrunkenAssets extends Curse {
	static corruption = 75;
	static curseName = 'Shrunken Assets';
	static description = `Decreases boob size/penis size to approximately minimal levels - about AA cup boobs and a roughly 1cm (~0.5in) penis. They will resist surgical attempts at enhancement. Can't be taken with any Asset Robustness Curses. (That's why you get so many points for it.)`;
	static descriptionMitigated = `Decreases boob size/penis size to approximately minimal levels - about AA cup boobs and a roughly 1cm (~0.5in) penis. They will resist surgical attempts at enhancement. Can't be taken with any Asset Robustness Curses (that's why you get so many points for it).\n\nThanks to the effects of the Shifting Obelisk you may choose to vary the reduction between completely gone and A cup breasts/2cm penis. As a penis shifts from micropenis to no penis it will retreat inwards until only a small nub with a urethra is left, which acts as an erogenous zone.`;
	static picture = 'Curses/shrunkenassets.png';
	static type = 'gender';
	constructor() {
		super('Shrunken Assets', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 5;
	static curseName = 'Hair Removal';
	static description = `Permanently removes all hair below your nose, and even shapes your eyebrows into a pleasing shape so you don't have to maintain them. Never shave again!`;
	static descriptionMitigated = `Permanently removes all hair below your nose, and even shapes your eyebrows into a pleasing shape so you don't have to maintain them. Never shave again!\n\nThanks to the effects of the Shifting Obelisk you can choose which parts of your body hair you want to retain and its maximum length. This would let your maintain e.g. a beard or a permanently-closely-shaven landing strip.`;
	static picture = 'Curses/hairremoval.png';
	static type = 'none';
	constructor() {
		super('Hair Removal', 'none',
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
	static corruption = 5;
	static curseName = 'Perma-dye';
	static description = `Permanently changes your natural hair color to a significantly different, visually distinct color of your choice. You can choose if you want to go with a fun, weird color like purple or just stick with the normal human range.`;
	static descriptionMitigated = `Permanently changes your natural hair color to a significantly different, visually distinct color of your choice. You can choose if you want to go with a fun, weird color like purple or just stick with the normal human range.\n\nThanks to the effects of the Shifting Obelisk, if you change your mind you can slowly shift the color to your preferred new color over time.`;
	static picture = 'Curses/perma-dye.png';
	static type = 'none';
	constructor(hairColor='turquoise') {
		super('Perma-dye', 'none');

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
	static corruption = 10;
	static curseName = 'Freckle Speckle';
	static description = `Gives you a splatter of freckles or moles around your body. You can arrange their exact locations and density, but they have to be a significant and noticeable feature. Make sure to include one of those nakibokuro under-eye beauty marks, they're super cute!`;
	static descriptionMitigated = `Gives you a splatter of freckles or moles around your body. You can arrange their exact locations and density, but they have to be a significant and noticeable feature. Make sure to include one of those nakibokuro under-eye beauty marks, they're super cute!\n\nThanks to the effects of the Shifting Obelisk, if you change your mind later you can rearrange their location and density.`;
	static picture = 'Curses/frecklespeckle.png';
	static type = 'none';
	constructor() {
		super('Freckle Speckle', 'none',
		      'An assortment of freckles are spread over your body. ');
	}
}
setup.allCurses.FreckleSpeckle = new FreckleSpeckle()
State.variables.curse8 = setup.allCurses.FreckleSpeckle
window.FreckleSpeckle = FreckleSpeckle
setup.curseArray.push(FreckleSpeckle)

class KnifeEar extends Curse {
	static corruption = 20;
	static curseName = 'Knife-ear';
	static description = `Gives you a pair of sharp, pointy, elfish ears. There are some humans on the surface who get surgery to look like this, so you'll only kind of stick out up there!<br>Also affects any other ear-related Curses you take.`;
	static descriptionMitigated = `Gives you a pair of sharp, pointy, elfish ears. There are some humans on the surface who get surgery to look like this, so you'll only kind of stick out up there!<br>Also affects any other ear-related Curses you take.\n\nThanks to the effects of the Shifting Obelisk you can choose to change your facial structure and other small bodily details to be more elf-like too, and choose between the normal-sized pointy ears of traditional (tolkien) elves and the long, sideways ears of japanese elves.`;
	static picture = 'Curses/knifeear.png';
	static type = '';
	constructor() {
		super('Knife-ear', '');
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
	static corruption = 5;
	static curseName = 'Dizzying Heights';
	static description = `Increases or decreases your current height by 5cm (2in), by your preference. This will take a very long time to get used to. All height changes in the Abyss must be in the same direction. (max. 5)`;
	static descriptionMitigated = `Increases or decreases your current height by 5cm (2in), by your preference. This will take a very long time to get used to. All height changes in the Abyss must be in the same direction. (max. 5)\n\nThanks to the effects of the Shifting Obelisk you will find yourself naturally behaving like somebody used to your new height and your proportions will adjust to look natural on your new body as long as you don't go too extreme with the height changes.`;
	static picture = 'Curses/dizzyingheights.png';
	static type = 'height';
	constructor(direction=0) {
		super('Dizzying Heights', 'height');
		this.direction = direction;
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[number]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.direction];
	}

	changeHeightDirection(prevDir) {
		if (prevDir !== this.direction && prevDir !== 0 && this.direction !== 0) {
			console.error(`Height direction changed multiple times (${prevDir} -> ${this.direction}).`)
		}
		return this.direction === 0 ? prevDir : this.direction;
	}

	changeHeight(prevHeight, direction) {
		if (direction !== -1 && direction !== 1) {
			console.error('Height changed without having set a change direction.');
			return -1;
		}
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
	static corruption = 10;
	static curseName = 'Increased Sensitivity';
	static description = `Significantly increases the sensitivity of your erogenous zones — even brief, soft stimulation will quickly bring you over the edge.`;
	static descriptionMitigated = `Significantly increases the sensitivity of your erogenous zones — even brief, soft stimulation will quickly bring you over the edge.\n\nThanks to the effects of the Shifting Obelisk you are able to bring yourself to temporarily ignore the sensations by sheer force of will. This is draining though, and you can't keep it up all day. Also lets you do the opposite and increase the sensitivity even more if you want to.`;
	static picture = 'Curses/increasedsensitivity.png';
	static type = 'libido';
	constructor() {
		super('Increased Sensitivity', 'libido');
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
	static corruption = 10;
	static curseName = 'Refractory Refactorization';
	static description = `Removes your refractory period, allowing you to orgasm many times in quick succession. Has a noticeable effect regardless of your sexual equipment. Makes a powerful yet dangerous combo with Increased Sensitivity.`;
	static descriptionMitigated = `Removes your refractory period, allowing you to orgasm many times in quick succession. Has a noticeable effect regardless of your sexual equipment. Makes a powerful yet dangerous combo with Increased Sensitivity.\n\nThanks to the effects of the Shifting Obelisk you are able to temporarily suppress orgasms by sheer force of will. This is draining though and you can't do it many times in succession. Also lets you do the opposite and bring yourself to a hands-free orgasm by thought alone.`;
	static picture = 'Curses/refractoryrefactorization.png';
	static type = 'libido';
	constructor() {
		super('Refractory Refactorization', 'libido');
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
	static corruption = 25;
	static curseName = 'Libido Reinforcement B';
	static description = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive.`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive.\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementB.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement B', 'libido');
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
	static corruption = 20;
	static curseName = 'Gender Reversal B';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change.`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change.\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalB.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal B', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalB = new GenderReversalB()
State.variables.curse14 = setup.allCurses.GenderReversalB
window.GenderReversalB = GenderReversalB
setup.curseArray.push(GenderReversalB)

class AssetRobustnessB extends Curse {
	static corruption = 15;
	static curseName = 'Asset Robustness B';
	static description = `Grows your boobs by about 2 cup sizes and/or increased your penis size by about 5 cm (2in), depending on what's applicable. You can have Asset Robustness Curses affect butt sizes too if you like.`;
	static descriptionMitigated = `Grows your boobs by about 2 cup sizes and/or increased your penis size by about 5 cm (2in), depending on what's applicable. You can have Asset Robustness Curses affect butt sizes too if you like.\n\nThanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessB.png';
	static type = 'none';
	constructor() {
		super('Asset Robustness B', 'none');
	}

	static get incompatibilities() {
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
	static corruption = 15;
	static curseName = 'Age Reduction A';
	static description = `Reduces your apparent physical age by 2 years or sets it to 20, whichever is younger. Many might consider this a boon.`;
	static descriptionMitigated = `Reduces your apparent physical age by 2 years or sets it to 20, whichever is younger. Many might consider this a boon.\n\nThanks to the effects of the Shifting Obelisk, you can make small cosmetic changes to your body's apparent age. You can't change big things like your height, but you could make your facial structure less kid-like or start growing a beard at an earlier biological age than your body would usually allow.`;
	static picture = 'Curses/agereductionA.png';
	static type = 'age';
	constructor() {
		super('Age Reduction A', 'age');
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
	static corruption = 20;
	static curseName = 'Fluffy Ears';
	static description = `You gain a set of ears from a (non-human) mammal of your choice on the top of your head, replacing your old ears. Be the kemonomimi you've always wanted to be.`;
	static descriptionMitigated = `You gain a set of ears from a (non-human) mammal of your choice on the top of your head, replacing your old ears. Be the kemonomimi you've always wanted to be.\n\nThanks to the effects of the Shifting Obelisk, you can somewhat influence the size and location of your new ears. Not enough to make them so small they couldn't be seen at all, but enough to make it reasonably easy to hide them under a hat or hoodie without great discomfort.`;
	static picture = 'Curses/fluffyears.png';
	static type = 'none';
	constructor(earType='furry cat') {
		super('Fluffy Ears', 'none');

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
	static corruption = 20;
	static curseName = 'Fluffy Tail';
	static description = `A tail from a mammal of your choice will spout from your lower back. You can take up to 9 if you're going for the kitsune or nekomata look or something, but only the first grants any corruption.`;
	static descriptionMitigated = `A tail from a mammal of your choice will spout from your lower back. You can take up to 9 if you're going for the kitsune or nekomata look or something, but only the first grants any corruption.\n\nThanks to the effects of the Shifting Obelisk, you can somewhat influence the size and location of your new tail. Not enough to make it so small it couldn't be seen at all, but enough to make it reasonably easy to hide under a long skirt. Also makes the tail prehensile if it isn't already and long enough that it makes sense. It won't be very strong, you can't use it as another limb, but you can move it as you like.`;
	static picture = 'Curses/fluffytail.png';
	static type = 'none';
	constructor(tailType='flowing cat') {
		super('Fluffy Tail', 'none');
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
	static corruption = 30;
	static curseName = 'Maximum Fluff';
	static description = `Fur from a non-human mammal of your choice will grow over your entire body, forming a pelt. Cannot be chosen with the "Hair Removal" Curse, but if you like you can have this Curse override it instead, giving this Curse's points and effect and removing the points you got from Hair Removal.`;
	static descriptionMitigated = `Fur from a non-human mammal of your choice will grow over your entire body, forming a pelt. Cannot be chosen with the "Hair Removal" Curse, but if you like you can have this Curse override it instead, giving this Curse's points and effect and removing the points you got from Hair Removal.\n\nThanks to the effects of the Shifting Obelisk, you can choose the coloration, patterning and length of the fur. It also stays clean more easily.`;
	static picture = 'Curses/maximumfluff.png';
	static type = 'none';
	constructor(hairType='cat-furred') {
		super('Maximum Fluff', 'none');
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
State.variables.curse19 = setup.allCurses.MaximumFluff;
window.MaximumFluff = MaximumFluff
setup.curseArray.push(MaximumFluff)

class HeatRut extends Curse {
	static corruption = 20;
	static curseName = 'Heat/Rut';
	static description = `For approximately one day a month, your libido will skyrocket, making it much harder to control yourself. Grants two temporary levels of the Libido Reinforcement Curse.`;
	static descriptionMitigated = `For approximately one day a month, your libido will skyrocket, making it much harder to control yourself. Grants two temporary levels of the Libido Reinforcement Curse.\n\nThanks to the effects of the Shifting Obelisk, you will always know in advance exactly when the effect starts and ends and you get a 1 hour window during which you can suppress it. The libido reinforcement curses' mitigation still applies, letting you adjust the curse level, but reducing the level while Heat/Rut is in effect costs twice as much. On the other hand, increasing libido even more on this day also counts twice as much. You cannot reduce libido below level 2 while Heat/Rut is in effect.`;
	static picture = 'Curses/heat.png';
	static type = 'libido';
	constructor() {
		super('Heat/Rut', 'libido');
	}

	// Libido change is implemented as special-purpose code in Character.libido because it requires accessing
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
	static corruption = 15;
	static curseName = 'Lightweight';
	static description = `You take bonus damage from alcohol. Even a single beer will leave your speech a bit slurred and your reactions dulled, and drinking anything harder will almost certainly lead to you eventually blacking out.

Also enhances the effects of things like aphrodisiacs and recreational drugs, and even coffee. Just a sip of caffeine will lead to you being very hyper, jittery, and excitable.`;
	static descriptionMitigated = `You take bonus damage from alcohol. Even a single beer will leave your speech a bit slurred and your reactions dulled, and drinking anything harder will almost certainly lead to you eventually blacking out.

Also enhances the effects of things like aphrodisiacs and recreational drugs, and even coffee. Just a sip of caffeine will lead to you being very hyper, jittery, and excitable.\n\nThanks to the effects of the Shifting Obelisk, the effect is slightly reduced, allowing you to drink twice as much for the same effect, and the positive effects of drugs are enhanced more than the negative ones (aphrodisiacs count as positive).`;
	static picture = 'Curses/lightweight.png';
	static type = 'none';
	constructor() {
		super('Lightweight', 'none',
		      'Just a little bit of alcohol turns you into a drunk mess. You\'d better not go out partying without trusted friends nearby. Behavior altering substances in general also have a much stronger effect on you. ');
	}
}
setup.allCurses.Lightweight = new Lightweight()
State.variables.curse21 = setup.allCurses.Lightweight
window.Lightweight = Lightweight
setup.curseArray.push(Lightweight)

class SexSwitcheroo extends Curse {
	static corruption = 30;
	static curseName = 'Sex Switcheroo';
	static description = `If you have a penis, it'll retreat inwards and be replaced with a vagina and all other associated organs, along with breasts roughly proportionate to the size of penis you had as compared to the average. The reverse happens if you started with a vagina, and you'll gain a penis roughly proportionate to the size of your old boobs. (Flat boobs get a very small micropenis.)`;
	static descriptionMitigated = `If you have a penis, it'll retreat inwards and be replaced with a vagina and all other associated organs, along with breasts roughly proportionate to the size of penis you had as compared to the average. The reverse happens if you started with a vagina, and you'll gain a penis roughly proportionate to the size of your old boobs. (Flat boobs get a very small micropenis.)\n\nThanks to the effects of the Shifting Obelisk, you will find that use of your new organs comes natural to you, and if you gained a womb you can choose not to get the menstrual cycle (you can still get pregnant though). If you gained a penis you can adjust its size by up to 2cm. If you gained breasts you can adjust their size by up to 1 cup size.`;
	static picture = 'Curses/sexswitcheroo.png';
	static type = 'gender';
	constructor() {
		super('Sex Switcheroo', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 35;
	static curseName = 'Futa Fun';
	static description = `Has the same effect as Sex Switcheroo, but leaves you with a penis, a pair of boobs, and a vagina (You can decide if you want balls or not). All of your new parts will both be affected by all Asset Robustness or Shrunken Assets Curses from here onwards. Can't be taken with Sex Switcheroo.

If you already have both a penis and a pair of breasts, congrats on the free points! Well, maybe your bottom parts have changed, but it's less of a change for you than for someone else taking this Curse.`;
	static descriptionMitigated = `Has the same effect as Sex Switcheroo, but leaves you with a penis, a pair of boobs, and a vagina (You can decide if you want balls or not). All of your new parts will both be affected by all Asset Robustness or Shrunken Assets Curses from here onwards. Can't be taken with Sex Switcheroo.
Thanks to the effects of the Shifting Obelisk, you will find that use of your new organs comes natural to you, and if you gained a womb you can choose not to get the menstrual cycle (you can still get pregnant though). If you gained a penis you can adjust its size by up to 2cm. If you gained breasts you can adjust their size by up to 1 cup size.

If you already have both a penis and a pair of breasts, congrats on the free points! Well, maybe your bottom parts have changed, but it's less of a change for you than for someone else taking this Curse.`;
	static picture = 'Curses/futafun.png';
	static type = 'gender';
	constructor() {
		super('Futa Fun', 'gender');
	}

	static get incompatibilities() {
		return ['Sex Switcheroo']
	}

		/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[string]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
		_customisationOptions() {
			return [this.sexType];
		}

		get variation() {
			return this.sexType;
		}

		set variation(value) {
			console.error('Deprecated variation field used.')
			this.sexType = value;
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
		if (this.sexType === "male") return 0;
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
	static corruption = 25;
	static curseName = 'Blushing Virgin';
	static description = `You'll find sexual activities and nudity to be uncomfortable and very embarrassing. You can still do sexy stuff, you'll just be cutely embarrassed and extremely bashful when doing so.`;
	static descriptionMitigated = `You'll find sexual activities and nudity to be uncomfortable and very embarrassing. You can still do sexy stuff, you'll just be cutely embarrassed and extremely bashful when doing so.\n\nThanks to the effects of the Shifting Obelisk, you get a cognitive dissonance between your intentions and your actions — you can plan for sexual activities and decide what to do without feeling embarrassed and without the embarrassment influencing your decision, but you'll still be embarrassed when you do it. This also means you can choose your actions while embarrassed rationally, so if e.g. somebody walks in on you while changing you could blush, badly hide your genitals with your hands and complain that the interloper didn't know rather than panic and run behind a curtain.`;
	static picture = 'Curses/blushingvirgin.png';
	static type = 'none';
	constructor() {
		super('Blushing Virgin', 'none',
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
	static corruption = 20;
	static curseName = 'Submissiveness Rectification A';
	static description = `Makes you significantly more submissive to the desires of others, and even has minor effects outside of the bedroom. You'll still be able to refuse requests that you're strongly against, but you can give up any hope of taking a dominant role.`;
	static descriptionMitigated = `Makes you significantly more submissive to the desires of others, and even has minor effects outside of the bedroom. You'll still be able to refuse requests that you're strongly against, but you can give up any hope of taking a dominant role.\n\nThanks to the effects of the Shifting Obelisk, you'll enjoy being submissive more and you have instinctual knowledge of how to act to guide the people around you to fulfill your goals even while remaining submissive, e.g. by getting them to propose something you wanted as well and then agreeing to it or by making them feel grateful for all the things you do for them, giving you a boon you desire in return.`;
	static picture = 'Curses/subrectificationA.png';
	static type = 'libido';
	constructor() {
		super('Submissiveness Rectification A', 'libido');
	}

	static get incompatibilities() {
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
	static corruption = 20;
	static curseName = 'Gender Reversal C';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Don't worry, I hear androgyny is in vogue!`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Don't worry, I hear androgyny is in vogue!\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalC.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal C', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalC = new GenderReversalC()
State.variables.curse26 = setup.allCurses.GenderReversalC
window.GenderReversalC = GenderReversalC
setup.curseArray.push(GenderReversalC)

class AssetRobustnessC extends Curse {
	static corruption = 25;
	static curseName = 'Asset Robustness C';
	static description = `Grows your boobs by about 4 cup sizes and/or increases your penis size by about 10cm (4in), depending on what's applicable. You'll probably need to buy some new bras or underwear.`;
	static descriptionMitigated = `Grows your boobs by about 4 cup sizes and/or increases your penis size by about 10cm (4in), depending on what's applicable. You'll probably need to buy some new bras or underwear.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessC.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness C', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 40;
	static curseName = 'Clothing Restriction B';
	static description = `Completely prevents you from wearing any kind of underwear, or anything at all covering you underneath your main outfit. Also includes socks. All Clothing Restriction Curses manifest as an extreme mental revulsion for wearing that type of clothing, changing to extreme mental distress and immediately attempting to remove it if you're somehow forcibly clothed.`;
	static descriptionMitigated = `Completely prevents you from wearing any kind of underwear, or anything at all covering you underneath your main outfit. Also includes socks. All Clothing Restriction Curses manifest as an extreme mental revulsion for wearing that type of clothing, changing to extreme mental distress and immediately attempting to remove it if you're somehow forcibly clothed.\n\nThanks to the effects of the Shifting Obelisk, you can still wear functional (e.g. sanitary pads) and fetish wear (e.g. crotchless panties).`;
	static picture = 'Curses/clothingrestrictionB.png';
	static type = 'none';
	constructor() {
		super('Clothing Restriction B', 'none',
		      'You cannot bring yourself to wear any underwear whatsoever. ');
	}

	static get incompatibilities() {
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
	static corruption = 25;
	static curseName = 'Power Dom';
	static description = `Modifies your personality to cause you to become markedly more dominant, both in and out of the bedroom. You simply won't be able to sit still and let someone else take the lead, even in situations where you might have been more comfortable doing so previously. Cannot be taken with any Submissiveness Rectification Curses.`;
	static descriptionMitigated = `Modifies your personality to cause you to become markedly more dominant, both in and out of the bedroom. You simply won't be able to sit still and let someone else take the lead, even in situations where you might have been more comfortable doing so previously. Cannot be taken with any Submissiveness Rectification Curses.\n\nThanks to the effects of the Shifting Obelisk, you will do so with natural ease and the people around you will more easily submit to you, even if they might otherwise have tended towards a dominating personality too. Also makes you enjoy dominant roles in the bedroom more.`;
	static picture = 'Curses/power dom.png';
	static type = 'libido';
	constructor() {
		super('Power Dom', 'libido',
		      'You are never able to sit back and let someone else take charge, neither in life nor in sex. ');
	}

	static get incompatibilities() {
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
	static corruption = 20;
	static curseName = '20/20000000';
	static description = `Gives you a severe case of all-around garbage eyes. It also makes them more sensitive, making contacts very uncomfortable - you could wear them on rare occasions, but they'd be hell to wear as part of a normal routine. Conjures up a durable yet kinda unstylish pair of glasses for your journey - you should pick out something more suitable when you get out of here.`;
	static descriptionMitigated = `Gives you a severe case of all-around garbage eyes. It also makes them more sensitive, making contacts very uncomfortable - you could wear them on rare occasions, but they'd be hell to wear as part of a normal routine. Conjures up a durable yet kinda unstylish pair of glasses for your journey - you should pick out something more suitable when you get out of here.\n\nThanks to the effects of the Shifting Obelisk, any pair of glasses (but not sunglasses), no matter what correction they were made for, will restore your eyesight, even if they don't perfectly cover your field of view. Monocles only restore sight in the eye you're using them on. Also lets you conjure a new pair if you ever lose or break yours.`;
	static picture = 'Curses/20-20.png';
	static type = 'none';
	constructor() {
		super('20/20000000', 'none',
		      'Your sight is pretty terrible, and you are pretty much blind without glasses. Contacts also feel extremely uncomfortable. ');
	}

}
setup.allCurses.Curse2020 = new Curse2020()
State.variables.curse30 = setup.allCurses.Curse2020
window.Curse2020 = Curse2020
setup.curseArray.push(Curse2020)

class ComicRelief extends Curse {
	static corruption = 25;
	static curseName = 'Comic Relief';
	static description = `Severely reduces the odds of anyone taking you seriously in any social situation. People may see you as a cute klutz, or a silly loudmouthed braggart, or a quirky sex-obsessed weirdo, but they will almost never see you as an actual threat, source of wisdom, or a real leader. In the script of your life, you'll be the butt of every joke.`;
	static descriptionMitigated = `Severely reduces the odds of anyone taking you seriously in any social situation. People may see you as a cute klutz, or a silly loudmouthed braggart, or a quirky sex-obsessed weirdo, but they will almost never see you as an actual threat, source of wisdom, or a real leader. In the script of your life, you'll be the butt of every joke.\n\nThanks to the effects of the Shifting Obelisk, this will most often happen in an endearing way. You'll be considered unlucky, naive or childlike, not malicious, stupid or incompetent. People will forgive your mistakes the way they would a child who doesn't know better yet.`;
	static picture = 'Curses/comicrelief.png';
	static type = 'none';
	constructor() {
		super('Comic Relief', 'none',
		      'No one ever seems to take you seriously. You get patronized and talked down to pretty often. ');
	}
}
setup.allCurses.ComicRelief = new ComicRelief()
State.variables.curse31 = setup.allCurses.ComicRelief
window.ComicRelief = ComicRelief
setup.curseArray.push(ComicRelief)

class EqualOpportunity extends Curse {
	static corruption = 25;
	static curseName = 'Equal Opportunity';
	static description = `You become 100% pansexual, to the extent that sex/gender is entirely irrelevant to you when evaluating how attractive someone is. Nothing like "okay I like them both, but I still prefer ________" here. If you already consider yourself this, then enjoy the free points!`;
	static descriptionMitigated = `You become 100% pansexual, to the extent that sex/gender is entirely irrelevant to you when evaluating how attractive someone is. Nothing like "okay I like them both, but I still prefer ________" here. If you already consider yourself this, then enjoy the free points!\n\nThanks to the effects of the Shifting Obelisk, any desired partner of yours will also find themselves attracted to you, even if they wouldn't by their previous sexuality. Spending long periods of time with you tends to shift people to being more pansexual too.`;
	static picture = 'Curses/equaloppurtunity.png';
	static type = 'none';
	constructor() {
		super('Equal Opportunity', 'none',
		      'Gender is really not an issue for you when selecting sexual partners. ');
	}
}
setup.allCurses.EqualOpportunity = new EqualOpportunity()
State.variables.curse32 = setup.allCurses.EqualOpportunity
window.EqualOpportunity = EqualOpportunity
setup.curseArray.push(EqualOpportunity)

class AbsolutePregnancy extends Curse {
	static corruption = 35;
	static curseName = 'Absolute Pregnancy';
	static description = `Absolutely any sex you have with another person will result in a viable pregnancy — even homosexual sex, so long as there's an available womb present in at least one of your bodies. No form of contraception or creative positioning (e.g. oral) can prevent this. Logic/fate will naturally prevent you from ever having sex with anyone who has the Absolute Birth Control Curse, avoiding the whole unstoppable force/immovable object scenario.`;
	static descriptionMitigated = `Absolutely any sex you have with another person will result in a viable pregnancy — even homosexual sex, so long as there's an available womb present in at least one of your bodies. No form of contraception or creative positioning (e.g. oral) can prevent this. Logic/fate will naturally prevent you from ever having sex with anyone who has the Absolute Birth Control Curse, avoiding the whole unstoppable force/immovable object scenario.\n\nThanks to the effects of the Shifting Obelisk, you can influence the pregnancy, reducing its side-effects, and shortening or lengthening the duration by up to a factor of two. Also lets you know before having sex what traits your kid(s) would inherit in that encounter (e.g. whether it would be a boy or a girl) and lets you influence non-genetic parts of your pregnancy, such as whether you get twins. Greatly reduces the pain and danger of giving birth. You may choose to pass your curses on to your kids, but they'll get the same variation as you (e.g. if you got cat ears from Fluffy Ears they will too, they can't choose dog ears instead).`;
	static picture = 'Curses/absolutepregnancy.png';
	static type = 'none';
	constructor() {
		super('Absolute Pregnancy', 'none',
		      'Any and all sex you engage in results in pregnancy. ');
	}

	static get incompatibilities() {
		return ['Absolute Birth Control'];
	}
}
setup.allCurses.AbsolutePregnancy = new AbsolutePregnancy()
State.variables.curse33 = setup.allCurses.AbsolutePregnancy
window.AbsolutePregnancy = AbsolutePregnancy
setup.curseArray.push(AbsolutePregnancy)

class AbsoluteBirthControl extends Curse {
	static corruption = 40;
	static curseName = 'Absolute Birth Control';
	static description = `Completely removes your ability to ever conceive a child with anyone else, as either a mother or father. Cannot be taken with Absolute Pregnancy, Wacky Wombs, or Omnitool.`;
	static descriptionMitigated = `Completely removes your ability to ever conceive a child with anyone else, as either a mother or father. Cannot be taken with Absolute Pregnancy, Wacky Wombs, or Omnitool.\n\nThanks to the effects of the Shifting Obelisk, you are also unable to sexually contract STDs. You can still get them via other vectors (e.g. blood-to-blood) and keep them if you have them already, but having sex won't be a risk in that regard anymore. You'll also never be suspected of being anybody's parent. Even if there is circumstantial evidence pointing to it, it'll be clear to anybody that you can't have children and couldn't possibly be the father/mother.`;
	static picture = 'Curses/absolutebirthcontrol.png';
	static type = 'none';
	constructor() {
		super('Absolute Birth Control', 'none',
		      'You are completely sterile and cannot have children. ');
	}

	static get incompatibilities() {
		return ['Absolute Pregnancy', 'Wacky Wombs', 'Omnitool','Gestation Jumpstart' ];
	}
}
setup.allCurses.AbsoluteBirthControl = new AbsoluteBirthControl()
State.variables.curse34 = setup.allCurses.AbsoluteBirthControl
window.AbsoluteBirthControl = AbsoluteBirthControl
setup.curseArray.push(AbsoluteBirthControl)

class WackyWombs extends Curse {
	static corruption = 20;
	static curseName = 'Wacky Wombs';
	static description = `Adds a functional womb+ova to your body, connected to one of the following paths of your choice: your throat, urethra, anus, or side-by-side to an existing womb through a vaginal canal. Both male and females with this can be impregnated via penile penetration to the appropriate area. Your body will make the birthing process technically safe, but still probably pretty damn weird, kinda gross looking, and very painful. I guess that's pretty standard for pregnancy though?`;
	static descriptionMitigated = `Adds a functional womb+ova to your body, connected to one of the following paths of your choice: your throat, urethra, anus, or side-by-side to an existing womb through a vaginal canal. Both male and females with this can be impregnated via penile penetration to the appropriate area. Your body will make the birthing process technically safe, but still probably pretty damn weird, kinda gross looking, and very painful. I guess that's pretty standard for pregnancy though?\n\nThanks to the effects of the Shifting Obelisk, you do not get periods in your new womb(s). Moreover, pregnancies in that womb will be faster, safer, less painful, and you can choose to pass on some of your curses to your children, but with the same variation, e.g. if you got cat ears from fluffy ears your children do too, they can't choose dog ears instead. You also get some influence over non-genetic factors in the pregnancy (e.g. if you get twins) and if you choose to get a second womb in your vagina you can seal the original one off so you won't get pregnant in that one.`;
	static picture = 'Curses/wackywombs.png';
	static type = 'gender';
	constructor(wombLocation='throat') {
		super('Wacky Wombs', 'gender');
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

	static get incompatibilities() {
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
	static corruption = 25;
	static curseName = 'Omnitool';
	static description = `Causes pregnancy to always be a possibility when your have sex, regardless of species differences, Children will be a mixture of the two species.`;
	static descriptionMitigated = `Causes pregnancy to always be a possibility when your have sex, regardless of species differences, Children will be a mixture of the two species.\n\nThanks to the effects of the Shifting Obelisk, you get some control over how the mixed traits get expressed (e.g. make sure you cat-hybrid kids get cat ears but no whiskers). Any sexual activity will be safe, pleasurable and potentially impregnating, even if species differences usually make that hard or impossible, both for you and for your partner, who will be compelled to cooperate. In some cases that may mean causing pregnancy even for sex which does not result in the exchange of sexual fluids (e.g. oral), in a similar manner to Absolute Pregnancy.`;
	static picture = 'Curses/omnitool.png';
	static type = 'none';
	constructor() {
		super('Omnitool', 'none');
	}

	static get incompatibilities() {
		return ['Absolute Birth Control'];
	}
}
setup.allCurses.Omnitool = new Omnitool()
State.variables.curse36 = setup.allCurses.Omnitool
window.Omnitool = Omnitool
setup.curseArray.push(Omnitool)

class Gooey extends Curse {
	static corruption = 40;
	static curseName = 'Gooey';
	static description = `Causes your entire body to be made out of sticky, slimy unicolor goo. All the body altering Curses you received/will receive will cause your goo to roughly mimic the shape and texture of that feature - goo pelt, gooey tail, and so on. This will probably look quite odd with many Curses. Your goo is slightly malleable, but will quickly revert to the form given to you by Curses - no shapeshifting. Your durability and dietary restrictions are unchanged.`;
	static descriptionMitigated = `Causes your entire body to be made out of sticky, slimy unicolor goo. All the body altering Curses you received/will receive will cause your goo to roughly mimic the shape and texture of that feature - goo pelt, gooey tail, and so on. This will probably look quite odd with many Curses. Your goo is slightly malleable, but will quickly revert to the form given to you by Curses - no shapeshifting. Your durability and dietary restrictions are unchanged.\n\nThanks to the effects of the Shifting Obelisk, you can control your body's shape while focusing on it, but it will quickly revert when you stop thinking about it. You can eat by enveloping your food and dissolving it. This allows you to consume many things that are not safe or useful to eat for regular humans and makes you immune to any toxins, but you still need to consume all the macro- and micronutrients a regular human would require. You can also change the properties of your body's surface, whether you want a dry, rubbery skin, smooth jelly-like feel or a slippery secretion (slight aphrodisiac or anaesthetic properties optional).`;
	static picture = 'Curses/gooey.png';
	static type = 'none';
	constructor() {
		super('Gooey', 'none');
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
	static corruption = 25;
	static curseName = 'Rainbow Swirl';
	static description = `Permanently changes your skin and eye colors to significantly different, visually distinct colors of your choice. You can choose if you want to go with unusual colors like pink or red, or just stick with the normal human range.`;
	static descriptionMitigated = `Permanently changes your skin and eye colors to significantly different, visually distinct colors of your choice. You can choose if you want to go with unusual colors like pink or red, or just stick with the normal human range.\n\nThanks to the effects of the Shifting Obelisk, if you change your mind you can slowly shift the color to your preferred new color over time.`;
	static picture = 'Curses/rainbowswirl.png';
	static type = 'none';
	constructor(skinColor='pink', eyeColor='pink') {
		super('Rainbow Swirl', 'none');
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
	static corruption = 20;
	static curseName = 'Double Pepperoni';
	static description = `Swells up your nipples, making them rather puffy, and noticeably increases the area of your areolae. Also makes them a bit more sensitive. Cute!`;
	static descriptionMitigated = `Swells up your nipples, making them rather puffy, and noticeably increases the area of your areolae. Also makes them a bit more sensitive. Cute!\n\nThanks to the effects of the Shifting Obelisk, you can change the size, color and invertedness of your nipples too. Also lets you optionally make them sensitive enough that you could orgasm from nipple stimulation alone.`;
	static picture = 'Curses/doublepepperoni.png';
	static type = 'none';
	constructor() {
		super('Double Pepperoni', 'none',
		      'Your nipples and areolae are rather large and puffy. ');
	}

	changeBreasts(character, prevBreasts) {
		return Math.max(prevBreasts, 1);
	}
}

setup.allCurses.DoublePepperoni = new DoublePepperoni()
State.variables.curse39 = setup.allCurses.DoublePepperoni
window.DoublePepperoni = DoublePepperoni
setup.curseArray.push(DoublePepperoni)

class LiteralBlushingVirgin extends Curse {
	static corruption = 40;
	static curseName = 'Literal Blushing Virgin';
	static description = `Whenever you're having sex, you'll temporarily lose your memory of all your past sexual encounters, leading you to believe every time is your first. If you have one, you can also choose to regenerate your hymen to "complete the effect" if you like. It's not really an accurate indicator of virginity, so it doesn't matter either way.`;
	static descriptionMitigated = `Whenever you're having sex, you'll temporarily lose your memory of all your past sexual encounters, leading you to believe every time is your first. If you have one, you can also choose to regenerate your hymen to "complete the effect" if you like. It's not really an accurate indicator of virginity, so it doesn't matter either way.\n\nThanks to the effects of the Shifting Obelisk, you can spread the effect to your partner(s) as well and choose whether to retain sex skills and knowledge acquired in previous encounters or start from a completely blank slate.`;
	static picture = 'Curses/literalblushingvirgin.png';
	static type = 'none';
	constructor() {
		super('Literal Blushing Virgin', 'none',
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
	static corruption = 35;
	static curseName = 'Libido Reinforcement C';
	static description = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive. Please always practice safe sex!`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive. Please always practice safe sex!\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementC.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement C', 'libido');
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
	static corruption = 30;
	static curseName = 'Lactation Rejuvenation A';
	static description = `Causes you to be lactating slightly at all times, about as much as an average pregnant woman. Not too annoying; may require occasional milking and cause wet spots on clothing sometimes.`;
	static descriptionMitigated = `Causes you to be lactating slightly at all times, about as much as an average pregnant woman. Not too annoying; may require occasional milking and cause wet spots on clothing sometimes.\n\nThanks to the effects of the Shifting Obelisk, you can control the color, composition and taste of your milk.`;
	static picture = 'Curses/lactationA.png';
	static type = 'none';
	constructor() {
		super('Lactation Rejuvenation A', 'none');
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
	static corruption = 30;
	static curseName = 'Asset Robustness D';
	static description = `Grows your boobs by about 6 cup sizes and/or increases your penis size by about 15cm (6in), depending on what's applicable. The extra weight will take a while to get used to.`;
	static descriptionMitigated = `Grows your boobs by about 6 cup sizes and/or increases your penis size by about 15cm (6in), depending on what's applicable. The extra weight will take a while to get used to.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessD.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness D', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 30;
	static curseName = 'Age Reduction B';
	static description = `Reduces your physical apparent age by 3 years or sets it to 20, whichever is younger. This may put you at a disadvantage in the Abyss. It doesn't show any additional mercy to the young.`;
	static descriptionMitigated = `Reduces your physical apparent age by 3 years or sets it to 20, whichever is younger. This may put you at a disadvantage in the Abyss. It doesn't show any additional mercy to the young.\n\nThanks to the effects of the Shifting Obelisk, you can make small cosmetic changes to your body's apparent age. You can't change big things like your height, but you could make your facial structure less kid-like or start growing a beard at an earlier biological age than your body would usually allow.`;
	static picture = 'Curses/agereductionB.png';
	static type = 'none';
	constructor() {
		super('Age Reduction B', 'none');
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
	static corruption = 45;
	static curseName = 'Sleep Tight';
	static description = `Makes your body require about 12 hours of sleep a day, but makes it always extremely comforting and pleasurable. If taken with Sweet Dreams, you will learn to embrace being wrapped in fear, your mind associating terror and helplessness with comfort. Note that the extra sleep at night translates to extra energy during the day, and so this has no impact on travel times here.`;
	static descriptionMitigated = `Makes your body require about 12 hours of sleep a day, but makes it always extremely comforting and pleasurable. If taken with Sweet Dreams, you will learn to embrace being wrapped in fear, your mind associating terror and helplessness with comfort. Note that the extra sleep at night translates to extra energy during the day, and so this has no impact on travel times here.\n\nThanks to the effects of the Shifting Obelisk, you can "store" extra sleep by sleeping more than 12 hours a day, which will let you stay awake for longer some other time. Also lets you choose to perfectly recall all your dreams or completely forget them and to have all or some dreams be lucid (if taken with Sweet Dreams, the terrifying and horny aspects will creep in no matter what though. That part is out of your control).`;
	static picture = 'Curses/sleeptight.png';
	static type = 'none';
	constructor() {
		super('Sleep Tight', 'none',
		      'You need 12 hours of sleep each night, but at least sleeping is very comforting and pleasurable. you also feel a bit more energized during your waking hours. ');
	}
}
setup.allCurses.SleepTight = new SleepTight()
State.variables.curse45 = setup.allCurses.SleepTight
window.SleepTight = SleepTight
setup.curseArray.push(SleepTight)

class SweetDreams extends Curse {
	static corruption = 40;
	static curseName = 'Sweet Dreams';
	static description = `Every single time you go to sleep, you'll have sexual nightmares that heavily blur the line between terrifying and horny, and which will almost always cause several orgasms. Hope you don't mind the extra laundry!`;
	static descriptionMitigated = `Every single time you go to sleep, you'll have sexual nightmares that heavily blur the line between terrifying and horny, and which will almost always cause several orgasms. Hope you don't mind the extra laundry!\n\nThanks to the effects of the Shifting Obelisk, you can choose to forget the terrifying parts, the horny parts, or the entire dream when you wake up. If you choose to forget e.g. only the fear, you'll remember that there was something scary too, but you won't remember being afraid or any details.`;
	static picture = 'Curses/sweetdreams.png';
	static type = 'none';
	constructor() {
		super('Sweet Dreams', 'none',
		      'Every night you have horrifyingly sexy and sexily horrifying wet nightmares, and wake up shaking in fear in a puddle of your own juices. ');
	}
}
setup.allCurses.SweetDreams = new SweetDreams()
State.variables.curse46 = setup.allCurses.SweetDreams
window.SweetDreams = SweetDreams
setup.curseArray.push(SweetDreams)

class HypnoHappytime extends Curse {
	static corruption = 40;
	static curseName = 'Hypno Happytime';
	static description = `Makes you particularly suggestible. Directly hypnotizing you is easy, but someone determined to do so could manage to do it even through subtle methods, like subliminal messaging in media or something.`;
	static descriptionMitigated = `Makes you particularly suggestible. Directly hypnotizing you is easy, but someone determined to do so could manage to do it even through subtle methods, like subliminal messaging in media or something.\n\nThanks to the effects of the Shifting Obelisk, though you won't be able to resist the hypnosis any better, you'll always be aware of it when it happens, giving you enough time to disengage (if you are able to) before any effects take hold.`;
	static picture = 'Curses/hypnohappytime.png';
	static type = 'none';
	constructor() {
		super('Hypno Happytime', 'none',
		      'yOu are very susceptiBlE to hYpnosis, and it is not hard to implant suggestions into your MalleablE mind. ');
	}
}
setup.allCurses.HypnoHappytime = new HypnoHappytime()
State.variables.curse47 = setup.allCurses.HypnoHappytime
window.HypnoHappytime = HypnoHappytime
setup.curseArray.push(HypnoHappytime)

class CrossdressYourHeart extends Curse {
	static corruption = 35;
	static curseName = 'Crossdress Your Heart';
	static description = `Forces you to only wear clothing associated with the opposite genitals of those you have. Cannot be taken with Futa Fun or both Clothing Restrictions B and C at the same time.`;
	static descriptionMitigated = `Forces you to only wear clothing associated with the opposite genitals of those you have. Cannot be taken with Futa Fun or both Clothing Restrictions B and C at the same time.\n\nThanks to the effects of the Shifting Obelisk, you'll easily be able to take on mannerisms appropriate to your apparent gender and you'll be able to dress convincingly enough that only people who know you well would doubt your sex.`;
	static picture = 'Curses/crossdressyourheart.png';
	static type = 'none';
	constructor() {
		super('Crossdress Your Heart', 'none',
		      'You can only bring yourself to wear clothing associated with the opposite sex. ');
	}

	static get incompatibilities() {
		return ['Futa Fun', 'Clothing Restriction C', 'Clothing Restriction B'];
	}
}
setup.allCurses.CrossdressYourHeart = new CrossdressYourHeart()
State.variables.curse48 = setup.allCurses.CrossdressYourHeart
window.CrossdressYourHeart = CrossdressYourHeart
setup.curseArray.push(CrossdressYourHeart)

class LieDetector extends Curse {
	static corruption = 40;
	static curseName = 'Lie Detector';
	static description = `Anyone you communicate with will be able to instinctively tell whenever you're not being completely honest with them or hiding information they would want to know. Having to wear your heart on your sleeve can make life difficult in the long run.`;
	static descriptionMitigated = `Anyone you communicate with will be able to instinctively tell whenever you're not being completely honest with them or hiding information they would want to know. Having to wear your heart on your sleeve can make life difficult in the long run.\n\nThanks to the effects of the Shifting Obelisk, this honesty extends to a sentiment of innocence. People who interact with you will consider you a paragon of purity and will feel mounting guilt for lying to you or mistreating you. Moreover, when you speak the truth, everybody will know that it's the truth. Nobody will ever doubt you (unless you lie of course).`;
	static picture = 'Curses/liedetector.png';
	static type = 'none';
	constructor() {
		super('Lie Detector', 'none',
		      'No matter how convincing a lie you craft, everyone can tell when you are not being truthful. Others are aware even when you are just omitting information. ');
	}
}
setup.allCurses.LieDetector = new LieDetector()
State.variables.curse49 = setup.allCurses.LieDetector
window.LieDetector = LieDetector
setup.curseArray.push(LieDetector)

class Megadontia extends Curse {
	static corruption = 30;
	static curseName = 'Megadontia';
	static description = `Gives you some very sharp teeth. Be careful not to bite any partners! Also gives you 1-2 especially large teeth that will remain visible even with your mouth closed, giving you a perpetual smug-fang look.`;
	// alternative: make them pointy and venomous instead, giving you control over the venom — could be sedative, aphrodisiac, anaesthetic...
	static descriptionMitigated = `Gives you some very sharp teeth. Be careful not to bite any partners! Also gives you 1-2 especially large teeth that will remain visible even with your mouth closed, giving you a perpetual smug-fang look.\n\nThanks to the effects of the Shifting Obelisk, your teeth will have soft edges. They'll still look scary and be effective at cutting through food but you won't accidentally bite your tongue or your partner (or if you do it won't hurt).`;
	static picture = 'Curses/sharpteeth.png';
	static type = 'none';
	constructor() {
		super('Megadontia', 'none',
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
	static corruption = 35;
	static curseName = 'Softie';
	static description = `If you have a penis, it will never be erect again. You can still orgasm, but you'll be flaccid the entire time. If you have a vagina, your nipples will be constantly inverted. Even if you were to try and pull them out, they'd just spring right back to their inverted state.`;
	static descriptionMitigated = `If you have a penis, it will never be erect again. You can still orgasm, but you'll be flaccid the entire time. If you have a vagina, your nipples will be constantly inverted. Even if you were to try and pull them out, they'd just spring right back to their inverted state.\n\nThanks to the effects of the Shifting Obelisk, you can use this curse to perfectly conceal all outwards signs of arousal or orgasm. No blushing, moaning etc. and you'll be able to keep walking and performing other basic activities as if nothing were wrong. If taken together with Leaky, that's the one thing you can't suppress.`;
	static picture = 'Curses/softie.png';
	static type = 'none';
	constructor() {
		super('Softie', 'none');
	}

	static get incompatibilities() {
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
	static corruption = 35;
	static curseName = 'Hard Mode';
	static description = `If you have a penis, it will always be fully erect. If you have breasts, your nipples will constantly be erect, and probably visible through many kinds of clothing...maybe even with a bra, sometimes. If you have a vagina, it can make the clitoris a bit harder than normal too. Cannot be taken with Softie.`;
	static descriptionMitigated = `If you have a penis, it will always be fully erect. If you have breasts, your nipples will constantly be erect, and probably visible through many kinds of clothing...maybe even with a bra, sometimes. If you have a vagina, it can make the clitoris a bit harder than normal too. Cannot be taken with Softie.\n\nThanks to the effects of the Shifting Obelisk, this lets you arouse people you touch or who a lof of time in the same room as you. Penises will get hard and vaginas will get wet. They won't know that you're the cause (unless you tell them).`;
	static picture = 'Curses/hardmode.png';
	static type = 'none';
	constructor() {
		super('Hard Mode', 'none');
	}

	static get incompatibilities() {
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
	static corruption = 30;
	static curseName = 'Lingual Leviathan';
	static description = `Increases the length of your tongue to approximately 30cm (12 in). You'll have to learn to eat carefully to avoid biting it, but you'll give amazing oral.`;
	static descriptionMitigated = `Increases the length of your tongue to approximately 30cm (12 in). You'll have to learn to eat carefully to avoid biting it, but you'll give amazing oral.\n\nThanks to the effects of the Shifting Obelisk, you can choose to increase it by up to another 20cm. You'll be able to effortlessly store and use your tongue both for everyday tasks and as an extra limb to manipulate things. Makes your saliva a slight aphrodisiac.`;
	static picture = 'Curses/lingualleviathan.png';
	static type = 'none';
	constructor() {
		super('Lingual Leviathan', 'none',
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
	static corruption = 45;
	static curseName = 'Tipping the Scales';
	static description = `Your body is completely covered with a layer of rigid scales in a color of your choice. Hairs will still grow from them in whatever places you would typically grow hairs, so it would look really weird with the Maximum Fluff Curse. Strong enough to protect you well from most human weapons, but not the vicious beasts of the Abyss. Notably not limited to reptile scales. You can do fish scales instead and go for the Zora look, if you like.`;
	static descriptionMitigated = `Your body is completely covered with a layer of rigid scales in a color of your choice. Hairs will still grow from them in whatever places you would typically grow hairs, so it would look really weird with the Maximum Fluff Curse. Strong enough to protect you well from most human weapons, but not the vicious beasts of the Abyss. Notably not limited to reptile scales. You can do fish scales instead and go for the Zora look, if you like.\n\nThanks to the effects of the Shifting Obelisk, you can choose the colors and patterns of your scales, even make them iridescent or specular if you like. You can influence the physical properties of the scales, such as hardness, elasticity, conductivity...`;
	static picture = 'Curses/tippingthescales.png';
	static type = 'none';
	constructor(scaleColor='green') {
		super('Tipping the Scales', 'none');
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
	static corruption = 35;
	static curseName = 'Reptail';
	static description = `Gives you a large, scaled, spiky reptile tail sprouting from your back. It would look pretty weird next to other tails if you have them, but there's nothing outright stopping you from taking this with the Fluffy Tail Curse or anything.`;
	static descriptionMitigated = `Gives you a large, scaled, spiky reptile tail sprouting from your back. It would look pretty weird next to other tails if you have them, but there's nothing outright stopping you from taking this with the Fluffy Tail Curse or anything.\n\nThanks to the effects of the Shifting Obelisk, it is strong enough to use as a weapon or lift small objects. You can also choose its general appearance, though it must remain lizard-like overall.`;
	static picture = 'Curses/reptail.png';
	static type = 'none';
	constructor() {
		super('Reptail', 'none');
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
	static corruption = 40;
	static curseName = 'Cold Blooded';
	static description = `Changes your body's physiology to be similar to an ectotherm - that is, your body will produce negligible heat on its own, and you'll need to regularly heat it up via external sources, like sunlight (or Miasma light) so you don't freeze. I hope you like cuddling! Increases travel times in this layer by 1 day each if you don't use a portable source of heat. Without one, you'll need to stop and set up campfires very frequently.`;
	static descriptionMitigated = `Changes your body's physiology to be similar to an ectotherm - that is, your body will produce negligible heat on its own, and you'll need to regularly heat it up via external sources, like sunlight (or Miasma light) so you don't freeze. I hope you like cuddling! Increases travel times in this layer by 1 day each if you don't use a portable source of heat. Without one, you'll need to stop and set up campfires very frequently.\n\nThanks to the effects of the Shifting Obelisk, if you end up without a source of heat for too long you'll enter hibernation instead of dying, to wake up again once you're warmed up. You can also store heat well allowing you to function normally in most environments so long as you "recharge" periodically. Makes you very efficient at warming yourself from others' body heat via cuddling. In normal conditions, it is enough to keep you fully functioning throughout the day if you cuddle with a lover at night, even in the absence of other heat sources.`;
	static picture = 'Curses/coldblooded.png';
	static type = 'none';
	constructor() {
		super('Cold Blooded', 'none',
		      'You no longer produce heat on your own, and need external heat sources. Your nights lately involve a lot of cuddling. ');
	}
}
setup.allCurses.ColdBlooded = new ColdBlooded()
State.variables.curse56 = setup.allCurses.ColdBlooded
window.ColdBlooded = ColdBlooded
setup.curseArray.push(ColdBlooded)

class LibidoReinforcementD extends Curse {
	static corruption = 40;
	static curseName = 'Libido Reinforcement D';
	static description = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive. Others may have a hard time keeping up with you.`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse, boosting your sex drive. Others may have a hard time keeping up with you.\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementD.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement D', 'libido');
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
	static corruption = 35;
	static curseName = 'Gender Reversal D';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. The grass is always greener, right?`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. The grass is always greener, right?\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalD.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal D', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalD = new GenderReversalD()
State.variables.curse58 = setup.allCurses.GenderReversalD
window.GenderReversalD = GenderReversalD
setup.curseArray.push(GenderReversalD)

class PleasureRespecificationA extends Curse {
	static corruption = 45;
	static curseName = 'Pleasure Respecification A';
	static description = `Completely prevents you from ever reaching climax on your own, through any form of masturbation or toys. You'll feel pleasure building, but release will be completely impossible without another party's help.`;
	static descriptionMitigated = `Completely prevents you from ever reaching climax on your own, through any form of masturbation or toys. You'll feel pleasure building, but release will be completely impossible without another party's help.\n\nThanks to the effects of the Shifting Obelisk, you are still able to orgasm from exhibitionistic masturbation (i.e. masturbating for somebody else's benefit while they're watching) and from forms of masturbation which are caused or influenced by somebody else, e.g. through use of a remote-controlled sex toy.`;
	static picture = 'Curses/pleasurerespecA.png';
	static type = 'none';
	constructor() {
		super('Pleasure Respecification A', 'none',
		      'You can no longer orgasm from masturbation. you can still feel pleasure and work your way towards the edge, but you will always need someone else\'s help to climax. ');
	}
}
setup.allCurses.PleasureRespecificationA = new PleasureRespecificationA()
State.variables.curse59 = setup.allCurses.PleasureRespecificationA
window.PleasureRespecificationA = PleasureRespecificationA
setup.curseArray.push(PleasureRespecificationA)

class ClothingRestrictionC extends Curse {
	static corruption = 60;
	static curseName = 'Clothing Restriction C';
	static description = `Prevents you from wearing any clothing generally considered of the primary part of an outfit — essentially anything not already covered by Clothing Restrictions A or B. Dresses, shirts, pants, skirts - all off the table. Also includes shoes.`;
	static descriptionMitigated = `Prevents you from wearing any clothing generally considered of the primary part of an outfit — essentially anything not already covered by Clothing Restrictions A or B. Dresses, shirts, pants, skirts - all off the table. Also includes shoes.\n\nThanks to the effects of the Shifting Obelisk, you can still wear functional clothing (e.g. body armor), but only while it is useful, and fetish wear, such as a babydoll and sexy nurse cosplay, but only if it couldn't be mistaken for regular clothing or a real uniform. Also removes any undesired cosmetic blemishes (like scars or moles) or body hair and lets you choose not to get tanned if you don't want to.`;
	static picture = 'Curses/clothingrestrictionC.png';
	static type = 'none';
	constructor() {
		super('Clothing Restriction C', 'none',
		      'You can no longer wear any clothing besides underwear, or clothes skimpy enough that others would consider them underwear. ');
	}

	static get incompatibilities() {
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
	static corruption = 30;
	static curseName = 'Massacre Manicure';
	static description = `You'll grow sharp claws instead of fingernails. They can be retracted somewhat when not in use, but probably not quite as much as you would like. Fingering people is still possible, don't worry! Just... be very careful.`;
	static descriptionMitigated = `You'll grow sharp claws instead of fingernails. They can be retracted somewhat when not in use, but probably not quite as much as you would like. Fingering people is still possible, don't worry! Just... be very careful.\n\nThanks to the effects of the Shifting Obelisk, you can change the sharpness and hardness of your claws. They might still be in the way sometimes but you won't risk injury. They also make for effective weapons.`;
	static picture = 'Curses/massacremanicure.png';
	static type = 'none';
	constructor() {
		super('Massacre Manicure', 'none',
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
	static corruption = 50;
	static curseName = 'ドS';
	static description = `Causes you to feel pleasure when inflicting others with pain, but numbs feelings of physical pleasure from other sources somewhat.`;
	static descriptionMitigated = `Causes you to feel pleasure when inflicting others with pain, but numbs feelings of physical pleasure from other sources somewhat.\n\nThanks to the effects of the Shifting Obelisk, pleasure received from other sources isn't dulled, the effect extends to psychological and emotional pain too, and your targets will feel pleasure from receiving the pain as if they had a weaker version of the ドM Curse.`;
	static picture = 'Curses/dos.png';
	static type = 'libido';
	constructor() {
		super('DoS', 'libido',
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
	static corruption = 45;
	static curseName = 'ドM';
	static description = `Converts all pain you receive into pleasure, but in return, dulls normal feelings of physical pleasure a bit. With both ドS and ドM, you will cease to feel pleasure entirely except when inflicting or receiving pain.`;
	static descriptionMitigated = `Converts all pain you receive into pleasure, but in return, dulls normal feelings of physical pleasure a bit. With both ドS and ドM, you will cease to feel pleasure entirely except when inflicting or receiving pain.\n\nThanks to the effects of the Shifting Obelisk, pleasure received from other sources isn't dulled, and the people inflicting the pain on you will feel pleasure from it as if they had a weaker version of the ドS Curse.`;
	static picture = 'Curses/dom.png';
	static type = 'libido';
	constructor() {
		super('DoM', 'libido',
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
	static corruption = 40;
	static curseName = 'Hijinks Ensue';
	static description = `Gives you bad luck with regards to embarrassing sexual situations, to a hilarious degree. You'll accidentally stumble into sex, have people stumble in on you when you're having sex, have embarrassing wardrobe malfunctions, and rarely ever get a moment of peace to yourself. Sexual shenanigans will find you and humiliate you no matter what measures you take.`;
	static descriptionMitigated = `Gives you bad luck with regards to embarrassing sexual situations, to a hilarious degree. You'll accidentally stumble into sex, have people stumble in on you when you're having sex, have embarrassing wardrobe malfunctions, and rarely ever get a moment of peace to yourself. Sexual shenanigans will find you and humiliate you no matter what measures you take.\n\nThanks to the effects of the Shifting Obelisk, those situations will never be considered your own fault or done on purpose. Any people disadvantaged by the situations (e.g. because you walked in on them naked) will be annoyed at the situation, but not at you. Any other victims, e.g. because you fell over in such a way as to grab their boobs or genitals by accident, will use the situation to take sexual advantage of you (e.g. grope back) rather than get angry.`;
	static picture = 'Curses/hijinxensue.png';
	static type = 'none';
	constructor() {
		super('Hijinks Ensue', 'none',
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
	static corruption = 40;
	static curseName = 'Flower Power';
	static description = `Causes flowers and vines to sprout all over your body, and replaces your hair with leaves or flower petals. You can influence their shape and locations somewhat, so long as they're visible. At least you'll probably smell nice! As long as you don't go for a Rafflesia or something, I mean.`;
	static descriptionMitigated = `Causes flowers and vines to sprout all over your body, and replaces your hair with leaves or flower petals. You can influence their shape and locations somewhat, so long as they're visible. At least you'll probably smell nice! As long as you don't go for a Rafflesia or something, I mean.\n\nThanks to the effects of the Shifting Obelisk, you can also change the smell of your flowers and give them some effects, such as making their smell calming or arousing or sleep-inducing. Also lets you pluck the flowers painlessly. They'll regrow within an hour.`;
	static picture = 'Curses/flowerpower.png';
	static type = 'none';
	constructor() {
		super('Flower Power', 'none');
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
	static corruption = 35;
	static curseName = 'Cellulose';
	static description = `Causes your skin to become smooth and slightly rigid, like plant matter. Can optionally include a layer of bark. Be careful around open flames!`;
	static descriptionMitigated = `Causes your skin to become smooth and slightly rigid, like plant matter. Can optionally include a layer of bark. Be careful around open flames!\n\nThanks to the effects of the Shifting Obelisk, your skin becomes impervious to small threats like thorns and insect bites and provides decent protection against blades.`;
	static picture = 'Curses/cellulose.png';
	static type = 'none';
	constructor() {
		super('Cellulose', 'none');
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
	static corruption = 50;
	static curseName = 'Chlorophyll';
	static description = `Causes your body to require sunlight, or you will feel sluggish and low on energy. If you're wearing normal clothing on a sunny day, you'll need to spend about two hours in the sun daily to feel recharged, though you can reduce that to as low as 20 minutes if you sunbathe nude. Thankfully, Miasma reactions will suffice in most layers of the Abyss, but you'll need to add 1 day of travel time for everything in layer 3, and anywhere else similarly dark.`;
	static descriptionMitigated = `Causes your body to require sunlight, or you will feel sluggish and low on energy. If you're wearing normal clothing on a sunny day, you'll need to spend about two hours in the sun daily to feel recharged, though you can reduce that to as low as 20 minutes if you sunbathe nude. Thankfully, Miasma reactions will suffice in most layers of the Abyss, but you'll need to add 1 day of travel time for everything in layer 3, and anywhere else similarly dark.\n\nThanks to the effects of the Shifting Obelisk, you'll always find a place or time in which you can sunbathe, even if it's otherwise overcast or raining. If you're sunbathing nude, nobody will reprimand you or throw you out even in places where it would not usually be accepted, though they might still leer or attempt to take advantage of you.`;
	static picture = 'Curses/photosynthesis.png';
	static type = 'none';
	constructor() {
		super('Chlorophyll', 'none',
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
	static corruption = 45;
	static curseName = 'Pheromones';
	static description = `Causes you to near-constantly release scentless pheromones that make everyone around you quite aroused. The effect is slightly directed towards you, but the people around you may end up directing their lust towards others if you're not their type or you don't make a move. It isn't a rape aura; people still have their good senses - they're just more impassioned than they otherwise would be.`;
	static descriptionMitigated = `Causes you to near-constantly release scentless pheromones that make everyone around you quite aroused. The effect is slightly directed towards you, but the people around you may end up directing their lust towards others if you're not their type or you don't make a move. It isn't a rape aura; people still have their good senses - they're just more impassioned than they otherwise would be.\n\nThanks to the effects of the Shifting Obelisk, you can manipulate them so they act more strongly on some kinds of people than others, e.g. more strongly on women and less strongly on men, but you cannot filter out everybody around you — they must still affect <it>somebody</it>`;
	static picture = 'Curses/pheremones.png';
	static type = 'none';
	constructor() {
		super('Pheromones', 'none',
		      'You are constantly emitting pheromones that make other people more aroused, especially towards you. Thankfully, it does not cloud their judgment any more than natural arousal. ');
	}
}
setup.allCurses.Pheromones = new Pheromones()
State.variables.curse68 = setup.allCurses.Pheromones
window.Pheromones = Pheromones
setup.curseArray.push(Pheromones)

class Carapacian extends Curse {
	static corruption = 50;
	static curseName = 'Carapacian';
	static description = `Gives you a shiny, firm carapace or exoskeleton in the color of your choice surrounding about 80% of your body, only leaving small bits exposed around squishy areas and joints. Probably not strong enough to stand up to human weapons or creatures of the Abyss, but if might give you an edge in a fistfight?`;
	static descriptionMitigated = `Gives you a shiny, firm carapace or exoskeleton in the color of your choice surrounding about 80% of your body, only leaving small bits exposed around squishy areas and joints. Probably not strong enough to stand up to human weapons or creatures of the Abyss, but if might give you an edge in a fistfight?\n\nThanks to the effects of the Shifting Obelisk, the exoskeleton becomes tough enough to resist bladed weapons and provides some resistance to firearms. You can also temporarily soften it for cuddling.`;
	static picture = 'Curses/carapacian.png';
	static type = 'none';
	constructor(skinColor='shiny black') {
		super('Carapacian', 'none');
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
	static corruption = 35;
	static curseName = 'Hemospectrum';
	static description = `Changes your blood into a color that is unnatural for humans, like purple or blue or green. You can decide what shade you'd like.`;
	static descriptionMitigated = `Changes your blood into a color that is unnatural for humans, like purple or blue or green. You can decide what shade you'd like.\n\nThanks to the effects of the Shifting Obelisk, you can also manipulate its other properties, like viscosity, taste etc. and give it light bioactive properties (e.g. make it an aphrodisiac or sedative). None of this will compromise its function in your body, but may still have consequences when you're wounded, as for example highly viscuous blood would make you bleed out very slowly even when grievously wounded. If you make your blood damaging to humans (e.g. by making it acidic), your own skin will be impervious to it (but other parts like your eyes may not).`;
	static picture = 'Curses/hemospectrum.png';
	static type = 'none';
	constructor(bloodColor='blue') {
		super('Hemospectrum', 'none');
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
	static corruption = 40;
	static curseName = 'Wriggly Antennae';
	static description = `Sprouts a pair of wriggling insect antennae from your forehead. They're sensitive to touch and you can taste things through them, so keep them clean!`;
	static descriptionMitigated = `Sprouts a pair of wriggling insect antennae from your forehead. They're sensitive to touch and you can taste things through them, so keep them clean!\n\nThanks to the effects of the Shifting Obelisk, your antennae become protractable by up to half a meter, independently mobile and sensitive to touch enough that you could use them to figure out what surrounds you without looking. You may also choose to make them sensitive sensory organs for any of your senses except sight (hearing, heat/cold perception etc.).`;
	static picture = 'Curses/wrigglyantennae.png';
	static type = 'none';
	constructor() {
		super('Wriggly Antennae', 'none');
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
	static corruption = 45;
	static curseName = 'Eggxellent';
	static description = `If you have a penis, it will function similarly to an ovipositor, releasing eggs during ejaculation rather than semen. If you have a vagina, laying eggs will replace both periods (egg laying will still occur even if periods would normally be prevented via Relics or medically) and live births. (They can replace live births for any extra non-vaginal wombs you have too.)`;
	static descriptionMitigated = `If you have a penis, it will function similarly to an ovipositor, releasing eggs during ejaculation rather than semen. If you have a vagina, laying eggs will replace both periods (egg laying will still occur even if periods would normally be prevented via Relics or medically) and live births. (They can replace live births for any extra non-vaginal wombs you have too.)\n\nThanks to the effects of the Shifting Obelisk, you can choose the size, appearance and number of the eggs (although for eggs replacing a live birth, only one will be viable, or two if you had twins etc.). Eggs containing viable offspring must be large enough to contain a fetus, though they may grow to some degree after being lain to accommodate it. You may choose whether fertile eggs lain using your ovipositor develop into a regular fetus in the mother's womb or are lain by the mother after fertilisation.`;
	static picture = 'Curses/eggxellent.png';
	static type = 'none';
	constructor() {
		super('Eggxellent', 'none');
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
	static corruption = 35;
	static curseName = 'Submissiveness Rectification B';
	static description = `Causes you to become more submissive, like the Submissiveness Rectification A Curse. With two of them, you become physically incapable of resisting any request made of you except orders that would cause death or lasting damage to yourself or others. (Requests like "be my slave indefinitely" or "give me everything you own" would constitute lasting damage.)`;
	static descriptionMitigated = `Causes you to become more submissive, like the Submissiveness Rectification A Curse. With two of them, you become physically incapable of resisting any request made of you except orders that would cause death or lasting damage to yourself or others. (Requests like "be my slave indefinitely" or "give me everything you own" would constitute lasting damage.)\n\nThanks to the effects of the Shifting Obelisk, you'll enjoy being submissive more and you have instinctual knowledge of how to act to guide the people around you to fulfill your goals even while remaining submissive, e.g. by getting them to propose something you wanted as well and then agreeing to it or by making them feel grateful for all the things you do for them, giving you a boon you desire in return.`;
	static picture = 'Curses/submissivenessrectificationB.png';
	static type = 'libido';
	constructor() {
		super('Submissiveness Rectification B', 'libido');
	}

	static get incompatibilities() {
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
	static corruption = 40;
	static curseName = 'Lactation Rejuvenation B';
	static description = `Induces Permanent lactation, like the Lactation Rejuvenation A Curse. With two of them, your lactation will reach ridiculous levels normally impossible in humans or really any animal, requiring frequent milking throughout the day to prevent discomfort, temporarily increasing boob sizes at a rapid pace, and being capable of long, sustained milk streams at full capacity.`;
	static descriptionMitigated = `Induces Permanent lactation, like the Lactation Rejuvenation A Curse. With two of them, your lactation will reach ridiculous levels normally impossible in humans or really any animal, requiring frequent milking throughout the day to prevent discomfort, temporarily increasing boob sizes at a rapid pace, and being capable of long, sustained milk streams at full capacity.\n\nThanks to the effects of the Shifting Obelisk, you can control the color, composition and viscosity of your milk.`;
	static picture = 'Curses/lactationrejuvenationB.png';
	static type = 'none';
	constructor() {
		super('Lactation Rejuvenation B', 'none');
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
	static corruption = 55;
	static curseName = 'Pleasure Respecification B';
	static description = `Completely prevents you from ever climaxing from any sexual act with another person - you'll feel pleasure building, but release is only possible with masturbation. With both Pleasure Respecification A and B, orgasms of any kind become completely impossible, except when directly caused by a Curse.`;
	static descriptionMitigated = `Completely prevents you from ever climaxing from any sexual act with another person - you'll feel pleasure building, but release is only possible with masturbation. With both Pleasure Respecification A and B, orgasms of any kind become completely impossible, except when directly caused by a Curse.\n\nThanks to the effects of the Shifting Obelisk, intercourse during which you take sufficiently strong action to pleasure yourself can bring your orgasm, though it has to be clear self-stimulation that pushes you over the edge. If you have both Pleasure Respecification A and B, you may decide on any given day to take on additional levels of the Random Orgasms Curse. Once you decide to take additional levels they're there for the day, but you may decide to remove them again the next day (but not go below the number of levels you acquired in the abyss, if any).`;
	static picture = 'Curses/pleasurerespecB.png';
	static type = 'none';
	constructor() {
		super('Pleasure Respecification B', 'none',
		      'You can no longer orgasm from sex with another person, and need to spend some time masturbating after the act to reach climax. ');
	}
}
setup.allCurses.PleasureRespecificationB = new PleasureRespecificationB()
State.variables.curse75 = setup.allCurses.PleasureRespecificationB
window.PleasureRespecificationB = PleasureRespecificationB
setup.curseArray.push(PleasureRespecificationB)

class AgeReductionC extends Curse {
	static corruption = 45;
	static curseName = 'Age Reduction C';
	static description = `Reduces your apparent physical age by 4 years or sets it to 20, whichever is younger. You probably won't be able to carry as much weight as you used to if you end up particularly young.`;
	static descriptionMitigated = `Reduces your apparent physical age by 4 years or sets it to 20, whichever is younger. You probably won't be able to carry as much weight as you used to if you end up particularly young.\n\nThanks to the effects of the Shifting Obelisk, you can make small cosmetic changes to your body's apparent age. You can't change big things like your height, but you could make your facial structure less kid-like or start growing a beard at an earlier biological age than your body would usually allow.`;
	static picture = 'Curses/agereductionC.png';
	static type = 'age';
	constructor() {
		super('Age Reduction C', 'age');
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
	static corruption = 20;
	static curseName = 'Horny';
	static description = `You get a noticeable horn in the shape of your choice sprouting from your head. It's strong, but quite sensitive to touch.`;
	static descriptionMitigated = `You get a noticeable horn in the shape of your choice sprouting from your head. It's strong, but quite sensitive to touch.\n\nThanks to the effects of the Shifting Obelisk, your horn(s) become strong and pointy enough to use as a weapon and your neck muscles powerful enough to wield them effectively, but they are also an erogenous zone strong enough to bring you to orgasm.`;
	static picture = 'Curses/horny.png';
	static type = 'none';
	constructor() {
		super('Horny', 'none');
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
	static corruption = 40;
	static curseName = 'Drawing Spades';
	static description = `Gives you a cute spade-tipped demon tail. It's a major new erogenous zone, and its prehensility lends itself very well to being used creatively in sex. Occasionally may act on its own, attempting to pleasure you or others based on your subconscious desires.`;
	static descriptionMitigated = `Gives you a cute spade-tipped demon tail. It's a major new erogenous zone, and its prehensility lends itself very well to being used creatively in sex. Occasionally may act on its own, attempting to pleasure you or others based on your subconscious desires.\n\nThanks to the effects of the Shifting Obelisk, other people will recognise the tail as acting independently from you and not blame you if it molests them or yourself (even if, perhaps, in that moment it was secretly under your conscious control). They will consider it as an annoyance that they simply have to deal with and can't really do anything about (aside from moving away from you), since action against it would hurt you too.`;
	static picture = 'Curses/drawingspades.png';
	static type = 'none';
	constructor() {
		super('Drawing Spades', 'none');
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
	static corruption = 55;
	static curseName = 'Tattoo Tally';
	static description = `You will have several small faintly-glowing runic tattoos across your body, culminating in one particularly large tattoo centered just above your pubic mound. These tattoos are very sensitive, and anyone who sees them will instantly be able to know the full breadth of your sexual history: total number of times having sex, number of different partners, how recently you last had sex, the kinds of fetishes you've indulged in, total volume of sexual fluids you've had in you... there's a lot of statistics there, and they'll see it all.`;
	static descriptionMitigated = `You will have several small faintly-glowing runic tattoos across your body, culminating in one particularly large tattoo centered just above your pubic mound. These tattoos are very sensitive, and anyone who sees them will instantly be able to know the full breadth of your sexual history: total number of times having sex, number of different partners, how recently you last had sex, the kinds of fetishes you've indulged in, total volume of sexual fluids you've had in you... there's a lot of statistics there, and they'll see it all.\n\nThanks to the effects of the Shifting Obelisk, you get control over the placement of the tattoos. You can choose to hide the more embarrassing ones where they are usually obscured by your clothes, but they do still all have to be somewhere on your body and equally distributed, so <it>something</it> will always be visible (unless you completely cover yourself head to toes). Onlookers will instinctively know that the tattoos contain the truth, so you <it>could</it> also use them as proof of virginity or similar qualities (assuming you really have them of course)`;
	static picture = 'Curses/tattootally.png';
	static type = 'none';
	constructor() {
		super('Tattoo Tally', 'none',
		      'You have several small runic tattoos throughout your body, and a larger heart shaped one above your crotch. Everyone who looks at them instinctively knows the full extent of your sexual history. ');
	}
}
setup.allCurses.TattooTally = new TattooTally()
State.variables.curse79 = setup.allCurses.TattooTally
window.TattooTally = TattooTally
setup.curseArray.push(TattooTally)

class Leaky extends Curse {
	static corruption = 55;
	static curseName = 'Leaky';
	static description = `Your genitals will be abnormally lubricated at all times, with precum/vaginal lubricant. It'll get even worse if you're aroused at all, and you'll definitely have a stream going down your legs without a great deal of prior preparation. Expect a lot of fluid to be released when you orgasm. You'll be producing about twice as much as an average person, and this Curse about doubles fluid increases gained from eating Crumbleweeds in the previous layer. Also causes your fluids to take on an unusual flavor of your choice, without affecting their appearance.`;
	static descriptionMitigated = `Your genitals will be abnormally lubricated at all times, with precum/vaginal lubricant. It'll get even worse if you're aroused at all, and you'll definitely have a stream going down your legs without a great deal of prior preparation. Expect a lot of fluid to be released when you orgasm. You'll be producing about twice as much as an average person, and this Curse about doubles fluid increases gained from eating Crumbleweeds in the previous layer. Also causes your fluids to take on an unusual flavor of your choice, without affecting their appearance.\n\nThanks to the effects of the Shifting Obelisk, although you still produce the same amount of fluids, they evaporate relatively soon and don't leave stains. You can also choose to make them a weak aphrodisiac.`;
	static picture = 'Curses/leaky.png';
	static type = 'none';
	constructor() {
		super('Leaky', 'none',
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
	static corruption = 55;
	static curseName = 'Wandering Hands';
	static description = `Causes your body to subconsciously seek sexual release when you're not focusing on it, regardless of how aroused you are. You'll be writing an essay with one hand, and won't even notice your other hand masturbating until you're close to climax. Or you might absentmindedly grope your own chest in the middle of a conversation with a friend. In more serious cases, you could even find yourself grinding against objects or other people, and your lack of control will be especially apparent in your sleep. The effects can be largely nullified by wearing a vibrator or similar sex toy near-constantly.`;
	static descriptionMitigated = `Causes your body to subconsciously seek sexual release when you're not focusing on it, regardless of how aroused you are. You'll be writing an essay with one hand, and won't even notice your other hand masturbating until you're close to climax. Or you might absentmindedly grope your own chest in the middle of a conversation with a friend. In more serious cases, you could even find yourself grinding against objects or other people, and your lack of control will be especially apparent in your sleep. The effects can be largely nullified by wearing a vibrator or similar sex toy near-constantly.\n\nThanks to the effects of the Shifting Obelisk, everybody around you will ignore these subconscious actions. They might notice that you're getting flushed or having trouble concentrating, but they won't realise that your hand slipped into your crotch. If you use sex toys instead they won't notice them either, even if there's an audible buzzing or visible bulge.`;
	static picture = 'Curses/wanderinghands.png';
	static type = 'none';
	constructor() {
		super('Wandering Hands', 'none',
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
	static corruption = 20;
	static curseName = 'Semen Demon';
	static description = `Requires you to drink at least 10ml of sexual fluids (semen or vaginal fluids) daily, or you will suffer symptoms of starvation. For reference, a single ejaculation is typically around 5ml, give or take, in both cases. Companions you have may help you if you have a good relationship, but a single companion would probably have trouble feeding you all on their own if you need a lot. You could try to supplement your diet with fluids from beasts of the Abyss - though the time spent doing so would likely substantially increase all travel times down here. This Curse can supply nutrition in place of food, but the Miasma prevents this from working inside the Abyss, unfortunately. You'll still need to eat real food too, while you're down here. You can get +15 extra corruption by restricting yourself to either semen or vaginal fluids exclusively.`;
	static descriptionMitigated = `Requires you to drink at least 10ml of sexual fluids (semen or vaginal fluids) daily, or you will suffer symptoms of starvation. For reference, a single ejaculation is typically around 5ml, give or take, in both cases. Companions you have may help you if you have a good relationship, but a single companion would probably have trouble feeding you all on their own if you need a lot. You could try to supplement your diet with fluids from beasts of the Abyss - though the time spent doing so would likely substantially increase all travel times down here. This Curse can supply nutrition in place of food, but the Miasma prevents this from working inside the Abyss, unfortunately. You'll still need to eat real food too, while you're down here. You can get +15 extra corruption by restricting yourself to either semen or vaginal fluids exclusively.\n\nThanks to the effects of the Shifting Obelisk, You can consume any sexual fluids you come into contact with, not just those consumed orally. You can also choose to give the Leaky curse to any partner you have sex with for 1-7 days, increasing the amount of fluids they contribute.`;
	static picture = 'Curses/semendemon.png';
	static type = 'libido';
	/**
	 * Creates a new Semen Demon curse.
	 * @param {'semen' | 'sexual fluids' | 'vaginal fluids'} fluidType The type of fluids the cursed character is required to consume.
	 * @param {number} amount Deprecated: Semen Demon is now taken multiple times by actually taking it multiple times.
	 */
	constructor(fluidType = 'sexual fluids', amount = 1) {
		super('Semen Demon', 'libido');
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
	 * Returns the customisation options chosen for this Curse, if any.
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
			safeConsumption += State.variables.hiredCompanions
			                        .reduce((v, c) => c.affec >= 15 && ((c.penis > 0 && this.fluidType !== 'vaginal fluids') ||
			                                                            (c.vagina > 0 && this.fluidType !== 'semen'))
			                                          ? v + 2 * c.fluids / 100 : v,
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
	static corruption = 20;
	static curseName = 'Quota';
	static description = `Requires you to cause others a total of 2 orgasms per day via direct contact with your body, or you will experience a severe drop in energy, characteristic of heavy sleep deprivation. The quota is increased to 3 orgasms if taken in combination with Sleep Tight. This can replace sleep, but the Miasma prevents this from working inside the Abyss. I hope you've been kind to your companions, or you'll need to waste a lot of potential travel time pleasuring some monsters down here.`;
	static descriptionMitigated = `Requires you to cause others a total of 2 orgasms per day via direct contact with your body, or you will experience a severe drop in energy, characteristic of heavy sleep deprivation. The quota is increased to 3 orgasms if taken in combination with Sleep Tight. This can replace sleep, but the Miasma prevents this from working inside the Abyss. I hope you've been kind to your companions, or you'll need to waste a lot of potential travel time pleasuring some monsters down here.\n\nThanks to the effects of the Shifting Obelisk, when you touch a sleeping person you can put them into a deep sleep that they won't wake up from even as you bring them to orgasm. When they do eventually wake up they will remember a wet dream.`;
	static picture = 'Curses/quota.png';
	static type = 'libido';
	constructor() {
		super('Quota', 'libido');
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
	static corruption = 20;
	static curseName = 'In the Limelight';
	static description = `Requires you to be the primary source of at least 50 orgasms daily, or you will completely cease feeling joy, falling into a deep depression where any kind of productive effort is impossible. Unlike Quota, this can be via indirect means, such as media you're featured in being masturbated to. Your (mis)adventures in the Abyss will from here on out be magically recorded and transmitted to a great deal of people to achieve this, but you should probably try to be just a bit more provocative than usual, just to be sure. If you earn enough fans while you're down here, you could make a career for yourself after you leave!`;
	static descriptionMitigated = `Requires you to be the primary source of at least 50 orgasms daily, or you will completely cease feeling joy, falling into a deep depression where any kind of productive effort is impossible. Unlike Quota, this can be via indirect means, such as media you're featured in being masturbated to. Your (mis)adventures in the Abyss will from here on out be magically recorded and transmitted to a great deal of people to achieve this, but you should probably try to be just a bit more provocative than usual, just to be sure. If you earn enough fans while you're down here, you could make a career for yourself after you leave!\n\nThanks to the effects of the Shifting Obelisk, you are sexually attractive to everybody. Everybody watching you will consider you arousing, even if by their usual standards and preferences they would have considered you a turn-off. This only applies to your appearance — your actions may still influence a person's willingness to watch material containing you. When thinking of specific persons you will also be able to tell what preferences and fetishes they have and how you can best please them.`;
	static picture = 'Curses/inthelimelight.png';
	static type = 'libido';
	constructor() {
		super('In the Limelight', 'libido');
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
	static corruption = 50;
	static curseName = 'Libido Reinforcement E';
	static description = `Gives one level of the Libido Reinforcement Curse. I hope your standards aren't too high, or you might be in for a bit of frustration.`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse. I hope your standards aren't too high, or you might be in for a bit of frustration.\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementE.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement E', 'libido');
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
	static corruption = 45;
	static curseName = 'Gender Reversal E';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Whether you're going for the trap/reverse trap look or going all the way, I'm sure you'll look great!`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Whether you're going for the trap/reverse trap look or going all the way, I'm sure you'll look great!\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalE.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal E', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalE = new GenderReversalE()
State.variables.curse86 = setup.allCurses.GenderReversalE
window.GenderReversalE = GenderReversalE
setup.curseArray.push(GenderReversalE)

class AssetRobustnessE extends Curse {
	static corruption = 50;
	static curseName = 'Asset Robustness E';
	static description = `Grows your boobs by about 8 cup sizes and/or increases your penis size by about 20cm (8in), depending on what's applicable. This will probably be very inconvenient for you.`;
	static descriptionMitigated = `Grows your boobs by about 8 cup sizes and/or increases your penis size by about 20cm (8in), depending on what's applicable. This will probably be very inconvenient for you.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessE.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness E', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 55;
	static curseName = 'Urine Reamplification A';
	static description = `Significantly reduces your bladder capacity. Though annoying, this shouldn't be too dangerous so long as you're careful. Urine Reamplification Curses also prevent the Event Horizon Relic from taking care of your pee for you. You may want to avoid this Curse if you don't want to have any embarrassing accidents.`;
	static descriptionMitigated = `Significantly reduces your bladder capacity. Though annoying, this shouldn't be too dangerous so long as you're careful. Urine Reamplification Curses also prevent the Event Horizon Relic from taking care of your pee for you. You may want to avoid this Curse if you don't want to have any embarrassing accidents.\n\nThanks to the effects of the Shifting Obelisk, your pee becomes odorless and evaporates more quickly.`;
	static picture = 'Curses/urinereamplificationA.png';
	static type = 'none';
	constructor() {
		super('Urine Reamplification A', 'none',
		      'Your bladder capacity has been significantly reduced, you need to be careful to make sure you don\'t have any accidents. ');
	}
}
setup.allCurses.UrineReamplificationA = new UrineReamplificationA()
State.variables.curse88 = setup.allCurses.UrineReamplificationA
window.UrineReamplificationA = UrineReamplificationA
setup.curseArray.push(UrineReamplificationA)

class BarterSystem extends Curse {
	static corruption = 65;
	static curseName = 'Barter System';
	static description = `Any kind of circulating currency you gain, physical or digital, will just seem to mysteriously vanish. In fact, the only way you have of paying for things is via sexual favors. Thankfully, most vendors will be a lot more receptive to this idea than they would have been before...but not at Outset Town's! Better give your dubloons to a companion before you take this Curse, and let them handle buying and selling things. (You cannot give the vending machines sexual favors, either. Please don't fuck the vending machines.)`;
	static descriptionMitigated = `Any kind of circulating currency you gain, physical or digital, will just seem to mysteriously vanish. In fact, the only way you have of paying for things is via sexual favors. Thankfully, most vendors will be a lot more receptive to this idea than they would have been before...but not at Outset Town's! Better give your dubloons to a companion before you take this Curse, and let them handle buying and selling things. (You cannot give the vending machines sexual favors, either. Please don't fuck the vending machines.)\n\nThanks to the effects of the Shifting Obelisk, you can run a favour economy: anybody who you give a sexual favor to will remember it and eventually pay you back with a favor of equal worth (for them). In addition, you can hand out (or pay for something with) tokens that allow their holder to apply one of the abyss' curses to you for a limited time. You can create these tokens for any curse found on a layer you've been to.`;
	static picture = 'Curses/bartersystem.png';
	static type = 'none';
	constructor() {
		super('Barter System', 'none',
		      'You are unable to process currency, so one of your companions or friends will need to perform any transactions on your behalf, except for when a merchant is willing to trade you an item in exchange for a sexual favor. ');
	}
}
setup.allCurses.BarterSystem = new BarterSystem()
State.variables.curse89 = setup.allCurses.BarterSystem
window.BarterSystem = BarterSystem
setup.curseArray.push(BarterSystem)

class SharedSpace extends Curse {
	static corruption = 60;
	static curseName = 'Shared Space';
	static description = `Everybody around you will feel incredibly comfortable touching you and groping you, and the concept of "personal space" won't exist for you. You'll always be seen in the wrong if you try to point it out.`;
	static descriptionMitigated = `Everybody around you will feel incredibly comfortable touching you and groping you, and the concept of "personal space" won't exist for you. You'll always be seen in the wrong if you try to point it out.\n\nThanks to the effects of the Shifting Obelisk, the effect goes both ways, allowing you to touch and grope back without being seen as in the wrong. The recipient may still attempt to disengage if they don't like it but will not get angry at you.`;
	static picture = 'Curses/sharedspace.png';
	static type = 'none';
	constructor() {
		super('Shared Space', 'none',
		      'People around you are always happy to grope you, having little regard to giving you any space to yourself. ');
	}
}
setup.allCurses.SharedSpace = new SharedSpace()
State.variables.curse90 = setup.allCurses.SharedSpace
window.SharedSpace = SharedSpace
setup.curseArray.push(SharedSpace)

class Weakling extends Curse {
	static corruption = 65;
	static curseName = 'Weakling';
	static description = `Causes your physical strength to drop to hilarious, absurdly low levels. Your comfortable long-term carrying capacity drops to 5kg, and your short-term strength isn't much better. You'll also probably be much worse off in a fight, especially with melee weaponry. This affects your essence more than your physical musculature, so you could train and train and become positively sculpted, or even cut off your arms and replace them with robotics, and you wouldn't be any stronger. It won't reduce your strength in ways that could be hazardous to your health or prevent normal locomotion, though.`;
	static descriptionMitigated = `Causes your physical strength to drop to hilarious, absurdly low levels. Your comfortable long-term carrying capacity drops to 5kg, and your short-term strength isn't much better. You'll also probably be much worse off in a fight, especially with melee weaponry. This affects your essence more than your physical musculature, so you could train and train and become positively sculpted, or even cut off your arms and replace them with robotics, and you wouldn't be any stronger. It won't reduce your strength in ways that could be hazardous to your health or prevent normal locomotion, though.\n\nThanks to the effects of the Shifting Obelisk, you are easily able to find people willing to perform physically demanding work for you in exchange for letting them grope you or other sexual favours.`;
	static picture = 'Curses/weakling.png';
	static type = 'none';
	constructor() {
		super('Weakling', 'none');
	}

	// Handicaps are implemented as special-purpose code in Character because it needs to come last.
}
setup.allCurses.Weakling = new Weakling()
State.variables.curse91 = setup.allCurses.Weakling
window.Weakling = Weakling
setup.curseArray.push(Weakling)

class RandomOrgasms extends Curse {
	static corruption = 65;
	static curseName = 'Random Orgasms';
	static description = `Once a day, you will suffer a powerful, unprompted orgasm, with no warning whatsoever. Can be very embarrassing if you're in public.`;
	static descriptionMitigated = `Once a day, you will suffer a powerful, unprompted orgasm, with no warning whatsoever. Can be very embarrassing if you're in public.\n\nThanks to the effects of the Shifting Obelisk, you can prevent the random orgasm from occurring in a given period of time by bringing yourself to a sufficiently strong orgasm in advance. The protection period an orgasm gives you is proportional to the level of the curse. At one daily random orgasm you can negate the curse for 2 hours after an orgasm. At 5, the protection lasts 30 minutes. You can extend this period by up to twice its length by keeping yourself aroused or sexually stimulated, e.g. using a hidden sex toy. The protection period does not skip random orgasms that would have occurred inside it but delays them — they'll still happen at some point.`;
	static picture = 'Curses/randomorgasms.png';
	static type = 'none';
	constructor() {
		super('Random Orgasms', 'none');
	}

	get maximum() {
		return 5;
	}
}
setup.allCurses.RandomOrgasms = new RandomOrgasms()
State.variables.curse92 = setup.allCurses.RandomOrgasms
window.RandomOrgasms = RandomOrgasms
setup.curseArray.push(RandomOrgasms)

class Beastly extends Curse {
	static corruption = 80;
	static curseName = 'Beastly';
	static description = `Causes you to subconsciously take on many animalistic traits, including but not limited to: inability to "speak" except with simplistic, unintelligible noises, extreme discomfort at using human toilets and preferring to either do your business outside or use a litterbox, preferring to clean yourself via licking rather than taking a bath, and really enjoying headpats. Causes you to take on stereotypical traits specific to any kind of specific fantasy animals or fantasy races you might have become, too. Doesn't affect intelligence, but may affect how intelligent others perceive you to be.`;
	static descriptionMitigated = `Causes you to subconsciously take on many animalistic traits, including but not limited to: inability to "speak" except with simplistic, unintelligible noises, extreme discomfort at using human toilets and preferring to either do your business outside or use a litterbox, preferring to clean yourself via licking rather than taking a bath, and really enjoying headpats. Causes you to take on stereotypical traits specific to any kind of specific fantasy animals or fantasy races you might have become, too. Doesn't affect intelligence, but may affect how intelligent others perceive you to be.\n\nThanks to the effects of the Shifting Obelisk, others will tend to treat you like a loved pet. They'll feed you, give you head pats and belly rubs, take you in if you seem abandoned and help you if you're suffering. But they also won't give you privacy (or expect you to give them any), prioritise your needs less than they do those of other humans they care about and they won't consider you to own property.`;
	static picture = 'Curses/beastly.png';
	static type = 'none';
	constructor() {
		super('Beastly', 'none',
		      'You tend to behave in a very animalistic way instinctually. People around you tend to assume you\'re more of an animal or a pet than a person to be respected properly. ');
	}

	// conversation handicap implemented as special-purpose code in Character
}
setup.allCurses.Beastly = new Beastly()
State.variables.curse93 = setup.allCurses.Beastly
window.Beastly = Beastly
setup.curseArray.push(Beastly)

class CreatureOfTheNight extends Curse {
	static corruption = 40;
	static curseName = 'Creature of the Night';
	static description = `You become a vampire. You'll burst into flames in direct sunlight, though you can reduce this to just significant discomfort and itchiness with copious sunblock and/or a parasol. You don't have a pulse anymore, and by some measures, you're no longer among the living...though your body can still be stopped by the same kinds of physical force that would kill a human. Your skin has an odd, unearthly look to it, the lack of life in you being very apparent. You need to suck some blood to survive, but not that much... about one 3 minute feeding session weekly would be enough, and it's perfectly survivable for the donor, though draining. This doesn't replace your normal dietary requirements or anything, though. You require verbal permission to enter any private homes owned by someone else. You no longer age, and your body is immune to most diseases and toxins, allowing you to suck blood without fear from catching anything from your victim. All other classic vampire weaknesses and strengths don't apply to you.`;
	static descriptionMitigated = `You become a vampire. You'll burst into flames in direct sunlight, though you can reduce this to just significant discomfort and itchiness with copious sunblock and/or a parasol. You don't have a pulse anymore, and by some measures, you're no longer among the living...though your body can still be stopped by the same kinds of physical force that would kill a human. Your skin has an odd, unearthly look to it, the lack of life in you being very apparent. You need to suck some blood to survive, but not that much... about one 3 minute feeding session weekly would be enough, and it's perfectly survivable for the donor, though draining. This doesn't replace your normal dietary requirements or anything, though. You require verbal permission to enter any private homes owned by someone else. You no longer age, and your body is immune to most diseases and toxins, allowing you to suck blood without fear from catching anything from your victim. All other classic vampire weaknesses and strengths don't apply to you.\n\nThanks to the effects of the Shifting Obelisk, you <it>can</it> nourish yourself by blood alone, but to completely replace food you'll require feeding every day. People will tend to associate you with romanticised tales of vampires rather than scary ones. You may well be able to convince even relative strangers to let you feed from them in exchange for sexual favors or other payment. Also increases your strength to about twice that of a normal human (unless you have the Weakling Curse).`;
	static picture = 'Curses/creatureofthenight.png';
	static type = 'none';
	constructor() {
		super('Creature of the Night', 'none',
		      'You no longer have a pulse and sunlight causes you discomfort, similar to mythological vampires. You also need to drink a small amount of blood to survive, in addition to normal food. ');
	}
}
setup.allCurses.CreatureOfTheNight = new CreatureOfTheNight()
State.variables.curse94 = setup.allCurses.CreatureOfTheNight
window.CreatureOfTheNight = CreatureOfTheNight
setup.curseArray.push(CreatureOfTheNight)

class Minishish extends Curse {
	static corruption = 75;
	static curseName = 'Minish-ish';
	static description = `Reduces your height to about 10-20cm (4-8in), the rest of your bodily proportions following suit. This will have major effects on the remainder of your journey. Many Relics may be difficult or impossible to use. You will probably be unable to carry any weight of consequence, or engage in any kind of combat. If you don't have a companion to carry you or some other method of overcoming your slower movement, double all time costs. Your new metabolic rate means you need 1/4 as much food and water as you did before, but you need to actually have some method of carrying all that extra food and water to take advantage of this.`;
	static descriptionMitigated = `Reduces your height to about 10-20cm (4-8in), the rest of your bodily proportions following suit. This will have major effects on the remainder of your journey. Many Relics may be difficult or impossible to use. You will probably be unable to carry any weight of consequence, or engage in any kind of combat. If you don't have a companion to carry you or some other method of overcoming your slower movement, double all time costs. Your new metabolic rate means you need 1/4 as much food and water as you did before, but you need to actually have some method of carrying all that extra food and water to take advantage of this.\n\nThanks to the effects of the Shifting Obelisk, you gain a set of fairy or pixie wings that gives you limited flight. They do not make you move any faster, but let you lift yourself above ground level and hover in the air. Strong winds will blow you around uncontrollably, so it's not recommended to get too far off the ground.`;
	static picture = 'Curses/minish-ish.png';
	static type = 'height';
	constructor() {
		super('Minish-ish', 'height');
	}

	static get incompatibilities() {
		return ['Colossal-able'];
	}

	miniOrGigantify(prevHeight) {
		return prevHeight / 10;
	}
	addSizeHandicap(prevHandicap) {
		// What if all companions are minish-ised too?
		return State.variables.hiredCompanions.length === 0 || prevHandicap;
	}

	changeFoodConsumption(prevConsumption) {
		return prevConsumption / 4;
	}
}
setup.allCurses.Minishish = new Minishish()
State.variables.curse95 = setup.allCurses.Minishish
window.Minishish = Minishish
setup.curseArray.push(Minishish)

class Colossalable extends Curse {
	static corruption = 75;
	static curseName = 'Colossal-able';
	static description = `Increases your height to roughly 100m (330ft), the rest of your proportions following suit. This will have major effects on the remainder of your journey. You will be able to carry a lot more than before, but the difficulties of moving around the Abyss with your new huge body, finding alternate larger routes, and being careful of your footing, will slow you down a lot: double all time costs. You are probably a bit better off in combat than before, but many of the vicious beasts of the Abyss are no stranger to taking down threats much larger than them, being fast and wily enough to still be major obstacles to you. Can't be taken with Minish-ish.`;
	static descriptionMitigated = `Increases your height to roughly 100m (330ft), the rest of your proportions following suit. This will have major effects on the remainder of your journey. You will be able to carry a lot more than before, but the difficulties of moving around the Abyss with your new huge body, finding alternate larger routes, and being careful of your footing, will slow you down a lot: double all time costs. You are probably a bit better off in combat than before, but many of the vicious beasts of the Abyss are no stranger to taking down threats much larger than them, being fast and wily enough to still be major obstacles to you. Can't be taken with Minish-ish.\n\nThanks to the effects of the Shifting Obelisk, you'll find yourself able to shrug off most dangers. Blades barely scratch you, bullets amount to insect bites, lightning only tingles and you're heavy enough to resist even the strongest of winds. Hot and cold weather don't bother you either. You can still swim and dive like a regular human in a sufficiently large body of water and your feet are tough enough that you can step on pretty much anything without hurting yourself. You also have enough control over your strength and body that you can avoid breaking things you interact with (like houses and humans) if you're careful.`;
	static picture = 'Curses/colossal-able.png';
	static type = 'height';
	constructor() {
		super('Colossal-able', 'height');
	}

	static get incompatibilities() {
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
	static corruption = 55;
	static curseName = 'Libido Reinforcement F';
	static description = `Gives one level of the Libido Reinforcement Curse. Please don't end up on any sexual offender lists!`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse. Please don't end up on any sexual offender lists!\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementF.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement F', 'libido');
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
	static corruption = 50;
	static curseName = 'Gender Reversal F';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Do you like the way your body looks now?`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Do you like the way your body looks now?\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalF.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal F', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalF = new GenderReversalF()
State.variables.curse98 = setup.allCurses.GenderReversalF
window.GenderReversalF = GenderReversalF
setup.curseArray.push(GenderReversalF)

class AssetRobustnessF extends Curse {
	static corruption = 60;
	static curseName = 'Asset Robustness F';
	static description = `Grows your boobs by about 16 cup sizes and/or increases your penis size by about 40cm (16in), depending on what's applicable. We're well into territory that could be considered a medical condition, now.`;
	static descriptionMitigated = `Grows your boobs by about 16 cup sizes and/or increases your penis size by about 40cm (16in), depending on what's applicable. We're well into territory that could be considered a medical condition, now.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessF.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness F', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 55;
	static curseName = 'Urine Reamplification B';
	static description = `Completely removes your ability to judge how full your bladder is, or hold it when it's full. Expect a lot of accidents, especially with Urine Reamplification A. Can be managed if you make using the restroom very frequently a habit, but be careful.`;
	static descriptionMitigated = `Completely removes your ability to judge how full your bladder is, or hold it when it's full. Expect a lot of accidents, especially with Urine Reamplification A. Can be managed if you make using the restroom very frequently a habit, but be careful.\n\nThanks to the effects of the Shifting Obelisk, your pee becomes odorless and evaporates more quickly.`;
	static picture = 'Curses/urinereamplificationB.png';
	static type = 'none';
	constructor() {
		super('Urine Reamplification B', 'none');
	}
}
setup.allCurses.UrineReamplificationB = new UrineReamplificationB()
State.variables.curse100 = setup.allCurses.UrineReamplificationB
window.UrineReamplificationB = UrineReamplificationB
setup.curseArray.push(UrineReamplificationB)

class EyeOnThePrize extends Curse {
	static isamputation = true;
	static corruption = 70;
	static curseName = 'Eye on the Prize';
	static description = `Gouges out one of the two eyes you were born with. (This might sting a little... and then a lot, for a long time. The wound will be sealed to prevent infection.) @@.italic; This could have major effects on your journey.@@ Losing one eye, and with it depth perception, will make many basic tasks difficult, rendering you much less capable of dealing with Threats. Losing both eyes will render you incapable of much of anything down here on your own. Even with a companion, you should assume a great deal of lost travel time, as they will need to slow their pace greatly to assist you. Can be taken twice if you still have both organic eyes.`;
	static descriptionMitigated = `Gouges out one of the two eyes you were born with. (This might sting a little... and then a lot, for a long time. The wound will be sealed to prevent infection.) @@.italic; This could have major effects on your journey.@@ Losing one eye, and with it depth perception, will make many basic tasks difficult, rendering you much less capable of dealing with Threats. Losing both eyes will render you incapable of much of anything down here on your own. Even with a companion, you should assume a great deal of lost travel time, as they will need to slow their pace greatly to assist you. Can be taken twice if you still have both organic eyes.\n\nThanks to the effects of the Shifting Obelisk, you get improved hearing and touching senses and spacial memory. Not enough to be a superhero, but enough to find your way around, even if you lost both eyes.`;
	static picture = 'Curses/eyeontheprize.png';
	static type = 'handicap';
	constructor() {
		super('Eye on the Prize', 'handicap');
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
	static corruption = 90;
	static curseName = 'Deafening Silence';
	static description = `You will be rendered completely deaf, incapable of ever processing sound again. Potentially a very dangerous condition to have in the Abyss, reducing you ability to react to threats and making communication with companions more difficult.

You can get an extra +10 corruption if you allow your ears to be violently ripped off, then sealed to prevent infection - so long as you have no other Curses affecting the ears.`;
	static descriptionMitigated = `You will be rendered completely deaf, incapable of ever processing sound again. Potentially a very dangerous condition to have in the Abyss, reducing you ability to react to threats and making communication with companions more difficult.

You can get an extra +10 corruption if you allow your ears to be violently ripped off, then sealed to prevent infection - so long as you have no other Curses affecting the ears.\n\nThanks to the effects of the Shifting Obelisk, you get a high-speed processing ability in exchange. This allows you to react very quickly to what's happening and make complex decisions in a fraction of a second. If you focus hard enough you can see the world around you as if in slow motion, having sped up every part of your mind.`;
	static picture = 'Curses/deafeningsilence.png';
	static type = 'handicap';
	constructor() {
		super('Deafening Silence', 'handicap');
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
	static corruption = 90;
	static curseName = 'Taciturn Turnaround';
	static description = `Renders you completely mute, incapable of ever uttering a sound again. Will undoubtedly cast troubles on your journey if you're with a companion.

You can get an extra +25 corruption by volunteering to have your tongue violently ripped out (and the wound magically sealed up), simultaneously removing your sense of taste, but you can't choose to do so if you took Lingual Leviathan.`;
	static descriptionMitigated = `Renders you completely mute, incapable of ever uttering a sound again. Will undoubtedly cast troubles on your journey if you're with a companion.

You can get an extra +25 corruption by volunteering to have your tongue violently ripped out (and the wound magically sealed up), simultaneously removing your sense of taste, but you can't choose to do so if you took Lingual Leviathan.\n\nThanks to the effects of the Shifting Obelisk, you gain high fine motor skills and dexterity — you'll be able to perform most physical actions at high speed and precision. If you lost your tongue as well, you'll be much faster at picking up manual skills too.`;
	static picture = 'Curses/taciturnturnaround.png';
	static type = 'handicap';
	constructor() {
		super('Taciturn Turnaround', 'handicap');
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
	static corruption = 45;
	static curseName = 'Ampu-Q-tie';
	static description = `Rips off one of your four limbs, about halfway up from the knee or elbow. (It's okay if you want to scream from the pain. The wound will be sealed up safely.) Prevents organic replacements from ever working, but you can get prosthetic replacements. @@.italic;This will likely have major effects on your journey.@@ Expect your carrying capacity to be heavily impacted for any arms you've lost, and in the absence of an appropriate countermeasure, you can expect insurmountable increases in travel time costs for losing any legs, likely forcing you to just give up and accept your fate. If you have a companion carry you they probably won't be able to carry much of anything else, and will be moving much slower than they would otherwise... even without limbs, humans are heavy. Can only be taken for organic, intact limbs.`;
	static descriptionMitigated = `Rips off one of your four limbs, about halfway up from the knee or elbow. (It's okay if you want to scream from the pain. The wound will be sealed up safely.) Prevents organic replacements from ever working, but you can get prosthetic replacements. @@.italic;This will likely have major effects on your journey.@@ Expect your carrying capacity to be heavily impacted for any arms you've lost, and in the absence of an appropriate countermeasure, you can expect insurmountable increases in travel time costs for losing any legs, likely forcing you to just give up and accept your fate. If you have a companion carry you they probably won't be able to carry much of anything else, and will be moving much slower than they would otherwise... even without limbs, humans are heavy. Can only be taken for organic, intact limbs.\n\nThanks to the effects of the Shifting Obelisk, you get an amazing sense of balance and your remaining limbs double in strength for every missing limb. If you lost all four limbs, your weight is reduced to a third of its normal weight. This also means you'll float in water (and most other liquids).`;
	static picture = 'Curses/ampu-Q-tie.png';
	static type = 'none';
	constructor(arms = 0, legs = 0) {
		super('Ampu-Q-tie', 'none');
		if (typeof arms === 'string') {
			this.arms = arms.count('A');
			this.legs = arms.count('L');
		} else {
			this.arms = arms;
			this.legs = legs;
		}
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
	 * @returns {[number, number]} The customisation options, in the same order they are used in the constructor.
	 * @protected
	 */
	_customisationOptions() {
		return [this.arms, this.legs];
	}

	static get incompatibilities() {
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
	static corruption = 65;
	static curseName = 'Nose Goes';
	static description = `Removes your sense of smell permanently. A relatively tame drawback that probably won't trouble you too much down here, but you'll miss out on the smells of freshly-cooked food, or of a flower garden on a balmy summer day, or of a refreshing salty ocean breeze... you'll probably miss them eventually.`;
	static descriptionMitigated = `Removes your sense of smell permanently. A relatively tame drawback that probably won't trouble you too much down here, but you'll miss out on the smells of freshly-cooked food, or of a flower garden on a balmy summer day, or of a refreshing salty ocean breeze... you'll probably miss them eventually.\n\nThanks to the effects of the Shifting Obelisk, you cease needing to eat or drink. The Miasma prevents this from working in the abyss though — if you stop eating here the Miasma will progressively weaken your body until it eventually gives way and you die.`;
	static picture = 'Curses/nosegoes.png';
	static type = 'handicap';
	constructor() {
		super('Nose Goes', 'handicap');
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
	static corruption = 15;
	static curseName = 'Arm Army';
	static description = `Adds an extra arm or leg in roughly the same spot your normal ones are. If you prefer, you could also have additional legs turn you into a centaur. Either way, the extra limbs will probably get in the way quite a bit and require years of practice before you're half as good at using them as you were before. This may slow down your travels or lower your ability to defend yourself. Limbs can be successfully amputated @@.italic;if@@ immediately replaced with prosthetics.

Cannot be taken with Ampu-Q-tie. (max. 6)`;
	static descriptionMitigated = `Adds an extra arm or leg in roughly the same spot your normal ones are. If you prefer, you could also have additional legs turn you into a centaur. Either way, the extra limbs will probably get in the way quite a bit and require years of practice before you're half as good at using them as you were before. This may slow down your travels or lower your ability to defend yourself. Limbs can be successfully amputated @@.italic;if@@ immediately replaced with prosthetics.
Thanks to the effects of the Shifting Obelisk, you'll be able to naturally use your new limbs as if you had always had them. Also lets you add winged arms (like a bat's) or simply wings (like an angel's), though they will not be functional.

Cannot be taken with Ampu-Q-tie. (max. 6)`;
	static picture = 'Curses/armarmy.png';
	static type = 'none';
	constructor() {
		super('Arm Army', 'none');
	}

	static get incompatibilities() {
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
	static corruption = 35;
	static curseName = 'A Little Extra';
	static description = `Takes whatever sexual equipment you have between your legs and adds another copy of it down there. You can decide the exact configuration. If you have both a penis and a vagina, you may choose which gets copied.`;
	static descriptionMitigated = `Takes whatever sexual equipment you have between your legs and adds another copy of it down there. You can decide the exact configuration. If you have both a penis and a vagina, you may choose which gets copied.\n\nThanks to the effects of the Shifting Obelisk, you may also increase your genitals' size or capacity. If you have a large penis, your partners' vaginal capacity expands automatically to accommodate it without pain or discomfort.`;
	static picture = 'Curses/alittleextra.png';
	static type = 'none';
	constructor(genital = '') {
		super('A Little Extra', 'none');
		this.genitals = genital;
	}

	static get incompatibilities() {
		return ['Null'];
	}

	/**
	 * Returns the customisation options chosen for this Curse, if any.
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
		return prevDoubled || character.vagina === 0 || (character.penis > 0 && this.genitals === 'penis');
	}

	changeVagina(character, prevVagina) {
		if (character.penis === 0 || (prevVagina > 0 && this.genitals === 'vagina')) {
			return prevVagina + 1;
		}
		return prevVagina;
	}

	changeWomb(character, prevWomb, extraWombLocations) {
		if (character.penis === 0 || (character.vagina > 0 && this.genitals === 'vagina')) {
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
	static corruption = 80;
	static curseName = 'Null';
	static description = `Completely removes your genitals. You'll just have a smooth patch of skin on your groin, like a doll. Any waste that would've exited through there will instead be heading out the back door. Also removes your nipples, again leaving a smooth patch of skin in their place. If any Curse has its effects entirely negated by this, you lose the corruption points it gave you. Some Curses could be altered a bit, like Leaky lubricating your back door, or having Asset Robustness Curses that previously affected a penis now apply to boobs, while others will be inevitably be lost. Naturally, cannot be taken with A Little Extra.

I hope you really like oral and/or anal!`;
	static descriptionMitigated = `Completely removes your genitals. You'll just have a smooth patch of skin on your groin, like a doll. Any waste that would've exited through there will instead be heading out the back door. Also removes your nipples, again leaving a smooth patch of skin in their place. If any Curse has its effects entirely negated by this, you lose the corruption points it gave you. Some Curses could be altered a bit, like Leaky lubricating your back door, or having Asset Robustness Curses that previously affected a penis now apply to boobs, while others will be inevitably be lost. Naturally, cannot be taken with A Little Extra.

I hope you really like oral and/or anal!

Thanks to the effects of the Shifting Obelisk, you may choose to retain an erogenous zone in your crotch. It's smooth skin, but rubbing it will still feel good and eventually bring you to orgasm, though it takes a lot more than it would with real genitals.`;
	static picture = 'Curses/null.png';
	static type = 'gender';
	constructor() {
		super('Null', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 50;
	static curseName = 'Seafolk';
	static description = `In place of legs, you now have a finned tail, allowing you to quickly swim through water. It also grants you a pair of gills in the position of your choice, allowing you to breathe underwater with ease. @@.italic; This doesn't seem like a very practical appendage in the Abyss!@@ Expect all the same drawbacks you would see if you took Ampu-Q-tie for your legs, but even greater as you still have the weight of your legs, just none of the function. You can get an extra +10 corruption if you elect to have your lungs completely adapt to being underwater, unable to breathe air. (This would probably be a bad idea.)

Cannot be taken with Ampu-Q-tie directed at the legs - requires both legs to still be there.`;
	static descriptionMitigated = `In place of legs, you now have a finned tail, allowing you to quickly swim through water. It also grants you a pair of gills in the position of your choice, allowing you to breathe underwater with ease. @@.italic; This doesn't seem like a very practical appendage in the Abyss!@@ Expect all the same drawbacks you would see if you took Ampu-Q-tie for your legs, but even greater as you still have the weight of your legs, just none of the function. You can get an extra +10 corruption if you elect to have your lungs completely adapt to being underwater, unable to breathe air. (This would probably be a bad idea.)
Thanks to the effects of the Shifting Obelisk, gives you increased strength underwater and a voice that can project over long distances, like a dolphin's. As long as you're in the water you'll never feel hungry or most other discomforts, and underwater threats will generally avoid you or be pacified (except the ones in the Abyss). You may also grow webbed fingers underwater to further increase your swimming speed.

Cannot be taken with Ampu-Q-tie directed at the legs - requires both legs to still be there.`;
	static picture = 'Curses/seafolk.png';
	static type = 'handicap';
	constructor() {
		super('Seafolk', 'handicap');
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
	static corruption = 75;
	static curseName = 'Taken for Granite';
	static description = `Whenever you orgasm, you'll temporarily be petrified, turned into a completely immobile stone. The first time you orgasm in a given day, you'll be unpetrified after 5 minutes, but this will @@.italic;double@@ with each additional orgasm you have, only resetting at midnight. If you're petrified when the clock hits midnight, you'll still have to wait out your current timer. You'll sense what's going on around you when you're petrified just as well as you would normally, but will appear to the rest to the rest of the world as a completely immobile statue. Physical damage done to your stone form will be healed when you reform, but mental damage won't.

If you're completely unable to orgasm due to the effects of Pleasure Respecification Curses, this will instead turn you to stone for a random 2 hour, non-sleeping period each day.`;
	static descriptionMitigated = `Whenever you orgasm, you'll temporarily be petrified, turned into a completely immobile stone. The first time you orgasm in a given day, you'll be unpetrified after 5 minutes, but this will @@.italic;double@@ with each additional orgasm you have, only resetting at midnight. If you're petrified when the clock hits midnight, you'll still have to wait out your current timer. You'll sense what's going on around you when you're petrified just as well as you would normally, but will appear to the rest to the rest of the world as a completely immobile statue. Physical damage done to your stone form will be healed when you reform, but mental damage won't.

If you're completely unable to orgasm due to the effects of Pleasure Respecification Curses, this will instead turn you to stone for a random 2 hour, non-sleeping period each day.

Thanks to the effects of the Shifting Obelisk, instead of being turned to stone you'll suffer sleep paralysis, which leaves you unable to move your body. Additional orgasms experienced while paralysed do not increase the timer.`;
	static picture = 'Curses/takenforgranite.png';
	static type = 'none';
	constructor() {
		super('Taken for Granite', 'none');
	}
}
setup.allCurses.TakenForGranite = new TakenForGranite()
State.variables.curse110 = setup.allCurses.TakenForGranite
window.TakenForGranite = TakenForGranite
setup.curseArray.push(TakenForGranite)

class DoubleTrouble extends Curse {
	static corruption = 60;
	static curseName = 'Double Trouble';
	static description = `You have a twin now! This requires some explanations.

They look near-identical to you, are near-identical genetically, and have all the same Curses you've picked, but can optionally have the opposite genitals. The rest the world, including relatives and companions, will recall the both of you having always been twins, and having ventured down into the Abyss together. @@.italic;They@@ will remember a history where they ventured down on their own (with any companions), and where @@.italic;you@@ appeared after they took this Curse. For all you know, they could be right! (You'll find all the items you remember carrying down here on the ground between the two of you.) They could theoretically choose different Curses than you do from here on, but they have very similar tastes to you, so they probably won't.

They'll need to eat too, so you should be @@.italic;doubling@@ the number of resources you consume each day. I really don't recommend trying to betray them or abuse them for gain, or trying to set them up as any kind of "dump stat character" - this is @@.italic;you@@ we're talking about here, kind of, so your odds with any scheme would be at most 50/50.

Mechanically, you can consider them as a second avatar of "you" for most purposes - for example, they offer no additional uses of the Gossamery Scales, Icon of Mercy will remove the same Curse from you both simultaneously, Ring of the Devourer will give absorbed powers to both of you, Relics will deduct from both of your corruptions regardless of who picks it up, and so on. They offer a potential gameplay benefit in splitting up, providing a hand in carrying things, or fighting, but no other intrinsic mechanical benefits.

You might be disinclined to trust them in light of some other features of this layer, but this one's not one of @@.italic;them@@; they're genuinely in the same boat as you. At least so long as they don't get captured by an Inanis Ego - their conversion conditions are the same as yours.`;
	static descriptionMitigated = `You have a twin now! This requires some explanations.

They look near-identical to you, are near-identical genetically, and have all the same Curses you've picked, but can optionally have the opposite genitals. The rest the world, including relatives and companions, will recall the both of you having always been twins, and having ventured down into the Abyss together. @@.italic;They@@ will remember a history where they ventured down on their own (with any companions), and where @@.italic;you@@ appeared after they took this Curse. For all you know, they could be right! (You'll find all the items you remember carrying down here on the ground between the two of you.) They could theoretically choose different Curses than you do from here on, but they have very similar tastes to you, so they probably won't.

They'll need to eat too, so you should be @@.italic;doubling@@ the number of resources you consume each day. I really don't recommend trying to betray them or abuse them for gain, or trying to set them up as any kind of "dump stat character" - this is @@.italic;you@@ we're talking about here, kind of, so your odds with any scheme would be at most 50/50.

Mechanically, you can consider them as a second avatar of "you" for most purposes - for example, they offer no additional uses of the Gossamery Scales, Icon of Mercy will remove the same Curse from you both simultaneously, Ring of the Devourer will give absorbed powers to both of you, Relics will deduct from both of your corruptions regardless of who picks it up, and so on. They offer a potential gameplay benefit in splitting up, providing a hand in carrying things, or fighting, but no other intrinsic mechanical benefits.

You might be disinclined to trust them in light of some other features of this layer, but this one's not one of @@.italic;them@@; they're genuinely in the same boat as you. At least so long as they don't get captured by an Inanis Ego - their conversion conditions are the same as yours.

Thanks to the effects of the Shifting Obelisk, you will have a mental bond with your twin. You will always be able to tell roughly what they're thinking, you can tell when the other is in pain or emotional distress and you share each other's happiness and joy. If you have sex with your twin, you'll both feel each other's sensations in addition to your own and you'll always come together.`;
	static picture = 'Curses/doubletrouble.png';
	static type = 'none';
	/**
	 * @param {string} twinName
	 * @param {'inverted' | 'same'} twinType
	 */
	constructor(twinName = 'Nono', twinType = 'same') {
		super('Double Trouble', 'none');
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
	static corruption = 80;
	static curseName = 'Conjoined';
	static description = `Pick one of your hired companions, or your twin from the Double Trouble Curse if you took it. You and that person are now conjoined, either from the hip down, chest down, or simply being two heads sharing a body. Separation would be fatal for both of you even before considering Curse rebound effects. Your conjoined body will not have the "purity gene", and will slowly take on the effects of any Curses you have (though they will be less pronounced on the other person's half if they don't have those same Curses.)

You each control half of your shared body, and movement will be very difficult. Add 1 day to all travel times down here. If you're conjoined to a companion, any physical skills will probably be rendered useless by the fusion, and they'll probably be extremely freaked out, with morale at an all time low. If you're conjoined with your twin, they'll probably be cool with it, though. They're just as okay with it as you are.

@@.bold;This Curse and Double Trouble are unique in that they cannot be stored with Managed Misfortune, or removed, transferred or copied with any Wonders.@@`;
	static descriptionMitigated = `Pick one of your hired companions, or your twin from the Double Trouble Curse if you took it. You and that person are now conjoined, either from the hip down, chest down, or simply being two heads sharing a body. Separation would be fatal for both of you even before considering Curse rebound effects. Your conjoined body will not have the "purity gene", and will slowly take on the effects of any Curses you have (though they will be less pronounced on the other person's half if they don't have those same Curses.)

You each control half of your shared body, and movement will be very difficult. Add 1 day to all travel times down here. If you're conjoined to a companion, any physical skills will probably be rendered useless by the fusion, and they'll probably be extremely freaked out, with morale at an all time low. If you're conjoined with your twin, they'll probably be cool with it, though. They're just as okay with it as you are.

Thanks to the effects of the Shifting Obelisk, you can choose to temporarily meld your minds. This will give you perfect coordination and allow you to control your entire body as one person. Your joined priorities and personality will be a mix of the two original ones. In a situation where the two of you would strongly disagree on something, the joining is interrupted. If you have a pleasure respecification Curse, masturbation using the other half's hands will count as sex and using your own will count as masturbation. Masturbating while melded together counts as both.

@@.bold;This Curse and Double Trouble are unique in that they cannot be stored with Managed Misfortune, or removed, transferred or copied with any Wonders.@@`;
	static picture = 'Curses/conjoined.png';
	static type = 'handicap';
	constructor() {
		super('Conjoined', 'handicap');
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
	static corruption = 60;
	static curseName = 'Libido Reinforcement G';
	static description = `Gives one level of the Libido Reinforcement Curse. I hope your standards aren't too high, or you might be in for a bit of frustration.`;
	static descriptionMitigated = `Gives one level of the Libido Reinforcement Curse. I hope your standards aren't too high, or you might be in for a bit of frustration.\n\nThanks to the effects of the Shifting Obelisk you can shift between levels of Libido Reinforcement. By taking higher levels than the "natural" level your curses would give you for some time, you can gain a libido "debt" which allows you to go below the "natural" level for an equivalent period.`;
	static picture = 'Curses/libidoreinforcementG.png';
	static type = 'libido';
	constructor() {
		super('Libido Reinforcement G', 'libido');
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
	static corruption = 55;
	static curseName = 'Gender Reversal G';
	static description = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Whether you're going for the trap/reverse trap look or going all the way, I'm sure you'll look great!`;
	static descriptionMitigated = `Gives one level of the Gender Reversal Curse, causing your body's apparent gender to gradually change. Whether you're going for the trap/reverse trap look or going all the way, I'm sure you'll look great!\n\nThanks to the effects of the Shifting Obelisk you can choose how to distribute these changes, opting e.g. for a more masculine body shapes but a more feminine voice or vice versa. On average your apparent gender must still match the curse level. Also makes it more natural for you to act in ways befitting your new gender. At levels above 5, the curse will make your personality more masculine/feminine, but following your ideal notion of masculinity or femininity rather than the most stereotypical.`;
	static picture = 'Curses/genderreversalG.png';
	static type = 'gender';
	constructor() {
		super('Gender Reversal G', 'gender');
	}

	changeGender(character, prevGender) {
		return prevGender + (character.osex === 'male' ? 1 : -1);
	}
}
setup.allCurses.GenderReversalG = new GenderReversalG()
State.variables.curse114 = setup.allCurses.GenderReversalG
window.GenderReversalG = GenderReversalG
setup.curseArray.push(GenderReversalG)

class AssetRobustnessG extends Curse {
	static corruption = 80;
	static curseName = 'Asset Robustness G';
	static description = `Grows your boobs by about 32 cup sizes and/or increases your penis size by about 80cm (32in), depending on what's applicable. This is simply ridiculous.`;
	static descriptionMitigated = `Grows your boobs by about 32 cup sizes and/or increases your penis size by about 80cm (32in), depending on what's applicable. This is simply ridiculous.\n Thanks to the effects of the Shifting Obelisk, weight and other physical properties of your assets will be adjusted to minimise the discomfort and inconvenience of their increased size and you can adjust their properties (such as shape, weight, elasticity...) within reasonable human-like bounds, but not to reduce their overall size.`;
	static picture = 'Curses/assetrobustnessG.png';
	static type = 'gender';
	constructor() {
		super('Asset Robustness G', 'gender');
	}

	static get incompatibilities() {
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
	static corruption = 140;
	static curseName = 'Literalization';
	static description = `This Curse is unique among all other Curses of the Abyss in that it can only be selected if you have certain prerequisite Curses. It takes some of the changes built up by the other Curses and completely removes all vestiges of your humanoid form, turning you into a true beast. You may select to be transformed into one of the options below if you already have all the prerequisite Curses. All your other Curses will now apply to your new form in strange and interesting ways.
1) Literally a non-human mammal: Fluffy Ears, Fluffy Tail, Maximum Fluff
2) Literally a quadruped reptile or dragon: Lingual Leviathan, Tipping the Scales, Reptail
3) Literally an insect or arachnid: Carapacian, Hemospectrum, Minish-ish
4) Literally a plant (not recommended): Flower Power, Cellulose, Chlorophyll
5) Literally a twisted, hellish, conventionally unsexy mythological demon: Horny, Drawing Spades
6) Literally a fish (not recommended): Seafolk
7) Literally a tentacle beast, identical to those of earlier layers: Tickly Tentacles, A Mouthful`;
	static descriptionMitigated = `This Curse is unique among all other Curses of the Abyss in that it can only be selected if you have certain prerequisite Curses. It takes some of the changes built up by the other Curses and completely removes all vestiges of your humanoid form, turning you into a true beast. You may select to be transformed into one of the options below if you already have all the prerequisite Curses. All your other Curses will now apply to your new form in strange and interesting ways.
1) Literally a non-human mammal: Fluffy Ears, Fluffy Tail, Maximum Fluff
2) Literally a quadruped reptile or dragon: Lingual Leviathan, Tipping the Scales, Reptail
3) Literally an insect or arachnid: Carapacian, Hemospectrum, Minish-ish
4) Literally a plant (not recommended): Flower Power, Cellulose, Chlorophyll
5) Literally a twisted, hellish, conventionally unsexy mythological demon: Horny, Drawing Spades
6) Literally a fish (not recommended): Seafolk
7) Literally a tentacle beast, identical to those of earlier layers: Tickly Tentacles, A Mouthful
Thanks to the effects of the Shifting Obelisk, you are able to naturally take on traits and behaviors of your new form. Further, you won't age and if wounded or damaged you will always return to an ideal state for your new form, even regrowing missing limbs. You are able to thrive even in environments which your new form would not usually be adapted to. Your regenerating abilities mean that, although you're not immortal, you'll only die to extreme force — complete destruction of your brain or multiple internal organs, though you can still feel hunger, pain etc. (unless another curse or relic is helping with that). You can also change into other versions of your shape, e.g. switch between breeds of cats.`;
	static picture = 'Curses/literalization.png';
	static type = 'none';
	constructor() {
		super('Literalization', 'none');
	}
}
setup.allCurses.Literalization = new Literalization()
State.variables.curse116 = setup.allCurses.Literalization
window.Literalization = Literalization
setup.curseArray.push(Literalization)

class ConsentDissent extends Curse {
	static corruption = 120;
	static curseName = 'Consent Dissent';
	static description = `Every manner of sexual encounter you experience from this point forward will be fated to be rape. Whether you're being held down by someone stronger than you and forced into it against your will, or terrorizing some poor innocent person and scarring them for life, you will never have happy, loving, consensual sex again. Doesn't actually affect the rate of success for you being a victim of or committing rape (it doesn't force you to get raped or become a rapist), but it will make attempts of the former more common. If taken with the Barter System Curse, nobody will agree to sex in exchange for giving you things, and you'll probably have to turn to a life of crime just to survive. If you're thinking you can fool the Abyss with roleplay, where you or the other person's actual consent depart from what is stated, you can try it, but don't be shocked if the Abyss turns the tables on you. Moral and legal conduct on your part will probably require either celibacy, or some way to fulfill your desires without trying to have sex with others.`;
	static descriptionMitigated = `Every manner of sexual encounter you experience from this point forward will be fated to be rape. Whether you're being held down by someone stronger than you and forced into it against your will, or terrorizing some poor innocent person and scarring them for life, you will never have happy, loving, consensual sex again. Doesn't actually affect the rate of success for you being a victim of or committing rape (it doesn't force you to get raped or become a rapist), but it will make attempts of the former more common. If taken with the Barter System Curse, nobody will agree to sex in exchange for giving you things, and you'll probably have to turn to a life of crime just to survive. If you're thinking you can fool the Abyss with roleplay, where you or the other person's actual consent depart from what is stated, you can try it, but don't be shocked if the Abyss turns the tables on you. Moral and legal conduct on your part will probably require either celibacy, or some way to fulfill your desires without trying to have sex with others.\n\nThanks to the effects of the Shifting Obelisk, you always instinctively know the location of at least one individual with the two Submission Rectification Curses and one with the PowerDom Curse. The former will not be able to resist you if you try to rape them, nor report you to the law. The latter will be happy to rape you to your heart's content (and probably more).`;
	static picture = 'Curses/consentdissent.png';
	static type = 'none';
	constructor() {
		super('Consent Dissent', 'none');
	}
}
setup.allCurses.ConsentDissent = new ConsentDissent()
State.variables.curse117 = setup.allCurses.ConsentDissent
window.ConsentDissent = ConsentDissent
setup.curseArray.push(ConsentDissent)

class TheMaxim extends Curse {
	static corruption = 110;
	static curseName = 'The Maxim';
	static description = `Pick one: urethra, vaginal canal, anus. You now have a larval Chasm Crawler, a parasite unique to the Abyss, squirming around up there. It feeds off your bodily fluids, and will frequently directly stimulate your most sensitive areas in order to get you to produce more. It is not a gentle creature, and it might get a bit violent with your bits if it decides you're not producing enough. After a few weeks, with a body about five times the size it started with, its life cycle will be complete, and it will burst into hundreds of new larval Chasm Crawlers for you to expel. At least one Chasm Crawler will always remain within you, ready to begin the cycle anew. I recommend cooperating with it and keeping it happy. Chasm Crawlers are very intelligent and knowledgeable about anatomy, and can quickly (though not painlessly) worm their way up and take direct control of your brain if your actions threaten them. It may be possible to reach a reasonable understanding with a Chasm Crawler. They're not kind, and not particularly trustworthy, but their intelligence causes them to value a cooperative host.`;
	static descriptionMitigated = `Pick one: urethra, vaginal canal, anus. You now have a larval Chasm Crawler, a parasite unique to the Abyss, squirming around up there. It feeds off your bodily fluids, and will frequently directly stimulate your most sensitive areas in order to get you to produce more. It is not a gentle creature, and it might get a bit violent with your bits if it decides you're not producing enough. After a few weeks, with a body about five times the size it started with, its life cycle will be complete, and it will burst into hundreds of new larval Chasm Crawlers for you to expel. At least one Chasm Crawler will always remain within you, ready to begin the cycle anew. I recommend cooperating with it and keeping it happy. Chasm Crawlers are very intelligent and knowledgeable about anatomy, and can quickly (though not painlessly) worm their way up and take direct control of your brain if your actions threaten them. It may be possible to reach a reasonable understanding with a Chasm Crawler. They're not kind, and not particularly trustworthy, but their intelligence causes them to value a cooperative host.\n\nThanks to the effects of the Shifting Obelisk, you can communicate with it easily and will be able to find an accord in which you allow it to keep you constantly aroused and agree to release its brood in places where they'll be able to find new hosts easily, and in exchange it will only take you all the way to orgasm when not in public and cooperate to keep you out of danger. The Crawler will appreciate it if you take the Leaky Curse. Your body will also adapt to the need to constantly produce fluids and do so without further strain or damage.`;
	static picture = 'Curses/themaxim.png';
	static type = 'none';
	constructor(location = 'anus') {
		super('The Maxim', 'none');
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
	static corruption = 115;
	static curseName = 'Adverse Possession';
	static description = `Your body is now home to a malevolent spirit that perished in the Abyss long ago, twisted by the ages and the Miasma. It is not your friend. Every other 24-hour period, it will gain full control of your body, with you sitting in the backseat, aware of and feeling everything it does, but being unable to stop any of it. This spirit will have sex with people you hate, put you in awful, humiliating situations, and try to ruin your day any way it can think of. It probably won't permanently ruin your life, since it does share your body, but it absolutely will not give you a fun time. It won't hamper your efforts to climb out of the Abyss, since it wants out of here too, but it'll be playing by its own rules. Why is it doing this? It wants full control. If you decide to give up and hand over full control of your body permanently, it will become noticeably gentler, though its tastes still differ enough from yours that you'll see and feel your body doing many things you'd rather not (the reverse, getting it to give up control, is 100% impossible). You'll have a long time to learn to love it, though.`;
	static descriptionMitigated = `Your body is now home to a malevolent spirit that perished in the Abyss long ago, twisted by the ages and the Miasma. It is not your friend. Every other 24-hour period, it will gain full control of your body, with you sitting in the backseat, aware of and feeling everything it does, but being unable to stop any of it. This spirit will have sex with people you hate, put you in awful, humiliating situations, and try to ruin your day any way it can think of. It probably won't permanently ruin your life, since it does share your body, but it absolutely will not give you a fun time. It won't hamper your efforts to climb out of the Abyss, since it wants out of here too, but it'll be playing by its own rules. Why is it doing this? It wants full control. If you decide to give up and hand over full control of your body permanently, it will become noticeably gentler, though its tastes still differ enough from yours that you'll see and feel your body doing many things you'd rather not (the reverse, getting it to give up control, is 100% impossible). You'll have a long time to learn to love it, though.\nThe spirit is another person, not by itself part of the curse, so it is not affected by The Shifting Obelisk, but it does let you easily convince people that you have an uncontrollable split personality, so they won't attribute the spirit's actions to you and vice-versa. Police and other officials will be accommodating and find ways to deal with issues in a humane manner that avoids punishing you for the spirit's actions where possible (and vice-versa). If you choose to give up your body you'll retain a limited bit of control: you'll be able to arouse or turn off the body and subtly influence the spirit's sexual preferences. You'll also continue being able to communicate with it and may be able to use this to negotiate with it. It will not and cannot give back control, but you may be able to get it to fulfill some of your goals. Or you can just make it have a lot of sex and enjoy as best you can.`;
	static picture = 'Curses/adversepossession.png';
	static type = 'none';
	constructor() {
		super('Adverse Possession', 'none');
	}

}
setup.allCurses.AdversePossession = new AdversePossession()
State.variables.curse119 = setup.allCurses.AdversePossession
window.AdversePossession = AdversePossession
setup.curseArray.push(AdversePossession)

class Erased extends Curse {
	static corruption = 100;
	static curseName = 'Erased';
	static description = `Completely erases your old identity from the world. Nobody will have any memory of you going down into the Abyss, or who you are, and there will be no records, no citizenship, no property in your name - it will be as if you had never existed up there to begin with. Your own memories will be quite fuzzy, too: your presumed name and appearance before you came down are gone forever, never retrievable, and you'll have vague memories of your old life, but they'll be too fuzzy and feel unreal enough that you'll begin to doubt them too. Memories after you entered the Abyss will be unaffected. Companions will be disoriented at first, but should be able to piece things together since they've been down here with you this long. Doesn't erase debt to Outset Town's shop.`;
	static descriptionMitigated = `Completely erases your old identity from the world. Nobody will have any memory of you going down into the Abyss, or who you are, and there will be no records, no citizenship, no property in your name - it will be as if you had never existed up there to begin with. Your own memories will be quite fuzzy, too: your presumed name and appearance before you came down are gone forever, never retrievable, and you'll have vague memories of your old life, but they'll be too fuzzy and feel unreal enough that you'll begin to doubt them too. Memories after you entered the Abyss will be unaffected. Companions will be disoriented at first, but should be able to piece things together since they've been down here with you this long. Doesn't erase debt to Outset Town's shop.\n\nThanks to the effects of the Shifting Obelisk, you find yourself able to fit in anywhere. You can easily take on the mannerisms of those around you and people tend to gloss over physical differences like skin color. You'll usually find a way to weasel yourself out of problems concerning your lack of official papers or recorded past.`;
	static picture = 'Curses/erased.png';
	static type = 'none';
	constructor() {
		super('Erased', 'none');
	}
}
setup.allCurses.Erased = new Erased()
State.variables.curse120 = setup.allCurses.Erased
window.Erased = Erased
setup.curseArray.push(Erased)

class TicklyTentacles extends Curse {
	static corruption = 10;
	static curseName = 'Tickly Tentacles';
	static description = `Grow one big, meaty tendril of a tentacle from somewhere on your body. Did you know that octopi have two thirds of their neurons in their tentacles, giving them a distributed nervous system fundamentally different from human brains? You'll have some degree of control over your tentacles, but they decide many of their actions on their own, and you may not always agree with their decisions. They'll often abuse and exploit your body — and perhaps the bodies of others in entirely inappropriate situations — in lewd ways. Individually, they may not be as smart as you, but collectively, all bets are off.`;
	static descriptionMitigated = `Grow one big, meaty tendril of a tentacle from somewhere on your body. Did you know that octopi have two thirds of their neurons in their tentacles, giving them a distributed nervous system fundamentally different from human brains? You'll have some degree of control over your tentacles, but they decide many of their actions on their own, and you may not always agree with their decisions. They'll often abuse and exploit your body — and perhaps the bodies of others in entirely inappropriate situations — in lewd ways. Individually, they may not be as smart as you, but collectively, all bets are off.\n\nThanks to the effects of the Shifting Obelisk, you can negotiate with them. The tentacles desire violating you and others. As long as you let them do that enough, they'll cooperate at other times. Since they are part of you, they'll also act to protect you if you're in danger, e.g. while sleeping.`;
	static picture = 'Curses/ticklytentacles.png';
	static type = 'none';
	constructor() {
		super('Tickly Tentacles', 'none');
	}

	get maximum() {
		return 10;
	}

	addTentacle(prevTentacles) {
		return prevTentacles + 1;
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 2;
	}
}
setup.allCurses.TicklyTentacles = new TicklyTentacles()
State.variables.curse121 = setup.allCurses.TicklyTentacles
window.TicklyTentacles = TicklyTentacles
setup.curseArray.push(TicklyTentacles)

class Eyescream extends Curse {
	static corruption = 5;
	static curseName = 'Eye-scream';
	static description = `Grow one large additional eye in a spot where there really shouldn't be one. It can receive sensory information, but it's not nearly as high-fidelity or useful as the two eyes you were born with. This is compounded with the 20/20000000... Curse, which would leave the eyes blurred enough to be functionally useless...I don't think they make glasses for your special eyes, though it's probably not impossible that someone with great skill could come up with something.`;
	static descriptionMitigated = `Grow one large additional eye in a spot where there really shouldn't be one. It can receive sensory information, but it's not nearly as high-fidelity or useful as the two eyes you were born with. This is compounded with the 20/20000000... Curse, which would leave the eyes blurred enough to be functionally useless...I don't think they make glasses for your special eyes, though it's probably not impossible that someone with great skill could come up with something.\n\nThanks to the effects of the Shifting Obelisk, the additional eye(s) become good enough for most everyday tasks and your brain changes to effortlessly process all the new sensory information. Each eye also specialises in something (e.g. night vision, seeing outside the visible spectrum, long distance vision...) and becomes strong enough to allow you to continue regular behaviors (like wearing clothes and walking around) without damaging or irritating it (even if it's below your clothes or on your legs).`;
	static picture = 'Curses/eye-scream.png';
	static type = 'none';
	constructor() {
		super('Eye-scream', 'none');
	}

	get maximum() {
		return 20;
	}

	addExtraEye(prevExtraEyes) {
		return prevExtraEyes + 1;
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 1;
	}
}
setup.allCurses.Eyescream = new Eyescream()
State.variables.curse122 = setup.allCurses.Eyescream
window.Eyescream = Eyescream
setup.curseArray.push(Eyescream)

class AMouthful extends Curse {
	static corruption = 20;
	static curseName = 'A Mouthful';
	static description = `Grow one large, grinning mouth somewhere on your body where there really shouldn't be one. Will take on any related Curses that would affect your original mouth. I really recommend not looking too deeply into them to figure out how, but food that is put into them will reach your stomach.`;
	static descriptionMitigated = `Grow one large, grinning mouth somewhere on your body where there really shouldn't be one. Will take on any related Curses that would affect your original mouth. I really recommend not looking too deeply into them to figure out how, but food that is put into them will reach your stomach.\n\nThanks to the effects of the Shifting Obelisk, the extra mouth(s) can close almost seamlessly, though anybody looking at you naked for some time will still notice that something's wrong, though they might not be able to put their finger on what it is exactly.`;
	static picture = 'Curses/datmouf.png';
	static type = 'none';
	constructor() {
		super('A Mouthful', 'none');
	}

	get maximum() {
		return 5;
	}

	addMouth(prevExtraMouths) {
		return prevExtraMouths + 1;
	}

	inhumanise(prevInhumanity) {
		return prevInhumanity + 1;
	}
}
setup.allCurses.AMouthful = new AMouthful()
State.variables.curse123 = setup.allCurses.AMouthful
window.AMouthful = AMouthful
setup.curseArray.push(AMouthful)

class BelowTheVeil extends Curse {
	static corruption = 200;
	static curseName = 'Below the Veil';
	static picture = 'Curses/belowtheveil.png';
	static type = 'none';
	constructor() {
		super('Below the Veil', 'none');
	}

	static get description() {
		return `You have touched the void and tasted just a hint of the ${Creepify.encode("Truth")}, and you will never be the same. Your appearance up until now has merely been a mask, one that is now paper-thin, quickly eroded under the gaze of others. Anyone observing you in any way will feel a primal fear creep into them, quickly replaced by what can only be called insanity. This will make any kind of constructive interaction with others effectively impossible, and traveling with any companions will be completely impractical — even if you somehow managed to get them to stay with you, your presence would quickly render them useless.`;
	}
	static get descriptionMitigated() {
		return `You have touched the void and tasted just a hint of the ${Creepify.encode("Truth")}, and you will never be the same. Your appearance up until now has merely been a mask, one that is now paper-thin, quickly eroded under the gaze of others. Anyone observing you in any way will feel a primal fear creep into them, quickly replaced by what can only be called insanity. This will make any kind of constructive interaction with others effectively impossible, and traveling with any companions will be completely impractical — even if you somehow managed to get them to stay with you, your presence would quickly render them useless.\n\nThanks to the effects of the Shifting Obelisk, you can add other effects in an aura around you, affecting even those not looking around you. You could make the people feel worship towards you (only to recoil if they do manage to lay eyes on you) and form a cult (though you wouldn't be very involved in it, unless you want everybody to quickly get raving mad), or simply make everybody super aroused and cause spontaneous orgies wherever you go (which, again, you couldn't participate in yourself). Some of the people who go mad because of you will start worshipping and attempting to summon a powerful entity from ███████████. If there are enough of them, they might even succeed... nobody can foresee what that will mean for you and the world, but until then, the being will protect you — concerted attempts to kill you because of your nature are doomed to fail as key personnel go missing or mad, equipment breaks and fate conspires against them.`;
	}
	inhumanise(prevInhumanity) {
		return prevInhumanity + 2;
	}
}
setup.allCurses.BelowTheVeil = new BelowTheVeil()
State.variables.curse124 = setup.allCurses.BelowTheVeil
window.BelowTheVeil = BelowTheVeil
setup.curseArray.push(BelowTheVeil)

class PrincessProtocol extends Curse {
	static corruption = 25;
	static curseName = 'Princess Protocol';
	static description = `Transforms you into the eternal damsel-in-distress. You'll find yourself mysteriously landing in situations that demand rescuing, and you'll instinctively play the role of the helpless victim. Perhaps you'll end up bound and gagged, trapped in a tower, or lost in a labyrinth, but rest assured, a hero will always appear to save the day. No matter the circumstances, you will be unable to extricate yourself without aid. Even if you previously possessed skills to help in such situations, you'll discover them mysteriously inaccessible when you're in distress.

You will also have a new name, 'Princess'. Others will find it impossible to call you anything else, and you will feel a deep internal compulsion to respond to it.`;
	static descriptionMitigated = `Transforms you into the eternal damsel-in-distress. You'll find yourself mysteriously landing in situations that demand rescuing, and you'll instinctively play the role of the helpless victim. Perhaps you'll end up bound and gagged, trapped in a tower, or lost in a labyrinth, but rest assured, a hero will always appear to save the day. No matter the circumstances, you will be unable to extricate yourself without aid. Even if you previously possessed skills to help in such situations, you'll discover them mysteriously inaccessible when you're in distress.

You will also have a new name, 'Princess'. Others will find it impossible to call you anything else, and you will feel a deep internal compulsion to respond to it.

Thanks to the effects of the Shifting Obelisk, your ideal prince will always come to your rescue. They never stick around for long before going off to "rescue other damsels", but they unfailingly return whenever you're in serious distress. They are the most ideal hero you can imagine to come to your aid (this also extends to their gender. "Prince" doesn't mean they have to be a man, or if they are that they must have a penis). Whenever you ask about their past or what they do when they're not with you, you get an answer that's slightly different and incompatible with the one you got last time you asked, but they always seem perfectly honest.`;
	static picture = 'Curses/princessprotocol.png';
	static type = 'none';
	constructor() {
		super('Princess Protocol', 'none');
	}
}
setup.allCurses.PrincessProtocol = new PrincessProtocol()
State.variables.curse125 = setup.allCurses.PrincessProtocol
window.PrincessProtocol = PrincessProtocol
setup.curseArray.push(PrincessProtocol)

class GestationJumpstart extends Curse {
	static corruption = 35;
	static curseName = 'Gestation Jumpstart';
	static description = `Time's ticking faster for your womb! Whenever you're impregnated, the process accelerates dramatically: the first two trimesters each only take a week. By the end of the second week, you'll find yourself in the third trimester, bearing the full weight of an almost-due pregnancy. A rapid journey that can be a whirlwind of emotions and physical changes. It's a wild ride that requires the bearer to adapt quickly. You can only take this Curse if you have a womb.`;
	static descriptionMitigated = `Time's ticking faster for your womb! Whenever you're impregnated, the process accelerates dramatically: the first two trimesters each only take a week. By the end of the second week, you'll find yourself in the third trimester, bearing the full weight of an almost-due pregnancy. A rapid journey that can be a whirlwind of emotions and physical changes. It's a wild ride that requires the bearer to adapt quickly. You can only take this Curse if you have a womb.\n\nThanks to the effects of the Shifting Obelisk, you have the power to somewhat regulate the speed of the pregnancy progression, either hastening it or delaying it by up to a factor of two. You can also gain insights about the fetus's development and health during the rapid gestation period. The birthing process becomes safer and relatively painless.`;
	static picture = 'Curses/gestationjumpstart.png';
	static type = 'none';
	constructor() {
		super('Gestation Jumpstart', 'none');
	}
	static get incompatibilities() {
		return ['Absolute Birth Control']
	}
}
setup.allCurses.GestationJumpstart = new GestationJumpstart()
State.variables.curse126 = setup.allCurses.GestationJumpstart
window.GestationJumpstart = GestationJumpstart
setup.curseArray.push(GestationJumpstart)

class BimboBabble extends Curse {
    static corruption = 35;
    static curseName = 'Bimbo Babble';
    static description = `Your speech patterns dramatically shift to resemble those of a stereotypical bimbo/himbo. You'll find yourself frequently using filler words like "like," "totally," and "um," as well as valley girl inflections. Your vocabulary becomes more limited, focusing on simple words and phrases. Complex ideas become difficult to articulate, often resulting in confused rambling. This affects all forms of communication, including writing and texting.`;
    static descriptionMitigated = `Your speech patterns dramatically shift to resemble those of a stereotypical bimbo/himbo. You'll find yourself frequently using filler words like "like," "totally," and "um," as well as valley girl inflections. Your vocabulary becomes more limited, focusing on simple words and phrases. Complex ideas become difficult to articulate, often resulting in confused rambling. This affects all forms of communication, including writing and texting.\n\nThanks to the effects of the Shifting Obelisk, you can temporarily suppress this effect for important conversations or when explaining complex topics. You're also able to understand complex ideas and vocabulary even if you can't express them easily. Additionally, you gain an uncanny ability to use your new speech patterns to your advantage in social situations, often appearing more charming and disarming to others. Your writing remains affected, but you can use voice-to-text software to partially bypass the curse's effects on written communication.`;
    static picture = 'Curses/bimbobabble.png';
    static type = '';
    constructor() {
        super('Bimbo Babble', '');
    }
}
setup.allCurses.BimboBabble = new BimboBabble()
State.variables.curse127 = setup.allCurses.BimboBabble
window.BimboBabble = BimboBabble
setup.curseArray.push(BimboBabble)