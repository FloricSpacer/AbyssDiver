Config.navigation.override = function (destPassage) {
	var StoryVar = State.variables;
	if (StoryVar.brokerUsed == 1 && StoryVar.corruption < 0) {
		return "BrokerEnd";
	}
	if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.app.appAge) && StoryVar.app.appAge < 10 && StoryVar.dollevent2==false){
		return "DollWarning";
	}
	if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && isFinite(StoryVar.app.appAge) && StoryVar.app.appAge < 4 && StoryVar.dollevent2==true){
		return "DollEnd";
	}
	if (StoryVar.app.age < 18) {
		return "AgeLimit";
	}
	if (StoryVar.starving >= 6 || StoryVar.dehydrated >= 3 || StoryVar.gameOver) {
		return "GameOver";
	}
	if (StoryVar.time >= StoryVar.due) {
		return "Labor Scene";
	}
	if (StoryVar.time - StoryVar.companionMaru.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionMaru.name
		StoryVar.MaruConvoPreg = false
		StoryVar.companionMaru.pregnantT = 9999
		StoryVar.lastBirthMaru = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionLily.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionLily.name
		StoryVar.LilyConvoPreg = false
		StoryVar.companionLily.pregnantT = 9999
		StoryVar.lastBirthLily = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionKhemia.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionKhemia.name
		StoryVar.KhemiaConvoPreg = false
		StoryVar.companionKhemia.pregnantT = 9999
		StoryVar.lastBirthKhemia = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionCherry.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionCherry.name
		StoryVar.CherryConvoPreg = false
		StoryVar.companionCherry.pregnantT = 9999
		StoryVar.lastBirthCherry = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionCloud.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionCloud.name
		StoryVar.CloudConvoPreg = false
		StoryVar.companionCloud.pregnantT = 9999
		StoryVar.lastBirthCloud = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionSaeko.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionSaeko.name
		StoryVar.SaekoConvoPreg = false
		StoryVar.companionSaeko.pregnantT = 9999
		StoryVar.lastBirthSaeko = StoryVar.time
		return "Labor Scene Companion";
	}
	if (StoryVar.time - StoryVar.companionTwin.pregnantT >= 280) {
		StoryVar.companionLabor = StoryVar.companionTwin.name
		StoryVar.TwinConvoPreg = false
		StoryVar.companionTwin.pregnantT = 9999
		StoryVar.lastBirthTwin = StoryVar.time
		return "Labor Scene Companion";
	}
	if (isFinite(StoryVar.app.appAge) && StoryVar.app.appAge < 3 && StoryVar.app.age > 17) {
		return "AgeEnd";
	}
	if (StoryVar.companionMaru.affec < -9 && !StoryVar.companionMaru.swap && StoryVar.hiredCompanions.some(e => e.name === "Maru")) {
		return "Maru Leaving";
	}
	if (StoryVar.companionLily.affec < -9 && !StoryVar.companionLily.swap && StoryVar.hiredCompanions.some(e => e.name === "Lily")) {
		return "Lily Leaving";
	}
	if (StoryVar.companionKhemia.affec < -9 && !StoryVar.companionKhemia.swap && StoryVar.hiredCompanions.some(e => e.name === "Khemia")) {
		return "Khemia Leaving";
	}
	if (StoryVar.companionCherry.affec < -15 && !StoryVar.companionCherry.swap && StoryVar.hiredCompanions.some(e => e.name === "Cherry")) {
		return "Cherry Leaving";
	}
	if (StoryVar.companionCloud.affec < -9 && !StoryVar.companionCloud.swap && StoryVar.hiredCompanions.some(e => e.name === "Cloud")) {
		return "Cloud Leaving";
	}
	if (StoryVar.companionSaeko.affec < -9 && !StoryVar.companionSaeko.swap && StoryVar.hiredCompanions.some(e => e.name === "Saeko")) {
		return "Saeko Leaving";
	}
	return destPassage;
};

Config.history.maxStates = 20;

$(document).on(':passagestart', () => {
	// Get a reference to the active story variables store.
	const vars = variables();

	/* ---- Companion object identity ---- */

	// Get name of twin so we don't have to look it up each time.
	const twinName = vars.companionTwin.name;

	// Get all the companion array variables.
	const companionArrays = [
		'companions',
		'hiredCompanions',
		'DesertedCompanions',
	].map(varName => vars[varName]);

	// Restore object identity between elements of companion arrays and $companionName variables.
	for (const companions of companionArrays) {
		for (const [i, companion] of companions.entries()) {
			const name = companion.name != twinName ? companion.name : "Twin";
			const companionVar = vars[`companion${name}`];
			if (companionVar) {
				companions[i] = companionVar;
			} else {
				console.error(`Couldn't find named companion variable for companion with name ${companion.name}!`);
			}
		}
	}

	/* ---- Curse object identity ---- */

	// Get all numbered curse variables.
	const curseVars = Object.keys(vars).filter(key => /curse\d+/.test(key)).map(key => vars[key]);

	// Get all the curse array variables.
	const miscCurseArrays = [
		'curses',
		'playerCurses',
		'StoredCurse',
		'ManagedMisfortuneActive',
	].map(varName => vars[varName]);
	const companionCurseArrays = vars.companions.map(companion => companion.curses);
	const curseArrays = miscCurseArrays.concat(companionCurseArrays);

	// Restore object identity between elements of curse arrays and $curseN variables.
	// Note: Change this if curses become instanced.
	for (const curses of curseArrays) {
		for (const [i, curse] of curses.entries()) {
			const curseVar = curseVars.find(curseVar => curse.name == curseVar.name);
			if (curseVar) {
				curses[i] = curseVar;
			} else {
				console.error(`Couldn't find numbered curse variable for curse with name ${curse.name}!`);
			}
		}
	}

	// Restore object identity between $app.curses, $companionTwin.curses and $playerCurses.
	for (const target of ['app', 'companionTwin']) {
		vars[target].curses = vars.playerCurses;
	}

	// Restore object identity between twin curse logs and mc curse logs.
	for (const type of ['Height', 'Gender', 'Age', 'Libido', 'Handicap']) {
		vars[`${type}LogTwin`] = vars[`${type}Log`];
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
			const relicVar = relicVars.find(relicVar => relic.name == relicVar.name);
			if (relicVar) {
				relics[i] = relicVar;
			} else {
				console.error(`Couldn't find numbered relic variable for relic with name ${relic.name}!`);
			}
		}
	}
});

