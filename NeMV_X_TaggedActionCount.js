//=============================================================================
// NeMV - Tagged Action Count
// NeMV_X_TaggedActionCount.js
//=============================================================================

var Imported = Imported || {};
Imported.NeMV_TaggedActionCount = true;

var NeMV = NeMV || {};
NeMV.Tags = NeMV.Tags || {};
NeMV.Tags.TAC = NeMV.Tags.TAC || {};

//=============================================================================
 /*:
 * @plugindesc v1.1.2 (Requires NeMV_Tags.js) Allows the counting of certain actions to be tied to tags.
 * @author Nekoyoubi

 * @param ---Kill Counters---
 * @default
 *
 * @param Kill Counter 1
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default plant 101
 *
 * @param Kill Counter 2
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 3
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 4
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 5
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 6
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 7
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 8
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 9
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter 10
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "plant 101")
 * @default
 *
 * @param Kill Counter CSV
 * @desc CSV array of strings for more Kill counters.
 * Example: plant 101, animal 102, mineral 103
 * @default
 *
 * @param ---ItemUse Counters---
 * @default
 *
 * @param ItemUse Counter 1
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default potion 111
 *
 * @param ItemUse Counter 2
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 3
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 4
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 5
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 6
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 7
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 8
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 9
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter 10
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 111")
 * @default
 *
 * @param ItemUse Counter CSV
 * @desc CSV array of strings for more ItemUse counters.
 * Example: potion 111, skillbook 112, fairydust 113
 * @default
 *
 * @param ---ItemCreate Counters---
 * @default
 *
 * @param ItemCreate Counter 1
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default potion 121
 *
 * @param ItemCreate Counter 2
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 3
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 4
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 5
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 6
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 7
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 8
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 9
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter 10
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "potion 121")
 * @default
 *
 * @param ItemCreate Counter CSV
 * @desc CSV array of strings for more ItemCreate counters.
 * Example: potion 121, weapon 122, armor 123
 * @default
 *
 * @param ---SkillUse Counters---
 * @default
 *
 * @param SkillUse Counter 1
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default fire 131
 *
 * @param SkillUse Counter 2
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 3
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 4
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 5
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 6
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 7
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 8
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 9
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter 10
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "fire 131")
 * @default
 *
 * @param SkillUse Counter CSV
 * @desc CSV array of strings for more SkillUse counters.
 * Example: fire 131, holy 132, blood 133
 * @default
 *
 * @param ---EventUse Counters---
 * @default
 *
 * @param EventUse Counter 1
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default treasure 141
 *
 * @param EventUse Counter 2
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 3
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 4
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 5
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 6
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 7
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 8
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 9
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter 10
 * @desc Define the tag to be counted and an optional variable id.
 * Format: tag [variable] (e.g. "treasure 141")
 * @default
 *
 * @param EventUse Counter CSV
 * @desc CSV array of strings for more EventUse counters.
 * Example: treasure 141, elder 142, puppy 143
 * @default
 *
 * @param --- Misc. ---
 * @default
 *
 * @param Debug TAC
 * @desc Whether or not to output debug information for TAC.
 * Example: true (debug) or false (no debug)
 * @default false
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows the counting of certain actions to be tied to their tags,
 * and optionally, for those tags to be bound to variables in your game.
 *
 * Currently supported actions:
 * - Party kills (enemy tags)
 * - Item use (item tags)
 * - Item creation (item tags; via YEP - Item Synthesis)
 * - Party skill use (skill tags; works with items too)
 * - Event use (event tags)
 *
 * ============================================================================
 * Usage
 * ============================================================================
 *
 * Configure the respective action entries in the plugin's parameters as the
 * below examples illustrate. These are only examples of what you can do, and
 * what this plugin directly supports.
 *
 * On Kills -------------------------------------------------------------------
 *
 * If you want to track how many times you've killed a certain type of enemy
 * (e.g. elementals), add a variable to track the total - something like...
 *
 * Variables  >  [ 0101 - Elementals Killed ]
 *
 * Now add a counter in TAC's parameters under one of the "Kill Action Counter"
 * params.  It should look like the following...
 *
 * elemental 101
 *
 * Now anytime your party kills any enemy tagged with "elemental"...
 *
 * Enemy  >  Notebox  >  <tags: fire, elemental, boss, angry>
 *
 * ... the game's variable 101 will increase by one.
 *
 * You can use this to track quest progress, give your players achievements,
 * or even use the counter to affect combat with a little scripting.
 *
 * On Item Use ----------------------------------------------------------------
 *
 * To track how many times party members have used items with a particular
 * tag on the item, first create a variable to track the total uses...
 *
 * Variables  >  [ 0201 - Potions Consumed ]
 *
 * Now set an "ItemUse Action Counter" in the plugin params to something like:
 *
 * potion 201
 *
 * Now whenever you consume an item with the tag "potion"...
 *
 * Item  >  Notebox  >  <tags: potion, healing, weak>
 *
 * ... the 201 variable in your game will increase by one.
 *
 * You can use this to create tolerances for potions, make hunger and survival
 * systems, or even creating item-based abilities for things like placing traps
 * that your party's crafted (e.g. can only have four active traps at a time).
 *
 * On Item Creation -----------------------------------------------------------
 *
 * To track how many times party members have created items with a particular
 * tag on the item, first create a variable to track the total creations...
 *
 * Variables  >  [ 0301 - Traps Created ]
 *
 * Now set an "ItemCreate Action Counter" in the plugin params to this:
 *
 * trap 301
 *
 * Now whenever you create an item tagged as a "trap"...
 *
 * Item  >  Notebox  >  <tags: trap, poison, ground>
 *
 * ... the 301 variable in your game increases by the amount of traps created.
 *
 * You can use this to build a profession system around your item crafting,
 * track crafting-based quest progress, or with some creativity, even give
 * your players built in item variance improvements based on how much
 * experience they have building certain types of items.
 *
 * On Skill Use ---------------------------------------------------------------
 *
 * To track how many times party members have used skills with a particular tag
 * on the skill, first create a variable to track the total skill uses...
 *
 * Variables  >  [ 0401 - Heals Used ]
 *
 * Now set a "SkillUse Action Counter" in the plugin params to this:
 *
 * healing 401
 *
 * Now whenever you use a skill or skill-item tagged as "healing"...
 *
 * Skill/Item  >  Notebox  >  <tags: healing, holy, regen>
 *
 * ... the 401 variable in your game increases by one.
 *
 * You can use this to build an element mastery system for your wizards,
 * balance your heal-bot healers with diminishing returns, or even create an
 * entire ability system around building a new energy pool that can be used for
 * ultimate/limit-break abilities.
 *
 * Please note that with the current implementation of SkillUse, some items may
 * additionally be checked. This allows for things like tag checking bombs
 * thrown at your enemies, but may also lead to collisions with ItemUse cases
 * if super-simple tags are used between skills and items.
 *
 * On Event Use ---------------------------------------------------------------
 *
 * To track how many times the player has interacted with an event with a
 * particular tag on the event's active page, first create a variable to track
 * the total event uses...
 *
 * Variables  >  [ 0501 - Treasures Found ]
 *
 * Now set an "EventUse Action Counter" in the plugin params to this:
 *
 * treasure 501
 *
 * Now whenever you interact with an event page tagged as "treasure"...
 *
 * Event  >  Comment  >  <tags: treasure, unlocked>
 *
 * ... the 501 variable in your game increases by one.
 *
 * You can use this to track looting stats, build quests where you must talk to
 * several elders, monitor completion of areas, or even force your players to
 * to lose the game because they've kicked too many puppies.
 *
 * Future Actions -------------------------------------------------------------
 *
 * This being the initial release of the TAC plugin, I obviously don't have all
 * of the actions represented that I would like to. So since I will be adding
 * actions to this as often as I'm able, I thought I'd list a few here that are
 * planned for sooner rather than later.
 *
 * - Skill > DamageDealt/DamageTaken/HealingDealt/HealingTaken
 * - State > TurnsAfflicted/StateGiven/StateTaken
 *
 * Plugin Commands ------------------------------------------------------------
 *
 * TAC comes equipped with many options for plugin commands for adding,
 * removing, and manually setting tag counters. The format for these commands
 * is as follows.
 *
 * TAC COMMAND ACTION TAG [ VARIABLE | AMOUNT ]
 *
 * Examples:
 *
 * tac add kill plant 101
 * tac remove itemuse potion
 * tac set itemcreate weapon 20
 * tac add kill animal
 *
 * In the examples above, the first adds a Kill counter for enemies with the
 * "plant" tag and sets its game variable to 101. The second removes the
 * ItemUse counter for items tagged as "potion". The third sets the ItemCreate
 * for "weapon" tags to 20, updating its variable if one is associated. The
 * fourth example illustrates adding a Kill counter for "animal" tags that
 * isn't associated to a variable.
 *
 * ============================================================================
 * Support
 * ============================================================================
 *
 * Should this plugin not work for you for any reason, please notify me by
 * creating a Github issue, emailing me at lance-at-nekoyoubi.com, or message
 * me in any social convention you happen to see me in.
 *
 * Thanks, and happy counting!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.1.2:
 * - fixed enemies not processing drops
 *
 * Version 1.1.1:
 * - adjusted event tag counting for Tags 1.3.0.
 *
 * Version 1.1:
 * - added EventUse
 * - cleaned up some bad help content
 *
 * Version 1.0.1:
 * - fixed broken csv params
 * - removed stray logging
 * - added misc header in params
 * - fixed Debug option
 *
 * Version 1.0:
 * - initial plugin
 *
 */
