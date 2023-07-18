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
    if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 10 && !StoryVar.dollevent2){
        return "DollWarning";
    }
    if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 4 && StoryVar.dollevent2){
        return "DollEnd";
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
    if (StoryVar.companionBandit.affec < -8 && StoryVar.escapeT < StoryVar.time && !StoryVar.companionBandit.swap) {
        StoryVar.escapeT = StoryVar.time + 7 + random(0,7);
        return "Bandit Escape";
    }
    if (StoryVar.currentLayer === 0 && StoryVar.mc.imageIcon === "Icons/BanditIcon_released.jpg" &&
        StoryVar.mc.inhuman < 6 && StoryVar.mc.appAge > 12 && !StoryVar.arrested) {
        return "Bandit Arrested";
    }
    if (isFinite(StoryVar.mc.appAge) && StoryVar.mc.appAge < 3 && StoryVar.mc.age > 17) {
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
$(document).on(':passagestart', () => {
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
        get: () => checkAvailability(['Flashlight'], ['Sunbeam', 'Glare Vantage'], ['light', 'BDwear']) || setup.haveSmartphone,
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
        get: () => checkAvailability(['Notepad and pen'], null, ['notepad']) || setup.haveSmartphone,
    },
    // Check whether the player has a rope or equivalent.
    haveRope: {
        get: () => checkAvailability(['Rope'], ['Orbweaver'], ['rope']),
    },
    // Check whether the player has protection from cold.
    haveColdProtection: {
        get: () => {
            const vars = variables();
            return Boolean(vars.heatOverride || vars.slwear || (vars.warmCloth && !vars.dollevent2));
        },
    },
    // Check whether the player has protection from heat.
    haveHeatProtection: {
        get: () => {
            const vars = variables();
            return Boolean(vars.coolOverride || vars.slwear || (vars.coolCloth && !vars.dollevent2));
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
            // men do *not* want to get pregnant.
            // Maru will take the risk though, for the opportunity to have a (non-adopted) family later.
            if (companion.mindSex === 'male' && companion.womb > 0 && companion.id !== setup.companionIds.maru) {
                willingCurses.push('Absolute Birth Control');
            }
            return willingCurses;
        }
    },
    // puts one copy of a relic back where it was found. Only used for debugging purposes.
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
    }
});
