// These JSDoc declarations silence warnings about undeclared properties of the variables object.

/**
 * @type {object}
 * @property {Object.<string, any>} variables
 */
State

/**
 * @callback variablesGetter
 * @returns {Object.<string, any>}
 */
/**
 * @type {variablesGetter}
 */
variables

// This JSDoc declaration defines the extensions we add to setup in this file
/**
 * @typedef SugarCubeSetupObject
 * @extends SugarCubeSetupObject
 * @property {string} Path
 * @property {string} ImagePath
 * @property {string} SoundPath
 * @property {int} never
 * @property {string[]} flaskLabels
 * @property {function} curse
 * @property {function} curses
 * @property {function} item
 * @property {function} items
 * @property {function} relic
 * @property {function} relics
 * @property {function} companion
 * @property {function} companions
 * @property {function} sellValue
 * @property {function} modAffection
 * @property {function} activeCurseCount
 * @property {number} carriedWeight
 * @property {boolean} haveCuttingTool
 * @property {boolean} haveSword
 * @property {boolean} haveScubaGear
 * @property {boolean} haveSmartphoneRegular
 * @property {boolean} haveSmartphoneAI
 * @property {boolean} haveSmartphone
 * @property {boolean} haveUnlimitedLightSource
 * @property {boolean} havePotentialLightSource
 * @property {boolean} haveTravelLightSource
 * @property {boolean} haveNotepad
 * @property {boolean} haveRope
 * @property {boolean} haveHealing
 * @property {boolean} haveColdProtection
 * @property {boolean} haveHeatProtection
 * @property {function} sellRelic
 * @property {function} unsellRelic
 * @property {function} loseRelic
 * @property {boolean} passingTime
 * @property {function} startPassingTime
 * @property {function} stopPassingTime
 * @property {function} isPregnant
 * @property {function} setConsideredPregnant
 * @property {function} setNotPregnant
 * @property {function} dueDate
 * @property {function} daysConsideredPregnant
 * @property {function} daysUntilDue
 * @property {function} willingCurses
 * @property {function} returnRelic
 * @property {function} getCurseSets
 * @property {function} getUserCurseSets
 * @property {function} setUserCurseSets
 * @property {function} addUserCurseSet
 */

Object.defineProperties(Number.prototype, {
    // Rounds the number to the given number of decimals.
    toRounded: {
        value(decimals) { return Math.round(10**decimals * this) / 10**decimals; },
    }
});

Config.history.maxStates = 20;

Config.saves.version = 2;

function backwardCompat(vars, version) {
    if (!version || version < 1) {
        // Copy any missing properties from the deprecated $app object to the $mc object.
        vars.mc = { ...vars.app, ...vars.mc };
        // Remove the $app object.
        delete vars.app;
    }

    // Prevent instant bad end from improperly set age.
    if (vars.mc.age < 18) vars.mc.age = 18;
}

Save.onLoad.add(save => {
    for (const { variables } of save.state.history) {
        backwardCompat(variables, save.version);
    }
});

Config.navigation.override = function (destPassage) {
    const StoryVar = variables();

    // For interrupt scenes that don't result in a bad end, set the return passage.
    StoryVar.interruptReturn = destPassage;

    if (StoryVar.brokerUsed === 1 && StoryVar.corruption < 0) {
        return "BrokerEnd";
    }
    if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 10 && !StoryVar.dollevent2 && StoryVar.hiredCompanions.length===0){
        return "DollWarning";
    }
    if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 4 && StoryVar.dollevent2){
        return "DollEnd";
    }
    if (StoryVar.ownedRelics.some(e => e.name === "Starlit Conquest") && StoryVar.currentLayer === 0 ){
        return "Starlit Unlocked";
    }
    if (StoryVar.boundBanditEnding) {
        return "Bound Bandit Ending";
    }
    if (StoryVar.mc.age < 18) {
        return "AgeLimit";
    }
    if (StoryVar.starving >= 6 || StoryVar.dehydrated >= 3 || StoryVar.gameOver) {
        return "GameOver";
    }
    if (StoryVar.time - StoryVar.MaximCycleT > 35 && StoryVar.MaximCycleT_flag) {
        return "Maxim Labor Scene";
    }
    if (StoryVar.mc.daysUntilDue === 0) {
        return "Labor Scene";
    }
    if (StoryVar.companionMaru.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionMaru.id;
        StoryVar.MaruConvoPreg = false;
        StoryVar.companionMaru.setNotPregnant();
        StoryVar.companionMaru.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionLily.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionLily.id;
        StoryVar.LilyConvoPreg = false;
        StoryVar.companionLily.setNotPregnant();
        StoryVar.companionLily.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionKhemia.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionKhemia.id;
        StoryVar.KhemiaConvoPreg = false;
        StoryVar.companionKhemia.setNotPregnant();
        StoryVar.companionKhemia.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionCherry.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionCherry.id;
        StoryVar.CherryConvoPreg = false;
        StoryVar.companionCherry.setNotPregnant();
        StoryVar.companionCherry.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionCloud.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionCloud.id;
        StoryVar.CloudConvoPreg = false;
        StoryVar.companionCloud.setNotPregnant();
        StoryVar.companionCloud.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionSaeko.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionSaeko.id;
        StoryVar.SaekoConvoPreg = false;
        StoryVar.companionSaeko.setNotPregnant();
        StoryVar.companionSaeko.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionBandit.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionBandit.id;
        StoryVar.BanditConvoPreg = false;
        StoryVar.companionBandit.setNotPregnant();
        StoryVar.companionBandit.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.companionTwin.daysUntilDue === 0) {
        StoryVar.companionLabor = StoryVar.companionTwin.id;
        StoryVar.TwinConvoPreg = false;
        StoryVar.companionTwin.setNotPregnant();
        StoryVar.companionTwin.lastBirth = StoryVar.time;
        return "Labor Scene Companion";
    }
    if (StoryVar.BanditConvo0_rejoin < StoryVar.time) {
        return "Bandit Joins";
    }
    if (StoryVar.companionBandit.affec < -8 && StoryVar.escapeT < StoryVar.time && !StoryVar.companionBandit.swap && StoryVar.interruptReturn!="Bandit Escape") {
        StoryVar.escapeT = StoryVar.time + 7 + random(0,7);
        return "Bandit Escape";
    }
    if (StoryVar.currentLayer === 0 && StoryVar.mc.imageIcon === "Icons/BanditIcon_released.jpg" &&
        StoryVar.mc.inhuman < 6 && StoryVar.mc.appAge > 12 && !StoryVar.arrested) {
        return "Bandit Arrested";
    }
    if (isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 4 && StoryVar.mc.age > 17 && StoryVar.AgeEndReached === false) {
        return "AgeEnd";
    }
    if (StoryVar.companionMaru.affec < -9 && !StoryVar.companionMaru.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.maru)) {
        return "Maru Leaving";
    }
    if (StoryVar.companionLily.affec < -9 && !StoryVar.companionLily.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.lily)) {
        return "Lily Leaving";
    }
    if (StoryVar.companionKhemia.affec < -9 && !StoryVar.companionKhemia.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.khemia)) {
        return "Khemia Leaving";
    }
    if (StoryVar.companionCherry.affec < -15 && !StoryVar.companionCherry.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.cherry)) {
        return "Cherry Leaving";
    }
    if (StoryVar.companionCloud.affec < -9 && !StoryVar.companionCloud.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.cloud)) {
        return "Cloud Leaving";
    }
    if (StoryVar.companionSaeko.affec < -9 && !StoryVar.companionSaeko.swap && StoryVar.hiredCompanions.some(e => e.id === setup.companionIds.saeko)) {
        return "Saeko Leaving";
    }
    return destPassage;
};

