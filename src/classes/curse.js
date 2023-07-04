/* global CharEvent, AgeEvent */

/**
 * @typedef {question: string, answerType: "string" | 'number' | string[], answerField: string} curseQuestion
 */

/* exported Curse */
class Curse extends CharEvent {
    /**
     * Constructs a new curse.
     * @param {string} name The name of the curse.
     * @param {number} corruption The corruption gain of the curse.
     * @param {string} pic The picture of the curse.
     * @param {string} type The type of events this curse creates.
     * @param {string} appDesc The description that gets added to the player's appearance when they take this curse.
     * 'none' if the curse has no mechanical impact and 'other' if the event is curse-specific,
     * meaning no other events have similar effects (for example the double penis curse).
     */
    constructor(name, corruption, pic, type = 'none', appDesc = '') {
        super(name, type)
        if (this.constructor.name === 'Curse') console.error('Raw Curse constructed');
        this.corruption = corruption;
        this.pic = pic;
        this.appDesc = appDesc;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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
        return Reflect.construct(this.constructor, [this.name, this.corruption, this.pic, this.type, this.appDesc])
            ._init(this._internalState());
    }

    /**
     * Creates a sugarcube revivable json object from which this curse can be revived.
     * @returns {[]} The revivable JSON.
     */
    toJSON() {
        return JSON.reviveWrapper(
            `new ${this.constructor.name}(${this._customisationOptions().map(v => JSON.stringify(v)).join(', ')})._init($ReviveWrapper$)`,
            this._internalState()
        );
    }

    // /**
    //  * Returns the set of customisation questions which the player must answer for this curse.
    //  * Each question has a `question`, the text of the question, an `answerType` which is 'string' if the answer is a
    //  * string,
    //  * 'number' if the answer is a number or a list of strings if it's a multiple-choice question, and an `answerField`
    //  * which is the name of the field on the curse which should be set to the answer.
    //  * @returns {curseQuestion[]}
    //  */
    // get questions() {
    //     return []
    // }