predisplay["Menu Return"] = function (taskName) {
	if (! tags().contains("noreturn")) {
		State.variables.menuReturn = passage();
	}
};
predisplay["Layer Return"] = function (taskName) {
	if (tags().some(t => t === "surface" || t.startsWith("layer"))) {
		State.variables.layerReturn = passage();
	}
	if (State.variables.comBalloon) {
		$(document.body).addClass("balloon");
	} else if (State.variables.layerReturn) {
		for (var tag of tags(State.variables.layerReturn)) {
			if (tag === "surface" || tag.startsWith("layer")) {
				$(document.body).addClass(tag);
			}
		}
	}
};

if ((0 || 0 || 0)) {
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
			let person = this.args[0];
			let output = '<div class="say clearfix" style="'+ person.style + person.style1 +'">';
			output += '<div class="avatar"><img src="'+ setup.ImagePath + person.imageIcon +'"  width="100" height="100"></div>';
			output += '<span class="say-nameB">' + person.name + '</span><hr><span class="say-contents"><span class ="gdr' +person.genderVoice+'">' + this.payload[0].contents + '</span></span></div>';
			$(this.output).wiki(output);
		}
});

Setting.addHeader("Content Settings");

Setting.addToggle("MaleSceneToggleFilter", {
	label : "Enable random sex scences involving male characters",
	default  : 1,
});

Setting.addToggle("FemaleSceneToggleFilter", {
	label : "Enable random sex scences involving female characters",
	default  : 1,
});

Setting.addToggle("OtherSceneToggleFilter", {
	label : "Enable random sex scences involving futa characters or characters without genitals",
	default  : 1,
});

Setting.addToggle("MenCycleToggleFilter", {
	label : "Hide messages containing information about your menstrual cycle ",
	default  : 1,
});

Setting.addRange("appAgeControl", {
	label    : "Minimum age your physical body can regress to (3-18):",
	min      : 3,
	default  : 3,
	max      : 18,
	step     : 1,
});

function findByName(variable, name) {
	return variables()[variable].find(obj => obj.name == name);
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

Object.defineProperties(setup, {
	// Get curse by name.
	curse: {
		value: name => findByName('curses', name),
	},
	// Get curses by names.
	curses: {
		value: names => findByNames('curses', names),
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
	// Get companion by name (note: internal name, like "Twin").
	companion: {
		value: name => variables()[`companion${name}`],
	},
	// Get companions by name (note: internal name, like "Twin").
	companions: {
		value: names => names.map(setup.companion),
	},
	// Count the number of instances of a Curse active on the main character.
	activeCurseCount: {
		value: name => variables().playerCurses.filter(curse => curse.name == name).length,
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
	// Sell a relic (dubloon reward optional).
	sellRelic: {
		value: (relicOrNameOrIndex, dubloonReward) => {
			const vars = variables();
			let relic, name, index;
			switch (typeof relicOrNameOrIndex) {
				case 'string':
					name = relicOrNameOrIndex;
					index = vars.ownedRelics.findIndex(relic => relic.name == name);
					if (index >= 0) {
						relic = vars.ownedRelics[index];
					} else {
						console.error(`Relic '${name}' not found in $ownedRelics!`);
					}
					break;
				case 'number':
					index = relicOrNameOrIndex;
					if (0 <= index && index < vars.ownedRelics.length) {
						relic = vars.ownedRelics[index];
						name = relic.name;
					} else {
						console.error(`${index} is not a valid index in $ownedRelics!`);
					}
					break;
				default:
					relic = relicOrNameOrIndex;
					if (relic) {
						name = relic.name;
						index = vars.ownedRelics.findIndex(relic => relic.name == name);
						if (index < 0) console.error(`Relic '${name}' not found in $ownedRelics!`);
					} else {
						console.error('Passed relic was undefined!');
					}
			}
			if (0 <= index && index < vars.ownedRelics.length) vars.ownedRelics.splice(index, 1);
			if (relic) vars.soldRelics.push(relic);
			if (dubloonReward) vars.dubloons += dubloonReward;
		},
	},
	// Unsell a relic (dubloon cost optional).
	unsellRelic: {
		value: (relicOrName, dubloonCost) => {
			const vars = variables();
			let relic, name, index;
			if (typeof relicOrName == 'string') {
				name = relicOrName;
				index = vars.soldRelics.findLastIndex(relic => relic.name == name);
				if (index >= 0) {
					relic = vars.soldRelics[index];
				} else {
					relic = vars.relics.findLast(relic => relic.name == name);
				}
				if (!relic) console.error(`Relic '${name}' does not exist!`);
			} else {
				relic = relicOrName;
				if (relic) {
					name = relic.name;
					index = vars.soldRelics.findLastIndex(relic => relic.name == name);
				} else {
					console.error('Passed relic was undefined!');
				}
			}
			if (index >= 0) vars.soldRelics.splice(index, 1);
			if (relic) vars.ownedRelics.push(relic);
			if (dubloonCost) vars.dubloons -= dubloonCost;
		},
	},
});