// Listen for the :passagestart jQuery event.
$(document).on(':passagestart', ev => {
    // Get a reference to the active story variables store.
    const vars = variables();

    // Update $hubReturn.
    if (vars.currentLayer < 1) {
        vars.hubReturn = 'Surface Hub';
    } else {
        vars.hubReturn = `Layer${vars.currentLayer} Hub`;
    }

    // Update $menuReturn.
    if (!tags().includes('noreturn')) vars.menuReturn = passage();

    // Add some CSS classes based on where we are.
    if (State.variables.comBalloon) {
        document.body.classList.add('balloon');
    } else if (vars.currentLayer < 1) {
        document.body.classList.add('surface');
    } else {
        document.body.classList.add(`layer${vars.currentLayer}`);
    }

    /* ---- Companion object identity ---- */
    // Get all the companion array variables.
    const companionArrays = [
        'companions',
        'hiredCompanions',
        'DaedalusCompanions',
        'DesertedCompanions',
        'LostCompanions',
        'SemenDemonVec',
    ].map(varName => vars[varName]);

    // Restore object identity between elements of companion arrays and $companionName variables.
    for (const companions of companionArrays) {
        for (const [i, companion] of companions.entries()) {
            const name =
                companion.id === setup.companionIds.twin   ? 'Twin' :
                companion.id === setup.companionIds.bandit ? 'Bandit'
                                                           : companion.name;
            const companionVar = vars[`companion${name}`];
            if (companionVar) {
                companions[i] = companionVar;
            } else {
                console.error(`Couldn't find named companion variable for companion with name ${companion.name}!`);
            }
        }
    }

    /* ---- Relic object identity ---- */

    // Get all numbered relic variables.
    const relicVars = Object.keys(vars).filter(key => /relic\d+/.test(key)).map(key => vars[key]);

    // Get all the relic array variables.
    const miscRelicArrays = [
        'relics',
        'ownedRelics',
        'innRelics',
        'soldRelics',
    ].map(varName => vars[varName]);
    const relicSwapRelicArrays = vars.relicSwap;
    const relicArrays = miscRelicArrays.concat(relicSwapRelicArrays);

    // Restore object identity between elements of relic arrays and $relicN variables.
    // Note: Change this if relics become instanced.
    for (const relics of relicArrays) {
        for (const [i, relic] of relics.entries()) {
            const relicVar = relicVars.find(relicVar => relic.name === relicVar.name);
            if (relicVar) {
                relics[i] = relicVar;
            } else {
                // Purity tree plank doesn't have a relic variable
                console.error(`Couldn't find numbered relic variable for relic with name ${relic.name}!`);
            }
        }
    }

    // NOTE: we cannot do this on an element that's higher up than .passage.
    // It might be easier to add the class to the body, but sugarcube does not rebuild the entire page between
    // passages, just the passages, so if we add a class to the body it remains there until the user reloads (even
    // if the setting is turned off again).
    // We could add use the body and add an else branch that removes the class to get around the problem,
    // I decided to just take the highest element that gets replaced every passage.
    $(ev.content).wiki(`<<if settings.accessible>><script>[...document.getElementsByClassName('passage')].forEach(e => e.classList.add('accessible'))</${'script'}><</if>>`);
});

// eslint-disable-next-line no-constant-condition -- Change from false to true if running inside Twine.
if (false) {
    // Change this to the path where the HTML file is
    // located if you want to run this from inside Twine.
    setup.Path = "Documents/Twine/AbyssDiver/";  // Running inside Twine application
} else {
    setup.Path = "";  // Running in a browser
}
setup.ImagePath = setup.Path + "images/";
setup.SoundPath = setup.Path + "sounds/";

