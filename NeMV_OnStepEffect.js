//=============================================================================
// NeMV - On Step Effect
// NeMV_OnStepEffect.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_OnStepEffect = true;

var NeMV = NeMV || {};
NeMV.OSE = NeMV.OSE || {};

//=============================================================================
 /*:
 * @plugindesc v1.0 Allows your actors' states to perform JavaScript evaluations as you walk on the map.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Allows your actors' states to perform JavaScript evaluations as you walk on
 * the map... ♪ Every step you take ♪ ... I'm so sorry...
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add step effects to your states via the following notetag:
 *
 * State  >  Notebox  >  <ON STEP EFFECT>code</ON STEP EFFECT>
 *
 * It's as easy as that. If an actor in the game party has that state active,
 * you'll see that code's effect execute on each step of the map.
 *
 * Here are a couple of examples...
 *
 * <On Step Effect>
 * if (!($gameParty.steps() % 10))
 *   a.gainMp(Math.floor((Math.random()*200)-100)+1);
 * </On Step Effect>
 *
 * <on step effect>
 * if (user.isStateAffected(123))
 *   $gameTemp.reserveCommonEvent(45);
 * </on step effect>
 *
 * In the first example, the actor with the state —we'll call it "Mana Flux"—
 * gains or loses a random amount of mana (+/-100) for every ten steps they
 * take. The second example checks if another state is active on the actor as
 * well, and runs a Common Event if so.
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy stepping!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0:
 * - initial plugin
 *
 */
//=============================================================================

NeMV.OSE.init = function() {
	if ($dataStates !== null && $dataStates !== undefined) this.processNotetags($dataStates);
};

NeMV.OSE.processNotetags = function(data) {
	var oseTag = /<(?:ON STEP EFFECT)>([\s\S]*)<\/ON STEP EFFECT>/im;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj === undefined) continue;
		obj._stepEffect = obj._stepEffect || "";
		oseMatch = obj.note.match(oseTag);
		if (oseMatch) obj._stepEffect = oseMatch[1];
	}
};

NeMV.OSE.Game_Actor_onPlayerWalk = Game_Actor.prototype.onPlayerWalk;
Game_Actor.prototype.onPlayerWalk = function() {
    NeMV.OSE.Game_Actor_onPlayerWalk.call(this);
	this.runStepEffects();
};

Game_Actor.prototype.stepEffects = function() {
	var effects = [];
	for (var s = 0; s < this.states().length; s++)
		if (this.states()[s]._stepEffect.length > 0)
			effects.push(this.states()[s]._stepEffect);
	return effects;
};

Game_Actor.prototype.hasStepEffects = function() {
	return this.stepEffects().length > 0;
};

Game_Actor.prototype.runStepEffect = function(index) {
	if (!this.hasStepEffects() || this.stepEffects()[index].length === 0) return;
	var user = this; var actor = this; var subject = this; var a = this;
	var s = $gameSwitches._data; var v = $gameVariables._data;
	//console.log(user);
	eval(this.stepEffects()[index]);
};

Game_Actor.prototype.runStepEffects = function() {
	for (var i = 0; i < this.stepEffects().length; i++) this.runStepEffect(i);
};

Game_Party.prototype.runStepEffects = function() {
	for (var p = 0; p < $gameParty.members().length; p++) {
		$gameParty.members()[p].runStepEffects();
	}
};

NeMV.OSE.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.OSE.Scene_Boot_terminate.call(this);
	NeMV.OSE.init();
};
