// ==UserScript==
// @name         pokeclicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.pokeclicker.com/
// @icon         https://www.google.com/s2/favicons?domain=pokeclicker.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const doc = document;
  const dom = {
    autoFight: doc.createElement('a'),
    autoEgg: doc.createElement('a'),
  };
  const timeIns = {
    autoFight: null,
    autoEgg: null,
  };

  // auto fight
  dom.autoFight.innerText = 'auto fight';
  const autoFight = () => setInterval(() => {
    if (App && App.game && App.game.gameState) {
      switch (App.game.gameState) {
        case GameConstants.GameState.dungeon: {
          if (DungeonRunner.fighting() && !DungeonBattle.catching()) {
            DungeonBattle.clickAttack();
          } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
            DungeonRunner.openChest();
          }
          break;
        }
        case GameConstants.GameState.fighting: {
          Battle.clickAttack();
          break;
        }
        case GameConstants.GameState.gym: {
          GymBattle.clickAttack();
          break;
        }
        default:
          break;
      }
    }
  }, 10);

  // auto egg

  const wrapDOM = doc.createElement('ul');
  Object.keys(dom).forEach((key) => {
    const li = doc.createElement('li');
    li.appendChild(dom[key]);
    wrapDOM.appendChild(li);
  });
  doc.body.appendChild(wrapDOM);


  if (App.game.breeding.canBreedPokemon() && App.game.party.hasMaxLevelPokemon()) {
    const canBreedPokemon = PartyController.getHatcherySortedList().find((partyPokemon) => partyPokemon.breeding === false);
    if (canBreedPokemon) {
      App.game.breeding.addPokemonToHatchery(canBreedPokemon)
    }
  }


})();





//加成相关
//不激活道具时生效
//点击伤害倍率
App.game.oakItems.itemList[OakItems.OakItem.Poison_Barb].inactiveBonus = 1000
//闪光加成
App.game.oakItems.itemList[OakItems.OakItem.Shiny_Charm].inactiveBonus = 10000
//捕获成功率加成
App.game.oakItems.itemList[OakItems.OakItem.Magic_Ball].inactiveBonus = 10000
//经验加成
App.game.oakItems.itemList[OakItems.OakItem.Exp_Share].inactiveBonus = 10000

//激活道具后生效
//点击伤害倍率
App.game.oakItems.itemList[OakItems.OakItem.Poison_Barb].bonusList.forEach((v, i) => {
  App.game.oakItems.itemList[OakItems.OakItem.Poison_Barb].bonusList = v * 1000;
})
//捕获成功率加成
App.game.oakItems.itemList[OakItems.OakItem.Magic_Ball].bonusList.forEach((v, i) => {
  App.game.oakItems.itemList[OakItems.OakItem.Magic_Ball].bonusList = v * 1000;
})
//闪光加成
App.game.oakItems.itemList[OakItems.OakItem.Shiny_Charm].bonusList.forEach((v, i) => {
  App.game.oakItems.itemList[OakItems.OakItem.Shiny_Charm].bonusList = v * 10000;
})
//经验加成
App.game.oakItems.itemList[OakItems.OakItem.Exp_Share].bonusList.forEach((v, i) => {
  App.game.oakItems.itemList[OakItems.OakItem.Exp_Share].bonusList = v * 10000;
})

//全道具位可激活
App.game.oakItems.unlockRequirements = [1, 1, 1, 1, 1, 1, 1, 1]

document.createElement();

//战斗相关
//快速自动战斗
autoFight = setInterval(() => {
  if (App.game.gameState === GameConstants.GameState.dungeon) {
    if (DungeonRunner.fighting() && !DungeonBattle.catching()) {
      DungeonBattle.clickAttack();
    } else if (DungeonRunner.map.currentTile().type() === GameConstants.DungeonTile.chest) {
      DungeonRunner.openChest();
    }
  }
  if (App.game.gameState === GameConstants.GameState.fighting) {
    Battle.clickAttack()
  }
  if (App.game.gameState === GameConstants.GameState.gym) {
    GymBattle.clickAttack()
  }
}, 200)
//关闭自动战斗
//clearInterval(autoFight)

//战斗道具随便用
ItemHandler.useItem = function(name) {
  const amountSelected = Number(this.multipliers[this.multIndex()].replace(/\D/g, '')) || Infinity;
  this.amountToUse = amountSelected;
  player.itemList[name](player.itemList[name]() + this.amountToUse);
  return ItemList[name].use();
}

//挖矿相关
//挖矿道具不减
player.loseItem = player.gainItem
//挖矿快速炸图
Mine.bomb = function() {
  Underground.energy += Underground.BOMB_ENERGY;
  for (let i = 0; i < App.game.underground.getSizeY(); i++) {
    for (let j = 0; j < Underground.sizeX; j++) {
      this.breakTile(i, j, 100);
    }
  }
}

//孵蛋相关
//快速孵蛋
App.game.breeding.getSteps = (e) => 1;
//自动孵蛋
autoEgg = setInterval(() => {
  for (let i = 0; i < App.game.breeding.eggList.length; i++) {
    let egg = App.game.breeding.eggList();
    if (egg.progress() >= 100) {
      App.game.breeding.hatchPokemonEgg(i)
      i--;
    }
  }
  //可以把下面的补蛋代码移到这里全自动孵蛋

}, 1000)

//随机蛋补全(执行一次 补满蛋)
for (let i = 0; i < App.game.breeding.eggList.length; i++) {
  let egg = App.game.breeding.eggList();
  if (egg.isNone()) {
    App.game.breeding.gainRandomEgg();
  }
}

//碎片相关
//满碎片
App.game.shards.shardUpgrades.forEach((v, i) => {
  App.game.shards.shardUpgrades(10)
})
