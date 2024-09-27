'use strict';

/* global UrineReamplificationA, UrineReamplificationB, SemenDemon, CreatureOfTheNight, Wikifier, GenderEvent, AssetEvent, LibidoEvent, AgeEvent, HeightEvent, StandardsEvent */
Macro.add('PassTime', {
	handler: function () {
		let eventTriggers = this.args[0]
		/** @type Character */
		let mc = State.variables.mc;
		// Whether threat timers should be adjusted.
		let handleThreats = typeof eventTriggers === 'object' && Object.values(eventTriggers).length > 0;
		let consumption = mc.foodConsumption +
		                  State.variables.hiredCompanions.map(c => c.foodConsumption).reduce((a, b) => a + b, 0);
		let timeWeight = State.variables.endlessAeonglass ? 0.5 : 1;
		// I'm not sure what this "state" is, the code is copied to be equivalent to that in the passTime widget
		let state = setup.passingTime();
		/* If we aren't passing time yet, assume that the number of days was passed in the first argument. */
		if (!state) state = setup.startPassingTime(passage(), eventTriggers);

		let breakForEvent = Object.values(eventTriggers).some(trigger => trigger())

		if (!breakForEvent && state.expectedDays && !state.unweightedDayIndex) {
			/* Temporarily use the weighted day index to store the weighted expected number of days. */
			state.weightedDayIndex = Math.round(timeWeight * state.expectedDays)
 
			if (!State.variables.WettingSolution &&
			    (mc.hasCurse(UrineReamplificationA) || mc.hasCurse(UrineReamplificationB))) {
				let upperBound = 15;
				if (mc.hasCurse(UrineReamplificationA) && mc.hasCurse(UrineReamplificationB)) {
					upperBound = 3;
				}
				// This calculation looks really odd to me, I don't understand what it's doing.
				if (random(1, upperBound ** state.weightedDayIndex) < upperBound ** state.weightedDayIndex -
				    (upperBound - 1) ** state.weightedDayIndex) {
					new Wikifier(this.output, '<<include "Wetting Events">>');
					if(!State.variables.dollevent2){
						state.expectedDays += 1
					}
				}
			}

			if (mc.hasCurse(SemenDemon)) {
				new Wikifier(this.output, `<<SemenDemonCalc ${state.weightedDayIndex}>>`)
			}
			if (mc.hasCurse(CreatureOfTheNight)) {
				new Wikifier(this.output, `<<CreatureOfTheNightCalc ${state.weightedDayIndex}>>`)
			}
			/* Reset the weighted day index. */
			state.weightedDayIndex = 0
		}
		
		while (!breakForEvent && state.unweightedDayIndex < state.expectedDays) {

			/* Increment the day index. We only break out of the inner loop because we're sated, can't eat/drink or */
			/* because an event is about to happen. An event might interrupt our attempts to decrease starvation or */
			/* dehydration, but that's okay - we'll try again during the next trip. */
			state.unweightedDayIndex += 1;
			state.weightedDayIndex += timeWeight
			/* Check whether we need to be foraging for food to avoid dying of starvation. */
			if (!State.variables.forageFood && State.variables.starving > 4 &&
			    State.variables.items[1].count + State.variables.items[24].count < consumption &&
			    State.variables.currentLayer !== 7 && passage() !== 'Layer3 Threat2') {
				new Wikifier(this.output, '@@.alert2; In order to avoid death by starvation, you are currently ' +
				                          'foraging for food on this layer, no matter the consequences.<br>');
				State.variables.forageFood = 1;
			}
			/* Check whether we need to be foraging for water to avoid dying of dehydration. */
			if (!State.variables.forageWater && State.variables.dehydrated > 1 &&
			    State.variables.items[0].count + State.variables.items[3].count + State.variables.items[25].count < consumption &&
			    setup.flaskLabels[State.variables.flaskPref] !== 'Aquarius Ex Nihilo' &&
			    State.variables.currentLayer !== 3 && State.variables.currentLayer !== 5 &&
			    passage() !== 'Layer3 Threat2') {
				new Wikifier(this.output, '@@.alert2; In order to avoid death by dehydration, you are currently ' +
				                          'foraging for water on this layer, no matter the consequences.<br>')
				State.variables.forageWater = 1;
			}

			/* Starvation and dehydration go up by 1 every day. If the player is starving */
			/* or dehydrated, assume that they will stop to forage until they are sated. */
			State.variables.starving += 1;
			State.variables.dehydrated += 1;
			while (State.variables.starving > 0 || State.variables.dehydrated > 0) {

				/* Increment the actual day. */
				state.unweightedDay += 1;
				state.weightedDay += timeWeight
				/* Check if a real day passed. */
				if (state.weightedDay >= state.nextRealDay) {
					/* Adjust the overall time. */
					State.variables.time += 1;
					/* Apply layer-specific effects. */
					if (State.variables.currentLayer > 0 && State.variables.currentLayer < 10) {
						State.variables['timeL' + State.variables.currentLayer] += 1;
					}
					switch (State.variables.currentLayer) {
						case 6:
							/* Add a jinxed flame counter for every day unless the player is flying. */
							if (!State.variables.DaedalusFly && !State.variables.mechaBoarded) State.variables.hexflame += 1
							break;
						case 7:
							if (State.variables.voidDiamondActive == true){
								break;
							} else if (State.variables.dubloons >= 300) {
								State.variables.dubloons -= 1;
							} else if (State.variables.dubloons >= 100) {
								State.variables.dubloons -= 2;
							} else {
								State.variables.dubloons -= 3;
							}
							break;
					}
					if (handleThreats) {
						switch (State.variables.currentLayer) {
							case 2:
								// food rations
								if (State.variables.items[1].count >= 10 && State.variables.safeRest == false) State.variables.timeL2T1 += 1;
								break;
							case 3:
								State.variables.timeL3T1 += 1;
								if (!setup.haveTravelLightSource) State.variables.timeL3T2 += 1;
								break;
							case 4:
								State.variables.timeL4T1 += 1;
								break;
							case 5:
								State.variables.timeL5T1 += 1;
								// water and filled flasks
								if ((State.variables.items[0].count + State.variables.items[3].count) >= 10) {
									State.variables.timeL5T2 += 1;
								}
								break;
							case 6:
								State.variables.timeL6T1 += 1;
								if (State.variables.dubloons >= 200) State.variables.timeL6T2 += 1;
								break;
							case 7:
								if (State.variables.dubloons < 500) State.variables.timeL7T2 += 1;
								break;
							case 8:
								State.variables.timeL8T1 += 1
								State.variables.timeL8T2a += 1
								State.variables.timeL8T2b += 1
								break;
							case 9:
								State.variables.timeL9T1 += 1
								break;
						}
					}
				}

				// This variable is equal to the bandit if she's in our companions and null otherwise.
				// This means that we can use the optional chaining operator to add events to the bandit iff she's in the party
				let bandit = State.variables.hiredCompanions.some(c => c.id === setup.companionIds.bandit) ? State.variables.companionBandit
																											: null;
				// try to eat and drink
				let ate = false;
				let drank = false;
				if (state.energy > 0) {
					// If we used energy rations to speed up travel, use those first (regardless of foraging settings).
					State.variables.items[24].count -= consumption;
					state.energy -= 1;
					State.variables.smaragdineFoodConsumed.energy = true;
					ate = true;
				}
				if (State.variables.items[25].count >= consumption &&
					(State.variables.wardWaterDrink === 1 ||
						(State.variables.wardWaterDrink === 2 && State.variables.hexflame > 9))) {
					/* If we're drinking ward water, use that first (regardless of foraging settings). */
					State.variables.items[25].count -= consumption;
					if (State.variables.hexflame > 9) State.variables.hexflame -= 1;
					State.variables.smaragdineFoodConsumed.wardWater = true;
					drank = true;
				}
				if (State.variables.atWaterSource) {
					// If we're currently at a source of clean water (e.g. layer 3 river or layer 5 oasis), drink from it.
					State.variables['waterL' + State.variables.currentLayer] += 1;
					drank = true;
				}
				if (State.variables.safeRest) {
					// If we're currently resting in a safe spot, eat and drink from it.
					State.variables['foodL' + State.variables.currentLayer] += 1;
					ate = true;
					State.variables['waterL' + State.variables.currentLayer] += 1;
					drank = true;
				}


				// forage
				switch (State.variables.currentLayer) {
					case 1:
						if (State.variables.forageFood && !ate) {
							State.variables.foodL1 += 1;
							if (!State.variables.voidDiamondActive && !State.variables.abyssKnow) {
								mc.events.push(new GenderEvent('Blisshroom Major'));
								bandit?.push(new GenderEvent('Blisshroom Major'));
							}
							ate = true;
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL1 += 1;
							if (!State.variables.voidDiamondActive && !State.variables.abyssKnow) {
								mc.events.push(new AssetEvent("Cloudpool Major", 1));
								bandit?.push(new AssetEvent("Cloudpool Major", 1));
							}
							drank = true;
						}
						break;
					case 2: {
						if (State.variables.forageFood && !ate) {
							State.variables.foodL2 += 1;
							let canHunt = false;
							if (State.variables.mudHunt) {
								if (State.variables.slingshot) {
									canHunt = true;
								} else if (State.variables.items[13].count && State.variables.items[20].count >= 1) {
									State.variables.items[20].count -= 1;
									canHunt = true;
								}
							}
							if (!canHunt) {
								if (!State.variables.abyssKnow) {
									mc.events.push(new LibidoEvent("Flanberry Major", 1));
									bandit?.push(new LibidoEvent("Flanberry Major", 1));
								} else {
									State.variables.lastFlan = State.variables.time;
								}
								State.variables.smaragdineFoodConsumed.flan = true;
							} else {
								State.variables.smaragdineFoodConsumed.mud = true;
							}
							ate = true;
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL2 += 1;
							if (!State.variables.voidDiamondActive && !State.variables.abyssKnow){
								State.variables.bewitchBabies += 1;
							}
							drank = true;
						}
						break;
					}
					case 3: {
						if (State.variables.forageFood && !ate) {
							State.variables.foodL3 += 1;
							if (!State.variables.voidDiamondActive) {
								let event = new AgeEvent("Crystalline Confectionery Major", {years: 1});
								if (State.variables.abyssKnow) {
									event = new AgeEvent("Crystalline Confectionery Minor", {months: 1});
								}
								mc.events.push(event);
								bandit?.events.push(event);
							}
							// They'll both get the same event, but that's fine because events are immutable.
							ate = true;
						}
						// can't forage for water (unless at river, handled above)
						break;
					}
					case 4: {
						if (State.variables.forageFood && !ate) {
							let bulletsRequired = Math.max(2 - State.variables.bullRed, 1);
							let event = new HeightEvent("Flairabou Major", 3);
							if (State.variables.abyssKnow) {
								event = new HeightEvent("Flairabou Minor", 0.5);
							}
							if (State.variables.slingshot) {
								State.variables.foodL4 += 1;
								ate = true;
							} else if (State.variables.items[13].count &&
										State.variables.items[20].count >= bulletsRequired) {
								State.variables.foodL4 += 1;
								State.variables.items[20].count -= bulletsRequired;
								ate = true;
							}
							if (!State.variables.voidDiamondActive && ate) {
								mc.events.push(event);
								bandit?.events.push(event);
							}
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL4 += 1;
							if (!State.variables.voidDiamondActive && !State.variables.abyssKnow){
								State.variables.algalSize += 1;
							}
							drank = true;
						}
						break;
					}
					case 5:
						if (State.variables.forageFood && !ate) {
							State.variables.foodL5 += 1;
							if (State.variables.voidDiamondActive) {
								
							}
							else if (State.variables.abyssKnow) {
								State.variables.crumbleFluid += 1;
							} else {
								State.variables.crumbleFluid += 5;
							}
							ate = true;
						}
						// can't forage for water (unless at oasis, handled above)
						break;
					case 6: {
						if (State.variables.forageFood && !ate) {
							let bulletsRequired = Math.max(3 - State.variables.bullRed, 1);
							if (State.variables.slingshot) {
								State.variables.foodL6 += 1;
								ate = true;
							} else if (State.variables.items[13].count &&
										State.variables.items[20].count >= bulletsRequired) {
								State.variables.foodL6 += 1;
								State.variables.items[20].count -= bulletsRequired;
								ate = true;
							}
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL6 += 1;
							if (!(State.variables.hiredCompanions.some(e => e.id === setup.companionIds.saeko) &&
								setup.haveSmartphone) && (!State.variables.voidDiamondActive)){
								State.variables.hexflame += 1;
							}
							drank = true;
						}
						break;
					}
					case 7:
						// cannot forage food or water
						break;
					case 8:
						if (State.variables.forageFood && !ate) {
							State.variables.foodL8 += 1;
							if (!State.variables.voidDiamondActive){
								mc.events.push(new StandardsEvent("Bedlam's Banquet Major", 1));
								bandit?.events.push(new StandardsEvent("Bedlam's Banquet Major", 1));
							}
							ate = true;
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL8 += 1;
							if (State.variables.voidDiamondActive) {

							}
							else if (State.variables.hiredCompanions.some(e => e.id === setup.companionIds.saeko)
								&& setup.haveSmartphone) {
								State.variables.IQdrop += 0.05;
							} else {
								State.variables.IQdrop += 0.05;
							}
							drank = true;
						}
						break;
					case 9:
						if (State.variables.forageFood && !ate) {
							State.variables.foodL9 += 1;
							if (!State.variables.voidDiamondActive) {
								State.variables.corruption -= 2;
							}
							ate = true;
						}
						if (State.variables.forageWater && !drank) {
							State.variables.waterL9 += 1;
							if (!State.variables.voidDiamondActive) {
								State.variables.corruption -= 1;
							}
							drank = true;
						}
						break;
					case 0:
						ate = true;
						drank = true;
						break;
				}

				if (!ate) {
					if (State.variables.items[1].count >= consumption) {
						// eat regular food
						State.variables.items[1].count -= consumption;
						State.variables.smaragdineFoodConsumed.ration = true;
						ate = true;
					} else if (State.variables.items[1].count + State.variables.items[24].count >= consumption) {
						// if we don't have enough regular food but have energy rations left, use them
						State.variables.items[24].count -= consumption - State.variables.items[1].count;
						State.variables.items[1].count = 0;
						State.variables.smaragdineFoodConsumed.energy = true;
						ate = true;
					}
				}
				if (ate) {
					State.variables.starving -= 1;
				}

				if (!drank) {
					new Wikifier(this.output, "<<FlaskFirst>>");
					if (State.variables.items[3].count >= consumption
						|| State.variables.items[0].count >= consumption
						|| State.variables.ownedRelics.some(r => r.name === "Aquarius Ex Nihilo")) {
						if (State.variables.items[3].count < consumption || setup.flaskLabels[State.variables.flaskPref] === 'Bottled water') {
							if (!State.variables.ownedRelics.some(r => r.name === "Aquarius Ex Nihilo")) {
								State.variables.items[0].count -= consumption;
							}
							State.variables.smaragdineFoodConsumed.bottle = true;
						} else if (setup.flaskLabels[State.variables.flaskPref] !== 'Aquarius Ex Nihilo') {
							State.variables.items[3].count -= consumption;
							State.variables.items[2].count += consumption;
							State.variables.flaskMatrix[State.variables.flaskPref] -= consumption;
				
							switch(setup.flaskLabels[State.variables.flaskPref]) {
								case 'Flask with heavily contaminated water from the first layer':
									State.variables.waterL1 += 1;
									mc.events.push(new AssetEvent('Cloudpool Major', 1));
									bandit?.events.push(new AssetEvent('Cloudpool Major', 1));
									break;
								case 'Flask with heavily contaminated water from the second layer':
									State.variables.waterL2 += 1;
									State.variables.bewitchBabies += 1;
									break;
								case 'Flask with heavily contaminated water from the fourth layer':
									State.variables.waterL4 += 1;
									State.variables.algalSize += 1;
									break;
								case 'Flask with heavily contaminated water from the sixth layer':
									State.variables.waterL6 += 1;
									State.variables.hexflame += 1;
									break;
								case 'Flask with heavily contaminated water from the eighth layer':
									State.variables.waterL8 += 1;
									State.variables.IQdrop += 0.05;
									break;
								case 'Flask with lightly contaminated water from the eighth layer':
									State.variables.waterL8 += 1;
									State.variables.IQdrop += 0.5;
									break;
								case 'Flask with heavily contaminated water from the ninth layer':
									State.variables.waterL9 += 1;
									State.variables.corruption -= 1;
									break;
							}
						}
						drank = true;
					} else if (State.variables.items[25].count >= consumption) {
						State.variables.items[25].count -= consumption;
						if (State.variables.hexflame > 9) State.variables.hexflame -= 1;
						State.variables.smaragdineFoodConsumed.wardWater = true;
						drank = true;
					}
				}

				if (drank) {
					State.variables.dehydrated -= 1;
				}


				if (State.variables.currentLayer !== 6 && State.variables.hexflame > 9) State.variables.hexflame -= 1;
				if (state.weightedDay >= state.nextRealDay) {
					state.nextRealDay += 1;
					/* Check event triggers. */
					breakForEvent = Object.values(eventTriggers).some(trigger => trigger());
				}
				
				if (!ate || !drank || breakForEvent) break;
			}
		}

		if (!breakForEvent) {
			/* Remove the persistent state for this passage. */
			setup.stopPassingTime()

			/* Print a notice if travel time was longer than predicted due to starvation or dehydration. */
			if (Math.round(state.weightedDay) > Math.round(state.weightedDayIndex)) {
				let timeDiff = Math.round(state.weightedDay) - Math.round(state.weightedDayIndex)
				new Wikifier(this.output,
				             `Desperate to stave off starvation and dehydration, you spent an extra ${timeDiff} ` +
				             `days foraging, extending the time spent to ${Math.round(state.weightedDay)} days!<br><br>`)
			}

			/* If we ended on a fractional day that should be rounded up, increment the time. */
			if (Math.round(state.weightedDay) > state.weightedDay) State.variables.time += 1;
		}
	}
})
