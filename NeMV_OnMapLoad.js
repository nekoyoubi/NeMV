//=============================================================================
// NeMV - On Map Load
// NeMV_OnMapLoad.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_OnMapLoad = true;

var NeMV = NeMV || {};
NeMV.OML = NeMV.OML || {};

//=============================================================================
 /*:
 * @plugindesc v1.0.0 A very simple plugin that allows you to run JavaScript evals when the map loads.
 * @author Nekoyoubi
 *
 * @param ---Map Load Evals---
 * @default
 *
 * @param OML Eval 1
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 2
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 3
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 4
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 5
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 6
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 7
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 8
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 9
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @param OML Eval 10
 * @desc Set an eval that will be run on every map load.
 * Example: if (v[123]>4) $gameTemp.reserveCommonEvent(56);
 * @default
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin gives you a simple notetag eval on your maps that will run when
 * the map is loaded. Optionally, you can also setup up to ten evals that will
 * run each time any map is loaded. Keep in mind that map loading happens many
 * times for a given walk-through. Each time you open the menu, for instance,
 * the map load will trigger again. This should not be used for doing something
 * merely the first time you load a map, but more for things you need to do
 * on each reload of the map (typically event settings).
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Add load evals to your maps via the following notetag:
 *
 * Map  >  Notebox  >  <ON LOAD>code</ON LOAD>
 *
 * It's as easy as that. Your eval code will now run everytime that map is
 * loaded. Also note that the "ON LOAD" can be replaced with "OML", "MAP LOAD",
 * or "ON MAP LOAD" to your discretion.
 *
 * Here are a couple of examples...
 *
 * <On Load>
 * events.forEach(function(event) {
 *   if (event.displayName == "Sneak Thief") event._opacity = 32;
 * });
 * </On Load>
 *
 * <oml>
 * if (v[123] > 4)
 *   $gameTemp.reserveCommonEvent(56);
 * </oml>
 *
 * In the first example, any events with the display name of "Sneak Thief" will
 * take on a very transparent appearance. The second example runs a common
 * event if a variable is greater than four.
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a GitHub issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy loading!
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

NeMV.OML.Parameters = PluginManager.parameters('NeMV_OnMapLoad');
NeMV.OML.Param = NeMV.OML.Param || {};

NeMV.OML.Param.Evals = [];
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 1']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 2']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 3']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 4']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 5']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 6']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 7']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 8']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 9']));
NeMV.OML.Param.Evals.push(String(NeMV.OML.Parameters['OML Eval 10']));

NeMV.OML.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	NeMV.OML.Scene_Map_onMapLoaded.call(this);
	NeMV.OML.Param.Evals.forEach(function(ev) {
		if (ev !== null && ev.length > 1)
			NeMV.OML.evalMapLoad(ev);
	});
	var omlTag = /<(?:((?:ON)?\s*(?:MAP)?\s*LOAD)|OML)>([\s\S]*)<\/\1>/im;
	omlMatch = $dataMap.note.match(omlTag);
	if (omlMatch) NeMV.OML.evalMapLoad(omlMatch[2]);
};

NeMV.OML.evalMapLoad = function(code) {
	var map = $gameMap;
	var s = $gameSwitches._data;
	var v = $gameVariables._data;
	var events = $gameMap.events();
	eval(code);
};
