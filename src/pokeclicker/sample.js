(function () {
  // no catch delay
  const balls = App?.game.pokeballs.pokeballs;
  if (balls) {
    for (let i in balls) {
      balls[i].catchTime = 0;
    }
  }

  // set Safari Battle speed to Zero
  if (SafariBattle.Speed) {
    for (let i in SafariBattle.Speed) {
      SafariBattle.Speed[i] = 0;
    }
  }

  // dungeon show all tiles
  DungeonRunner.dungeonFinished.subscribe(dungeonFinished => {
    if (dungeonFinished === false) {
      DungeonRunner.map.showAllTiles();
    }
  });

  // oak items power up
  App.game.oakItems.itemList[0].bonusList[5] = 100;   // Magic Ball
  App.game.oakItems.itemList[4].bonusList[5] = 10000; // Sprayduck
  App.game.oakItems.itemList[5].bonusList[5] = 10;    // Shiny Charm
  App.game.oakItems.itemList[6].bonusList[5] = 1000;  // Blaze Cassette

  // Hatchery Helpers only cost 1
  App.game.breeding.hatcheryHelpers.available().forEach(hatcheryHelper => {
    hatcheryHelper.cost.amount = 1;
    hatcheryHelper.cost.currency = 0;
  });
})();