//=============================================================================

// PARAMS ---------------------------------------------------------------------

NeMV.Tags.TAC.Parameters = PluginManager.parameters('NeMV_X_TaggedActionCount');
NeMV.Tags.TAC.Param = NeMV.Tags.TAC.Param || {};

NeMV.Tags.TAC.Param.KillCounters = [];
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 1']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 2']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 3']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 4']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 5']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 6']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 7']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 8']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 9']));
NeMV.Tags.TAC.Param.KillCounters.push(String(NeMV.Tags.TAC.Parameters['Kill Counter 10']));
NeMV.Tags.TAC.Param.KillCounters = NeMV.Tags.TAC.Param.KillCounters.concat(
	String(NeMV.Tags.TAC.Parameters['Kill Counter CSV']).split(/\s*,\s*/)||[]);

NeMV.Tags.TAC.Param.ItemUseCounters = [];
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 1']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 2']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 3']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 4']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 5']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 6']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 7']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 8']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 9']));
NeMV.Tags.TAC.Param.ItemUseCounters.push(String(NeMV.Tags.TAC.Parameters['ItemUse Counter 10']));
NeMV.Tags.TAC.Param.ItemUseCounters = NeMV.Tags.TAC.Param.ItemUseCounters.concat(
	String(NeMV.Tags.TAC.Parameters['ItemUse Counter CSV']).split(/\s*,\s*/)||[]);

