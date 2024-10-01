
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

/*
	===============================================
	OPENAI DALLE GENERATOR
	===============================================
*/

setup.evaluateDalleCharacterDescription = function(mc) {
	let description = ``;
	if (mc.sex === "male") {
		description += "The character is a male. ";
	} else if (mc.sex === "female") {
		description += "The character is a female. ";
	} else {
		description += "";
	};

	description += `${mc.hair} colored hair. `;
	description += `${mc.eyeColor} colored eyes. `;
	description += `${mc.skinType} ${mc.skinColor} colored skin. `;

	if (mc.ears != "normal human") description += `${mc.ears} ears. `;

	if (mc.appAge < 15) {
		description += `A child. `;
	} else if (mc.appAge < 20) {
		description += `A teenager. `;
	} else if (mc.appAge < 30) {
		description += `A young adult. `;
	} else if (mc.appAge < 45) {
		description += `An adult. `;
	} else if (mc.appAge < 55) {
		description += `A middle-aged adult. `;
	} else if (mc.appAge < 65) {
		description += `And older adult. `;
	} else {
		description += `And elderly adult. `;
	}

	if (mc.subdom > 0) {
		description += "with a very shy body posture. ";
	} else if (mc.subdom < 0) {
		description += "with a very strong body posture. ";
	}

	if (mc.hasCurse("Horny")) {
		// Ensure these variables are defined
		let hornCount = state.variables.hornCount || 0; // Adjust as needed
		let hornAdjective = state.variables.hornAdjective || ""; // Adjust as needed
		let hornVariation = state.variables.hornVariation || ""; // Adjust as needed
		description += `with ${(hornCount === 1) ? "a" : "two"} noticeable ${hornAdjective} ${hornVariation} horn${(hornCount > 1) ? "s" : ""}. `;
	}

	// Gender and physical appearance
	switch(mc.gender) {
		case 1: description += "A masculine man. "; break;
		case 2: description += "A feminine man (twink, femboy). "; break;
		case 3: description += "A very androgynous man. "; break;
		case 4: description += "A very androgynous woman. "; break;
		case 5: description += "A masculine woman (tomboy). "; break;
		case 6: description += "A feminine woman. "; break;
	}

	// Breast size
	if (mc.breastsCor < 1 && mc.vagina === 0) {
		description += "";
	} else if (mc.breastsCor < 1 && mc.vagina === 1) {
		description += "with a totally flat chest. ";
	} else if (mc.breastsCor < 6) {
		description += "";
	} else {
		description += "with an abnormally large chest. ";
	}

	// Additional conditions
	if (mc.dollevent2) description += "Wearing a tattered pink dress, resembling a child's doll. ";

	// Pregnancy
	const pregnantDays = setup.daysConsideredPregnant(mc);
	if (120 <= pregnantDays && pregnantDays < 180) {
		description += mc.menFirstCycle ? "A noticeable pregnancy bump. " : "A small pregnancy bump. ";
	} else if (180 <= pregnantDays && pregnantDays < 240) {
		description += "A large pregnancy bump. ";
	} else if (pregnantDays >= 240 && setup.daysUntilDue(mc) > 0) {
		description += "A huge pregnancy belly. ";
	}

	// Curses and conditions
	if (mc.hasCurse("Freckle Speckle")) description += "Many freckles. ";
	if (mc.hasCurse("20/20000000")) description += "Wearing thick glasses. ";
	if (mc.hasCurse("Gooey")) description += "A slime person, transluscent slime-skinned. ";
	if (mc.hasCurse("Crossdress Your Heart")) description += "Crossdressing as the opposite gender. ";
	if (mc.hasCurse("Lingual Leviathan")) description += "A very long tongue sticking out. ";
	if (mc.hasCurse("Massacre Manicure")) description += "Abnormally sharp and long fingernails. ";
	if (mc.hasCurse("Flower Power")) description += "Covered in flowers. ";
	if (mc.hasCurse("Cellulose")) description += "Made of living plant matter, like a dryad. ";
	if (mc.hasCurse("Wriggly Antennae")) description += "Wriggly insect antennae on forehead. ";
	if (mc.hasCurse("Carapacian")) description += "Covered in an insect-like carapac. ";
	if (mc.hasCurse("Creature of the Night")) description += "A vampire, with vampire fangs. ";
	if (mc.hasCurse("Minish-ish")) description += `Very tiny, only a few inches tall. `;
	if (mc.hasCurse("Colossal-able")) description += `Enormous, asbolutely giant. `;
	if (mc.hasCurse("Seafolk")) description += "A merfolk with a merfolk tail. ";
	if (mc.hasCurse("Tickly Tentacles")) description += `${mc.tentacles} squirming tentacles growing from their body. `;
	if (mc.hasCurse("Eye-scream")) description += `${mc.extraEyes} extra eyes on their body. `;
	if (mc.hasCurse("A Mouthful")) description += `${mc.extraMouths} extra mouths on their body. `;
	if (mc.hasCurse("Below the Veil")) description += "A strange, eldritch entity that seems very creepy and *wrong* in subtle ways. ";

	return description;
};

