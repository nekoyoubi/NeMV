//=============================================================================
// NeMV - Actor Equip Points
// NeMV_X_ActorEquipPoints.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_ActorEquipPoints = true;

var NeMV = NeMV || {};
NeMV.Tags = NeMV.Tags || {};
NeMV.Tags.AEP = NeMV.Tags.AEP || {};

//=============================================================================
 /*:
 * @plugindesc v1.0.1 (Requires NeMV_Tags.js & YEP_X_EquipRequirements.js) Provides a point-based equipment system with the help of NeMV Tags and YEP - Equip Requirements.
 * @author Nekoyoubi
 *
 * @param --- Equipment Tags ---
 * @default
 *
 * @param Equipment Tag 1
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear chest 4")
 * @default gear chest 4
 *
 * @param Equipment Tag 2
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear helm 2")
 * @default gear helm 2
 *
 * @param Equipment Tag 3
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "bracers 2")
 * @default gear bracers 2
 *
 * @param Equipment Tag 4
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear twohand 4")
 * @default gear twohand 4
 *
 * @param Equipment Tag 5
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear onehand 2")
 * @default gear onehand 2
 *
 * @param Equipment Tag 6
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear bow 3")
 * @default gear bow 3
 *
 * @param Equipment Tag 7
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear boots 2")
 * @default gear boots 2
 *
 * @param Equipment Tag 8
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear shield 3")
 * @default gear shield 3
 *
 * @param Equipment Tag 9
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear dagger 1")
 * @default gear dagger 1
 *
 * @param Equipment Tag 10
 * @desc Define the type, tag to be counted, and its value.
 * Format: type tag variable (e.g. "gear quiver 1")
 * @default gear quiver 1
 *
 * @param Equipment Tags CSV
 * @desc CSV array of strings for more equipment tags counters.
 * Example: gear halberd 5, piety holysymbol 2, cursed voodoodoll 3
 * @default
 *
 * @param --- Misc. ---
 * @default
 *
 * @param Debug AEP
 * @desc Whether or not to output debug information for AEP.
 * Example: true (debug) or false (no debug)
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin provides a point-based equipment system with the help of
 * NeMV - Tags & YEP - Equip Requirements. It allows you to build an equipment
 * monitoring system, where when equipping and unequipping weapons and armor to
 * your actors, you can track that equipment based on tags. This can be used to
 * build a point-based equipment system, determine an encumbrance for your
 * actors, or even grant or deny skills, quests, event interactions, etc based
 * on the points associated to an actors tagged equipment.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * First, configure the respective equipment entries in the plugin's parameters
 * as the default plugin parameters illustrate.
 *
 * Next, tag your equipment with the appropriate tags...
 *
 * Weapon  >  Notebox  >  <tags: twohand, sword, demonic>
 *
 * Armor  >  Notebox  >  <tags: shield, angelic, quest>
 *
 * Now add an equipment limiting tag to your actors. You will set the inital
 * maximum here, but this can be changed during the course of play via plugin
 * commands and scripts.
 *
 * Format:  <MAX TYPE POINTS: AMOUNT>
 *
 * Example:
 *
 * Actor  >  Notebox  >  <Max Gear Points: 10>
 *
 * Plugin Commands ------------------------------------------------------------
 *
 * AEP comes equipped with plugin commands for adding, removing, and manually
 * setting Equip Point tags. The format for these commands is as follows.
 *
 * AEP COMMAND TYPE TAG [ AMOUNT ]
 *
 * Examples:
 *
 * aep add gear buckler 2
 * aep remove gear buckler
 * aep set holy symbol 1
 * aep add gear necklace
 *
 * In the examples above, the first adds a new Gear-type entry with the tag
 * "buckler". The second removes the buckler from the Gear-type. This will not
 * remove buckler from any other types that may be watching for it though.
 * The third assumes that a Holy-type "symbol" tag is already setup, and sets
 * sets its point value to 1 going forward. The fourth example creates a new
 * Gear-type entry that defaults to a 0-point value.
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy equipping!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.1:
 * - removed unintentional YEP - Item Core requirement
 *
 * Version 1.0:
 * - initial plugin
 *
 */
//=============================================================================

// PARAMS ---------------------------------------------------------------------

if (true) { //PARAMS COLLAPSE
	NeMV.Tags.AEP.Parameters = PluginManager.parameters('NeMV_X_ActorEquipPoints');
	NeMV.Tags.AEP.Param = NeMV.Tags.AEP.Param || {};

	NeMV.Tags.AEP.Param.EquipPoints = [];
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 1']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 2']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 3']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 4']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 5']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 6']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 7']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 8']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 9']));
	NeMV.Tags.AEP.Param.EquipPoints.push(String(NeMV.Tags.AEP.Parameters['Equipment Tag 10']));
	NeMV.Tags.AEP.Param.EquipPoints = NeMV.Tags.AEP.Param.EquipPoints.concat(
		String(NeMV.Tags.AEP.Parameters['Equipment Tag CSV']).split(/\s*,\s*/)||[]);

	NeMV.Tags.AEP.Debug = eval(NeMV.Tags.AEP.Parameters['Debug AEP']);
}

