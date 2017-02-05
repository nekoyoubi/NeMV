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
 * @plugindesc v1.3.2 Allows classes to customize their HP/MP/TP displays.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to rename and recolor the HP/MP/TP displays in your
 * game per class. Mages can now have an "Aether", Warriors a "Rage", and
 * Faeries a "Dust" if you so choose!
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add a notetag to your classes that you would like to rename HP/MP/TP on
 * using the following format. Notetags are case insensitive.
 *
 * Class  >  Notebox  >  <HP/MP/TP Rename: NAME ABBRV>
 *
 * Examples:
 *
 * <hp rename: Life ♥>
 * <MP Rename: Rage RG>
 * <TP RENAME: Surprise !!>
 *
 * Bar colors can also be adjusted per class via a similar notetag using the
 * following format. Notetags are case insensitive.
 *
 * Class  >  Notebox  >  <HP/MP/TP Recolor: LEFTHEXCOLOR RIGHTHEXCOLOR>
 *
 * Examples:
 *
 * <hp recolor: #990909 #ff2121>
 * <MP Recolor: #b55010 #ff5000>
 * <TP RECOLOR: #080510 #6030bf>
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
 * Version 1.3.2:
 * - removed the use of $gameClasses, since new RMMV scripts removed it
 *
 * Version 1.3.1:
 * - even better integration with YEP - Skill Core (bar swapping fix)
 *
 * Version 1.3:
 * - added better integration with YEP - Skill Core
 *
 * Version 1.2:
 * - added bar recoloring support
 *
 * Version 1.1:
 * - added HP and MP replacement options as well
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
	var renameRegex = /<(HP|MP|TP) (RENAME|RECOLOR):[ ](.+)[ ](.+)>/i;
	for (var n = 1; n < data.length; n++) {
		var obj = data[n];
		if (obj === null || obj == 'undefined') continue;
		obj.hpRename = obj.hpRename || TextManager.hp;
		obj.hpARename = obj.hpARename || TextManager.hpA;
		obj.mpRename = obj.mpRename || TextManager.mp;
		obj.mpARename = obj.mpARename || TextManager.mpA;
		obj.tpRename = obj.tpRename || TextManager.tp;
		obj.tpARename = obj.tpARename || TextManager.tpA;
		obj.hpRecolor1 = obj.hpRecolor || "";
		obj.hpRecolor2 = obj.hpRecolor || "";
		obj.mpRecolor1 = obj.mpRecolor || "";
		obj.mpRecolor2 = obj.mpRecolor || "";
		obj.tpRecolor1 = obj.tpRecolor || "";
		obj.tpRecolor2 = obj.tpRecolor || "";
		var notelines = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notelines.length; i++) {
			var line = notelines[i];
			lineMatch = line.match(renameRegex);
			if (lineMatch) {
				if (lineMatch[2].toUpperCase() == "RENAME") {
					switch (lineMatch[1].toUpperCase()) {
						case 'HP':
							obj.hpRename = String(lineMatch[3]);
							obj.hpARename = String(lineMatch[4]);
							break;
						case 'MP':
							obj.mpRename = String(lineMatch[3]);
							obj.mpARename = String(lineMatch[4]);
							break;
						case 'TP':
							obj.tpRename = String(lineMatch[3]);
							obj.tpARename = String(lineMatch[4]);
							break;
					}
				} else if (lineMatch[2].toUpperCase() == "RECOLOR") {
					switch (lineMatch[1].toUpperCase()) {
						case 'HP':
							obj.hpRecolor1 = String(lineMatch[3]);
							obj.hpRecolor2 = String(lineMatch[4]);
							break;
						case 'MP':
							obj.mpRecolor1 = String(lineMatch[3]);
							obj.mpRecolor2 = String(lineMatch[4]);
							break;
						case 'TP':
							obj.tpRecolor1 = String(lineMatch[3]);
							obj.tpRecolor2 = String(lineMatch[4]);
							break;
					}
				}
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

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	var cls = $dataClasses[actor._classId];
    width = width || 186;
    var color1 = (cls.hpRecolor1 !== "") ? cls.hpRecolor1 : this.hpGaugeColor1();
    var color2 = (cls.hpRecolor2 !== "") ? cls.hpRecolor2 : this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(cls.hpARename, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
		this.hpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
	var cls = $dataClasses[actor._classId];
    width = width || 186;
	var color1 = (cls.mpRecolor1 !== "") ? cls.mpRecolor1 : this.mpGaugeColor1();
    var color2 = (cls.mpRecolor2 !== "") ? cls.mpRecolor2 : this.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(cls.mpARename, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
		this.mpColor(actor), this.normalColor());
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
	var cls = $dataClasses[actor._classId];
    width = width || 96;
	var color1 = (cls.tpRecolor1 !== "") ? cls.tpRecolor1 : this.tpGaugeColor1();
    var color2 = (cls.tpRecolor2 !== "") ? cls.tpRecolor2 : this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(cls.tpARename, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};

if (Imported.YEP_SkillCore) {
	Yanfly.Skill.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
	Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	    if (actor.gauge1() === 'HP') {
	      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
	    } else if (actor.gauge1() === 'MP') {
	      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
	    } else if (actor.gauge1() === 'TP') {
	      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
	    }
	};

	Yanfly.Skill.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
	Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
	    if (actor.gauge2() === 'HP') {
	      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
	    } else if (actor.gauge2() === 'MP') {
	      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
	    } else if (actor.gauge2() === 'TP') {
	      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
	    }
	};

	Yanfly.Skill.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
	Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
	    if (actor.gauge3() === 'HP') {
	      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
	    } else if (actor.gauge3() === 'MP') {
	      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
	    } else if (actor.gauge3() === 'TP') {
	      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
	    }
	};
}

