//=============================================================================
// NeMV - Tags
// NeMV_Tags.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_Tags = true;

var NeMV = NeMV || {};
NeMV.Tags = NeMV.Tags || {};

//=============================================================================
 /*:
 * @plugindesc v1.1 Allows objects to be tagged and those tags to be easily retrieved and manipulated via script.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows actors, enemies, classes, skills, states, items, weapons,
 * and armors to be tagged and those tags to be easily retrieved via script.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 * 
 * Add a tag to your actor, class, enemy, item, weapon, or armor as below.
 * Multiple tags per entry can be separated by whitespace or commas, and tags
 * are case insensitive.
 * 
 * <Tags: Plant>
 * 
 * ... or...
 *
 * <TAGS: root, red, alchemy>
 *
 * ... or...
 *
 * <tags: BOSS FIRERESIST EXTRAGOLD>
 * 
 * ----------------------------------------------------------------------------
 *
 * Once your tags are added, they can be accessed in almost any location via:
 *
 * [Object].hasTag("plant")
 *
 * ... or wild-card the tag with an asterisk to get partial matches...
 *
 * [Object].hasTag("extra*")
 * 
 * This will return a boolean result indicating whether your object contains
 * that tag (or any tag that matches your wild-card search) or not.
 * 
 * Tags can also be added and removed programmatically by calling either:
 *
 * [Object].addTag("spoiled")
 * 
 * ... or...
 * 
 * [Object].removeTag("fresh")
 * 
 * Note: Removing a tag that does not exist will NOT throw an error.
 *
 * ----------------------------------------------------------------------------
 * 
 * A couple of utility methods have also been added to allow you to quickly
 * scan the party for tags on items they either possess or have equipped, or
 * tags on states they may have active.
 * 
 * NeMV.Tags.AnyPartyItemsHaveTag("magical")
 * 
 * ... will return true if the party possesses any items tagged as "magical".
 *
 * NeMV.Tags.AnyPartyStatesHaveTag("weapon")
 * 
 * ... will return true if a party actor has a state tagged as "weapon".
 *
 * ============================================================================
 * Support
 * ============================================================================
 * 
 * Compatibility with YEP - Item Core exists to a degree, but may require
 * additional effort when checking specific items. It's always advisable to
 * use...
 * 
 * DataManager.getBaseItem(item)
 *
 * ... if you are using YEP - Item Core.
 * 
 * Should this plugin not work for you for any reason, please notify me by
 * creating a Github issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 * 
 * Thanks, and happy tagging!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.1:
 * - added wild-card searches on .hasTag()
 * 
 * Version 1.00:
 * - initial plugin
 *
 */
//=============================================================================

// INITIALIZATION -------------------------------------------------------------

NeMV.Tags.init = function() {
 	if ($dataActors !== null && $dataActors != undefined) this.processNotetags($dataActors);
 	if ($dataEnemies !== null && $dataEnemies != undefined) this.processNotetags($dataEnemies);
 	if ($dataClasses !== null && $dataClasses != undefined) this.processNotetags($dataClasses);
 	if ($dataSkills !== null && $dataSkills != undefined) this.processNotetags($dataSkills);
 	if ($dataStates !== null && $dataStates != undefined) this.processNotetags($dataStates);
 	if ($dataItems !== null && $dataItems != undefined) this.processNotetags($dataItems);
 	if ($dataWeapons !== null && $dataWeapons != undefined) this.processNotetags($dataWeapons);
 	if ($dataArmors !== null && $dataArmors != undefined) this.processNotetags($dataArmors);
};

