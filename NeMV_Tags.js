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
 * @plugindesc v1.3.1 Allows objects and events to be tagged and those tags to be easily retrieved and manipulated via script.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows actors, enemies, classes, skills, states, items, weapons,
 * armors, and events to be tagged and those tags to be easily retrieved via
 * script.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add a tag to your actor, class, enemy, item, weapon, armor, or event as
 * below. Multiple tags per entry can be separated by whitespace or commas, and tags
 * are case insensitive. Add tags to events via the Comment event command.
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
 * [Object].addTag("good")
 *
 * ... or...
 *
 * [Object].removeTag("bad")
 *
 * Removing a tag that does not exist will NOT throw an error.
 *
 * Tag addition and removal with these methods may be deprecated in the future.
 *
 * Events Note: Due to the volatile nature of events, adding and removing tags
 * dynamically is not currently possible. Tags on events do change between
 * the events pages; they simply cannot be addTag()/removeTag()'d.
 *
 * ----------------------------------------------------------------------------
 *
 * A couple of utility methods have also been added to allow you to quickly
 * scan the party for tags on items they either possess or have equipped, or
 * tags on states they may have active.
 *
 * NeMV.Tags.partyItemsWithTag("magical")
 *
 * ... will return true if the party possesses any items tagged as "magical".
 *
 * NeMV.Tags.partyStatesWithTag("weapon")
 *
 * ... will return true if a party actor has a state tagged as "weapon".
 *
 * NeMV.Tags.eventsWithTag("harvestable")
 *
 * ... will return a collection of Game_Event objects tagged as "harvestable".
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
 * Version 1.3.1:
 * - re-fixed the previously fixed bug that was ever so recently unfixed
 * - deprecated old utility methods
 *
 * Version 1.3.0:
 * - moved event tagging off of underlying event and put it on Game_Event
 * - corrected improper event page tagging issues
 *
 * Version 1.2.3:
 * - added better event loading after issues with some blank states
 *
 * Version 1.2.2:
 * - added EventsThatHaveTag() utility method
 *
 * Version 1.2.1:
 * - fixed up event tagging a bit
 *
 * Version 1.2.0:
 * - added event tagging!
 *
 * Version 1.1.1:
 * - added Game_Item protos
 * - reorderd object additions
 *
 * Version 1.1.0:
 * - added wild-card searches on .hasTag()
 *
 * Version 1.0.0:
 * - initial plugin
 *
 */
//=============================================================================

// INITIALIZATION -------------------------------------------------------------

NeMV.Tags.init = function() {
	if ($dataActors !== null && $dataActors !== undefined) this.processNotetags($dataActors);
	if ($dataEnemies !== null && $dataEnemies !== undefined) this.processNotetags($dataEnemies);
	if ($dataClasses !== null && $dataClasses !== undefined) this.processNotetags($dataClasses);
	if ($dataSkills !== null && $dataSkills !== undefined) this.processNotetags($dataSkills);
	if ($dataStates !== null && $dataStates !== undefined) this.processNotetags($dataStates);
	if ($dataItems !== null && $dataItems !== undefined) this.processNotetags($dataItems);
	if ($dataWeapons !== null && $dataWeapons !== undefined) this.processNotetags($dataWeapons);
	if ($dataArmors !== null && $dataArmors !== undefined) this.processNotetags($dataArmors);
};

NeMV.Tags.processNotetags = function(data) {
	var tagsRegex = /<(?:TAGS):[ ](.*)>/i;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj === undefined) continue;
		obj.tags = obj.tags || [];
		var notelines = obj.note.split(/[\r\n]+/);
		obj.hasTag = function(tag) {
			return NeMV.Tags.baseHasTag(tag, this.tags);
		};
		obj.removeTag = function(tag) {
			var index = this.tags.indexOf(tag.toUpperCase());
			if (index > -1) this.tags.splice(index, 1);
		};
		obj.addTag = function(tag) {
			this.removeTag(tag.toUpperCase());
			this.tags.push(tag.toUpperCase());
		};
		for (var i = 0; i < notelines.length; i++) {
			var line = notelines[i];
			lineMatch = line.match(tagsRegex);
			if (lineMatch) {
				var tagData = lineMatch[1].toUpperCase().match(/\w+/gi);
	    		obj.tags = obj.tags.concat(tagData);
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
};

NeMV.Tags.baseEventSetup = function(gameEvent) {
	if (gameEvent === null ||
		gameEvent === undefined ||
		gameEvent.event === undefined) return;
	var e = gameEvent.event();
	gameEvent.tags = [];
	gameEvent.hasTag = function(tag) {
		return NeMV.Tags.baseHasTag(tag, this.tags);
	};
	gameEvent.removeTag = function(tag) {
		var index = this.tags.indexOf(tag.toUpperCase());
		if (index > -1) this.tags.splice(index, 1);
	};
	gameEvent.addTag = function(tag) {
		this.removeTag(tag.toUpperCase());
		this.tags.push(tag.toUpperCase());
	};
	if (gameEvent.page() && gameEvent.list()) {
		for (var l = 0; l < gameEvent.list().length; l++) {
			if (gameEvent.list()[l].code == 108) {
				var tagLine = gameEvent.list()[l].parameters[0].toUpperCase().match(/<TAGS:[ ](.+)>/gi);
				if (tagLine !== null && tagLine !== undefined) {
					var tagData = tagLine[0].match(/<TAGS:[ ](.+)>/i)[1].match(/\w+/gi);
					gameEvent.tags = tagData;
				}
			}
		}
	}
};

// OVERRIDES ------------------------------------------------------------------

NeMV.Tags.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.Tags.Scene_Boot_terminate.call(this);
	NeMV.Tags.init();
};

