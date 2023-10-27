/**
 * Returns true iff the "speedrun" requirement of the smaragdine tablet would be satisfied if the player picks it up
 * right now, i.e. if there are at least 600 days left in the spectre of the end's timer.
 * @return {boolean} true iff the "speedrun" requirement of the smaragdine tablet is satisfied
 */
function tabletSpeedrun() {
	return (900 - State.variables.time + State.variables.endSpectre) >= 600 || State.variables.endSpectre < 0;
}

/**
 * Returns true iff the "world record" requirement of the smaragdine tablet would be satisfied if the player picks it up
 * right now, i.e. if there are at least 600 days left in the spectre of the end's timer.
 * @return {boolean} true iff the "world record" requirement of the smaragdine tablet is satisfied
 */
function tabletWorldRecord() {
	return (900 - State.variables.time + State.variables.endSpectre) >= 710 || State.variables.endSpectre < 0;
}

/**
 * Returns true iff the "TAS" requirement of the smaragdine tablet would be satisfied if the player picks it up
 * right now, i.e. if there are at least 600 days left in the spectre of the end's timer.
 * @return {boolean} true iff the "TAS" requirement of the smaragdine tablet is satisfied
 */
function tabletTAS() {
	return (900 - State.variables.time + State.variables.endSpectre) >= 750 || State.variables.endSpectre < 0;
}

/**
 * Returns true iff the "OTP" requirement of the smaragdine tablet would be satisfied if the player picks it up right
 * now, i.e. if there is exactly one hired companion.
 * @return {boolean} true iff the "OTP" requirement of the smaragdine tablet is satisfied
 */
function tabletOTP() {
	return State.variables.hiredCompanions
	            .concat(State.variables.DesertedCompanions)
	            .concat(State.variables.LostCompanions)
	            .filter(c => ![setup.companionIds.ai,
	                           setup.companionIds.twin,
	                           setup.companionIds.bandit,
	                           setup.companionIds.golem].includes(c.id)).length === 1;
}

/**
 * Returns true iff the "Single Player" requirement of the smaragdine tablet would be satisfied if the player picks it up right
 * now, i.e. if there is no hired companion.
 * @return {boolean} true iff the "Single Player" requirement of the smaragdine tablet is satisfied
 */
function tabletSinglePlayer() {
	return State.variables.hiredCompanions
	            .concat(State.variables.DesertedCompanions)
	            .concat(State.variables.LostCompanions)
	            .filter(c => ![setup.companionIds.ai,
	                           setup.companionIds.twin,
	                           setup.companionIds.bandit,
	                           setup.companionIds.golem].includes(c.id)).length === 0;
}

/**
 * Returns true iff the "Gourmet" requirement of the smaragdine tablet is satisfied, i.e. if they ate one of every
 * food or drink in the game.
 * @return {boolean} true iff the "Gourmet" requirement of the smaragdine tablet is satisfied
 */
function tabletGourmet() {
	return Object.getOwnPropertyNames(State.variables.smaragdineFoodConsumed)
	             .map(p => State.variables.smaragdineFoodConsumed[p])
	             .reduce((a, b) => a && b, true) &&
	       Object.getOwnPropertyNames(State.variables)
	             .filter(p => p.startsWith('waterL') && p !== 'waterL7')
	             .map(p => State.variables[p] > 0)
	             .reduce((a, b) => a && b, true) &&
	       Object.getOwnPropertyNames(State.variables)
	             .filter(p => p.startsWith('foodL') && p !== 'foodL7')
	             .map(p => State.variables[p] > 0)
	             .reduce((a, b) => a && b, true);
}

/**
 * Returns true iff the "Danger Fetish" requirement of the smaragdine tablet is satisfied, i.e. if they have been
 * defeated by every rapey threat.
 * @return {boolean} true iff the "Danger Fetish" requirement of the smaragdine tablet is satisfied
 */
function tabletDangerFetish() {
	return Object.getOwnPropertyNames(State.variables.smaragdineThreatsSubmitted)
	             .map(p => State.variables.smaragdineThreatsSubmitted[p])
	             .reduce((a, b) => a && b, true);
}

/**
 * Returns true iff the "Abyssal Champion" requirement of the smaragdine tablet is satisfied, i.e. if they have
 * defeated every defeatable threat at least once. Note that the original smaragdine tablet does not mention layer 7's
 * threats (the tax drone and security robot) and the Elder, even though these can't be realistically defeated.
 * This implementation does not require them to be defeated.
 * @return {boolean} true iff the "Abyssal Champion" requirement of the smaragdine tablet is satisfied
 */
function tabletAbyssalChampion() {
	return Object.getOwnPropertyNames(State.variables.smaragdineThreatsDefeated)
	             .map(p => State.variables.smaragdineThreatsDefeated[p])
	             .reduce((a, b) => a && b, true) &&
	       State.variables.dragonKill > 0 &&
		   State.variables.L8T1_counter > 0;
}