//conversation macro
Macro.add('say', {
        tags: null,
        handler: function () {
            const person = this.args[0];
            const imageIcon = this.args[1];
            const output =
                `<div class="say clearfix" style="${person?.style ?? ''};${person?.style1 ?? ''}">` +
                    `<div class="avatar">` +
                        `<img src="${setup.ImagePath}${imageIcon ?? person?.imageIcon ?? ''}" style="width:100px;height:100px">` +
                    `</div>` +
                    `<span class="say-nameB">${person?.name ?? ''}</span>` +
                    `<hr>` +
                    `<span class="say-contents">` +
                        `<span class="gdr${person?.genderVoice ?? ''}">${this.payload[0].contents}</span>` +
                    `</span>` +
                `</div>`;
            $(this.output).wiki(output);
        }
});

Setting.addToggle("accessible", {
    label : "Remove potentially-inaccessible text formatting for the vision-impaired",
    default  : false,
});

Setting.addHeader("Content Settings");

Setting.addToggle("MaleSceneToggleFilter", {
    label : "Enable random sex scenes involving male characters",
    default  : true,
});

Setting.addToggle("FemaleSceneToggleFilter", {
    label : "Enable random sex scenes involving female characters",
    default  : true,
});

Setting.addToggle("OtherSceneToggleFilter", {
    label : "Enable random sex scenes involving futa characters or characters without genitals",
    default  : true,
});

Setting.addToggle("MenCycleToggleFilter", {
    label : "Hide messages containing information about your menstrual cycle",
    default  : true,
});

Setting.addToggle("WSHidden", {
    label : "Hide content involving watersports/urine",
    default  : false,
});

Setting.addToggle("amputationHidden", {
    label : "Hide content involving amputation. This includes non-physical crippling, such as losing the ability to hear or speak",
    default  : false,
});

Setting.addRange("appAgeControl", {
    label    : "Minimum apparent age your physical body can regress to (3-18):",
    min      : 3,
    default  : 3,
    max      : 18,
    step     : 1,
});

function findByName(variable, name) {
    return variables()[variable].find(obj => obj.name === name);
}

function findByNames(variable, names) {
    return variables()[variable].filter(obj => names.includes(obj.name));
}

function checkAvailability(itemNames, relicNames, varNames) {
    const vars = variables();
    // Check variables.
    if (varNames && varNames.length && varNames.some(variable => vars[variable])) return true;
    // Check items.
    if (itemNames && itemNames.length && findByNames('items', itemNames).some(item => item.count > 0)) return true;
    // Check relics.
    if (relicNames && relicNames.length && vars.ownedRelics.some(relic => relicNames.includes(relic.name))) return true;
    // Not found.
    return false;
}

function moveRelic(findWith, from, to, relicOrNameOrIndex) {
    const vars = variables();
    const fromVar = vars[from];
    let relic, name, index;
    switch (typeof relicOrNameOrIndex) {
        case 'string':
            name = relicOrNameOrIndex;
            index = fromVar[findWith](relic => relic.name === name);
            if (index >= 0) {
                relic = fromVar[index];
            } else {
                console.error(`Relic '${name}' not found in $${from}!`);
            }
            break;
        case 'number':
            index = relicOrNameOrIndex;
            if (0 <= index && index < fromVar.length) {
                relic = fromVar[index];
                name = relic.name;
            } else {
                console.error(`${index} is not a valid index in $${from}!`);
            }
            break;
        default:
            relic = relicOrNameOrIndex;
            if (relic) {
                name = relic.name;
                index = fromVar[findWith](fromRelic => fromRelic === relic);
                if (index < 0) index = fromVar[findWith](relic => relic.name === name);
                if (index < 0) console.error(`Relic '${name}' not found in $${from}!`);
            } else {
                console.error('Passed relic was undefined!');
            }
    }
    if (0 <= index && index < fromVar.length) fromVar.splice(index, 1);
    if (relic) vars[to].push(relic);
    return relic;
}

// eslint-disable-next-line no-unused-vars -- Not currently used, but might come in handy later.
const moveFirstRelic = (from, to, relicOrNameOrIndex) => moveRelic('findIndex', from, to, relicOrNameOrIndex);
const moveLastRelic = (from, to, relicOrNameOrIndex) => moveRelic('findLastIndex', from, to, relicOrNameOrIndex);

