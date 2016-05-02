//=============================================================================
// NeMV - Battle Action Messages
// NeMV_BattleActionMessages.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_BattleActionMessages = true;

var NeMV = NeMV || {};
NeMV.BAM = NeMV.BAM || {};

//=============================================================================
 /*:
 * @plugindesc v1.0.1 Allows your skills to have customizable battle log text.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows your skill and item messages to be customized in the
 * moment by writing Javascript eval() code in the item or skill's notebox.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add custom messages to your skills and items via the following notetag:
 *
 * Skill/Item  >  Notebox  >  <BAM EVAL>m1="Line 1"; m2="Line 2";</BAM EVAL>
 *
 * The "m1" and "m2" variables correspond to the message line as they are
 * normally specified in RMMV on skills and items. Note that "subject", "user",
 * and "a" all refer to the actor using the skill or item, and "item" and
 * "skill" both refer to the item or skill being used.
 *
 * Here are a couple of examples...
 *
 * <bam eval>
 * var rando = [" attacks!", " swings wide!", " lunges!"];
 * m1 = rando[Math.floor(rando.length*Math.random())];
 * </bam eval>
 *
 * <bam eval>
 * if (user.isStateAffected(200))
 *   m2 = "("+skill.name+" is super-charged with Rainbow Power!)";
 * </bam eval>
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy messaging!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.1:
 * - added "s" and "v" variables to the eval
 *
 * Version 1.0:
 * - initial plugin
 *
 */
//=============================================================================

NeMV.BAM.processNotetags = function(subject, item) {
	var bamTag = /<(?:BAM EVAL)>([\s\S]*)<\/BAM EVAL>/im;
	if (item === null || item === undefined) return;
	bamMatch = item.note.match(bamTag);
	if (bamMatch) {
		var m1 = "";
		var m2 = "";
		var skill = item;
		var user = subject;
		var a = subject;
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		eval(bamMatch[1]);
		item.message1 = m1;
		item.message2 = m2;
	}
};

NeMV.BAM.Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
	NeMV.BAM.processNotetags(subject, item);
	NeMV.BAM.Window_BattleLog_displayAction.call(this, subject, item);
};
