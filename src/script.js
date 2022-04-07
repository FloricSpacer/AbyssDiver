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
	if (StoryVar.items[1].count <= -6 || (StoryVar.items[0].count + StoryVar.items[3].count) <= -3) {
		return "GameOver";
	}
	if (StoryVar.app.appAge < 3 && StoryVar.app.age > 17) {
		return "AgeEnd";
	}
	return destPassage;
};

Config.history.maxStates = 20;

predisplay["Menu Return"] = function (taskName) {
	if (! tags().contains("noreturn")) {
		State.variables.return = passage();
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

// Volume Slider, by Chapel; for SugarCube 2
// version 1.2.0 (modified by HiEv)
// For custom CSS for slider use: http://danielstern.ca/range.css/#/

/*
	Changelog:
	v1.2.0:
		- Fixed using/storing the current volume level in the settings.
	v1.1.0:
		- Fixed compatibility issues with SugarCube version 2.28 (still
		  compatible with older versions, too).
		- Added settings API integration for SugarCube 2.26.
		- Internal improvements and greater style consistency with my
		  other work.
		- Added a pre-minified version.
		- By default, the slider is now more granular than before
		  (101 possible positions vs 11). Change the 'current' and
		  'rangeMax' options to 10 to restore the old feel.
*/

(function () {
	// Set initial values.
	var options = {
		current  : 50,  // Default volume level.
		rangeMax : 100,
		step	 : 1,
		setting  : true
	};
	Setting.load();
	if (options.setting && settings.volume) {
		options.current = parseInt(settings.volume);
	}
	var vol = {
		last: options.current,
		start: (options.current / options.rangeMax).toFixed(2)
	};

	// Function to update the volume level.
	function setVolume (val) {
		if (typeof val !== 'number') val = Number(val);
		if (Number.isNaN(val) || val < 0) val = 0;
		if (val > 1) val = 1;
		options.current = Math.round(val * options.rangeMax);
		if (options.setting) {
			settings.volume = options.current;
			Setting.save();
		}
		if ($('input[name=volume]').val() != options.current) {
			$('input[name=volume]').val(options.current);
		}
		try {
			if (SimpleAudio) {
				if (typeof SimpleAudio.volume === 'function') {
					SimpleAudio.volume(val);
				} else {
					SimpleAudio.volume = val;
				}
				return val;
			} else {
				throw new Error('Cannot access audio API.');
			}
		} catch (err) {
			// Fall back to the wikifier if we have to.
			console.error(err.message, err);
			$.wiki('<<masteraudio volume ' + val + '>>');
			return val;
		}
	}

	// Fix the initial volume level display.
	postdisplay['volume-task'] = function (taskName) {
		delete postdisplay[taskName];
		setVolume(vol.start);
	};

	// Grab volume level changes from the volume slider.
	$(document).on('input', 'input[name=volume]', function() {
		var change = parseInt($('input[name=volume]').val());
		setVolume(change / options.rangeMax);
		vol.last = change;
	});

	// Create the <<volume>> macro.
	Macro.add('volume', {
		handler : function () {
			var wrapper = $(document.createElement('span'));
			var slider = $(document.createElement('input'));
			var className = 'macro-' + this.name;
			slider.attr({
				id		: 'volume-control',
				type	: 'range',
				name	: 'volume',
				min		: '0',
				max		: options.rangeMax,
				step	: options.step,
				value	: options.current
			});
			// Class '.macro-volume' and ID '#volume-control' for styling the slider
			wrapper.append(slider).addClass(className).appendTo(this.output);
		}
	});

	// Add Setting API integration for SugarCube 2.26 and higher.
	function updateVolume () {
		setVolume(settings.volume / options.rangeMax);
	}
	if (options.setting) {
		if (Setting && Setting.addRange && typeof Setting.addRange === 'function') {
			Setting.addRange('volume', {
				label : 'Volume: ',
				min : 0,
				max : options.rangeMax,
				step : options.step,
				default : options.current,
				onInit : updateVolume,
				onChange : updateVolume
			});
		} else {
			console.error('This version of SugarCube does not include the `Settings.addRange()` method; please try updating to the latest version of SugarCube.');
		}
	}
}());

// Check to see if trackID is currently loaded
window.TrackExists = function (trackID) {
	return SimpleAudio.tracks.has(trackID);
};

// Check to see if trackID is the currently playing track
window.isPlaying = function (trackID) {
	var track = SimpleAudio.tracks.get(trackID);
	return track !== null && track.isPlaying();
};
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
