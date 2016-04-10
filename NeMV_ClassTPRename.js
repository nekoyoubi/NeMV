//=============================================================================
// NeMV - Class TP Rename
// NeMV_ClassTPRename.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_ClassTPRename = true;

var NeMV = NeMV || {};
NeMV.CTPR = NeMV.CTPR || {};

//=============================================================================
 /*:
 * @plugindesc v1.0 Allows classes to customize their TP display.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to rename TP displays in your game per class. Mages
 * can now have an "Aether", Warriors a "Rage", and Faeries a "Dust" if you so
 * choose!
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add a notetag to your classes that you would like to rename TP on using the
 * following format. Notetags are case insensitive.
 *
 * Class  >  Notebox  >  <TP Rename: NAME ABBRV>
 *
 * Examples:
 *
 * <TP Rename: Rage RG>
 * <tp rename: Energy EN>
 * <TP RENAME: Surprise !!>
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy renaming!
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

// INITIALIZATION -------------------------------------------------------------

NeMV.CTPR.init = function() {
	if ($dataClasses !== null && $dataClasses !== undefined) this.processNotetags($dataClasses);
};

NeMV.CTPR.processNotetags = function(data) {
	var renameRegex = /<TP RENAME:[ ](.+)[ ](.+)>/i;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj == 'undefined') continue;
		obj.tpRename = obj.tpRename || TextManager.tp;
		obj.tpARename = obj.tpARename || TextManager.tpA;
		var notelines = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notelines.length; i++) {
			var line = notelines[i];
			lineMatch = line.match(renameRegex);
			if (lineMatch) {
				obj.tpRename = String(lineMatch[1]);
				obj.tpARename = String(lineMatch[2]);
			}
		}
	}
};

NeMV.CTPR.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.CTPR.Scene_Boot_terminate.call(this);
	NeMV.CTPR.init();
};

// WINDOW PROTO ---------------------------------------------------------------

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
	var cls = $dataClasses[actor._classId];
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(cls.tpARename, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

Window_BattleLog.prototype.makeTpDamageText = function(target) {
    var result = target.result();
    var damage = result.tpDamage;
    var isActor = target.isActor();
	var tpText = isActor ? $gameClasses[target.actor()._classId].tpRename : TextManager.tp;
    var fmt;
    if (damage > 0) {
        fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
        return fmt.format(target.name(), tpText, damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
        return fmt.format(target.name(), tpText, -damage);
    } else {
        return '';
    }
};
