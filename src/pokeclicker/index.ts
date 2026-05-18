import dungeonHelper from './modules/dungeon-helper';
import farmHelper from './modules/farm-helper';
import hatcheryHelper from './modules/hatchery-helper';
import noCatchDelay from './modules/no-catch-delay';
import oakPowerUp from './modules/oak-power-up';
import SafariHelper from './modules/safari-helper';
import waitForLoad from './modules/wait-for-load';

import './styles/main.scss';

// Object.defineProperty(navigator, "userAgent", {
//   value: `${navigator.userAgent} Electron`,
//   writable: false,
// });

waitForLoad([
  noCatchDelay,
  oakPowerUp,
  farmHelper,
  dungeonHelper,
  hatcheryHelper,
  SafariHelper,
]);