NeMV.Tags.TAC.Param.ItemCreateCounters = [];
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 1']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 2']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 3']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 4']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 5']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 6']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 7']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 8']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 9']));
NeMV.Tags.TAC.Param.ItemCreateCounters.push(String(NeMV.Tags.TAC.Parameters['ItemCreate Counter 10']));
NeMV.Tags.TAC.Param.ItemCreateCounters = NeMV.Tags.TAC.Param.ItemCreateCounters.concat(
	String(NeMV.Tags.TAC.Parameters['ItemCreate Counter CSV']).split(/\s*,\s*/)||[]);

NeMV.Tags.TAC.Param.SkillUseCounters = [];
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 1']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 2']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 3']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 4']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 5']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 6']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 7']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 8']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 9']));
NeMV.Tags.TAC.Param.SkillUseCounters.push(String(NeMV.Tags.TAC.Parameters['SkillUse Counter 10']));
NeMV.Tags.TAC.Param.SkillUseCounters = NeMV.Tags.TAC.Param.SkillUseCounters.concat(
	String(NeMV.Tags.TAC.Parameters['SkillUse Counter CSV']).split(/\s*,\s*/)||[]);

NeMV.Tags.TAC.Param.EventUseCounters = [];
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 1']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 2']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 3']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 4']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 5']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 6']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 7']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 8']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 9']));
NeMV.Tags.TAC.Param.EventUseCounters.push(String(NeMV.Tags.TAC.Parameters['EventUse Counter 10']));
NeMV.Tags.TAC.Param.EventUseCounters = NeMV.Tags.TAC.Param.EventUseCounters.concat(
	String(NeMV.Tags.TAC.Parameters['EventUse Counter CSV']).split(/\s*,\s*/)||[]);

