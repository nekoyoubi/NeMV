//=============================================================================
// NeMV - Conditional Status Info
// NeMV_ConditionalStatusInfo.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_ConditionalStatusInfo = true;

var NeMV = NeMV || {};
NeMV.CSI = NeMV.CSI || {};

//=============================================================================
 /*:
 * @plugindesc v1.0.0 (Requires YEP_StatusMenuCore.js) Allows for conditional status window elements based on switches.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin gives you switch-level cotrol over what data is shown in the
 * status windows provided by YEP - Status Window Core & YEP - Actor Variables.
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * When defining your element or state ids to display in the YEP - Status
 * Window Core plugin parameters (or variable ids in YEP - Actor Variables),
 * augmenting the element or state id with a colon (":") and a switch id will
 * bind displaying that piece of data to whether the indicated switch is active
 * or not. For example:
 *
 * YEP_SMC  >  Params  >  Element Column 2  =  2 3:31 4 5:32 6 7:33 8 9
 *
 * In the above example the elements 3, 5, and 7 will only render in the status
 * window when the switches 31, 32, and 33 are on (individually respective, of
 * course). This also currently works with States.
 *
 * If you happen to have YEP - Actor Variables (an extension plugin to YEP_SMC)
 * as well, you can use the syntax above on global variables defined in the
 * parameters for that plugin. Also, you can use the actor-specific notetags
 * with the modified syntax. For example:
 *
 * Actor  >  Notebox  >  <Column 1 Variables: 51:34,52,53>
 *
 * In the above example the variable 51 is tied to the switch 34, and requires
 * that it be on in order to show that particular variable. However, variables
 * 52 and 53 will display regardless. Please note that Yanfly's range option
 * for this notetag is unsupported. It will continue to function, but will not
 * attempt to parse conditionals.
 * 
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy picking and choosing!
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

// INITIALIZATION -------------------------------------------------------------

NeMV.CSI.conditionalRegex = /(\w+)[\.:, ](\d+)/i;

Window_StatusInfo.prototype.drawElementData = function(eleId, dx, dy, dw) {
	var csi = String(eleId).match(NeMV.CSI.conditionalRegex);
	var isOn = true;
	if (csi) {
		eleId = parseInt(csi[1]);
		isOn = $gameSwitches.value(parseInt(csi[2]));
	} else {
		eleId = parseInt(eleId);
	}
    var eleName = $dataSystem.elements[eleId];
    var eleRate = this._actor.elementRate(eleId);
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this._bypassResetTextColor = true;
    this.changeTextColor(this.systemColor());
	if (isOn) this.drawTextEx(eleName, dx, dy);
    this._bypassResetTextColor = false;
    this.setRateColor(eleRate);
    var text = (eleRate * 100).toFixed(Yanfly.Param.StatusEleDec) + '%';
	if (isOn) this.drawText(text, dx, dy, dw, 'right');
};

Window_StatusInfo.prototype.drawStatesData = function(stateId, dx, dy, dw) {
	var csi = String(stateId).match(NeMV.CSI.conditionalRegex);
	var isOn = true;
	if (csi) {
		stateId = parseInt(csi[1]);
		isOn = $gameSwitches.value(parseInt(csi[2]));
	} else {
		stateId = parseInt(stateId);
	}
    var stateRate = this._actor.stateRate(stateId);
    if (this._actor.isStateResist(stateId)) stateRate = 0;
    dx += this.textPadding();
    dw -= this.textPadding() * 2;
    this._bypassResetTextColor = true;
    this.changeTextColor(this.systemColor());
    if (isOn) this.drawItemName($dataStates[stateId], dx, dy, dw);
    this._bypassResetTextColor = false;
    this.setRateColor(stateRate);
    var text = (stateRate * 100).toFixed(Yanfly.Param.StatusStatesDec) + '%';
    if (isOn) this.drawText(text, dx, dy, dw, 'right');
};

if (Imported.YEP_X_ActorVariables) {

	DataManager.processAVarNotetags = function(group) {
	  var note1a = /<(?:COLUMN 1 VARIABLES):[ ]*(\d+(?:\:\d+)?(?:\s*,\s*\d+(?::\d+)?)*)>/i;
	  var note1b = /<(?:COLUMN 1 VARIABLES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	  var note2a = /<(?:COLUMN 2 VARIABLES):[ ]*(\d+(?:\:\d+)?(?:\s*,\s*\d+(?::\d+)?)*)>/i;
	  var note2b = /<(?:COLUMN 2 VARIABLES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	  var note3a = /<(?:COLUMN 3 VARIABLES):[ ]*(\d+(?:\:\d+)?(?:\s*,\s*\d+(?::\d+)?)*)>/i;
	  var note3b = /<(?:COLUMN 3 VARIABLES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	  var note4a = /<(?:COLUMN 4 VARIABLES):[ ]*(\d+(?:\:\d+)?(?:\s*,\s*\d+(?::\d+)?)*)>/i;
	  var note4b = /<(?:COLUMN 4 VARIABLES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	  for (var n = 1; n < group.length; n++) {
	    var obj = group[n];
	    var notedata = obj.note.split(/[\r\n]+/);

	    obj.varColumn1 = JsonEx.makeDeepCopy(Yanfly.Param.AVarColumn1);
	    obj.varColumn2 = JsonEx.makeDeepCopy(Yanfly.Param.AVarColumn2);
	    obj.varColumn3 = JsonEx.makeDeepCopy(Yanfly.Param.AVarColumn3);
	    obj.varColumn4 = JsonEx.makeDeepCopy(Yanfly.Param.AVarColumn4);

	    for (var i = 0; i < notedata.length; i++) {
	      var line = notedata[i];
	      if (line.match(note1a)) {
	        var array = JSON.parse('[' + String(RegExp.$1.match(/(\d+(?::\d+)?)/g)).replace(':','.') + ']');
	        obj.varColumn1 = obj.varColumn1.concat(array);
	      } else if (line.match(note1b)) {
	        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
	          parseInt(RegExp.$2));
	        obj.varColumn1 = obj.varColumn1.concat(range);
	      } else if (line.match(note2a)) {
	        var array = JSON.parse('[' + String(RegExp.$1.match(/(\d+(?::\d+)?)/g)).replace(':','.') + ']');
	        obj.varColumn2 = obj.varColumn2.concat(array);
	      } else if (line.match(note2b)) {
	        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
	          parseInt(RegExp.$2));
	        obj.varColumn2 = obj.varColumn2.concat(range);
	      } else if (line.match(note3a)) {
	        var array = JSON.parse('[' + String(RegExp.$1.match(/(\d+(?::\d+)?)/g)).replace(':','.') + ']');
	        obj.varColumn3 = obj.varColumn3.concat(array);
	      } else if (line.match(note3b)) {
	        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
	          parseInt(RegExp.$2));
	        obj.varColumn3 = obj.varColumn3.concat(range);
	      } else if (line.match(note4a)) {
	        var array = JSON.parse('[' + String(RegExp.$1.match(/(\d+(?::\d+)?)/g)).replace(':','.') + ']');
	        obj.varColumn4 = obj.varColumn4.concat(array);
	      } else if (line.match(note4b)) {
	        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
	          parseInt(RegExp.$2));
	        obj.varColumn4 = obj.varColumn4.concat(range);
	      }
	    }
	    if (obj.varColumn1.length <= 0) obj.varColumn1 = [''];
	    if (obj.varColumn2.length <= 0) obj.varColumn2 = [''];
	    if (obj.varColumn3.length <= 0) obj.varColumn3 = [''];
	    if (obj.varColumn4.length <= 0) obj.varColumn4 = [''];
	  }
	};

	Window_StatusInfo.prototype.drawActorVarData = function(varId, dx, dy, dw) {
		var csi = String(varId).match(NeMV.CSI.conditionalRegex);
		var isOn = true;
		if (csi) {
			varId = parseInt(csi[1]);
			isOn = $gameSwitches.value(parseInt(csi[2]));
		} else {
			varId = parseInt(varId);
		}
	    var name = $dataSystem.variables[varId];
	    var value = $gameVariables.value(varId);
	    dx += this.textPadding();
	    dw -= this.textPadding() * 2;
	    this._bypassResetTextColor = true;
	    this.changeTextColor(this.systemColor());
	    name = name.replace(/<<(.*?)>>/i, '');
	    if (isOn) this.drawTextEx(name, dx, dy);
	    this._bypassResetTextColor = false;
	    this.resetTextColor();
	    if (typeof value === 'number') value = Yanfly.Util.toGroup(value);
	    if (isOn) this.drawText(value, dx, dy, dw, 'right');
	};
}
