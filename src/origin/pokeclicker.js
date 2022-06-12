// ==UserScript==
// @name         Pokeclicker
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       Zhen
// @match        https://www.pokeclicker.com/
// @icon         https://www.google.com/s2/favicons?domain=pokeclicker.com
// @grant        none
// ==/UserScript==

(function PokeclickerScript() {
  const doc = document;
  const dom = {
    autoEgg: doc.createElement('a'),
    autoFight: doc.createElement('a'),
    autoGym: doc.createElement('a'),
  };
  dom.autoEgg.innerText = 'auto egg';
  dom.autoFight.innerText = 'auto fight';
  dom.autoGym.innerText = 'auto gym';

  const timeId = {
    autoEgg: undefined,
    autoFight: undefined,
    autoGym: undefined,
  };

  const wrapDOM = doc.createElement('ul');
  wrapDOM.style.position = 'fixed';
  wrapDOM.style.right = '0';
  wrapDOM.style.bottom = '30px';
  wrapDOM.style.margin = '0';
  wrapDOM.style.padding = '0';
  wrapDOM.style.cursor = 'pointer';
  wrapDOM.style.listStyle = 'none';
  wrapDOM.style.textAlign = 'center';
  wrapDOM.style.lineHeight = '1.5';
  wrapDOM.style.fontSize = '14px';
  Object.keys(dom).forEach((key) => {
    const currentDom = dom[key];
    currentDom.style.display = 'block';
    currentDom.style.margin = '10px 0';
    currentDom.style.padding = '4px 10px';
    currentDom.style.color = '#fff';
    currentDom.style.backgroundColor = '#333';
    const li = doc.createElement('li');
    li.appendChild(currentDom);
    wrapDOM.appendChild(li);
  });
  doc.body.appendChild(wrapDOM);

  // auto egg ===============================================
  const gainEgg = () => {
    for (let i = 0; i < App.game.breeding.eggList.length; i++) {
      const egg = App.game.breeding.eggList[i]();
      if (egg.progress() >= 100) {
        App.game.breeding.hatchPokemonEgg(i);
        i--;
      }
    }
  };

  const addEgg = () => {
    if (App.game.breeding.queueList().length < 4
        && App.game.breeding.canBreedPokemon()
        && App.game.party.hasMaxLevelPokemon()
    ) {
      const canBreedPokemon = [...App.game.party.caughtPokemon]
        /** enum on SortOptionConfigs object
         * 4: Shiny
         * 5: Base Attack
         * 7: Egg Steps
         * 8: Times Hatched
         */
        //  .filter(pm => pm.category === 1)
         .sort(PartyController.compareBy(4, true))
        // .sort(PartyController.compareBy(5, false))
        // .sort(PartyController.compareBy(7, false))
        // .sort(PartyController.compareBy(8, false))
        .find((partyPokemon) => partyPokemon.level === 100 && !partyPokemon.breeding);
      if (canBreedPokemon) {
        App.game.breeding.addPokemonToHatchery(canBreedPokemon);
        addEgg();
      }
    }
  };

  const autoEgg = () => {
    try {
      gainEgg();
      addEgg();
    } catch(ex) {
    }
    timeId.autoEgg = setTimeout(autoEgg, 5000);
  };

  dom.autoEgg.addEventListener('click', () => {
    if (!timeId.autoEgg) {
      autoEgg();
      dom.autoEgg.style.backgroundColor = '#40a9ff';
    } else {
      clearTimeout(timeId.autoEgg);
      timeId.autoEgg = undefined;
      dom.autoEgg.style.backgroundColor = '#333';
    }
  });

  // auto fight =============================================
  const autoFight = () => setInterval(() => {
    if (App.game.gameState === GameConstants.GameState.dungeon) { // in dungeon
      if (DungeonRunner.fighting() && !DungeonBattle.catching()) {
        DungeonBattle.clickAttack();
      } else {
        const dungeonTile = DungeonRunner.map.currentTile().type();
        if (dungeonTile === GameConstants.DungeonTile.chest) {
          DungeonRunner.openChest();
        } else if (dungeonTile === GameConstants.DungeonTile.entrance) {
          DungeonRunner.map.showAllTiles();
        }
      }
    } else if (App.game.gameState === GameConstants.GameState.fighting) { // in normal fight
      Battle.clickAttack();
    } else if (App.game.gameState === GameConstants.GameState.gym) { // in gym
      GymBattle.clickAttack();
    }
  }, 10);

  dom.autoFight.addEventListener('click', () => {
    if (!timeId.autoFight) {
      timeId.autoFight = autoFight();
      dom.autoFight.style.backgroundColor = '#40a9ff';
    } else {
      clearInterval(timeId.autoFight);
      timeId.autoFight = undefined;
      dom.autoFight.style.backgroundColor = '#333';
    }
  });

  // auto gym =============================================
  const autoGym = () => setInterval(() => {
    if (App.game.gameState === GameConstants.GameState.town) {
      if (player.town().gym) {
          GymRunner.startGym(player.town().gym);
      }
      // else if (player.town().dungeon) {
      //     if (player.town() instanceof DungeonTown) {
      //         DungeonRunner.initializeDungeon(player.town().dungeon);
      //     } else {
      //         MapHelper.moveToTown(player.town().dungeon.name);
      //     }
      // }
      // else if ('gymList' in player.town()) {
      //   // Dont start if modal is show/shown
      //   if (!$('#receiveBadgeModal').data('bs.modal')?._isShown) {
      //       const number = Number(e.key);
      //       // Check if a number higher than 0 and less than total Gyms was pressed
      //       if (number && number <= player.town().gymList.length) {
      //           GymRunner.startGym(player.town().gymList[number - 1]);
      //       }
      //   }
      // }
    }
  }, 1000);

  dom.autoGym.addEventListener('click', () => {
    if (!timeId.autoGym) {
      timeId.autoGym = autoGym();
      dom.autoGym.style.backgroundColor = '#40a9ff';
    } else {
      clearInterval(timeId.autoGym);
      timeId.autoGym = undefined;
      dom.autoGym.style.backgroundColor = '#333';
    }
  });






  function useBomb() {
    while (
      App.game.underground.getMaxEnergy() - Math.floor(App.game.underground.energy)
      <= App.game.underground.getEnergyGain() * 2
    ) {
      Mine.bomb();
    }
  }

  function loopMine() {
    var bombLoop = setInterval(function () {
      useBomb();
    }, 10000); // Every 10 seconds
  }

  function waitForLoad(){
    var timer = setInterval(function() {
      if (!document.getElementById("game").classList.contains("loading")) {
        // Check if the game window has loaded
        clearInterval(timer);
        loopMine();
      }
    }, 1000);
  }

  waitForLoad();
}());