// UTILITIES ------------------------------------------------------------------

NeMV.Tags.partyItemsWithTag = function(tag) {
	if (Imported.YEP_ItemCore) {
		return $gameParty._actors.reduce(function(a,b) {
			return $gameActors.actor(b)._equips.reduce(function(c,d) {
				return c || ((d.object() !== null) ? DataManager.getBaseItem(d.object()).hasTag(tag) : false);
			},a);
		}, false) ||
		$gameParty.equipItems().reduce(function(e,f) {
			return e || DataManager.getBaseItem(f).hasTag(tag);
		}, false) ||
		$gameParty.items().reduce(function(g,h) {
			return g || DataManager.getBaseItem(h).hasTag(tag);
		}, false);
	} else {
		return $gameParty._actors.reduce(function(a,b) {
			return $gameActors.actor(b)._equips.reduce(function(c,d) {
				return c || ((d.object() !== null) ? d.object().hasTag(tag) : false);
			},a);
		}, false) ||
		$gameParty.equipItems().reduce(function(e,f) {
			return e || f.hasTag(tag);
		}, false) ||
		$gameParty.items().reduce(function(g,h) {
			return g || h.hasTag(tag);
		}, false);
	}
};

NeMV.Tags.partyStatesWithTag = function(tag) {
	return $gameParty._actors.reduce(function(a,b) {
		return $gameActors.actor(b).states().reduce(function(c,d) {
			return c||d.hasTag(tag);}, a);
	}, false);
};

NeMV.Tags.eventsWithTag = function(tag) {
	var events = [];
	$gameMap.events().forEach(function(e) {
		if (e.hasTag(tag))
			events.push(e);
	});
	if (events.length === 0) return null;
	else return events;
};

// deprecated; please use new methods
NeMV.Tags.AnyItemsHaveTag = NeMV.Tags.partyItemsWithTag;
NeMV.Tags.AnyPartyStatesHaveTag = NeMV.Tags.partyStatesWithTag;
NeMV.Tags.EventsThatHaveTag = NeMV.Tags.eventsWithTag;

// ENEMY PROTO ----------------------------------------------------------------

Game_Enemy.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.enemy().tags);
};

Game_Enemy.prototype.removeTag = function(tag) {
	var index = this.enemy().tags.indexOf(tag.toUpperCase());
	if (index > -1) this.enemy().tags.splice(index, 1);
};

Game_Enemy.prototype.addTag = function(tag) {
	this.enemy().removeTag(tag.toUpperCase());
	this.enemy().tags.push(tag.toUpperCase());
};

// ACTOR PROTO ----------------------------------------------------------------

Game_Actor.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.actor().tags);
};

Game_Actor.prototype.removeTag = function(tag) {
	var index = this.actor().tags.indexOf(tag.toUpperCase());
	if (index > -1) this.actor().tags.splice(index, 1);
};

Game_Actor.prototype.addTag = function(tag) {
	this.actor().removeTag(tag.toUpperCase());
	this.actor().tags.push(tag.toUpperCase());
};

// ITEM PROTO ----------------------------------------------------------------

Game_Item.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.object().tags);
};

Game_Item.prototype.removeTag = function(tag) {
	var index = this.object().tags.indexOf(tag.toUpperCase());
	if (index > -1) this.object().tags.splice(index, 1);
};

Game_Item.prototype.addTag = function(tag) {
	this.object().removeTag(tag.toUpperCase());
	this.object().tags.push(tag.toUpperCase());
};

// EVENT PROTO ----------------------------------------------------------------

Game_Event.prototype.hasTag = function(tag) {
	return NeMV.Tags.baseHasTag(tag, this.event().tags);
};

// Game_Event.prototype.removeTag = function(tag) {
// 	var index = this.event().tags.indexOf(tag.toUpperCase());
// 	if (index > -1) this.event().tags.splice(index, 1);
// };
//
// Game_Event.prototype.addTag = function(tag) {
// 	this.event().removeTag(tag.toUpperCase());
// 	this.event().tags.push(tag.toUpperCase());
// };

NeMV.Tags.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	NeMV.Tags.Game_Event_initialize.call(this, mapId, eventId);
	NeMV.Tags.baseEventSetup(this);
};

NeMV.Tags.Game_Event_lock = Game_Event.prototype.lock;
Game_Event.prototype.lock = function() {
	NeMV.Tags.Game_Event_lock.call(this);
	NeMV.Tags.baseEventSetup(this);
};

NeMV.Tags.Game_Event_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function() {
	NeMV.Tags.Game_Event_refresh.call(this);
	NeMV.Tags.baseEventSetup(this);
};

// MAP PROTO ------------------------------------------------------------------

NeMV.Tags.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	NeMV.Tags.Scene_Map_onMapLoaded.call(this);
	$gameMap.events().forEach(function(event) {
		NeMV.Tags.baseEventSetup(event);
	});
};