    get variantPassage() {
        return `${this.name} Variant`;
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
State.variables.curse1 = new LibidoReinforcementA();

class GenderReversalA extends Curse {
    constructor() {
        super('Gender Reversal A', 15, 'Curses/genderreversalA.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse2 = new GenderReversalA();

class AssetRobustnessA extends Curse {
    constructor() {
        super('Asset Robustness A', 10, 'Curses/assetrobustnessA.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**0; // 1 cup size / 2cm
    }
}
State.variables.curse3 = new AssetRobustnessA();

class ClothingRestrictionA extends Curse {
    constructor() {
        super('Clothing Restriction A', 30, 'Curses/clothingrestrictionA.png', 'none',
              'You cannot bring yourself to wear any accessories anywhere on your body. ');
    }
}
State.variables.curse4 = new ClothingRestrictionA();

class ShrunkenAssets extends Curse {
    constructor() {
        super('Shrunken Assets', 75, 'Curses/shrunkenassets.png', 'gender');
    }

    changeBreasts(prevBreasts) {
        return Math.max(prevBreasts, 1);
    }

    changePenis(prevPenis) {
        return Math.max(prevPenis, 1);
    }
}
State.variables.curse5 = new ShrunkenAssets();

class HairRemoval extends Curse {
    constructor() {
        super('Hair Removal', 5, 'Curses/hairremoval.png', 'none',
              '<<if !$playerCurses.some(e => e.name === "Maximum Fluff")>>Your entire body below your nose is completely hairless and smooth. Your eyebrows also look like they have been carefully trimmed. <</if>>');
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
State.variables.curse6 = new HairRemoval();

class PermaDye extends Curse {
    constructor(hairColor='turquoise') {
        super('Perma-dye', 5, 'Curses/perma-dye.png', 'none');

        this.hairColor = hairColor;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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

    // get questions() {
    //     return [{question: 'What hair color do you prefer?', answer: 'string', answerField: 'hairColor'}]
    // }

}
State.variables.curse7 = new PermaDye();

class FreckleSpeckle extends Curse {
    constructor() {
        super('Freckle Speckle', 10, 'Curses/frecklespeckle.png', 'none',
              'An assortment of freckles are spread over your body. ');
    }
}
State.variables.curse8 = new FreckleSpeckle();

class KnifeEar extends Curse {
    constructor() {
        super('Knife-ear', 20, 'Curses/knifeear.png', '');
    }

    // eslint-disable-next-line no-unused-vars
    changeEars(prevEars) {
        return 'pointed, elfish';
    }
}
State.variables.curse9 = new KnifeEar();

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
}
State.variables.curse10 = new DizzyingHeights();

class IncreasedSensitivity extends Curse {
    constructor() {
        super('Increased Sensitivity', 10, 'Curses/increasedsensitivity.png', 'libido');
    }

    changeLewdness(prevLewdness, character) {
        // both curses increase by 1 if alone, by 3 if together, making for a total of +6 when you have both
        if (character.curses.some(c => c instanceof RefractoryRefactorization)) return prevLewdness + 3
        return prevLewdness + 1;
    }
}
State.variables.curse11 = new IncreasedSensitivity();

class RefractoryRefactorization extends Curse {
    constructor() {
        super('Refractory Refactorization', 10, 'Curses/refractoryrefactorization.png', 'libido');
    }

    changeLewdness(prevLewdness, character) {
        // both curses increase by 1 if alone, by 3 if together, making for a total of +6 when you have both
        if (character.curses.some(c => c instanceof IncreasedSensitivity)) return prevLewdness + 3
        return prevLewdness + 1;
    }
}
State.variables.curse12 = new RefractoryRefactorization();

class LibidoReinforcementB extends Curse {
    constructor() {
        super('Libido Reinforcement B', 25, 'Curses/libidoreinforcementB.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse13 = new LibidoReinforcementB();

class GenderReversalB extends Curse {
    constructor() {
        super('Gender Reversal B', 20, 'Curses/genderreversalB.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse14 = new GenderReversalB();

class AssetRobustnessB extends Curse {
    constructor() {
        super('Asset Robustness B', 15, 'Curses/assetrobustnessB.png', 'none');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**1;
    }
}
State.variables.curse15 = new AssetRobustnessB();

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
State.variables.curse16 = new AgeReductionA();

class FluffyEars extends Curse {
    constructor(earType='furry cat') {
        super('Fluffy Ears', 20, 'Curses/fluffyears.png', 'none');

        this.earType = earType;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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

    // get questions() {
    //     return [{question: 'What type of ears would you like to gain?',
    //         answer: Object.keys(FluffyEars.ears),
    //         // answer: ['Cat', 'Dog', 'Cow', 'Monkey', 'Rabbit', 'Fox', 'Mouse', 'Pig', 'Horse'],
    //         answerField: 'earType'}]
    // }

    // set earType(value) {
    //     if (FluffyEars.ears[value] === undefined) {
    //         console.error(`Fluffy Ears set to invalid ear type ${value}.`);
    //         this._earType = 'furry cat';
    //     } else {
    //         this._earType = FluffyEars.ears[value]
    //     }
    // }
}
// FluffyEars.ears = {
//     'Cat': 'furry cat', 'Dog': 'furry dog', 'Cow': 'furry cow', 'Monkey': 'furry monkey', 'Rabbit': 'furry rabbit',
//     'Fox': 'furry fox', 'Mouse': 'furry mouse', 'Pig': 'pig', 'Horse': 'furry horse',
// };
State.variables.curse17 = new FluffyEars();

class FluffyTail extends Curse {
    constructor(tailType='flowing cat') {
        super('Fluffy Tail', 20, 'Curses/fluffytail.png', 'none');
        this.tailType = tailType;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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

    // get questions() {
    //     return [{question: 'What type of tail would you like to gain?',
    //         answer: Object.keys(FluffyTail.tails),
    //         answerField: 'tailType'}]
    // }
    //
    // set tailType(value) {
    //     if (FluffyTail.tails[value] === undefined) {
    //         console.error(`Fluffy Tail set to invalid tail type ${value}.`);
    //         this._earType = 'flowing cat';
    //     } else {
    //         this._earType = FluffyTail.tails[value]
    //     }
    // }
}
// FluffyTail.tails = {
//     'Cat': 'flowing cat', 'Dog': 'wagging dog', 'Cow': 'lazy cow', 'Monkey': 'prehensile monkey',
//     'Rabbit': 'fluffy rabbit', 'Fox': 'bushy fox', 'Mouse': 'long mouse', 'Pig': 'twisted pig', 'Horse': 'swaying horse'
// }
State.variables.curse18 = new FluffyTail();

class MaximumFluff extends Curse {
    constructor(hairType='cat-furred') {
        super('Maximum Fluff', 30, 'Curses/maximumfluff.png', 'none');
        this.furType = hairType;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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

    changeSkinType(prevSkinType) {
        return super.changeSkinType(prevSkinType);
    }

    get variation() {
        return this.furType;
    }

    set variation(value) {
        console.error('Deprecated variation field used.')
        this.furType = value;
    }

    // get questions() {
    //     return [{question: 'What type of fur would you like to gain?',
    //         answer: Object.keys(MaximumFluff.furs),
    //         answerField: 'furType'}]
    // }
    //
    // set furType(value) {
    //     if (MaximumFluff.furs[value] === undefined) {
    //         console.error(`Maximum fluff set to invalid fur type ${value}.`);
    //         this._furType = 'cat-furred';
    //     } else {
    //         this._furType = FluffyTail.furs[value]
    //     }
    // }
}
// MaximumFluff.furs = {
//     'Cat': 'cat-furred',
//     'Dog': 'dog-furred',
//     'Cow': 'cow-furred',
//     'Monkey': 'monkey-furred',
//     'Rabbit': 'rabbit-furred',
//     'Fox': 'fox-furred',
//     'Mouse': 'mouse-furred',
//     'Pig': 'pig-furred',
//     'Horse': 'horse-furred',
// }
State.variables.curse19 = new MaximumFluff();

class HeatRut extends Curse {
    constructor() {
        super('Heat/Rut', 20, 'Curses/heat.png', 'libido');
    }

    // libido change is implemented as special-purpose code in Character.libido because it requires accessing
    // global variables and only applies to the main character.
    // We might want to change that.
}
State.variables.curse20 = new HeatRut();

class Lightweight extends Curse {
    constructor() {
        super('Lightweight', 0, 'Curses/lightweight.png', 'none',
              'Just a little bit of alcohol turns you into a drunk mess. You\'d better not go out partying without trusted friends nearby. Behavior altering substances in general also have a much stronger effect on you. ');
    }
}
State.variables.curse21 = new Lightweight();

class SexSwitcheroo extends Curse {
    constructor() {
        super('Sex Switcheroo', 30, 'Curses/sexswitcheroo.png', 'gender');
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
State.variables.curse22 = new SexSwitcheroo();

class FutaFun extends Curse {
    constructor() {
        super('Futa Fun', 35, 'Curses/futafun.png', 'gender');
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
State.variables.curse23 = new FutaFun();

class BlushingVirgin extends Curse {
    constructor() {
        super('Blushing Virgin', 25, 'Curses/blushingvirgin.png', 'none',
              'You are very shy about nudity, and even getting undressed while no one is looking already feels a bit embarrassing to you. Sex also feels very embarrassing, no matter how many times you might have done it. ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness - 1;
    }
}
State.variables.curse24 = new BlushingVirgin();

class SubmissivenessRectificationA extends Curse {
    constructor() {
        super('Submissiveness Rectification A', 20, 'Curses/subrectificationA.png', 'libido');
    }

    changeSubDom(prevSubDom) {
        return prevSubDom + 1;
    }
}
State.variables.curse25 = new SubmissivenessRectificationA();

class GenderReversalC extends Curse {
    constructor() {
        super('Gender Reversal C', 20, 'Curses/genderreversalC.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse26 = new GenderReversalC();

class AssetRobustnessC extends Curse {
    constructor() {
        super('Asset Robustness C', 25, 'Curses/assetrobustnessC.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**2; // 4 cup sizes / 8cm
    }
}
State.variables.curse27 = new AssetRobustnessC();

class ClothingRestrictionB extends Curse {
    constructor() {
        super('Clothing Restriction B', 40, 'Curses/clothingrestrictionB.png', 'none',
              'You cannot bring yourself to wear any underwear whatsoever. ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 1;
    }
}
State.variables.curse28 = new ClothingRestrictionB();

class PowerDom extends Curse {
    constructor() {
        super('Power Dom', 25, 'Curses/power dom.png', 'libido',
              'You are never able to sit back and let someone else take charge, neither in life nor in sex. ');
    }

    changeSubDom(prevSubDom) {
        return prevSubDom - 1;
    }
}
State.variables.curse29 = new PowerDom();

class Curse2020 extends Curse {
    constructor() {
        super('20/20000000', 20, 'Curses/20-20.png', 'none',
              'Your sight is pretty terrible, and you are pretty much blind without glasses. Contacts also feel extremely uncomfortable. ');
    }

}
State.variables.curse30 = new Curse2020();

class ComicRelief extends Curse {
    constructor() {
        super('Comic Relief', 25, 'Curses/comicrelief.png', 'none',
              'No one ever seems to take you seriously. You get patronized and talked down to pretty often. ');
    }
}
State.variables.curse31 = new ComicRelief();

class EqualOpportunity extends Curse {
    constructor() {
        super('Equal Opportunity', 25, 'Curses/equaloppurtunity.png', 'none',
              'Gender is really not an issue for you when selecting sexual partners. ');
    }
}
State.variables.curse32 = new EqualOpportunity();

class AbsolutePregnancy extends Curse {
    constructor() {
        super('Absolute Pregnancy', 35, 'Curses/absolutepregnancy.png', 'none',
              'Any and all sex you engage in results in pregnancy. ');
    }
}
State.variables.curse33 = new AbsolutePregnancy();

class AbsoluteBirthControl extends Curse {
    constructor() {
        super('Absolute Birth Control', 40, 'Curses/absolutebirthcontrol.png', 'none',
              'You are completely sterile and cannot have children. ');
    }
}
State.variables.curse34 = new AbsoluteBirthControl();

class WackyWombs extends Curse {
    constructor(wombLocation='throat') {
        super('Wacky Wombs', 20, 'Curses/wackywombs.png', 'gender');
        this._wombLocation = wombLocation;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
     * @returns {[string]} The customisation options, in the same order they are used in the constructor.
     * @protected
     */
    _customisationOptions() {
        return [this._wombLocation];
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

    get variation() {
        return this._wombLocation;
    }

    set variation(value) {
        console.error('Deprecated variation field used.')
        this._wombLocation = value;
    }

    // get questions() {
    //     return [{question: 'What is the location of the womb you would like to add?',
    //         answer: ['throat', 'urethra', 'anus', 'vagina'],
    //         answerField: '_wombLocation'}]
    // }
}
State.variables.curse35 = new WackyWombs();

class Omnitool extends Curse {
    constructor() {
        super('Omnitool', 25, 'Curses/omnitool.png', 'none');
    }
}
State.variables.curse36 = new Omnitool();

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
State.variables.curse37 = new Gooey();

class RainbowSwirl extends Curse {
    constructor(skinColor='pink', eyeColor='pink') {
        super('Rainbow Swirl', 25, 'Curses/rainbowswirl.png', 'none');
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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
State.variables.curse38 = new RainbowSwirl();

class DoublePepperoni extends Curse {
    constructor() {
        super('Double Pepperoni', 20, 'Curses/doublepepperoni.png', 'none',
              'Your nipples and areolae are rather large and puffy. ');
    }

    // correcting minimum breast size is done in character.js (breastCor()) because it has to happen last.
}
State.variables.curse39 = new DoublePepperoni();

class LiteralBlushingVirgin extends Curse {
    constructor() {
        super('Literal Blushing Virgin', 40, 'Curses/literalblushingvirgin.png', 'none',
              'No matter how many times you have sex, the moment it starts, you always forget your previous experiences, and genuinely believe it is your first time. ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness - 2;
    }
}
State.variables.curse40 = new LiteralBlushingVirgin();

class LibidoReinforcementC extends Curse {
    constructor() {
        super('Libido Reinforcement C', 35, 'Curses/libidoreinforcementC.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse41 = new LibidoReinforcementC();

class LactationRejuvenationA extends Curse {
    constructor() {
        super('Lactation Rejuvenation A', 30, 'Curses/lactationA.png', 'none');
    }

    changeLactation(prevLactation) {
        return prevLactation + 1;
    }
}
State.variables.curse42 = new LactationRejuvenationA();

class AssetRobustnessD extends Curse {
    constructor() {
        super('Asset Robustness D', 30, 'Curses/assetrobustnessD.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**3;
    }
}
State.variables.curse43 = new AssetRobustnessD();

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
State.variables.curse44 = new AgeReductionB();

class SleepTight extends Curse {
    constructor() {
        super('Sleep Tight', 45, 'Curses/sleeptight.png', 'none',
              'You need 12 hours of sleep each night, but at least sleeping is very comforting and pleasurable. you also feel a bit more energized during your waking hours. ');
    }
}
State.variables.curse45 = new SleepTight();

class SweetDreams extends Curse {
    constructor() {
        super('Sweet Dreams', 40, 'Curses/sweetdreams.png', 'none',
              'Every night you have horrifyingly sexy and sexily horrifying wet nightmares, and wake up shaking in fear in a puddle of your own juices. ');
    }
}
State.variables.curse46 = new SweetDreams();

class HypnoHappytime extends Curse {
    constructor() {
        super('Hypno Happytime', 40, 'Curses/hypnohappytime.png', 'none',
              'yOu are very susceptiBlE to hYpnosis, and it is not hard to implant suggestions into your MalleablE mind. ');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**0;
    }
}
State.variables.curse47 = new HypnoHappytime();

class CrossdressYourHeart extends Curse {
    constructor() {
        super('Crossdress Your Heart', 35, 'Curses/crossdressyourheart.png', 'none',
              'You can only bring yourself to wear clothing associated with the opposite sex. ');
    }
}
State.variables.curse48 = new CrossdressYourHeart();

class LieDetector extends Curse {
    constructor() {
        super('Lie Detector', 40, 'Curses/liedetector.png', 'none',
              'No matter how convincing a lie you craft, everyone can tell when you are not being truthful. Others are aware even when you are just omitting information. ');
    }
}
State.variables.curse49 = new LieDetector();

class Megadontia extends Curse {
    constructor() {
        super('Megadontia', 30, 'Curses/sharpteeth.png', 'none',
              'Your teeth are very sharp, and you have a couple of fangs poking out even when your mouth is closed. Some would call it cute, but be careful when making out. ');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 1;
    }
}
State.variables.curse50 = new Megadontia();

class Softie extends Curse {
    constructor() {
        super('Softie', 35, 'Curses/softie.png', 'none');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness - 1;
    }
}
State.variables.curse51 = new Softie();

class HardMode extends Curse {
    constructor() {
        super('Hard Mode', 35, 'Curses/hardmode.png', 'none');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 1;
    }
}
State.variables.curse52 = new HardMode();

class LingualLeviathan extends Curse {
    constructor() {
        super('Lingual Leviathan', 30, 'Curses/lingualleviathan.png', 'none',
              'You have an extremely long, prehensile tongue, making you especially great at oral. ');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 1;
    }
}
State.variables.curse53 = new LingualLeviathan();

class TippingTheScales extends Curse {
    constructor(scaleColor='green') {
        super('Tipping the Scales', 45, 'Curses/tippingthescales.png', 'none');
        this.scaleColor = scaleColor
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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
State.variables.curse54 = new TippingTheScales();

class Reptail extends Curse {
    constructor() {
        super('Reptail', 35, 'Curses/reptail.png', 'none');
    }

    changeTails(prevTails) {
        return prevTails.concat(['large, spiked, scaled reptile'])
    }
}
State.variables.curse55 = new Reptail();

class ColdBlooded extends Curse {
    constructor() {
        super('Cold Blooded', 40, 'Curses/coldblooded.png', 'none',
              'You no longer produce heat on your own, and need external heat sources. Your nights lately involve a lot of cuddling. ');
    }
}
State.variables.curse56 = new ColdBlooded();

class LibidoReinforcementD extends Curse {
    constructor() {
        super('Libido Reinforcement D', 40, 'Curses/libidoreinforcementD.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse57 = new LibidoReinforcementD();

class GenderReversalD extends Curse {
    constructor() {
        super('Gender Reversal D', 15, 'Curses/genderreversalD.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse58 = new GenderReversalD();

class PleasureRespecificationA extends Curse {
    constructor() {
        super('Pleasure Respecification A', 45, 'Curses/pleasurerespecA.png', 'none',
              'You can no longer orgasm from masturbation. you can still feel pleasure and work your way towards the edge, but you will always need someone else\'s help to climax. ');
    }
}
State.variables.curse59 = new PleasureRespecificationA();

class ClothingRestrictionC extends Curse {
    constructor() {
        super('Clothing Restriction C', 60, 'Curses/clothingrestrictionC.png', 'none',
              'You can no longer wear any clothing besides underwear, or clothes skimpy enough that others would consider them underwear. ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 2;
    }
}
State.variables.curse60 = new ClothingRestrictionC();

class MassacreManicure extends Curse {
    constructor() {
        super('Massacre Manicure', 30, 'Curses/massacremanicure.png', 'none',
              'You have sharp claws instead of fingernails. they are retractable to an extent, but remain a permanent fixture of your hands. ');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 1;
    }
}
State.variables.curse61 = new MassacreManicure();

class DoS extends Curse {
    constructor() {
        super('DoS', 50, 'Curses/dos.png', 'libido',
              'You feel pleasure when inflicting pain on others, though other sources of pleasure are somewhat dulled. ');
    }

    changeSubDom(prevSubDom) {
        return prevSubDom - 1;
    }
}
State.variables.curse62 = new DoS();

class DoM extends Curse {
    constructor() {
        super('DoM', 45, 'Curses/dom.png', 'libido',
              'All pain you feel is converted into pleasure, though other sources of pleasure are somewhat dulled. ');
    }

    changeSubDom(prevSubDom) {
        return prevSubDom + 1;
    }
}
State.variables.curse63 = new DoM();

class HijinksEnsue extends Curse {
    constructor() {
        super('Hijinks Ensue', 40, 'Curses/hijinxensue.png', 'none',
              'You get involved in embarrassing sexual situations more often than it is reasonable. You are constantly getting caught in compromising positions, stumbling into other people having sex, suffering wardrobe malfunctions... ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 1;
    }
}
State.variables.curse64 = new HijinksEnsue();

class FlowerPower extends Curse {
    constructor() {
        super('Flower Power', 40, 'Curses/flowerpower.png', 'none');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 4;
    }
}
State.variables.curse65 = new FlowerPower();

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
State.variables.curse66 = new Cellulose();

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
State.variables.curse67 = new Chlorophyll();

class Pheromones extends Curse {
    constructor() {
        super('Pheromones', 45, 'Curses/pheremones.png', 'none',
              'You are constantly emitting pheromones that make other people more aroused, especially towards you. Thankfully, it does not cloud their judgment any more than natural arousal. ');
    }
}
State.variables.curse68 = new Pheromones();

class Carapacian extends Curse {
    constructor(skinColor='shiny black') {
        super('Carapacian', 50, 'Curses/carapacian.png', 'none');
        this.skinColor = skinColor;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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
State.variables.curse69 = new Carapacian();

class Hemospectrum extends Curse {
    constructor(bloodColor='blue') {
        super('Hemospectrum', 35, 'Curses/hemospectrum.png', 'none');
        this.bloodColor = bloodColor;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
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
State.variables.curse70 = new Hemospectrum();

class WrigglyAntennae extends Curse {
    constructor() {
        super('Wriggly Antennae', 40, 'Curses/wrigglyantennae.png', 'none');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 2;
    }
}
State.variables.curse71 = new WrigglyAntennae();

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
State.variables.curse72 = new Eggxellent();

class SubmissivenessRectificationB extends Curse {
    constructor() {
        super('Submissiveness Rectification B', 35, 'Curses/submissivenessrectificationB.png', 'libido');
    }

    changeSubDom(prevSubDom) {
        return prevSubDom + 1;
    }
}
State.variables.curse73 = new SubmissivenessRectificationB();

class LactationRejuvenationB extends Curse {
    constructor() {
        super('Lactation Rejuvenation B', 40, 'Curses/lactationrejuvenationB.png', 'none');
    }

    changeLactation(prevLactation) {
        return prevLactation + 1;
    }
}
State.variables.curse74 = new LactationRejuvenationB();

class PleasureRespecificationB extends Curse {
    constructor() {
        super('Pleasure Respecification B', 55, 'Curses/pleasurerespecB.png', 'none',
              'You can no longer orgasm from sex with another person, and need to spend some time masturbating after the act to reach climax. ');
    }
}
State.variables.curse75 = new PleasureRespecificationB();

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
State.variables.curse76 = new AgeReductionC();

class Horny extends Curse {
    constructor() {
        super('Horny', 20, 'Curses/horny.png', 'none');
    }

    inhumanise(prevInhumanity) {
        return prevInhumanity + 2;
    }

    addHorns(prevHorns) {
        return prevHorns + 1;
    }
}
State.variables.curse77 = new Horny();

class DrawingSpades extends Curse {
    constructor() {
        super('Drawing Spades', 40, 'Curses/drawingspades.png', 'none');
    }

    changeTails(prevTails) {
        return prevTails.concat(['cute, spade-tipped demon']);
    }
}
State.variables.curse78 = new DrawingSpades();

class TattooTally extends Curse {
    constructor() {
        super('Tattoo Tally', 55, 'Curses/tattootally.png', 'none',
              'You have several small runic tattoos throughout your body, and a larger heart shaped one above your crotch. Everyone who looks at them instinctively knows the full extent of your sexual history. ');
    }
}
State.variables.curse79 = new TattooTally();

//<<if _handle.vagina > 0 && _handle.penis > 0>>
//	<<set $curse80.appDesc = 'Your pussy is always glistening with lubrication and your penis is always leaking precum, so it only takes a little motivation to get a real stream going down there.'>>
//<<elseif _handle.vagina > 0>>
//	<<set $curse80.appDesc = 'Your pussy is always glistening with lubrication and it only takes a little motivation to get a real stream going down there.'>>
//<<elseif _handle.penis > 0>>
//	<<set $curse80.appDesc = 'Your cock is always leaking precum and it only takes a little motivation to get a real stream going down there.'>>
//<<else>>
//	<<set $curse80.appDesc = ''>>
//<</if>>

/*
<<nobr>>
<<set _vagina = $mc.vagina > 0>>
<<set _penis = $mc.penis > 0>>
<<if _vagina || _penis>>
Your <<if _vagina>>pussy is always glistening with lubrication<</if>><<if _vagina && _penis>> and your <</if>><<if _penis>>cock is always leaking precum<</if>>, <<if vagina && penis>>so<<else>>and<</if>> it only takes a little motivation to get a real stream going down there.
<</if>><</nobr>>

* */
class Leaky extends Curse {
    constructor() {
        super('Leaky', 55, 'Curses/leaky.png', 'none',
              `<<nobr>><<set _vagina = $mc.vagina > 0>>
<<set _penis = $mc.penis > 0>>
<<if _vagina || _penis>>
Your <<if _vagina>>pussy is always glistening with lubrication<</if>><<if _vagina && _penis>> and your <</if>><<if _penis>>cock is always leaking precum<</if>>, <<if vagina && penis>>so<<else>>and<</if>> it only takes a little motivation to get a real stream going down there.
<</if>><</nobr>>`);
    }

    growAsset(prevAsset) {
        return prevAsset + 2**0;
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 2
    }
}
State.variables.curse80 = new Leaky();

class WanderingHands extends Curse {
    constructor() {
        super('Wandering Hands', 55, 'Curses/wanderinghands.png', 'none',
              'Whenever you aren\'t paying attention, your hands start rubbing your crotch. ');
    }

    // eslint-disable-next-line no-unused-vars
    changeLewdness(prevLewdness, character) {
        return prevLewdness + 2;
    }
}
State.variables.curse81 = new WanderingHands();

class SemenDemon extends Curse {
    constructor(type = 'sexual fluids', amount = 1) {
        super('Semen Demon', 20, 'Curses/semendemon.png', 'libido');
        this.type = type;
        this.amount = amount;
    }

    /**
     * Returns the customisation options chosen for this curse, if any.
     * @returns {[string, number]} The customisation options, in the same order they are used in the constructor.
     * @protected
     */
    _customisationOptions() {
        return [this.type, this.amount];
    }

    get variation() {
        return this.type;
    }

    set variation(value) {
        console.error('Deprecated variation field used.')
        this.type = value;
    }

    get variation1() {
        return this.amount;
    }

    set variation1(value) {
        console.error('Deprecated variation field used.')
        this.amount = value;
    }

    changeLewdness(prevLewdness) {
        return prevLewdness + this.amount;
    }
}
State.variables.curse82 = new SemenDemon();

class Quota extends Curse {
    constructor() {
        super('Quota', 20, 'Curses/quota.png', 'libido');
    }

    changeLewdness(prevLewdness) {
        return prevLewdness + 1;
    }
}
State.variables.curse83 = new Quota();

class InTheLimelight extends Curse {
    constructor() {
        super('In the Limelight', 20, 'Curses/inthelimelight.png', 'libido');
    }

    changeLewdness(prevLewdness) {
        return prevLewdness + 1;
    }
}
State.variables.curse84 = new InTheLimelight();

class LibidoReinforcementE extends Curse {
    constructor() {
        super('Libido Reinforcement E', 50, 'Curses/libidoreinforcementE.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse85 = new LibidoReinforcementE();

class GenderReversalE extends Curse {
    constructor() {
        super('Gender Reversal E', 45, 'Curses/genderreversalE.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse86 = new GenderReversalE();

class AssetRobustnessE extends Curse {
    constructor() {
        super('Asset Robustness E', 50, 'Curses/assetrobustnessE.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**4; // 16 cups or 32cm
    }
}
State.variables.curse87 = new AssetRobustnessE();

class UrineReamplificationA extends Curse {
    constructor() {
        super('Urine Reamplification A', 55, 'Curses/urinereamplificationA.png', 'none',
              'Your bladder capacity has been significantly reduced, you need to be careful to make sure you don\'t have any accidents. ');
    }
}
State.variables.curse88 = new UrineReamplificationA();

class BarterSystem extends Curse {
    constructor() {
        super('Barter System', 65, 'Curses/bartersystem.png', 'none',
              'You are unable to process currency, so one of your companions or friends will need to perform any transactions on your behalf, except for when a merchant is willing to trade you an item in exchange for a sexual favor. ');
    }
}
State.variables.curse89 = new BarterSystem();

class SharedSpace extends Curse {
    constructor() {
        super('Shared Space', 60, 'Curses/sharedspace.png', 'none',
              'People around you are always happy to grope you, having little regard to giving you any space to yourself. ');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**0;
    }
}
State.variables.curse90 = new SharedSpace();

class Weakling extends Curse {
    constructor() {
        super('Weakling', 65, 'Curses/weakling.png', 'none');
    }

    // handicaps implemented as special-purpose code in Character because it needs to come last.
}
State.variables.curse91 = new Weakling();

class RandomOrgasms extends Curse {
    constructor() {
        super('Random Orgasms', 65, 'Curses/randomorgasms.png', 'none',
              '<<set $randomOrgasms = $playerCurses.filter(e => e.name === "Random Orgasms").length>><<if setup.activeCurseCount("Random Orgasms") == 1>>Once each day, randomly, you spontaneously orgasm, sometimes in public. <<else>><<print setup.activeCurseCount("Random Orgasms")>> times each day you spontaneously orgasm without any stimulation, sometimes in public. <</if>>');
    }
}
State.variables.curse92 = new RandomOrgasms();

class Beastly extends Curse {
    constructor() {
        super('Beastly', 80, 'Curses/beastly.png', 'none',
              'You tend to behave in a very animalistic way instinctually. People around you tend to assume you\'re more of an animal or a pet than a person to be respected properly. ');
    }

    // conversation handicap implemented as special-purpose code in Character
}
State.variables.curse93 = new Beastly();

class CreatureOfTheNight extends Curse {
    constructor() {
        super('Creature of the Night', 40, 'Curses/creatureofthenight.png', 'none',
              'You no longer have a pulse and sunlight causes you discomfort, similar to mythological vampires. You also need to drink a small amount of blood to survive, in addition to normal food. ');
    }
}
State.variables.curse94 = new CreatureOfTheNight();

class Minishish extends Curse {
    constructor() {
        super('Minish-ish', 75, 'Curses/minish-ish.png', 'height');
    }

    miniOrGigantify(prevHeight) {
        return prevHeight / 10;
    }

    addSizeHandicap(prevHandicap) {
        // What if all companions are minish-ised too?
        return State.variables.hiredCompanions.length === 0 || prevHandicap;
    }
}
State.variables.curse95 = new Minishish();

class Colossalable extends Curse {
    constructor() {
        super('Colossal-able', 75, 'Curses/colossal-able.png', 'height');
    }

    miniOrGigantify(prevHeight) {
        return prevHeight * 70;
    }

    // eslint-disable-next-line no-unused-vars
    addSizeHandicap(prevHandicap) {
        return true;
    }
}
State.variables.curse96 = new Colossalable();

class LibidoReinforcementF extends Curse {
    constructor() {
        super('Libido Reinforcement F', 55, 'Curses/libidoreinforcementF.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse97 = new LibidoReinforcementF();

class GenderReversalF extends Curse {
    constructor() {
        super('Gender Reversal F', 50, 'Curses/genderreversalF.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse98 = new GenderReversalF();

class AssetRobustnessF extends Curse {
    constructor() {
        super('Asset Robustness F', 60, 'Curses/assetrobustnessF.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**5; // 32 cups or 64cm
    }
}
State.variables.curse99 = new AssetRobustnessF();

class UrineReamplificationB extends Curse {
    constructor() {
        super('Urine Reamplification B', 55, 'Curses/urinereamplificationB.png', 'none');
    }
}
State.variables.curse100 = new UrineReamplificationB();

class EyeOnThePrize extends Curse {
    constructor() {
        super('Eye on the Prize', 70, 'Curses/eyeontheprize.png', 'handicap');
    }

    removeEye(prevEyes) {
        return prevEyes - 1;
    }
}
State.variables.curse101 = new EyeOnThePrize();

class DeafeningSilence extends Curse {
    constructor() {
        super('Deafening Silence', 90, 'Curses/deafeningsilence.png', 'handicap');
    }

    changeThreatHandicap(prevHandicap) {
        return prevHandicap - 3;
    }

    // conversation handicap handled by special-purpose code in Character
}
State.variables.curse102 = new DeafeningSilence();

class TaciturnTurnaround extends Curse {
    constructor() {
        super('Taciturn Turnaround', 90, 'Curses/taciturnturnaround.png', 'handicap');
    }

    changeThreatHandicap(prevHandicap) {
        return prevHandicap - 3;
    }

    // conversation handicap handled by special-purpose code in Character
}
State.variables.curse103 = new TaciturnTurnaround();

class AmpuQtie extends Curse {
    constructor(arms = 1, legs = 0) {
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
State.variables.curse104 = new AmpuQtie();

class NoseGoes extends Curse {
    constructor() {
        super('Nose Goes', 65, 'Curses/nosegoes.png', 'handicap');
    }

    changeThreatHandicap(prevHandicap) {
        return prevHandicap - 3;
    }
}
State.variables.curse105 = new NoseGoes();

class ArmArmy extends Curse {
    constructor() {
        super('Arm Army', 15, 'Curses/armarmy.png', 'none');
    }

    removeArm(prevArms) {
        return prevArms + 2;
    }
}
State.variables.curse106 = new ArmArmy();

class ALittleExtra extends Curse {
    constructor(genital = '') {
        super('A Little Extra', 35, 'Curses/alittleextra.png', 'none');
        this.genitals = genital;
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
State.variables.curse107 = new ALittleExtra();

class Null extends Curse {
    constructor() {
        super('Null', 80, 'Curses/null.png', 'gender');
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
State.variables.curse108 = new Null();

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
State.variables.curse109 = new Seafolk();

class TakenForGranite extends Curse {
    constructor() {
        super('Taken for Granite', 75, 'Curses/takenforgranite.png', 'none');
    }
}
State.variables.curse110 = new TakenForGranite();

class DoubleTrouble extends Curse {
    constructor() {
        super('Double Trouble', 60, 'Curses/doubletrouble.png', 'none');
    }
}
State.variables.curse111 = new DoubleTrouble();

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
State.variables.curse112 = new Conjoined();

class LibidoReinforcementG extends Curse {
    constructor() {
        super('Libido Reinforcement G', 60, 'Curses/libidoreinforcementG.png', 'libido');
    }

    changeLibido(prevLibido) {
        return prevLibido + 1;
    }
}
State.variables.curse113 = new LibidoReinforcementG();

class GenderReversalG extends Curse {
    constructor() {
        super('Gender Reversal G', 55, 'Curses/genderreversalG.png', 'gender');
    }

    changeGender(character, prevGender) {
        return prevGender + character.osex === 'male' ? 1 : -1;
    }
}
State.variables.curse114 = new GenderReversalG();

class AssetRobustnessG extends Curse {
    constructor() {
        super('Asset Robustness G', 80, 'Curses/assetrobustnessG.png', 'gender');
    }

    growAsset(prevAsset) {
        return prevAsset + 2**6; // 64 cups or 128cm
    }
}
State.variables.curse115 = new AssetRobustnessG();

class Literalization extends Curse {
    constructor() {
        super('Literalization', 140, 'Curses/literalization.png', 'none');
    }
}
State.variables.curse116 = new Literalization();

class ConsentDissent extends Curse {
    constructor() {
        super('Consent Dissent', 120, 'Curses/consentdissent.png', 'none');
    }
}
State.variables.curse117 = new ConsentDissent();

class TheMaxim extends Curse {
    constructor() {
        super('The Maxim', 110, 'Curses/themaxim.png', 'none');
    }

    // libido changes implemented by special-purpose code in Character
}
State.variables.curse118 = new TheMaxim();

class AdversePossession extends Curse {
    constructor() {
        super('Adverse Possession', 115, 'Curses/adversepossession.png', 'none');
    }

}
State.variables.curse119 = new AdversePossession();

class Erased extends Curse {
    constructor() {
        super('Erased', 100, 'Curses/erased.png', 'none');
    }
}
State.variables.curse120 = new Erased();

class TicklyTentacles extends Curse {
    constructor() {
        super('Tickly Tentacles', 10, 'Curses/ticklytentacles.png', 'none');
    }
}
State.variables.curse121 = new TicklyTentacles();

class Eyescream extends Curse {
    constructor() {
        super('Eye-scream', 5, 'Curses/eye-scream.png', 'none');
    }
}
State.variables.curse122 = new Eyescream();

class AMouthful extends Curse {
    constructor() {
        super('A Mouthful', 20, 'Curses/datmouf.png', 'none');
    }
}
State.variables.curse123 = new AMouthful();

class BelowTheVeil extends Curse {
    constructor() {
        super('Below the Veil', 200, 'Curses/belowtheveil.png', 'none');
    }
}
State.variables.curse124 = new BelowTheVeil();

class PrincessProtocol extends Curse {
    constructor() {
        super('Princess Protocol', 25, 'Curses/princessprotocol.png', 'none');
    }
}
State.variables.curse125 = new PrincessProtocol();
