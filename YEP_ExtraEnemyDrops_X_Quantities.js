//=============================================================================
// NeMV - Quantities for YEP's Extra Enemy Drops
// YEP_ExtraEnemyDrops_X_Quantities.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ExtraEnemyDrops = true;

var Yanfly = Yanfly || {};
Yanfly.EED = Yanfly.EED || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_ExtraEnemyDrops.js) Adds quantity support to Yanfly Engine Plugins - Extra Enemy Drops.
 * @author Nekoyoubi
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This extension plugin adds the ability to specify a quantity of a particular
 * item drop within YEP-EED's standard notetags. This allows you to consolidate
 * loot notes, as well as ensure blocks of items are actually delivered.
 * 
 * Before, if you were to have three notetags that all gave an item, unless
 * each of the notetags for that item was at a 100% rate, you were not
 * guaranteed to receive any number of them when one condition was met. I've
 * illustrated this concept with the Daggers below. The two checks were ran
 * independently, so you may have gotten one, both, or neither of the Daggers.
 * 
 * Now you can have both!
 *
 * ============================================================================
 * Usage
 * ============================================================================
 * 
 * Simply add an asterisk and the amount of items you want to receive on a 
 * successful item roll or condition. Here are a couple of examples:
 *
 * Before: <Item 123: 75%>
 * After:  <Item 123*4: 75%>
 *
 * Before: <Enemy Drops>
 *          Dagger: 10%
 *          Dagger: 10%
 *          Hat: 10%
 *         </Enemy Drops>
 * After:  <Enemy Drops>
 *          Dagger*2: 10%
 *          Hat: 10%
 *         </Enemy Drops>
 *
 * ============================================================================
 * Support
 * ============================================================================
 * 
 * First and foremost, please ensure that this plugin is located directly
 * BENEATH YEP_ExtraEnemyDrops.js.
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a Github issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in, but please do not
 * harass Yanfly over it. Odds are if something is wrong, it is with this
 * extension; not the base plugin.
 * 
 * Thanks, and happy looting! (Wow, that sounds terrible.)
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version v1.00:
 * - initial plugin
 */
//=============================================================================

Game_Enemy.prototype.makeDropItems = function() {
  return this.enemy().dropItems.reduce(function(r, di) {
    var q = di.quantity;
    if (q === null || q == undefined) q = 1;
    if (di.kind > 0 && Math.random() * di.denominator < this.dropItemRate()) {
      var dia = [];
      for (var i = 0; i < q; i++)
        dia.push(this.itemObject(di.kind, di.dataId));
      return r.concat(dia);
    } else {
      return r;
    }
  }.bind(this), []);
};