// INITIALIZATION -------------------------------------------------------------

NeMV.Tags.AEP.EquipPoints = NeMV.Tags.AEP.EquipPoints || [];

NeMV.Tags.AEP.init = function() {
	for (var i = 0; i < this.Param.EquipPoints.length; i++) {
		var points = this.Param.EquipPoints[i].trim();
		if (points === null || points == 'undefined' || points === "") {
			this.Param.EquipPoints.splice(i, 1);
		} else {
			this.addEquipPoints(points);
		}
	}
	if ($dataActors !== null && $dataActors !== undefined) this.processNotetags($dataActors);
	if ($dataWeapons !== null && $dataWeapons !== undefined) this.processEquipment($dataWeapons);
	if ($dataArmors !== null && $dataArmors !== undefined) this.processEquipment($dataArmors);
};

NeMV.Tags.AEP.processEquipment = function(data) {
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj !== null && obj !== undefined) {
			obj.getEquipPointsValue = function(type) {
				return NeMV.Tags.AEP.baseGetEquipPointsValue(type, this);
			};
		}
	}
};

NeMV.Tags.AEP.processNotetags = function(data) {
	var tagRegex = /<(?:MAX[ ](\w+)[ ]POINTS):\s*(\d+)>/i;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj == 'undefined') continue;
		obj.maxEquipPoints = obj.maxEquipPoints || [];
		obj.getEquipPointsMax = function(type) {
			return NeMV.Tags.AEP.baseGetEquipPointsMax(type, this.maxEquipPoints);
		};
		obj.setEquipPointsMax = function(type, max) {
			return NeMV.Tags.AEP.baseSetEquipPointsMax(type, max, this.maxEquipPoints);
		};
		obj.getEquipPoints = function(type) {
			return NeMV.Tags.AEP.baseGetEquipPoints(type, this.id);
		};
		var notelines = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notelines.length; i++) {
			var line = notelines[i];
			lineMatch = line.match(tagRegex);
			if (lineMatch) {
				var type = lineMatch[1].toUpperCase();
				var max = Number(lineMatch[2]);
	    		obj.maxEquipPoints.push({ 'type' : type, 'max' : max });
			}
		}
	}
};

NeMV.Tags.AEP.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.Tags.AEP.Scene_Boot_terminate.call(this);
	NeMV.Tags.AEP.init();
};

// BASE METHODS ---------------------------------------------------------------

NeMV.Tags.AEP.baseGetEquipPointsMax = function(type, array) {
	for (var i = 0; i < array.length; i++)
		if (array[i].type.toUpperCase() == type.toUpperCase())
			return array[i].max;
	return -1;
};

NeMV.Tags.AEP.baseSetEquipPointsMax = function(type, max, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].type.toUpperCase() == type.toUpperCase()) {
			array[i].max = max;
			return;
		}
	}
};

NeMV.Tags.AEP.baseGetEquipPoints = function(type, actorId) {
	var actor = $gameActors.actor(actorId);
	var equips = actor._equips;
	var points = 0;
	for (var ep = 0; ep < this.EquipPoints.length; ep++) {
		for (var e = 0; e < equips.length; e++) {
			if (equips[e]._dataClass !== "" &&
				this.EquipPoints[ep].type.toUpperCase() == type.toUpperCase() &&
				equips[e].hasTag(this.EquipPoints[ep].tag)) {
				points += this.EquipPoints[ep].points;
			}
		}
	}
	return points;
};

NeMV.Tags.AEP.baseGetEquipPointsValue = function(type, item) {
	for (var ep = 0; ep < this.EquipPoints.length; ep++) {
		if (this.EquipPoints[ep].type.toUpperCase() == type.toUpperCase() &&
			item.hasTag(this.EquipPoints[ep].tag)) {
			return this.EquipPoints[ep].points;
		}
	}
	return 0;
};

// EQUIP POINT METHODS ------------------------------------------------------------

NeMV.Tags.AEP.addEquipPoints = function(points) {
	var split = points.split(/\s+/);
	this.EquipPoints.push({
		'type' : split[0].toUpperCase(),
		'tag' : split[1].toUpperCase(),
		'points' : (split.length > 2 && !isNaN(parseInt(split[2]))) ? Number(split[2]) : 0
	});
	if (this.Debug) console.log("AEP - Tag added: "+points);
};