Window_BattleLog.prototype.makeHpDamageText = function(target) {
    var result = target.result();
    var damage = result.hpDamage;
    var isActor = target.isActor();
	var hpText = isActor ? $dataClasses[target.actor()._classId+1].hpRename : TextManager.hp;
    var fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
        return fmt.format(target.name(), hpText, damage);
    } else if (damage > 0) {
        fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
        return fmt.format(target.name(), damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
        return fmt.format(target.name(), hpText, -damage);
    } else {
        fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
        return fmt.format(target.name());
    }
};

Window_BattleLog.prototype.makeMpDamageText = function(target) {
    var result = target.result();
    var damage = result.mpDamage;
    var isActor = target.isActor();
	var mpText = isActor ? $dataClasses[target.actor()._classId+1].mpRename : TextManager.mp;
    var fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
        return fmt.format(target.name(), mpText, damage);
    } else if (damage > 0) {
        fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
        return fmt.format(target.name(), mpText, damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
        return fmt.format(target.name(), mpText, -damage);
    } else {
        return '';
    }
};

Window_BattleLog.prototype.makeTpDamageText = function(target) {
    var result = target.result();
    var damage = result.tpDamage;
    var isActor = target.isActor();
	var tpText = isActor ? $dataClasses[target.actor()._classId+1].tpRename : TextManager.tp;
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

if (Imported.YEP_SkillCore) {
	Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
		var cls = $dataClasses[this._actor._classId];
	    if (this._actor.skillTpCost(skill) <= 0) return dw;
	    if (Yanfly.Icon.Tp > 0) {
	    	var iw = wx + dw - Window_Base._iconWidth;
	    	this.drawIcon(Yanfly.Icon.Tp, iw, wy + 2);
	    	dw -= Window_Base._iconWidth + 2;
	    }
		if (cls.tpRecolor2 !== "") {
			this.changeTextColor(cls.tpRecolor2);
		} else {
		    this.changeTextColor(this.textColor(Yanfly.Param.SCCTpTextColor));
		}
	    var fmt = Yanfly.Param.SCCTpFormat;
	    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillTpCost(skill)),
			cls.tpARename);
	    this.contents.fontSize = Yanfly.Param.SCCTpFontSize;
	    this.drawText(text, wx, wy, dw, 'right');
	    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
	    this.resetFontSettings();
	    return returnWidth;
	};

	Window_SkillList.prototype.drawMpCost = function(skill, wx, wy, dw) {
		var cls = $dataClasses[this._actor._classId];
	    if (this._actor.skillMpCost(skill) <= 0) return dw;
	    if (Yanfly.Icon.Mp > 0) {
	      var iw = wx + dw - Window_Base._iconWidth;
	      this.drawIcon(Yanfly.Icon.Mp, iw, wy + 2);
	      dw -= Window_Base._iconWidth + 2;
	    }
		if (cls.mpRecolor2 !== "") {
			this.changeTextColor(cls.mpRecolor2);
		} else {
		    this.changeTextColor(this.textColor(Yanfly.Param.SCCMpTextColor));
		}
	    var fmt = Yanfly.Param.SCCMpFormat;
	    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillMpCost(skill)),
	    	cls.mpARename);
	    this.contents.fontSize = Yanfly.Param.SCCMpFontSize;
	    this.drawText(text, wx, wy, dw, 'right');
	    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
	    this.resetFontSettings();
	    return returnWidth;
	};

	Window_SkillList.prototype.drawHpCost = function(skill, wx, wy, dw) {
		var cls = $dataClasses[this._actor._classId];
	    if (this._actor.skillHpCost(skill) <= 0) return dw;
	    if (Yanfly.Icon.Hp > 0) {
	      var iw = wx + dw - Window_Base._iconWidth;
	      this.drawIcon(Yanfly.Icon.Hp, iw, wy + 2);
	      dw -= Window_Base._iconWidth + 2;
	    }
		if (cls.hpRecolor2 !== "") {
			this.changeTextColor(cls.hpRecolor2);
		} else {
			this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
		}
		var fmt = Yanfly.Param.SCCHpFormat;
	    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillHpCost(skill)),
	    	cls.hpARename);
	    this.contents.fontSize = Yanfly.Param.SCCHpFontSize;
	    this.drawText(text, wx, wy, dw, 'right');
	    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
	    this.resetFontSettings();
	    return returnWidth;
	};
}