Object.defineProperties(setup, {
    never: {
        value: 999999999, // Just needs to be an unreasonably large number so that $time can never exceed it.
    },
    flaskLabels: {
        value: [
            'Flask with normal water',
            'Flask with heavily contaminated water from the first layer',
            'Flask with heavily contaminated water from the second layer',
            'Flask with heavily contaminated water from the fourth layer',
            'Flask with heavily contaminated water from the sixth layer',
            'Flask with lightly contaminated water from the eighth layer',
            'Flask with heavily contaminated water from the eighth layer',
            'Flask with heavily contaminated water from the ninth layer',
            'Bottled water',
            'Aquarius Ex Nihilo',
        ],
    },
    // Get curse by name.
    curse: {
        value: name => {
            for (const curse in setup.allCurses) {
                if (curse.name === name) {
                    return Reflect.construct(curse.constructor, []);
                }
            }
            return undefined;
        },
    },
    // Get curses by names.
    curses: {
        value: names => {
            return names.map(name => {
                for (const curse in setup.allCurses) {
                    if (curse.name === name) {
                        return Reflect.construct(curse.constructor, []);
                    }
                }
                return undefined
            }).filter(c => c !== undefined);
        },
    },
    // Get item by name.
    item: {
        value: name => findByName('items', name),
    },
    // Get items by name.
    items: {
        value: names => findByNames('items', names),
    },
    // Get relic by name.
    relic: {
        value: name => findByName('relics', name),
    },
    // Get relics by name.
    relics: {
        value: names => findByName('relics', names),
    },
    // Get companion by name (note: internal name, like 'Twin').
    companion: {
        value: name => variables()[`companion${name}`],
    },
    // Get companions by name (note: internal name, like 'Twin').
    companions: {
        value: names => names.map(setup.companion),
    },
    // Get the sell value of the given relic.
    sellValue: {
        value: relic => Math.max(relic.value + variables().sellAdd, 0),
    },
    // Modify the affection of the given companion (by name or reference).
    // The actual change may depend on owned or equipped relics and items.
    modAffection: {
        value(nameOrCompanion, change) {
            const companion = typeof nameOrCompanion === 'string' ? setup.companion(nameOrCompanion) : nameOrCompanion;
            companion.affec += change + variables().hsswear;
        },
    },
    // Count the number of instances of a Curse active on the main character.
    activeCurseCount: {
        value: name => variables().mc.events.filter(curse => curse.name === name).length,
    },
    // Returns the weight of the carried items and relics.
    carriedWeight: {
        get() {
            let sum = 0;
            for (const item of variables().items) sum += item.count * item.weight;
            for (const relic of variables().ownedRelics) sum += relic.weight;
            return sum;
        },
    },
    // Check whether the player has a cutting tool.
    haveCuttingTool: {
        get: () => checkAvailability(['Sword'], ['Giddy Reaper', 'Sharing Shears', 'Sunbeam'], ['cut']),
    },
    // Check whether the player specifically has a sword.
    haveSword: {
        get: () => checkAvailability(['Sword'], ['Sunbeam'], ['joyousSword']),
    },
    // Check whether the player has scuba gear or an equivalent.
    haveScubaGear: {
        get: () => checkAvailability(['Scuba Gear'], ['Pneuma Wisp'], ['scuba']),
    },
    // Check or set whether the player has a regular smartphone.
    haveSmartphoneRegular: {
        get: () => setup.item('Smartphone').count > 0,
        set: (have) => { setup.item('Smartphone').count = have ? 1 : 0; },
    },
    // Check whether the player has a smartphone upgraded with the Omoikane AI.
    haveSmartphoneAI: {
        get: () => setup.item('Omoikane Smartphone').count > 0,
        set: (have) => { setup.item('Omoikane Smartphone').count = have ? 1 : 0; },
    },
    // Check whether the player has a smartphone of any kind.
    haveSmartphone: {
        get: () => setup.haveSmartphoneRegular || setup.haveSmartphoneAI,
    },
    // Check whether the player has a light source that won't run out.
    haveUnlimitedLightSource: {
        get: () => checkAvailability(['Flashlight'], ['Sunbeam', 'Glare Vantage'], ['light', 'BDwear']) || setup.haveSmartphone || setup.starlitConquestActivated.count>0,
    },
    // Check whether the player has a light source, including consumables and ones that can only be used in short bursts.
    havePotentialLightSource: {
        get: () => checkAvailability(['Torch'], ['Firmament Pigment']) || setup.haveUnlimitedLightSource,
    },
    // Check whether the player has an active light source that can be used while traversing the Abyss.
    haveTravelLightSource: {
        get: () => variables().torchUse || setup.haveUnlimitedLightSource,
    },
    // Check whether the player has a way to take notes.
    haveNotepad: {
        get: () => checkAvailability(['Notepad and Pen'], null, ['notepad']) || setup.haveSmartphone,
    },
    // Check whether the player has a rope or equivalent.
    haveRope: {
        get: () => checkAvailability(['Rope'], ['Orbweaver'], ['rope']),
    },
    // Check whether the player has items that can heal status conditions.
    haveHealing: {
        get: () => checkAvailability(['Medkit'], ['Lifespanner']),
    },
    // Check whether the player has protection from cold.
    haveColdProtection: {
        get: () => {
            const vars = variables();
            return Boolean(vars.heatOverride || vars.slwear || (vars.warmCloth && !vars.dollevent2) || vars.mechaBoarded);
        },
    },
    // Check whether the player has protection from heat.
    haveHeatProtection: {
        get: () => {
            const vars = variables();
            return Boolean(vars.coolOverride || vars.slwear || (vars.coolCloth && !vars.dollevent2) || vars.mechaBoarded);
        },
    },
    // Sell a relic.
    sellRelic: {
        value: (relicOrNameOrIndex, valueCallback) => {
            const relic = moveLastRelic('ownedRelics', 'soldRelics', relicOrNameOrIndex);
            if (!relic) return;
            if (valueCallback) {
                variables().dubloons += Math.max(valueCallback(relic.value), 0);
            } else {
                variables().dubloons += setup.sellValue(relic);
            }
        },
    },
    // Unsell a relic.
    unsellRelic: {
        value: relicOrNameOrIndex => moveLastRelic('soldRelics', 'ownedRelics', relicOrNameOrIndex),
    },
    // Lose a relic. To do: Switch from 'soldRelics' to a different variable.
    loseRelic: {
        value: relicOrNameOrIndex => moveLastRelic('ownedRelics', 'soldRelics', relicOrNameOrIndex),
    },
    // Check whether we're passing time for the active passage (returns the active state).
    passingTime: {
        value: () => (variables().passTimeState ??= new Map()).get(passage())
    },
    // Start passing time for the active passage (initializes state for <<PassTime>>).
    startPassingTime: {
        value(passage, days) {
            const vars = variables();

            if (!['Labor Scene', 'Labor Scene Companion'].includes(passage)) {
                // If we're on a layer without a daily source of water and we're traveling somewhere, reset $atWaterSource.
                if (vars.currentLayer === 3 && !['Layer3 Camp', 'Layer3 Forage'].includes(passage)) vars.atWaterSource = false;
                if (vars.currentLayer === 5 && !['Layer5 Camp', 'Layer5 Forage'].includes(passage)) vars.atWaterSource = false;
            }

            // If we're on layer 8, allow an Inanis Ego event to trigger every time we wait or travel somewhere.
            if (vars.currentLayer === 8) vars.L8loopLim = false;

            const state = {
                expectedDays: days, /* The number of days of time to pass, modulo the time weight. */
                unweightedDayIndex: 0,
                weightedDayIndex: 0,
                unweightedDay: 0,
                weightedDay: 0,
                nextRealDay: 0,
                energy: temporary().daysOfEnergyRations ?? 0,
            };
            vars.passTimeState.set(passage, state);
            return state;
        },
    },
    // Stops passing time for the active passage (called by <<PassTime>>).
    stopPassingTime: {
        value: () => variables().passTimeState?.delete(passage()),
    },
    // Checks whether the given character is pregnant.
    isPregnant: {
        value(character) {
            const characterVar = typeof character !== 'string' ? character : setup.companion(character);
            return characterVar.pregnantT <= variables().time;
        }
    },
    // Sets the given character as pregnant (fertilized) from two weeks ago.
    setConsideredPregnant: {
        value(character) {
            const characterVar = typeof character !== 'string' ? character : setup.companion(character);
            characterVar.pregnantT = variables().time - 14;
            characterVar.due = characterVar.pregnantT + 280 + random(-7, 7);
        },
    },
    // Sets the given character as not pregnant.
    setNotPregnant: {
        value(character) {
            const characterVar = typeof character !== 'string' ? character : setup.companion(character);
            characterVar.pregnantT = setup.never;
            characterVar.due = setup.never;
        },
    },
    // Gets (or sets) the due date for the given character if they're pregnant (max value otherwise).
    dueDate: {
        value(character) {
            const characterVar = typeof character !== 'string' ? character : setup.companion(character);
            if (!setup.isPregnant(characterVar)) {
                characterVar.due = setup.never;
            } else if (typeof characterVar.due === 'undefined') {
                characterVar.due = characterVar.pregnantT + 280 + random(-7, 7);
            }
            return characterVar.due;
        },
    },
    // Gets the number of days that the given character has been pregnant.
    daysConsideredPregnant: {
        value(character) {
            const characterVar = typeof character !== 'string' ? character : setup.companion(character);
            return Math.max(variables().time - characterVar.pregnantT, 0);
        },
    },
    // Gets the number of days until the given character is due to give birth.
    daysUntilDue: {
        value(character) {
            const characterVar = typeof character === 'string' ? setup.companion(character) : character;
            if (!setup.isPregnant(characterVar)) return setup.never;
            return Math.max(setup.dueDate(characterVar) - variables().time, 0);
        },
    },
    // Gets the curses a given companion is willing to take
    willingCurses: {
        value: companion => {
            if (typeof companion === 'string') {
                switch (companion.toLowerCase()) {
                    case "maru":
                        companion = State.variables.companionMaru;
                        break;
                    case "lily":
                        companion = State.variables.companionLily;
                        break;
                    case "khemia":
                        companion = State.variables.companionkhemia;
                        break;
                    case "cherry":
                        companion = State.variables.companioncherry;
                        break;
                    case "cloud":
                        companion = State.variables.companionCloud;
                        break;
                    case "saeko":
                        companion = State.variables.companionSaeko;
                        break;
                    default:
                        console.error(`Companion ${companion} is not a valid target of willing curses`);
                        return [];
                }
            }
            if (companion.osex === undefined || companion.sex === undefined ||
                    companion.name === undefined || companion.breasts === undefined ||
                companion.vagina === undefined || companion.penis === undefined) {
                console.error(`willingCurses() was passed an object that isn't a companion or a companion name:`);
                console.error(companion);
                return [];
            }

            let willingCurses = []
            // add companion-specific willingness
            switch (companion.id) {
                case setup.companionIds.maru:
                    willingCurses.push("Hair Removal", "Increased Sensitivity", "Age Reduction A", "Age Reduction B",
                        "Submissiveness Rectification A", "Submissiveness Rectification B");
                    if (companion.vagina === 0) {
                        willingCurses.push('Crossdress Your Heart');
                    }
                    break;
                case setup.companionIds.lily:
                    willingCurses.push("Age Reduction A", "Age Reduction B",
                        "Asset Robustness A", "Perma-dye", "Power Dom", "Equal Opportunity");
                    break;
                case setup.companionIds.khemia:
                    willingCurses.push("Clothing Restriction A", "Clothing Restriction B",
                        "Power Dom", "Absolute Birth Control", "Pheromones");
                    if (companion.sex === 'male') {
                        willingCurses.push("Asset Robustness A", "Asset Robustness B",
                            "Asset Robustness C", "Asset Robustness D");
                    }
                    break;
                case setup.companionIds.cherry:
                    willingCurses.push("Age Reduction A", "Age Reduction B", "Fluffy Ears", "Fluffy Tail", "Omnitool",
                        "Sleep Tight", "Submissiveness Rectification A", "Submissiveness Rectification B");
                    if (companion.curses.map(c => c.name).includesAll('Fluffy Ears', 'Fluffy Tail', 'Maximum Fluff')) {
                        willingCurses.push('Literalization');
                    }
                    break;
                case setup.companionIds.cloud:
                    willingCurses.push("Age Reduction A", "Age Reduction B",
                        "Equal Opportunity", "Pheromones", "Power Dom");
                    if (companion.sex === 'male') {
                        willingCurses.push("Asset Robustness A", "Asset Robustness B");
                    }
                    break;
                case setup.companionIds.saeko:
                    willingCurses.push("Asset Robustness A", "Freckle Speckle", "Equal Opportunity",
                        "Crossdress Your Heart", "Age Reduction A", "Age Reduction B");
                    break;
            }
            let idealGender = companion.mindSex === 'male' ? 1 : 6;
            if (companion.id === setup.companionIds.maru) idealGender = 4;
            // Attempt to go back to original gender (in Maru's case go towards androgyny)
            if (companion.osex === 'male' && companion.gender < idealGender ||
                    companion.osex === "female" && companion.gender > idealGender) {
                willingCurses.push("Gender Reversal A", "Gender Reversal B",
                    "Gender Reversal C", "Gender Reversal D", "Gender Reversal E");
            }
            // Genderbent men want to get rid of their breasts
            if (companion.mindSex === 'male' && companion.penis === 0 && companion.breasts > 0) {
                willingCurses.push('Shrunken Assets');
            }
            // Women don't like body hair
            if (companion.mindSex === 'female') {
                willingCurses.push('Hair Removal');
            }
            // Genderbent companions want to get their genitals back
            let wantsOtherGenitals = false;
            // wants to replace vagina with penis
            if (companion.mindSex === 'male' && companion.penis < 1 && companion.vagina > 0) {
                wantsOtherGenitals = true;
            }
            // wants to replace penis with vagina
            if (companion.mindSex === 'female' && companion.vagina < 1 && companion.penis > 0) {
                wantsOtherGenitals = true;
            }
            if (wantsOtherGenitals) {
                willingCurses.push('Sex Switcheroo');
            }
            // If sex switcheroo is not an option, they'd take futa too
            if (State.variables.mc.curses.find(c => c.name === 'Sex Switcheroo') === undefined && wantsOtherGenitals) {
                willingCurses.push('Futa Fun');
            }
            // Men do *not* want to get pregnant.
            // Maru will take the risk though, for the opportunity to have a (non-adopted) family later.
            if (companion.mindSex === 'male' && companion.womb > 0 && companion.id !== setup.companionIds.maru) {
                willingCurses.push('Absolute Birth Control');
            }
            return willingCurses;
        }
    },
    // Puts one copy of a relic back where it was found. Only used for debugging purposes.
    returnRelic: {
        value: (relic, all=false) => {
            if (typeof relic === 'string') {
                relic = State.variables.relics.find(r => r.name === relic);
                if (!relic) {
                    console.error(`Relic ${relic} cannot be returned because it does not exist.`)
                    return;
                }
            }
            let relics = State.variables.ownedRelics;
            for (let i = relics.length - 1; i >= 0; i--) {
                if (relics[i].name === relic.name) {
                    relics.splice(i, 1);
                    if (!all) break;
                }
            }
        }
    },
    /* global Constellation */
    // eslint-disable-next-line no-unused-vars
    /* global LibidoReinforcementA, GenderReversalA, AssetRobustnessA, ClothingRestrictionA, ShrunkenAssets, HairRemoval, PermaDye, FreckleSpeckle, KnifeEar, DizzyingHeights, IncreasedSensitivity, RefractoryRefactorization, LibidoReinforcementB, GenderReversalB, AssetRobustnessB, AgeReductionA, FluffyEars, FluffyTail, MaximumFluff, HeatRut, Lightweight, SexSwitcheroo, FutaFun, BlushingVirgin, SubmissivenessRectificationA, GenderReversalC, AssetRobustnessC, ClothingRestrictionB, PowerDom, Curse2020, ComicRelief, EqualOpportunity, AbsolutePregnancy, AbsoluteBirthControl, WackyWombs, Omnitool, Gooey, RainbowSwirl, DoublePepperoni, LiteralBlushingVirgin, LibidoReinforcementC, LactationRejuvenationA, AssetRobustnessD, AgeReductionB, SleepTight, SweetDreams, HypnoHappytime, CrossdressYourHeart, LieDetector, Megadontia, Softie, HardMode, LingualLeviathan, TippingTheScales, Reptail, ColdBlooded, LibidoReinforcementD, GenderReversalD, PleasureRespecificationA, ClothingRestrictionC, MassacreManicure, DoS, DoM, HijinksEnsue, FlowerPower, Cellulose, Chlorophyll, Pheromones, Carapacian, Hemospectrum, WrigglyAntennae, Eggxellent, SubmissivenessRectificationB, LactationRejuvenationB, PleasureRespecificationB, AgeReductionC, Horny, DrawingSpades, TattooTally, Leaky, WanderingHands, SemenDemon, Quota, InTheLimelight, LibidoReinforcementE, GenderReversalE, AssetRobustnessE, UrineReamplificationA, BarterSystem, SharedSpace, Weakling, RandomOrgasms, Beastly, CreatureOfTheNight, Minishish, Colossalable, LibidoReinforcementF, GenderReversalF, AssetRobustnessF, UrineReamplificationB, EyeOnThePrize, DeafeningSilence, TaciturnTurnaround, AmpuQtie, NoseGoes, ArmArmy, ALittleExtra, Null, Seafolk, TakenForGranite, DoubleTrouble, Conjoined, LibidoReinforcementG, GenderReversalG, AssetRobustnessG, Literalization, ConsentDissent, TheMaxim, AdversePossession, Erased, TicklyTentacles, Eyescream, AMouthful, BelowTheVeil, PrincessProtocol */
    // eslint-disable-next-line no-unused-vars
    /* global NotGrowingReq, NotShrinkingReq, HasPenisReq, HasVaginaReq */
    getCurseSets: {
        /**
         * Gets the game-defined list of curse sets.
         * @returns {Constellation[]} A list of Constellations.
         */
        value: () => {
            // noinspection JSNonASCIINames
            return [
                new Constellation('Pet',
                                  [
                                      new FluffyEars('furry cat'),
                                      new FluffyTail('flowing cat'),
                                      new SharedSpace(),
                                      new HairRemoval(),
                                      new SleepTight(),
                                      new ClothingRestrictionB(),
                                      new ClothingRestrictionC(),
                                      new DizzyingHeights(-1),
                                      new DizzyingHeights(-1),
                                      new DizzyingHeights(-1),
                                      new DizzyingHeights(-1),
                                      new DizzyingHeights(-1),
                                      new BarterSystem(),
                                      new SubmissivenessRectificationA(),
                                      new HeatRut(),
                                      new IncreasedSensitivity(),
                                      new ShrunkenAssets(),
                                      new AgeReductionB(),
                                      new RainbowSwirl('lightly tanned', 'deep blue'),
                                      new Chlorophyll(),
                                      new EqualOpportunity(),
                                      new ComicRelief(),
                                      new ColdBlooded(),
                                      new Erased(),
                                      new Omnitool(),
                                      new Pheromones(),
                                  ],
                                  `This constellation turns cursed persons into a human pet (inspired by cats). 
Curse explanations: 
 - fluffy ears/tail — aesthetic.
 - Shared Space — pets don't get personal space.
 - Hair Removal — aesthetic.
 - Sleep Tight — pets lounge around and sleep everywhere.
 - Clothing Restriction C/B — pets don't wear clothes.
 - Dizzying Heights — pets tend to be small.
 - Barter System — pets don't have money.
 - Submissiveness Rectification A — pets (mostly) obey their owners.
 - Heat/Rut — pets go into heat sometimes.
 - Increased Sensitivity — pets like it when people pet them.
 - Shrunken Assets — a pet with huge breasts just looks weird.
 - Age Reduction B — a pet that looks like a 50 year old just looks weird. This curse ensures age 20 or less.
 - Rainbow Swirl — needed to negate the skin-changing effect of the next curse.
 - Chlorophyll — pets like to lounge in the sun.
 - Equal Opportunity — pets don't distinguish between human genders.
 - Comic Relief — nobody would take a pet seriously.
 - Cold Blooded — pets like to cuddle and sleep in the sun.
 - Erased — nobody remembers a time when this pet wasn't a pet.
 - Omnitool — pets give birth to pets.
 - Pheromones — pets like getting attention from people around them.`,
                                  [new NotGrowingReq()]),
                new Constellation('Pet — beastly',
                                  [
                                      new FluffyEars('furry cat'),
                                      new FluffyTail('flowing cat'),
                                      new MaximumFluff('cat-furred'),
                                      new PermaDye('mottled black and white'),
                                      new SharedSpace(),
                                      new ClothingRestrictionA(),
                                      new ClothingRestrictionB(),
                                      new ClothingRestrictionC(),
                                      new BarterSystem(),
                                      new HeatRut(),
                                      new ComicRelief(),
                                      new Omnitool(),
                                      new Erased(),
                                      new Megadontia(),
                                      new Beastly(),
                                  ],
                                  `This constellation turns people into a pet. 
Unlike the Pet constellation, this one is focused more on making them animal-like than on treatment by others.
Most curses should be fairly self-explanatory.
A few that might not be:
 - Comic Relief: People don't take animals seriously.
 - Erased: animals have always been animals.`),
                new Constellation('Eldritch',
                                  [
                                      new Erased(),
                                      new ClothingRestrictionC(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new TicklyTentacles(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new Eyescream(),
                                      new AMouthful(),
                                      new AMouthful(),
                                      new AMouthful(),
                                      new AMouthful(),
                                      new AMouthful(),
                                      new BelowTheVeil(),
                                  ],
                                  `This constellation turns people into an eldritch being. 
The curses should be pretty self-explanatory.
Clothing restriction C is there to people from hiding themselves.`),
                new Constellation('Sex Slave',
                                  [
                                      new LibidoReinforcementA(),
                                      new LibidoReinforcementB(),
                                      new LibidoReinforcementC(),
                                      new ClothingRestrictionC(),
                                      new HairRemoval(),
                                      new KnifeEar(),
                                      new IncreasedSensitivity(),
                                      new RefractoryRefactorization(),
                                      new AgeReductionA(),
                                      new Lightweight(),
                                      new LiteralBlushingVirgin(),
                                      new SubmissivenessRectificationA(),
                                      new SubmissivenessRectificationB(),
                                      new ComicRelief(),
                                      new EqualOpportunity(),
                                      new AbsoluteBirthControl(),
                                      new HypnoHappytime(),
                                      new LieDetector(),
                                      new HardMode(),
                                      new LingualLeviathan(),
                                      new ColdBlooded(),
                                      new PleasureRespecificationA(),
                                      new DoM(),
                                      new Pheromones(),
                                      new Leaky(),
                                      new WanderingHands(),
                                      new Quota(),
                                      new BarterSystem(),
                                      new SharedSpace(),
                                      new Weakling(),
                                      new RandomOrgasms(),
                                      // The genital field is only used if the character has both genitals, so this is
                                      // safe even if a man takes this constellation.
                                      new ALittleExtra('vagina'),
                                      new Erased(),
                                  ],
                                  `This constellation turns people into perfect sex slaves.
Explanations for a few of the curses:
 - Knife-ear is optional, for masters who like that sort of thing.
 - One level of age reduction ensures you don't get old sex slaves. Masters with certain preferences might prefer a slave with the other levels too.
 - Lightweight makes slaves more receptive to aphrodisiacs and other drugs.
 - Literal Blushing Virgins are valued by some, though perhaps off-putting to others. Up to the master's preference.
 - Cold Blooded gives slaves an incentive to stay with their master(s) at night AND makes it harder to escape, especially in winter.
 - Libido reinforcements mean they're going to want a lot of sex, and Pleasure Respecification A means they'll want it with their master instead of taking care of it themselves.
 - DoM does unfortunately decrease pleasure from other sources a bit, but it is assumed the increased sensitivity and other curses make up for it.
 - Quota also makes them proactively try to please their masters and provides ulterior obstacles to escaping.
 - Barter System because slaves don't own property.
 - Erased avoids complications with wannabe rescuers from the slave's past.
 Optionally add Consent Dissent.
 Optionally add Fluffy Ears and Tail (Fluffy Ears will override Knife-ear).`),
                new Constellation('Trans',
                                  [
                                      new GenderReversalA(),
                                      new GenderReversalB(),
                                      new GenderReversalC(),
                                      new GenderReversalD(),
                                      new GenderReversalE(),
                                      new SexSwitcheroo(),
                                  ],
                                  `This constellation flips the cursed person's sex and gender.`),
                new Constellation('Statue',
                                  [
                                      new LibidoReinforcementA(),
                                      new LibidoReinforcementB(),
                                      new LibidoReinforcementC(),
                                      new LibidoReinforcementD(),
                                      new ClothingRestrictionA(),
                                      new ClothingRestrictionB(),
                                      new ClothingRestrictionC(),
                                      new HairRemoval(),
                                      new PermaDye('asbestos-white'),
                                      new IncreasedSensitivity(),
                                      new RefractoryRefactorization(),
                                      new HeatRut(),
                                      new SubmissivenessRectificationA(),
                                      new SubmissivenessRectificationB(),
                                      new EqualOpportunity(),
                                      new AbsoluteBirthControl(),
                                      new RainbowSwirl('granite-grey', 'quartz-white'),
                                      new SweetDreams(),
                                      new HardMode(),
                                      new HijinksEnsue(),
                                      new Pheromones(),
                                      new TattooTally(),
                                      new WanderingHands(),
                                      new Quota(),
                                      new InTheLimelight(),
                                      new InTheLimelight(),
                                      new InTheLimelight(),
                                      new InTheLimelight(),
                                      new SharedSpace(),
                                      new RandomOrgasms(),
                                      new RandomOrgasms(),
                                      new RandomOrgasms(),
                                      new RandomOrgasms(),
                                      new RandomOrgasms(),
                                      new ALittleExtra('vagina'),
                                      new TakenForGranite(),
                                      new TheMaxim('vagina'),
                                  ],
                                  `This constellation turns people into statues.
All the curses that make them orgasm a lot, combined with Taken for Granite.
A few extra explanations:
 - Tattoo Tally doesn't really serve a function, it just makes sense for a statue to be scribbled on.
 - The Maxim is genital-specific, so this constellation assumes the statue is female. Take Futa Fun or Sex Switcheroo first if that is not the case.`,
                                  [new HasVaginaReq()])
            ];
        }
    },
    getUserCurseSets: {
        /**
         * Gets the user-defined list of curse sets.
         * @returns {Constellation[]} A list of constellations.
         */
        value: () => {
            let jsonSets = localStorage.getItem('abyss-diver-user-defined-curse-sets');
            if (jsonSets === null) return [];
            /** @type {Constellation[]} */
            let objSets = JSON.parse(jsonSets);
            for (let set of objSets) {
                for (let curse of set.curses) {
                    curse.time = State.variables.time;
                }
            }
            return objSets;
        }
    },
    setUserCurseSets: {
        /**
         * Stores the given curse sets in local storage.
         * @param {Constellation[]} sets
         */
        value: (sets) => {
            try {
                localStorage.setItem('abyss-diver-user-defined-curse-sets', JSON.stringify(sets));
            } catch (ex) {
                return false;
            }
            return true;
        }
    },
    addUserCurseSet: {
        /**
         * Adds a curse set to the user-defined list.
         * If the set with the given name already exists, it is replaced.
         * @param {Constellation} constellation The constellation to add or replace.
         * @return {boolean} true iff the changed set has been saved successfully.
         */
        value: (constellation) => {
            for (let curse of constellation.curses) {
                // unset the height change direction since user constellations don't have requirements.
                if (curse instanceof DizzyingHeights) curse.direction = 0;
            }
            let sets = setup.getUserCurseSets();
            let replaced = sets.find(c => c.name === constellation.name);
            if (replaced !== undefined) sets.delete(replaced);
            sets.push(constellation);
            return setup.setUserCurseSets(sets);
        }
    },
    removeUserCurseSet: {
        /**
         * Removes the curse set with the given name, if it exists.
         * @param {string} name The name of the set to remove.
         */
        value: (name) => {
            let sets = setup.getUserCurseSets();
            sets.deleteWith(c => c.name === name);
            return setup.setUserCurseSets(sets);
        }
    },
    // used by the print widget to temporarily store the elements to be printed
    printWidgetCache: {
        value: {}
    },
});

Object.defineProperties(JSON, {
    tryParse: {
        /**
         * Returns the parsed object if successful and false otherwise.
         * @param {string} jsonString The string to parse
         * @returns {any|false} The parsed object or false
         */
        value: jsonString => {
            try {
                let res = JSON.parse(jsonString);
                if (res !== null && typeof res === 'object') {
                    return res;
                }
            } catch (e) { /* empty */ }
            return false;
        }
    }
})