setup.openAI_InvokeDalleGenerator = async function(prompt) {
	const apiKey = settings.OpenAIAPIKey;

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${apiKey}`
	}

	const body = JSON.stringify({
		model: 'dall-e-3',
		prompt: prompt,
		n: 1,
		size: "1024x1024",
		response_format: "b64_json"
	})

	const response = await fetch('https://api.openai.com/v1/images/generations', {
		method: 'POST',
		headers: headers,
		body: body
	});

	if (!response.ok) {
		throw new Error('Failed to connect to OpenAI. Please check your API key and network connection and try again. If those are both correct, this may be due to a content policy error from OpenAI.');
	}

	const data = await response.json();

	// Debugging: Inspect the structure of the response
	console.log(data);

	if (data.data && data.data.length > 0) {
		/*
			const imageUrl = data.data[0].url;
			$("#dalleImage").attr("src", imageUrl);
		*/
		const base64Image = data.data[0].b64_json;
		console.log("Base64 Data Length: ", base64Image ? base64Image.length : "undefined");
		setup.storeImage("playerPortrait", base64Image)
			.then(() => console.log('Image successfully stored.'))
			.catch((error) => console.error('Failed to store image:', error));
	} else {
		console.error('No images returned:', data);
		throw new Error('No images returned from server. This is likely due to a content policy error or server error from OpenAI.');
	}
}

setup.openAI_GenerateDallePortrait = async function() {
	// Notification element
	const notificationElement = document.getElementById('notification');

	// Static part of the prompt
	let staticPrompt = "Create an anime-inspired digital painting of a single character with each of the following traits. You must keep in mind every physical trait below. You must use an *anime-inspired digital painting* style. The character is an adventurer and the background of the scene is the Abyss from MiA. Do NOT use the word character in the final prompt.\n\nCharacter traits:\n";

	// Dynamically generated character description
	let characterDescription = setup.evaluateDalleCharacterDescription(State.variables.mc); // Assuming $mc is stored in State.variables.mc

	// Concatenate the static prompt with the dynamic description
	const prompt = staticPrompt + characterDescription;

	try {
		await setup.openAI_InvokeDalleGenerator(prompt);
		notificationElement.style.display = 'hidden';
	} catch (error) {
		console.error('Error generating image:', error);
		notificationElement.style.display = 'block';
		notificationElement.textContent = 'Error generating image: ' + error.message + (error.response ? (await error.response.json()).error : 'No additional error information from OpenAI.');
	}
}
/*
	===============================================
	ENTRY POINT
	===============================================
*/

setup.call_PortraitImageGenerator = async function() {
	await setup.openAI_GenerateDallePortrait();
}