DataManager.processEEDNotetags1 = function(group) {
  var noteD1 = /<(?:ITEM|DROP ITEM)[ ](\d+|\d+\*\d+):[ ](\d+)([%％])>/i;
  var noteD2 = /<(?:WEAPON|DROP WEAPON)[ ](\d+|\d+\*\d+):[ ](\d+)([%％])>/i;
  var noteD3 = /<(?:ARMOR|DROP armor)[ ](\d+|\d+\*\d+):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.dropsMade) continue;
    var notedata = obj.note.split(/[\r\n]+/);


    obj.dropsMade = true;
    obj.conditionalDropItems = [];
    var conditionalLines = [];
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteD1)) {
        var iq = String(RegExp.$1).split('*');
        var id = parseInt(iq[0]);
        var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 1, q);
      } else if (line.match(noteD2)) {
        var iq = String(RegExp.$1).split('*');
        var id = parseInt(iq[0]);
        var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 2, q);
      } else if (line.match(noteD3)) {
        var iq = String(RegExp.$1).split('*');
        var id = parseInt(iq[0]);
        var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
        var rate = parseFloat(RegExp.$2) * 0.01;
        this.createEnemyDrop(obj, id, rate, 3, q);
      } else if (line.match(/<DROP[ ](.*):[ ](\d+)([%％])>/i)) {
        var nq = String(RegExp.$1).toUpperCase().split('*');
        var name = nq[0];
        var q = (nq.length === 2) ? parseInt(nq[1]) : 1;
        var rate = parseFloat(RegExp.$2) * 0.01;
        if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var kind = 1;
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var kind = 2;
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var kind = 3;
        } else { 
          continue;
        }
        this.createEnemyDrop(obj, id, rate, kind, q);
      } else if (line.match(/<(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = 'drops';
      } else if (line.match(/<\/(?:ENEMY DROP|ENEMY DROPS)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'drops') {
        if (line.match(/ITEM[ ](\d+|\d+\*\d+):[ ](\d+)([%％])/i)) {
          var iq = String(RegExp.$1).split('*');
          var id = parseInt(iq[0]);
          var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 1, q);
        } else if (line.match(/WEAPON[ ](\d+|\d+\*\d+):[ ](\d+)([%％])/i)) {
          var iq = String(RegExp.$1).split('*');
          var id = parseInt(iq[0]);
          var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 2, q);
        } else if (line.match(/ARMOR[ ](\d+|\d+\*\d+):[ ](\d+)([%％])/i)) {
          var iq = String(RegExp.$1).split('*');
          var id = parseInt(iq[0]);
          var q = (iq.length === 2) ? parseInt(iq[1]) : 1;
          var rate = parseFloat(RegExp.$2) * 0.01;
          this.createEnemyDrop(obj, id, rate, 3, q);
        } else if (line.match(/(.*):[ ](\d+)([%％])/i)) {
          var nq = String(RegExp.$1).toUpperCase().split('*');
          var name = nq[0];
          var q = (nq.length === 2) ? parseInt(nq[1]) : 1;
          var rate = parseFloat(RegExp.$2) * 0.01;
          if (Yanfly.ItemIdRef[name]) {
            var id = Yanfly.ItemIdRef[name];
            var kind = 1;
          } else if (Yanfly.WeaponIdRef[name]) {
            var id = Yanfly.WeaponIdRef[name];
            var kind = 2;
          } else if (Yanfly.ArmorIdRef[name]) {
            var id = Yanfly.ArmorIdRef[name];
            var kind = 3;
          } else {
            continue;
          }
          this.createEnemyDrop(obj, id, rate, kind, q);
        }
      } else if (line.match(/<CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = 'conditionalDrop';
        conditionalLines = [];
      } else if (line.match(/<\/CONDITIONAL[ ](.*)[ ]DROP>/i)) {
        var evalMode = 'none';
        var nq = String(RegExp.$1).toUpperCase().split('*');
        var name = nq[0];
        var q = (nq.length === 2) ? parseInt(nq[1]) : 1;        
        if (name.match(/ITEM[ ](\d+|\d+\*\d+)/i)) {
          var iq = String(RegExp.$1).split('*');
          var item = $dataItems[parseInt(iq[0])];
        } else if (name.match(/WEAPON[ ](\d+|\d+\*\d+)/i)) {
          var iq = String(RegExp.$1).split('*');
          var item = $dataWeapons[parseInt(iq[0])];
        } else if (name.match(/ARMOR[ ](\d+|\d+\*\d+)/i)) {
          var iq = String(RegExp.$1).split('*');
          var item = $dataArmors[parseInt(iq[0])];
        } else if (Yanfly.ItemIdRef[name]) {
          var id = Yanfly.ItemIdRef[name];
          var item = $dataItems[id];
        } else if (Yanfly.WeaponIdRef[name]) {
          var id = Yanfly.WeaponIdRef[name];
          var item = $dataWeapons[id];
        } else if (Yanfly.ArmorIdRef[name]) {
          var id = Yanfly.ArmorIdRef[name];
          var item = $dataArmors[id];
        } else {
          continue;
        }
        if (!item) continue;
        item.quantity = q;
        var arr = [item, conditionalLines];
        obj.conditionalDropItems.push(arr);
        conditionalLines = [];
      } else if (evalMode === 'conditionalDrop') {
        conditionalLines.push(line);
      }
    }
  }
};

DataManager.createEnemyDrop = function(obj, dataId, rate, kind, quantity) {
    quantity = typeof quantity !== 'undefined' ? quantity : 1;
    console.log("createEnemyDrop / quantity: "+quantity);
    var dropItem = {
      dataId: dataId,
      denominator: 1 / rate,
      kind: kind,
      quantity: quantity
    }
    obj.dropItems.push(dropItem);
};
