Config.navigation.override = function (destPassage) {
	var StoryVar = State.variables;
	if (StoryVar.brokerUsed == 1 && StoryVar.corruption < 0) {
		return "BrokerEnd";
	}
	if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && StoryVar.app.appAge < 8 && StoryVar.dollevent2==false){
		return "DollWarning";
	}
	if (StoryVar.ownedRelics.some(e => e.name === "Creepy Doll") && StoryVar.app.appAge < 4 && StoryVar.dollevent2==true){
		return "DollEnd";
	}
	if (StoryVar.app.age < 18) {
		return "AgeLimit";
	}
	if (StoryVar.items[1].count <= -6 || (StoryVar.items[0].count + StoryVar.items[3].count) <= -3 || StoryVar.gameOver) {
		return "GameOver";
	}
	if (StoryVar.app.appAge < 3 && StoryVar.app.age > 17) {
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
	if (StoryVar.companionCherry.affec < -12 && !StoryVar.companionCherry.swap && StoryVar.hiredCompanions.some(e => e.name === "Cherry")) {
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