// INITIALIZATION -------------------------------------------------------------

NeMV.Tags.TAC.Debug = eval(NeMV.Tags.TAC.Parameters['Debug TAC']);

NeMV.Tags.TAC.KillCounters = NeMV.Tags.TAC.KillCounters || [];
NeMV.Tags.TAC.ItemUseCounters = NeMV.Tags.TAC.ItemUseCounters || [];
NeMV.Tags.TAC.ItemCreateCounters = NeMV.Tags.TAC.ItemCreateCounters || [];
NeMV.Tags.TAC.SkillUseCounters = NeMV.Tags.TAC.SkillUseCounters || [];
NeMV.Tags.TAC.EventUseCounters = NeMV.Tags.TAC.EventUseCounters || [];
NeMV.Tags.TAC.MiscCounters = NeMV.Tags.TAC.MiscCounters || [];

NeMV.Tags.TAC.init = function() {
	this.paramsToArray(this.Param.KillCounters, "Kill");
	this.paramsToArray(this.Param.ItemUseCounters, "ItemUse");
	this.paramsToArray(this.Param.ItemCreateCounters, "ItemCreate");
	this.paramsToArray(this.Param.SkillUseCounters, "SkillUse");
	this.paramsToArray(this.Param.EventUseCounters, "EventUse");
};

NeMV.Tags.TAC.paramsToArray = function(params, type) {
	var counters = this.getCounterArray(type);
	for (var i = 0; i < params.length; i++) {
		var counter = params[i].trim();
		if (counter === "") {
			params.splice(i, 1);
		} else {
			this.addCounter(type, counter);
		}
	}
};

// COUNTER METHODS ------------------------------------------------------------

NeMV.Tags.TAC.getCounterArray = function(type) {
	switch (type.toUpperCase()) {
		case "KILL":
			return this.KillCounters;
		case "ITEMUSE":
			return this.ItemUseCounters;
		case "ITEMCREATE":
			return this.ItemCreateCounters;
		case "SKILLUSE":
			return this.SkillUseCounters;
		case "EVENTUSE":
			return this.EventUseCounters;
		default:
			return this.MiscCounters;
	}
};

NeMV.Tags.TAC.addCounter = function(type, counter) {
	var split = counter.split(/\s+/);
	this.getCounterArray(type).push({
		tag : split[0].toUpperCase(),
		variable : (split.length > 1 && !isNaN(parseInt(split[1]))) ? Number(split[1]) : 0,
		count : 0,
		update : function() { if (this.variable > 0) $gameVariables.setValue(this.variable, this.count); },
		inc : function() { this.count += 1; this.update(); },
		dec : function() { if (this.count > 0) { this.count -= 1; this.update(); } }
	});
	if (this.Debug) console.log("TAC - "+type+" added: "+counter);
};

NeMV.Tags.TAC.removeCounter = function(type, counter) {
	var split = counter.split(/\s+/);
	var index = -1;
	var counters = this.getCounterArray(type);
	for (var i = 0; i < counters.length; i++)
		if (counters[i].tag.toUpperCase() == split[0])
			index = i;
	if (index > -1) {
		counters.splice(index, 1);
		if (NeMV.Tags.TAC.Debug) console.log("TAC - "+type+" removed: "+split[0]);
	} else {
		if (NeMV.Tags.TAC.Debug) console.log("TAC - "+type+" not found: "+split[0]);
	}
};

NeMV.Tags.TAC.setCounter = function(type, counter) {
	var split = counter.split(/\s+/);
	var counters = this.getCounterArray(type);
	for (var i = 0; i < counters.length; i++) {
		if (counters[i].tag.toUpperCase() == split[0]) {
			counters[i].count = (split.length > 1 && !isNaN(parseInt(split[1]))) ? Number(split[1]) : 0;
			counters[i].update();
			if (NeMV.Tags.TAC.Debug) console.log("TAC - "+type+" set: "+counters[i].tag.toUpperCase()+" to "+counters[i].count);
		}
	}
};

