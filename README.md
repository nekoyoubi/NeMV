## WTF is NeMV?  
As I continue to work with [RPG Maker MV](http://www.rpgmakerweb.com/) (RMMV), I keep finding needs that I have beyond the base product, and in 90% of cases these problems are already solved by one of the many talented plugin authors of the RMMV community. Occasionally though, I find that there isn't already a solution; so I do my best to make one.  

Also, sometimes a need arises from another plugin, and I do my best to offer as much help as I can to fulfill that need.  

NeMV is where I will be committing those plugins for the community.  

---

### Tags  
This plugin allows actors, enemies, classes, skills, states, items, weapons, and armors to be tagged and those tags to be easily retrieved via script.  

```
Notetag: <tags: fresh, root, red, alchemy>  

Script: [Object].hasTag("red")  
        [Object].addTag("crafting")  
        [Object].removeTag("fresh")
```

---

### Tagged Action Counter
This plugin allows the counting of certain actions to be tied to their tags, and optionally, for those tags to be bound to variables in your game.  

Currently supported actions:  
- Party kills (enemy tags)
- Item use (item tags)
- Item creation (item tags; via YEP - Item Synthesis)
- Party skill use (skill tags; works with items too)  

---

### Actor Equip Points
This plugin provides a point-based equipment system with the help of [NeMV - Tags](http://stitchgaming.com/2016/03/nemv-tags/) & [YEP - Equip Requirements](http://yanfly.moe/2016/02/27/yep-75-equip-requirements/). It allows you to build an equipment monitoring system, where when equipping and unequipping weapons and armor to your actors, you can track that equipment based on tags. This can be used to build a point-based equipment system, determine an encumbrance for your actors, or even grant or deny skills, quests, event interactions, etc based on the points associated to an actor's tagged equipment.  

---

### Quantities -- Extension Plugin for [YEP - Extra Enemy Drops](http://yanfly.moe/2015/12/19/yep-47-extra-enemy-drops/)
This extension plugin adds the ability to specify a quantity of a particular item drop within YEP-EED's standard notetags. This allows you to consolidate loot notes, as well as ensure blocks of items are actually delivered.

Before, if you were to have three notetags that all gave an item, unless each of the notetags for that item was at a 100% rate, you were not guaranteed to receive any number of them when one condition was met. I've illustrated this concept with the Daggers below. The two checks were ran independently, so you may have gotten one, both, or neither of the Daggers.

Now you can have both!  

```
Before: <Item 123: 75%>
After:  <Item 123*4: 75%>

Before: <Enemy Drops>  
          Dagger: 10%  
          Dagger: 10%  
          Hat: 10%  
        </Enemy Drops>  
After:  <Enemy Drops>  
          Dagger*2: 10%  
          Hat: 10%  
        </Enemy Drops>  
```

---

## License
NeMV is licensed under the highly permissive [WTFPLv2](http://www.wtfpl.net). The full text of the license can be downloaded [here](http://www.wtfpl.net/txt/copying/).