/**
 * Returns true iff the "Collector" requirement of the smaragdine tablet is satisfied, i.e. if at least half of
 * all relics have been collected
 * @return {boolean} true iff the "Collector" requirement of the smaragdine tablet is satisfied
 */
function tabletCollector() {
	/** @type [] */
	let collectedRelics = State.variables.ownedRelics.concat(State.variables.soldRelics, State.variables.lostRelics).map(r => r.name);
	let count = State.variables.relics.map(r => collectedRelics.includes(r.name) ? 1 : 0).reduce((a, b) => a + b, 0);

	return count >= State.variables.relics.length / 2;
}

/**
 * Returns true iff the "Curator" requirement of the smaragdine tablet is satisfied, i.e. if at least half of
 * all relics have been collected
 * @return {boolean} true iff the "Curator" requirement of the smaragdine tablet is satisfied
 */
function tabletCurator() {
	/** @type [] */
	let collectedRelics = State.variables.ownedRelics.concat(State.variables.soldRelics, State.variables.lostRelics).map(r => r.name);
	let count = State.variables.relics.map(r => collectedRelics.includes(r.name) ? 1 : 0).reduce((a, b) => a + b, 0);

	return count >= State.variables.relics.length;
}

/**
 * Awards accomplished achievements and adds the corresponding corruption.
 * @return {[string]} The list of achievements that hadn't been achieved before but are now.
 */
function updateTablet() {
	let newlyAchieved = []
	if (!State.variables.smaragdineAchievements.speedrun && tabletSpeedrun()) {
		State.variables.corruption += 175;
		State.variables.smaragdineAchievements.speedrun = true;
		newlyAchieved.push('speedrun');
	}
	if (!State.variables.smaragdineAchievements.worldRecord && tabletWorldRecord()) {
		State.variables.corruption += 200;
		State.variables.smaragdineAchievements.worldRecord = true;
		newlyAchieved.push('worldRecord');
	}
	if (!State.variables.smaragdineAchievements.TAS && tabletTAS()) {
		State.variables.corruption += 225;
		State.variables.smaragdineAchievements.TAS = true;
		newlyAchieved.push('TAS');
	}
	if (!State.variables.smaragdineAchievements.OTP && tabletOTP()) {
		State.variables.corruption += 200;
		State.variables.smaragdineAchievements.OTP = true;
		newlyAchieved.push('OTP');
	}
	if (!State.variables.smaragdineAchievements.singlePlayer && tabletSinglePlayer()) {
		State.variables.corruption += 300;
		State.variables.smaragdineAchievements.singlePlayer = true;
		newlyAchieved.push('singlePlayer');
	}

	if (!State.variables.smaragdineAchievements.gourmet && tabletGourmet()) {
		State.variables.corruption += 150;
		State.variables.smaragdineAchievements.gourmet = true;
		newlyAchieved.push('gourmet');
	}
	if (!State.variables.smaragdineAchievements.dangerFetish && tabletDangerFetish()) {
		State.variables.corruption += 125;
		State.variables.smaragdineAchievements.dangerFetish = true;
		newlyAchieved.push('dangerFetish');
	}
	if (!State.variables.smaragdineAchievements.abyssalChampion && tabletAbyssalChampion()) {
		State.variables.corruption += 175;
		State.variables.smaragdineAchievements.abyssalChampion = true;
		newlyAchieved.push('abyssalChampion');
	}
	if (!State.variables.smaragdineAchievements.collector && tabletCollector()) {
		State.variables.corruption += 200;
		State.variables.smaragdineAchievements.collector = true;
		newlyAchieved.push('collector');
	}
	if (!State.variables.smaragdineAchievements.curator && tabletCurator()) {
		State.variables.corruption += 250;
		State.variables.smaragdineAchievements.curator = true;
		newlyAchieved.push('curator');
	}

	if (!State.variables.smaragdineAchievements.magnumOpus &&
	    State.variables.smaragdineAchievements.speedrun &&
	    State.variables.smaragdineAchievements.worldRecord &&
	    State.variables.smaragdineAchievements.TAS &&
	    (State.variables.smaragdineAchievements.OTP || State.variables.smaragdineAchievements.singlePlayer) &&
	    State.variables.smaragdineAchievements.gourmet &&
	    State.variables.smaragdineAchievements.dangerFetish &&
	    State.variables.smaragdineAchievements.abyssalChampion &&
	    State.variables.smaragdineAchievements.collector &&
	    State.variables.smaragdineAchievements.curator
	) {
		State.variables.corruption += 500;
		State.variables.smaragdineAchievements.magnumOpus = true;
		newlyAchieved.push('magnumOpus');
	}
	return newlyAchieved;
}