// OVERRIDES ------------------------------------------------------------------

NeMV.Tags.TAC.Scene_Boot_terminate = Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate = function() {
	NeMV.Tags.TAC.Scene_Boot_terminate.call(this);
	NeMV.Tags.TAC.init();
};

NeMV.Tags.TAC.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	NeMV.Tags.TAC.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toUpperCase() == "TAC") {
		var regex = /(?:TAC)\s(ADD|REMOVE|SET)\s(KILL|ITEMUSE|ITEMCREATE|SKILLUSE|EVENTUSE)\s(([a-z_-]+)((?:\s)(\d+))?)/i;
		var data = (command+" "+args.join(" ")).toUpperCase().match(regex);
		if (data !== null) {
			var comm = data[1];
			var action = data[2];
			var tagdata = data[3];
			var tag = data[4];
			var variable = (data[6].length > 0) ? Number(data[6]) : 0;
			switch (comm.toUpperCase()) {
				case 'ADD':
					NeMV.Tags.TAC.addCounter(action, tagdata);
					break;
				case 'REMOVE':
					NeMV.Tags.TAC.removeCounter(action, tag);
					break;
				case 'SET':
					NeMV.Tags.TAC.setCounter(action, tagdata);
					break;
			}
		}
	}
};

NeMV.Tags.TAC.Game_Enemy_makeDropItems = Imported.YEP_ExtraEnemyDrops
	? Yanfly.EED.Game_Enemy_makeDropItems
	: Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	var enemy = this.enemy();
	for (var k = 0; k < NeMV.Tags.TAC.KillCounters.length; k++) {
		var counter = NeMV.Tags.TAC.KillCounters[k];
		if (enemy.hasTag(counter.tag)) counter.inc();
	}
	return NeMV.Tags.TAC.Game_Enemy_makeDropItems.call(this);
};

NeMV.Tags.TAC.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	for (var iu = 0; iu < NeMV.Tags.TAC.ItemUseCounters.length; iu++) {
		var counter = NeMV.Tags.TAC.ItemUseCounters[iu];
		if (Imported.YEP_ItemCore && item.object !== undefined) {
			if (DataManager.getBaseItem(item.object()).hasTag(counter.tag)) counter.inc();
		} else {
			if (item.hasTag(counter.tag)) counter.inc();
		}
	}
	NeMV.Tags.TAC.Game_Battler_useItem.call(this, item);
};

if (Imported.YEP_ItemSynthesis) {
	NeMV.Tags.TAC.Scene_Synthesis_doBuy = Scene_Synthesis.prototype.doBuy;
	Scene_Synthesis.prototype.doBuy = function(number) {
		NeMV.Tags.TAC.Scene_Synthesis_doBuy.call(this, number);
		for (var ic = 0; ic < NeMV.Tags.TAC.ItemCreateCounters.length; ic++) {
			var counter = NeMV.Tags.TAC.ItemCreateCounters[ic];
			if (Imported.YEP_ItemCore && this._item.object !== undefined &&
				DataManager.getBaseItem(this._item.object()).hasTag(counter.tag)) {
					counter.count += number;
					counter.update();
			} else {
				if (this._item.hasTag(counter.tag)) {
					counter.count += number;
					counter.update();
				}
			}
		}
	};
}

NeMV.Tags.TAC.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	NeMV.Tags.TAC.Game_Action_applyItemUserEffect.call(this, target);
	if (this._subjectActorId > 0) {
		for (var i = 0; i < NeMV.Tags.TAC.SkillUseCounters.length; i++) {
			var counter = NeMV.Tags.TAC.SkillUseCounters[i];
			if (this.item().hasTag(counter.tag)) counter.inc();
		}
	}
};

NeMV.Tags.TAC.Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    NeMV.Tags.TAC.Game_Event_start.call(this);
	if (this._locked) {
		for (var i = 0; i < NeMV.Tags.TAC.EventUseCounters.length; i++) {
			var counter = NeMV.Tags.TAC.EventUseCounters[i];
			if (this.hasTag(counter.tag)) counter.inc();
		}
	}
};
