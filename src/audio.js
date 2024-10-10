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

window.setMasterVolume = function() {
	try {
		var value = settings.volume;
		if (value == undefined) {
			settings.volume = 0.5;
			value = 0.5;
		}
		if (SimpleAudio) {
			if (typeof SimpleAudio.volume === 'function') {
				SimpleAudio.volume(value);
			} else {
				SimpleAudio.volume = value;
			}
		} else {
			throw new Error('Cannot access audio API.');
		}
		return true;
	} catch (err) {
		// Fall back to the wikifier if we have to.
		console.error(err.message, err);
		$.wiki('<<masteraudio volume ' + val + '>>');
		return false;
	}
}

/*(function () {
	// Set initial values.
	var options = {
		current  : 50,  // Default volume level.
		rangeMax : 100,
		step	 : 1,
		setting  : true
	};
	if (options.setting && typeof settings.volume === 'number') {
		options.current = parseInt(settings.volume);
	}

	// Function to update the volume level.
	function setVolume (val) {
		if (typeof val !== 'number') val = Number(val);
		if (Number.isNaN(val) || val < 0) val = 0;
		if (val > 1) val = 1;
		options.current = Math.round(val * options.rangeMax);
		if (options.setting) {
			settings.volume = options.current;
		}
		if ($('input[name=volume]').val() !== options.current) {
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

	// Grab volume level changes from the volume slider.
	$(document).on('input', 'input[name=volume]', function() {
		var change = parseInt($('input[name=volume]').val());
		setVolume(change / options.rangeMax);
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
}());*/

// Check to see if trackID is the currently playing track
window.isPlaying = function (trackID) {
	var track = SimpleAudio.tracks.get(trackID);
	return track !== null && track.isPlaying();
};
