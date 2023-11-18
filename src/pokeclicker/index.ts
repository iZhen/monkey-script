import waitForLoad from './modules/wait-for-load';
import noCatchDelay from './modules/no-catch-delay';
import oakPowerUp from './modules/oak-power-up';
import autoBattle from './modules/auto-battle';
import autoHatchery from './modules/auto-hatchery';
import autoMine from './modules/auto-mine';

waitForLoad().then(() => {
  noCatchDelay();
  oakPowerUp();
  // autoBattle();
  // autoHatchery();
  // autoMine();

  // Hatchery Helpers only cost 1
  App.game.breeding.hatcheryHelpers.available().forEach((hatcheryHelper: any) => {
    if (hatcheryHelper.cost) {
      hatcheryHelper.cost.amount = 1;
      hatcheryHelper.cost.currency = 0;
    }
  });

  // dungeon show all tiles
  DungeonRunner?.dungeonFinished.subscribe((dungeonFinished: any) => {
    if (dungeonFinished === false) {
      DungeonRunner.map.showAllTiles();
    }
  });

  // set Safari Battle speed to Zero
  if (SafariBattle?.Speed) {
    for (let i in SafariBattle.Speed) {
      SafariBattle.Speed[i] = 0;
    }
  }
});