NeMV.Tags.AEP.removeEquipPoints = function(tag) {
	var index = -1;
	for (var i = 0; i < this.EquipPoints.length; i++)
		if (this.EquipPoints[i].tag.toUpperCase() == tag.toUpperCase())
			index = i;
	if (index > -1) {
		this.EquipPoints.splice(index, 1);
		if (this.Debug) console.log("AEP - "+tag+" removed");
	} else {
		if (this.Debug) console.log("AEP - "+tag+" not found");
	}
};

NeMV.Tags.AEP.setEquipPoints = function(points) {
	var split = points.split(/\s+/);
	for (var i = 0; i < this.EquipPoints.length; i++) {
		if (this.EquipPoints[i].type.toUpperCase() == split[0].toUpperCase() &&
			this.EquipPoints[i].tag.toUpperCase() == split[1].toUpperCase()) {
			this.EquipPoints[i].points = (split.length > 2 && !isNaN(parseInt(split[2]))) ? Number(split[2]) : 0;
			if (this.Debug) console.log("AEP - Tag set: "+this.EquipPoints[i].type.toUpperCase()+":"+this.EquipPoints[i].tag.toUpperCase()+" to "+this.EquipPoints[i].points);
		}
	}
};

// PLUGIN COMMANDS ------------------------------------------------------------

NeMV.Tags.AEP.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	NeMV.Tags.AEP.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toUpperCase() == "AEP") {
		var regex = /(?:AEP)\s(ADD|REMOVE|SET)\s(([a-z_-]+)\s([a-z_-]+)((?:\s)(\d+))?)/i;
		var data = (command+" "+args.join(" ")).toUpperCase().match(regex);
		if (data !== null) {
			var comm = data[1];
			var tagdata = data[2];
			var tag = data[3];
			var points = (data[5].length > 0) ? Number(data[5]) : 0;
			switch (comm.toUpperCase()) {
				case 'ADD':
					NeMV.Tags.AEP.addEquipPoints(tagdata);
					break;
				case 'REMOVE':
					NeMV.Tags.AEP.removeEquipPoints(tag);
					break;
				case 'SET':
					NeMV.Tags.AEP.setEquipPoints(tagdata);
					break;
			}
		}
	}
};

// EQUIP REQUIREMENTS INTEGRATION ---------------------------------------------

NeMV.Tags.AEP.getBaseItem = function(item) {
	return (Imported.YEP_ItemCore) ? DataManager.getBaseItem(item) : item;
};

if (Imported.YEP_X_EquipRequirements) {
	Game_BattlerBase.prototype.meetEquipPointsRequirements = function(item) {
		var actor = this.actor();
		var baseItem = (item.hasTag === undefined) ? NeMV.Tags.AEP.getBaseItem(item) : item;
		var epa = NeMV.Tags.AEP.EquipPoints;
		var safe = true;
		for (var ep = 0; ep < epa.length; ep++) {
			if (baseItem.hasTag(epa[ep].tag) && actor.getEquipPointsMax(epa[ep].type) > -1) {
				var max = actor.getEquipPointsMax(epa[ep].type);
				var current = actor.getEquipPoints(epa[ep].type);
				var ipoints = baseItem.getEquipPointsValue(epa[ep].type);
				safe &= (max > (current + ipoints));
			}
		}
		return safe;
	};

	Game_BattlerBase.prototype.meetAllEquipRequirements = function(item) {
		if (!item.equipRequirements) {
			if (item.baseItemId) {
				item.equipRequirements = NeMV.Tags.AEP.getBaseItem(item).equipRequirements;
			} else {
	    		return true;
	    	}
		}
		if (!this.meetEquipPointsRequirements(item)) return false; // the only change in the override
		if (!this.meetEquipParamRequirements(item)) return false;
		if (!this.meetEquipClassRequirements(item)) return false;
		if (!this.meetEquipSkillRequirements(item)) return false;
		if (!this.meetEquipSwitchRequirements(item)) return false;
		if (!this.meetEquipUniqueRequirements(item)) return false;
		if (!this.meetEquipEvalRequirements(item)) return false;
		return true;
	};
}

// ACTOR PROTO ----------------------------------------------------------------

Game_Actor.prototype.getEquipPoints = function(type) {
	return NeMV.Tags.AEP.baseGetEquipPoints(type, this.actor().id);
};

Game_Actor.prototype.getEquipPointsMax = function(type) {
	return NeMV.Tags.AEP.baseGetEquipPointsMax(type, this.actor().maxEquipPoints);
};

// ITEM PROTO ----------------------------------------------------------------

Game_Item.prototype.getEquipPointsValue = function(type) {
	return NeMV.Tags.AEP.baseGetEquipPointsValue(type, this.object());
};