NeMV.Tags.processNotetags = function(data, direct) {
	var tagsRegex = /<(?:TAGS):[ ](.*)>/i;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj == undefined) continue;
		obj.tags = obj.tags || [];
		var notelines = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notelines.length; i++) {
			var line = notelines[i];
			lineMatch = line.match(tagsRegex);
			if (lineMatch) {
				var tagData = lineMatch[1].toUpperCase().match(/\w+/gi);
	    		obj.tags = obj.tags.concat(tagData);
			}
			obj.hasTag = function(tag) {
				return NeMV.Tags.baseHasTag(tag, this.tags);
			};

			obj.removeTag = function(tag) {
				var index = this.tags.indexOf(tag.toUpperCase());
				if (index > -1) this.tags.splice(index, 1);
			}

			obj.addTag = function(tag) {
				this.removeTag(tag.toUpperCase());
				this.tags.push(tag.toUpperCase());
			}
		}
	}
};

// BASE METHODS ---------------------------------------------------------------

NeMV.Tags.baseHasTag = function(tag, tags) {
	for (var t = 0; t < tags.length; t++) {
		tag = tag.toUpperCase();
		var regex = "^"+tag+"$";
		if (tag.indexOf("*") >= 0) {
			if (tag.charAt(0) == "*") {
				regex = tag.replace("*","")+"$";
			} else if (tag.charAt(tag.length-1) == "*") {
				regex = "^"+tag.replace("*","");
			} else {
				regex = "^"+tag.replace("*","\\w*")+"$";
			}
		}
		var currentTag = tags[t].toUpperCase();
		var exp = new RegExp(regex, "i");
		if (exp.exec(currentTag) !== null)
			return true;
	}
	return false;
}

// OVERRIDES ------------------------------------------------------------------

NeMV.Tags.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.Tags.Scene_Boot_terminate.call(this);
	NeMV.Tags.init();
};

// UTILITIES ------------------------------------------------------------------

NeMV.Tags.AnyPartyItemsHaveTag = function(tag) {
	if (Imported.YEP_ItemCore) {
		return $gameParty._actors.reduce(function(a,b) {
			return $gameActors.actor(b)._equips.reduce(function(c,d) {
				return c || ((d.object() !== null)
								? DataManager.getBaseItem(d.object()).hasTag(tag)
								: false);
			},a);
		}, false) || 
		$gameParty.equipItems().reduce(function(e,f) {
			return e || DataManager.getBaseItem(f).hasTag(tag);
		}, false) ||
		$gameParty.items().reduce(function(g,h) {
			return g || DataManager.getBaseItem(h).hasTag(tag);
		}, false)
	} else {
		return $gameParty._actors.reduce(function(a,b) {
			return $gameActors.actor(b)._equips.reduce(function(c,d) {
				return c || ((d.object() !== null)
								? d.object().hasTag(tag)
								: false);
			},a);
		}, false) || 
		$gameParty.equipItems().reduce(function(e,f) {
			return e || f.hasTag(tag);
		}, false) ||
		$gameParty.items().reduce(function(g,h) {
			return g || h.hasTag(tag);
		}, false);
	}
}

NeMV.Tags.AnyPartyStatesHaveTag = function(tag) {
	return $gameParty._actors.reduce(function(a,b) {
		return $gameActors.actor(b).states().reduce(function(c,d) {
			return c||d.hasTag(tag)}, a);
	}, false);
}

// ENEMY PROTO ----------------------------------------------------------------

Game_Enemy.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.enemy().tags)
};

Game_Enemy.prototype.removeTag = function(tag) {
	var index = this.enemy().tags.indexOf(tag.toUpperCase());
	if (index > -1) this.enemy().tags.splice(index, 1);
}

Game_Enemy.prototype.addTag = function(tag) {
	this.enemy().removeTag(tag.toUpperCase());
	this.enemy().tags.push(tag.toUpperCase());
}

// ACTOR PROTO ----------------------------------------------------------------

Game_Actor.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.actor().tags);
};

Game_Actor.prototype.removeTag = function(tag) {
	var index = this.actor().tags.indexOf(tag.toUpperCase());
	if (index > -1) this.actor().tags.splice(index, 1);
}

Game_Actor.prototype.addTag = function(tag) {
	this.actor().removeTag(tag.toUpperCase());
	this.actor().tags.push(tag.toUpperCase());
}
