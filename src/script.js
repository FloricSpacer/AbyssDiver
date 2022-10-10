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
	if (StoryVar.companionMaru.affec < -9 && !StoryVar.companionMaru.swap) {
		return "Maru Leaving";
	}
	if (StoryVar.companionLily.affec < -9 && !StoryVar.companionLily.swap) {
		return "Lily Leaving";
	}
	if (StoryVar.companionKhemia.affec < -9 && !StoryVar.companionKhemia.swap) {
		return "Khemia Leaving";
	}
	if (StoryVar.companionCherry.affec < -12 && !StoryVar.companionCherry.swap) {
		return "Cherry Leaving";
	}
	if (StoryVar.companionCloud.affec < -9 && !StoryVar.companionCloud.swap) {
		return "Cloud Leaving";
	}
	if (StoryVar.companionSaeko.affec < -9 && !StoryVar.companionSaeko.swap) {
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

//Dynamic Avatar
/* global da, $, Browser, Engine, getObjectProperties, isObject, isString, Macro, opr, passage, postdisplay, random, safari, Setting, settings, setup, SimpleAudio, State, Story, tags */

/* Class macro - Start */
Macro.add("c", {
    skipArgs : true,
    tags     : null,
    handler  : function () {
        if (this.payload[0].args.full.length > 0) {
            $(this.output).wiki('<span class="' + this.payload[0].args.full + '">' + this.payload[0].contents + '</span>');
        } else {
            $(this.output).wiki('<span class="default">' + this.payload[0].contents + '</span>');
        }
    }
});
/* Class macro - End */

// utility functions
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

var App = {};
// export the App object from the SugarCube closured eval()
window.App = App;

App.Data = {};

App.Data.AvatarMaps = {};
App.Data.Clothes = {};
App.Data.DAD = {};
App.Data.DAD.ExtraParts = { };
App.Data.DAD.FaceStruct = { };
App.Data.DAD.FacePresets = { };
App.Notifications = { };
App.Entity = { };


setup.lockID = LoadScreen.lock();
importScripts("http://perplexedpeach.gitlab.io/dynamic-avatar-drawer/dist/da.js")
    .then(function () {
        setup.da = da;
        // extend the da module here

        da.load().then(function () {
            // viewer settings
          
            Setting.addHeader("Test dummy"); 
            for (var prop in da.defaultConfig) {
                if (da.defaultConfig.hasOwnProperty(prop)) {
                    var defaultValue = da.defaultConfig[prop];
                    // TODO these can be affected by character attributes instead of manually setting them
                    if (prop.endsWith("Color")) {
                    }  else if (prop.startsWith("offset")) {
                        Setting.addRange(prop,
                        {label: prop, default: defaultValue, min: -200, max: 200, step: 1, onChange: redrawMC});
                    } else if (typeof defaultValue === 'boolean') {
                        Setting.addToggle(prop, {label: prop, default: defaultValue, onChange: redrawMC});
                    }
                }
            }
            
            // remove irrelelvant vitals
            delete da.vitalLimits.sanity;

            // da module is ready to draw here; you can create/manage drawing canvases here
            
            var barGroup = document.getElementById("menu");
            var menuPortrait = document.createElement("div");
            menuPortrait.id = "menu_portrait";
            barGroup.appendChild(menuPortrait);
            
            var bodyGroup = document.getElementById("passages");
            var bodyPortrait = document.createElement("div");
            bodyPortrait.id = "body_portrait";
            bodyGroup.appendChild(bodyPortrait);
            
            
            if (settings.width) {
                settings.width = Math.round(Math.min(settings.width, screen.width) / 50) * 50;
            } else {
                settings.width = 500;
            }
            console.log(settings);
            
            
            setup.menuCanvasGroup = da.getCanvasGroup(menuPortrait, settings);
            setup.bodyCanvasGroup = da.getCanvasGroup(bodyPortrait, settings);
            
            function updateCanvas() {
                // dynamic styling
                sheet.cssRules[stowedBarRule].style.left = '-' + (settingsMenu.width - stowedWidth) + 'px';
                sheet.cssRules[storyRule].style.marginLeft = (settingsMenu.width + 10) + 'px';

                setup.menuCanvasGroup.style.width = settingsMenu.width + "px";
                setup.menuCanvasGroup.style.height = settingsMenu.height + "px";
                var canvases = setup.menuCanvasGroup.children;
                for (var i = 0; i < canvases.length; i++) {
                    var canvas = canvases[i];
                    canvas.width = settings.width;
                    canvas.height = settings.height;
                }
                redrawMC();
            }
            
            Engine.play("StoryInit", true);
            Engine.play(passage(), true);
            LoadScreen.unlock(setup.lockID);
        });
    }).catch(function (error) {
        alert(error);
    }
);

window.drawToMenu = function (avatar) {
    console.log("drawing to menu");
    da.draw(setup.barGroup, avatar, settings);
};

window.drawToPassage = function (avatar) {
    console.log("drawing to menu");
    da.draw(setup.bodyGroup, avatar, settings);
};

function redrawMC() {
    if (typeof State.variables.MCdraw !== 'undefined') {
        drawToMenu(State.variables.MCdraw);
    }
}
/*

setup.lockID = LoadScreen.lock();
importScripts("http://perplexedpeach.gitlab.io/dynamic-avatar-drawer/dist/da.js")

    .then(function () {
        setup.da = da;
        // extend the da module here

        da.load().then(function () {
            // da module is ready to draw here; you can create/manage drawing canvases here
            
			var canvasGroup = da.getCanvasGroup("player", {
				// provide some styling options; width and height are particularly important
				border: "1px solid black",
				width: 900,
				height: 1200,
			});

            Engine.play("StoryInit", true);
            Engine.play(passage(), true);
            LoadScreen.unlock(setup.lockID);
        });
    }).catch(function (error) {
        alert(error);
    }
);
/*
window.drawToMenu = function (avatar) {
    console.log("drawing to menu");
    da.draw(setup.menuCanvasGroup, avatar, settings);
};

function redrawMC() {
    if (typeof State.variables.MCdraw !== 'undefined') {
        drawToMenu(State.variables.MCdraw);
    }
}
/*
window.createClothingGUI = function (avatar, elementId, clothingDiscardPool) {
    $(document).one(':passagedisplay.createClothingGUI', function (ev) {
        var $parent = $(ev.content).find('#' + elementId);

        avatar.clothes.forEach(function (clothing) {
            var $holder = $(document.createElement('div'));

            var $name = $(document.createElement('span'))
                .addClass('inventory_item')
                .text(clothing.constructor.name);

            var $remove = $(document.createElement('a'))
                .text("remove")
                .ariaClick(function () {
                    if (avatar.removeClothing(clothing)) {
                        clothingDiscardPool.push(clothing);
                        $holder.remove();
                        drawToMenu(avatar);
                        Engine.play(passage());
                    }
                });

            $holder
                .append($name)
                .append($remove)
                .appendTo($parent);
        });
    });
};



App.Entity.AvatarEngine = class Avatar {

    constructor() {

        this._npcCache = { };

        this.SettingHandler = function() {
            var container = $('#avatarContainer');
            if( App.EventHandlers.HasPlayerState() == true && container && settings.displayAvatar == true) {
                container.css("display", "block");
            //    App.Avatar._DrawPortrait();
            } else if( App.EventHandlers.HasPlayerState() == true && container && settings.displayAvatar == false) {
                container.css("display", "none");
            }
            if ($('#fullBodyContainer').length) {
                state.display(state.active.title, null, "back"); //Tell engine to reload current passage
            }
        };

        this.Loaded = false;
        console.log("Loading DA system...");
        var t0 = performance.now();
        console.log("Creating patterns");
        /*    
        //Loading patterns. Embedded patterns are in the story passage named the same as the
        //file name. Get the text attribute for the encoded string.
        da.addPattern("white hearts", Story.passages["txt_heart_1"].text);
        da.addPattern("pink checks", Story.passages["txt_pink_checks"].text);
        da.addPattern("pink tartan", Story.passages["txt_pink_tartan"].text)
        da.addPattern("pink gingham", Story.passages["txt_pink_gingham"].text);
        da.addPattern("red tartan", Story.passages["txt_red_tartan"].text);
        da.addPattern("black lace", Story.passages["txt_black_lace"].text);
        da.addPattern("black purple stripe", Story.passages["txt_black_purple_stripe"].text);
        da.addPattern("red plastic", Story.passages["txt_red_plastic"].text);
        da.addPattern("cow print", Story.passages["txt_cow_print"].text);
        da.addPattern("black fur", Story.passages["txt_black_fur"].text);
        da.addPattern("jolly roger big", Story.passages["txt_jolly_roger_big"].text);
        da.addPattern("black sequins", Story.passages["txt_black_sequin"].text);
        da.addPattern("horizontal pink stripe", Story.passages["txt_horizontal_pink_white_stripe"].text);
        da.addPattern("pink polka dot", Story.passages["txt_pink_polka_dot"].text);
        da.addPattern("vertical pink stripe", Story.passages["txt_vertical_pink_white_stripe"].text);
        da.addPattern("pink chevron", Story.passages["txt_pink_chevron"].text);
        da.addPattern("pink flowers", Story.passages["txt_pink_flowers"].text);
        da.addPattern("leather", Story.passages["txt_leather"].text);
        da.addPattern('blue cotton', Story.passages["txt_blue_cotton"].text);
        da.addPattern('pink leather', Story.passages["txt_pink_leather"].text);
        da.addPattern('hot pink', Story.passages["txt_hot_pink"].text);
        da.addPattern("purple lace", Story.passages["txt_purple_lace"].text);
        da.addPattern("red cotton", Story.passages["txt_red_cotton"].text);
        da.addPattern("red sequin", Story.passages["txt_red_sequin"].text);
        da.addPattern("red velvet", Story.passages["txt_red_velvet"].text);
        da.addPattern("pink fishnet", Story.passages["txt_pink_fishnet"].text);
        //Gradients loaded as textures.
        da.addPattern("pink athletic socks", this._pinkAthleticSocks);
        
        da.load().then(function() {
            // Functions needed here to overwrite some default behavior of
            // the DA library.
			
            da.extendDimensionCalc("human.penisSize", function (base) {
                return this.getDim('penisSize');
            });
/*
            da.extendDimensionCalc("human.testicleSize", function (base) {
                return this.getDim('testicleSize');
            });

            da.extendDimensionCalc('human.waistWidth', function(base) {
                return this.getDim('waistWidth')
            });

            da.extendDimensionCalc('human.breastSize', function(base) {
                return this.getDim('breastSize')
            });

            var t2 = performance.now();
            console.log("Loaded DA in "+(t2-t0)+"ms.");
 
        });

 
        this._MCData = {
            // provide specific values here to override the default ones set
            age : 26,
            // base physical dimensions
            basedim        : {
                armThickness  : 58,
                armLength     : 45,
                handSize      : 120,
                legFullness   : 4,
                legLength     : 97,
                neckLength    : 80,
                neckWidth     :  35,
                skin          : 3,
            },
            Mods : {
                breastPerkiness: 4,

            },
            decorativeParts: [ ],
            // overriding clothing (default to simple red underwear)
            clothes: [ ],
        };

        this._LastDrawn = null;
    }

    get DefaultData() { return this._MCData; }
    get LastDrawn() { return this._LastDrawn; }

    // Bound event handlers and methods for drawing canvas and portraits

    /**
     * Draws a full body picture of the player character.
     * @param {string} element Where to attach the canvas
     * @param {number} height height of the canvas
     * @param {number} width width of the canvas
     * /
    DrawCanvas(element, height, width) {
        this._height = height;
        this._width = width;
        this._element = element;
        $(document).one(":passageend", this._DrawCanvas.bind(this));
    }

    /**
     * Called on :passageend by DrawCanvas()
     * /
    _DrawCanvas() {
        var canvasGroup;
        if (typeof canvasGroup === 'undefined' || canvasGroup == null) {
            canvasGroup = da.getCanvasGroup(this._element, 
                {
                   border: "1px solid black",
                   width: this._width !== 'undefined' ? this._width : 360,
                   height: this._height !== 'undefined' ? this._height : 800,
                });
        } 

        var MCdraw = new da.Player( this.GetMCData() );
        MCdraw = this._AttachParts(MCdraw);
        var that = this;
        da.draw(canvasGroup, MCdraw, { 
                printHeight: false, 
                printAdditionalInfo: false, 
                renderShoeSideView: false,
                offsetX: 10,
                offsetY: 0
            }).then(function(exports) {
                that._LastDrawn = exports;
            });

    }

	/*
	GetMCData() {
		var Data = this._MCData;
		Data = this._MapHeight(Data);
		Data = this._MapHormones(Data);
		Data = this._MapFace(Data);
		Data = this._MapHair(Data);
		Data = this._MapGenitals(Data);
		Data = this._MapUpperBody(Data);
		Data = this._MapLowerBody(Data);
		return Data;
	}

	_MapFace(Data) {

        // Copy player face data into data.
        var Face = setup.player.FaceData;
        if (Face == null || typeof Face === 'undefined') { // kludge just in case
            setup.player.SetFace('Default 1');
            Face = setup.player.FaceData;
        }

        for(var p in Face.basedim) Data.basedim[p] = Face.basedim[p];
        for(var p in Face.Mods) Data.Mods[p] = Face.Mods[p];
        
        var hormoneMod = (this._c('Hormones')/200);
        var lipMod = (setup.player.GetStat('BODY', 'Lips')/100);
        var faceMod = (setup.player.GetStat('BODY', 'Face')/100);

        // Set the face 'femininity'. Clamp to the lowest set on the face data.
        Data.basedim.faceFem = this._clamp(
            (20 * faceMod) + (20 * hormoneMod),
            Face.basedim.faceFem, 40);

        // Slightly shorten the face, but no lower than 200 unless the player has it
        // set to be shorter.
        var faceLength = Face.basedim.faceLength < 195 ? Face.basedim.faceLength : 
            Face.basedim.faceLength * ( 1.0 - ((.065 * faceMod) + (.065 *hormoneMod)));

        Data.basedim.faceLength = this._clamp(faceLength, 195, 240);

        //Lip Size
        Data.basedim.lipSize = this._clamp(
            (10 + (15 * lipMod)), Face.basedim.lipSize, 35);
        
        //Lip top
        Data.Mods.lipTopSize = this._clamp(( -20 + (55 * lipMod)), Face.Mods.lipTopSize, 35);

        //Lip bottom
        Data.Mods.lipBotSize = this._clamp( (-80+(120*lipMod)), Face.Mods.lipBotSize, 120);
        
        //Lip Part
        Data.Mods.lipParting = this._clamp(
            (36 * lipMod), Face.Mods.lipParting, 36);
        
        //Lip width
        Data.Mods.lipWidth = this._clamp(
            (-10 - (70* lipMod)), -80, Face.Mods.lipWidth);
        
        //Eyelashes
        Data.basedim.eyelashLength = this._clamp(
            (6 * hormoneMod), Face.basedim.eyelashLength, 6);

        return Data;
    }

    _MapUpperBody(Data) {
        var hormoneMod = (this._c('Hormones')/200);
        var breast = setup.player.GetStat('BODY', 'Bust') == 0 ? 0 : (setup.player.GetStat('BODY', 'Bust')/2);
        var areola = (50 * hormoneMod);
        var upperMuscle = (30 * (this._c('Fitness')/100));
        Data.basedim.breastSize = breast;
        Data.basedim.areolaSize = areola;
        Data.basedim.upperMuscle = upperMuscle;
        //Data.basedim.shoulderWidth = 64;
        return Data;
    }

    _MapLowerBody(Data) {
        var femMod = (this._c('Femininity')/100);
        var lowerMuscle = (35 * (this._c('Fitness')/100));
        var ass = 5 + (35 * setup.player.GetStat('BODY', 'Ass') / 100);
        var hips = 100 + (75 * (setup.player.GetStat('BODY', 'Hips') / 100));
        var waist = 70 + (100 * (setup.player.GetStat('BODY', 'Waist')/100));
        Data.basedim.lowerMuscle = lowerMuscle;
        Data.basedim.buttFullness = ass;
        Data.basedim.hipWidth = hips;
        Data.basedim.waistWidth = waist;
        Data.basedim.legFem = (10 + (30 * femMod));
        return Data;
    }
    _MapHeight(Data) { 
        Data.basedim.height = this._b('Height');
        return Data;
    }

    //TODO: Make new penis body part as the existing one doesn't scale large enough for the game.
    _MapGenitals(Data) {
        var penis = 30 + ( 170 *  setup.player.GetStat('BODY', 'Penis') / 100);
        var balls = 25 + ( 75 * setup.player.GetStat('BODY', 'Balls') / 100);
        Data.basedim.penisSize = penis;
        Data.basedim.testicleSize = balls;
        return Data;
    }

    _MapHormones(Data) {
        var hormoneMod = (this._c('Hormones')/200);
        Data.fem = 11 * hormoneMod;

        return Data;
    }

    /**
     * Map the players hair attributes
     * @param {*} Data 
     * @returns {*} 
     **\
    _MapHair(Data) {

        var wig = setup.player.GetEquipmentInSlot("Wig");
        var length =  wig != null ? wig.HairLength() : this._b('Hair');
        var color = wig != null ? App.Data.Lists.HairColors[wig.HairColor()] : App.Data.Lists.HairColors[setup.player.HairColor];
        var browFill = App.Data.Lists.HairColors[setup.player.HairColor];
        var lashFill = App.Data.Lists.HairColors[setup.player.HairColor];
        var style = wig != null ? wig.HairStyle() : setup.player.HairStyle;

        //TODO: We are missing some hair styles, so either we create them later or get creative.

        switch(style) {
            case 'a spunky boy cut"':
                //avatar: (min 30, max 110) game: (max 10)
                length = Math.min(110, ((80 * (length/20)) + 30));
                style = 7;
                break;
            case 'a loose and flippy style':
                //avatar: (min 45, max 60), game: (max 20)
                length = Math.min(60, ((15 * (length/20)) + 30));
                style = 2;
                break;
            case 'a short bob style':
            case 'a short bob':
                //avatar: (min 35, max 50)  game (max 30)
                length = Math.min(50, ((15 * (length/30)) + 35));
                style = 3;
                break;
            case 'a breezy style':
                //avatar (min 60, max 110) game (max 50)
                length = Math.min(110, ((50 * (length/50)) +60));
                style = 6;
                break;
            case 'a loose cut with flowing curls':
                style = 4;
                break;
            case 'cute pig tails':
                //avatar (min 90, max 110) game (50)
                length = Math.min(110, ((20 * (length/50)) + 90));
                style = 5;
                break;
            case 'a long pony tail':
                //avatar (min 90, max 110) game (100)
                length = Math.min(110, ((20 * (length/100)) + 90));
                style = 5;
                break;
            case 'a slick up-do style':
                //avatar (min 50, max 110) game (20)
                length = Math.min(110, ((60 * (length/20)) + 50));
                style = 1;
                break;
            case 'extravagantly long braids':
                style = 4;
                break;
            case 'extremely long twin tails':
                //avatar (min 90, max 110) game (80)
                length = Math.min(110, ((20 * (length/80)) + 90));
                style = 5;
                break;
            default:
                style = 2;
        }

        Data.basedim.hairLength = length;
        Data.basedim.hairStyle = style;
        Data.basedim.hairHue = color.h;
        Data.basedim.hairSaturation = color.s;
        Data.basedim.hairLightness = color.l;
        Data.browFill = 'black';
        Data.lashFill = 'black';

        return Data;
    }

    _ClothesHandler(PC) {

        for (var slot in setup.player.Equipment) {
            var o = setup.player.Equipment[slot];
            if (typeof o === 'undefined' || o == null || o.Slot == 'Wig') continue; //no op
            var id = App.Data.AvatarMaps.hasOwnProperty(o.Tag) ? o.Tag : o.Slot;
            if (App.Data.AvatarMaps.hasOwnProperty(id)) {
                var items = App.Data.AvatarMaps[id];
                for(var i = 0; i < items.length; i++) {
                    var str = "da.Clothes.create("+items[i].c+","+JSON.stringify(items[i].a)+")";
                    // This nonsense here is just to be safe due to script 'compiling' order of Tweego.
                    if(items[i].a != null && items[i].a.hasOwnProperty('pattern') && typeof items[i].a.pattern === 'string') {
                        var patternOb = null;
                        try {
                            patternOb = eval(items[i].a.pattern);
                        } catch(err) {
                            console.log(err);
                        }
                        if (patternOb != null) items[i].a.fill = patternOb;
                    } 
                    var part = items[i].a == null ? da.Clothes.create(eval(items[i].c)) : da.Clothes.create(eval(items[i].c), items[i].a);
                    PC.wearClothing(part);
                }
            }
        }
	
        return MCdraw;
    }

    _b(s) { return App.PR.StatToCM(setup.player, s); }

    _c(s) { return setup.player.GetStat('STAT', s); }

    _clamp(v, min, max) {
        return Math.max(Math.min(v, max), min);
    }* /

}


/**
     * Draw a small portrait of the player character.
     */
/*
 DrawPortrait(canvas)
 {
	 if( settings.displayAvatar == true)
	 $(document).one(":passageend", { e: 'avatarFace', h: 240, w: 240, c: canvas }, this._DrawPortrait.bind(this));
 }
*/
 /**
  * Called on ":passageend" by DrawPortrait();
  * Requires a hidden canvas 'hiddenCanvas' for drawing a large picture of the player.
  * Draws specifically to an element with the id of 'avatarFace'. See main.twee for implementation.
  */
 /*
 _DrawPortrait(event)
 {
	 //if( settings.displayAvatar == false) return;

	 var e, w, h, canvasGroup;
	 if (typeof event === 'object') {
		 e = event.data.e;
		 w = event.data.w;
		 h = event.data.h;
		 canvasGroup = event.data.c;
	 } else {
		 e = 'avatarFace';
		 w = 240;
		 h = 240;
	 }
/*
	 if (typeof canvasGroup === 'undefined') {
		 canvasGroup = da.getCanvasGroup("hiddenCanvas", {
			border: "none",
			width: 1400,
			height: 2400
		 });
	 }

	 var MCdraw = new da.Player( this.GetMCData() );
	 MCdraw = this._AttachParts(PC);

	 da.draw(canvasGroup, PC, { 
		 printHeight: false, printAdditionalInfo: false, renderShoeSideView: false
		 }).then(function (exports) {

		 var center = { };
			 center.x = exports[da.Part.RIGHT].skull.x;
			 center.y = (exports[da.Part.RIGHT].skull.y) - ( h * 0.18);

		 var portraitCanvas = da.getCanvas("portrait",
			 {
				 width : w,
				 height: h,
				 border: "solid 1px black",
				 position: "relative",
				 parent: document.getElementById(e),
			 });
	 
		 da.drawFocusedWindow(portraitCanvas,
			 exports,
			 {
				 center: center,
				 width: (w * 0.40), // scaling on the point, smaller is closer, larger is zoomed out.
				 height: (h * 0.40)
			 });
	 });
	
	Wear (item, lock) {
		this.Clothing.Wear(item.Id, lock);
		App.Avatar._DrawPortrait();
	}

 }
*/
/*
// Initalize Avatar Engine
App.Avatar = new App.Entity.AvatarEngine();
* /

// event driven actions
$(document).on(':passagestart', function (ev) {
    if (!ev.passage.tags.includes('noreturn')) {
        State.variables.return = ev.passage.title;
    }
    redrawMC();
});
*/
