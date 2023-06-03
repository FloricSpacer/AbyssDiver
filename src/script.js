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
	// Get name of twin so we don't have to look it up each time.
	const twinName = vars.companionTwin.name;
	// Restore object identity between $companions array and $companionName variables.
	const companions = vars.companions;
	for (const [i, companion] of companions.entries()) {
		const name = companion.name != twinName ? companion.name : "Twin";
		companions[i] = vars[`companion${name}`];
	}
	// Restore object identity between $hiredCompanions array and $companionName variables.
	const hiredCompanions = vars.hiredCompanions;
	for (const [i, hiredCompanion] of hiredCompanions.entries()) {
		const name = hiredCompanion.name != twinName ? hiredCompanion.name : "Twin";
		hiredCompanions[i] = vars[`companion${name}`];
	}
	// Restore object identity between $app.curses and $playerCurses.
	vars.app.curses = vars.playerCurses;	
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

