//=============================================================================
// NeMV - Utilities
// NeMV_Utilities.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_Utilities = true;

var NeMV = NeMV || {};
var nemv = NeMV;

//=============================================================================
 /*:
 * @plugindesc v1.0.0 Some helpful functions for making your notetag evals and event scripts easier to read and write.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a set of JavaScript helper methods for various aspects of RMMV. Some
 * items will only be available with the proper plugins installed, but no extra
 * plugins are required in order to use it.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Various utility methods are presented here to assist you in your development
 * of notetag evals, event script commands, or even plugins. Here they are, and
 * a couple of examples of their use. Please note that the method prefixes
 * ("NeMV" and "nemv") are interchangeable for your typing convenience.
 *
 * ----------------------------- ! IMPORTANT ! --------------------------------
 * Not everything in this plugin is documented. Some methods have yet to get
 * write-ups, so don't be affraid to dig in and see what everything does. I
 * will be updating this and its documentation as often as I am able, but this
 * will more than likely grow in function faster than I can write entries for
 * it. As such it will probably remain in an alpha-state (doesn't mean "scary",
 * just not "feature-complete") for quite some time.
 * ----------------------------- ! IMPORTANT ! --------------------------------
 *
 * Array.random(skipOne?)  [returns a random value from the array]
 *
 * This helper is actually added to the JavaScript [Array] object itself.
 * It allows you to easily pick a value out of a set without having to worry
 * about the [Math]. The optional 'skipOne' parameter is a convenience for you
 * to easily skip the zeroth index (useful for looking at "$data[Type]" arrays)
 * from RMMV's database.
 *
 * Examples:
 * $dataSkills.random(true) // returns a random skill
 * ["Hey!","Hello!","Hi!"].random() // returns a random greeting
 *
 * ----------------------------------------------------------------------------
 *
 * NeMV.chance(ratio|percent)  [returns true|false]
 *
 * Simply an easy access to random chance. Calling the method with a string
 * (text) will attempt to turn it into a ratio check (e.g. "1:15", "2/30",
 * "3 out of 45", and "4 in 60" will all return the same), and will compare the
 * result of that ratio against a random number, returning success or failure.
 *
 * Examples:
 * nemv.chance(20) // returns true 20% of the time
 * nemv.chance("37 out of 42") // returns true ~88% of the time
 *
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy scripting!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 * - initial plugin
 *
 */
//=============================================================================

// MATH HELPERS ---------------------------------------------------------------

NeMV.clamp = function (value, min, max) {
	return Math.max(Math.min(value, max), min);
};

// RANDOM HELPERS -------------------------------------------------------------

Array.prototype.random = function (skipOne) {
	if (skipOne === undefined || skipOne === null || skipOne === false)
		return this[Math.floor(Math.random() * this.length)];
	else
		return this[Math.floor(Math.random() * this.length-1) + 1];
};

NeMV.random = function (lower, upper) {
	return Math.floor(Math.random() * ((upper + 1) - lower)) + lower;
};

NeMV.chance = function(chance) {
	var rando = Math.random();
	var ratioTag = /(\d+(?:\.\d+)?)\s*(?::|\/|in|out of)\s*(\d+(?:\.\d+)?)/i;
	if (String(chance).match(ratioTag)) {
		var a = Number(String(chance).match(ratioTag)[1]);
		var b = Number(String(chance).match(ratioTag)[2]);
		return b === 0 ? false : (a / b) > rando;
	} else if (isNaN(Number(chance)) || Number(chance) === 0) {
		return false;
	} else {
		return Number(chance) * 0.01 > rando;
	}
};

// SKILL HELPERS --------------------------------------------------------------

NeMV.forceSkill = function(skill, source, target) {
	if (isNaN(Number(skill))) source.forceAction(skill.id, target.index());
	else source.forceAction(skill, target.index());
	BattleManager.forceAction(source);
};

// TAGS HELPERS ---------------------------------------------------------------

if (Imported.NeMV_Tags) {

	NeMV.allWithTag = function(type, tag) {
		var data = null;
		switch (type.toUpperCase()) {
			case "ACTOR":
			case "ACTORS":
				data = $dataActors;
				break;
			case "ENEMY":
			case "ENEMIES":
				data = $dataEnemies;
				break;
			case "CLASS":
			case "CLASSES":
				data = $dataClasses;
				break;
			case "SKILL":
			case "SKILLS":
				data = $dataSkills;
				break;
			case "STATE":
			case "STATES":
				data = $dataStates;
				break;
			case "ITEM":
			case "ITEMS":
				data = $dataItems;
				break;
			case "WEAPON":
			case "WEAPONS":
				data = $dataWeapons;
				break;
			case "ARMOR":
			case "ARMORS":
				data = $dataArmors;
				break;
		}
		var taggedData = [];
		for (var d = 1; d < data.length; d++)
		    if (data[d].hasTag(tag))
		        taggedData.push(data[d]);
		return taggedData;
	};

	NeMV.allActorsWithTag = function(tag) {
		return NeMV.allWithTag("ACTOR", tag);
	};

	NeMV.allEnemiesWithTag = function(tag) {
		return NeMV.allWithTag("ENEMY", tag);
	};

	NeMV.allClassesWithTag = function(tag) {
		return NeMV.allWithTag("CLASS", tag);
	};

	NeMV.allSkillsWithTag = function(tag) {
		return NeMV.allWithTag("SKILL", tag);
	};

	NeMV.allStatesWithTag = function(tag) {
		return NeMV.allWithTag("STATE", tag);
	};

	NeMV.allItemsWithTag = function(tag) {
		return NeMV.allWithTag("ITEM", tag);
	};

	NeMV.allWeaponsWithTag = function(tag) {
		return NeMV.allWithTag("WEAPON", tag);
	};

	NeMV.allArmorsWithTag = function(tag) {
		return NeMV.allWithTag("ARMOR", tag);
	};

}

// MAP HELPERS ----------------------------------------------------------------

NeMV.distance = function(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
