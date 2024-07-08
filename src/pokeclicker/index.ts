import dungeonHelper from "./modules/dungeon-helper";
import farmHelper from "./modules/farm-helper";
import hatcheryHelper from "./modules/hatchery-helper";
import noCatchDelay from "./modules/no-catch-delay";
import oakPowerUp from "./modules/oak-power-up";
import waitForLoad from "./modules/wait-for-load";

waitForLoad([
  noCatchDelay,
  oakPowerUp,
  farmHelper,
  dungeonHelper,
  hatcheryHelper,
]).then(() => {
  // set Safari Battle speed to Zero
  if (SafariBattle?.Speed) {
    for (let i in SafariBattle.Speed) {
      SafariBattle.Speed[i] = 0;
    }
  }
});
