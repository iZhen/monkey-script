import autoBattleFrontier from './modules/auto-battle-frontier';
import autoSafari from './modules/auto-safari';
import dungeonHelper from './modules/dungeon-helper';
import farmHelper from './modules/farm-helper';
import hatcheryHelper from './modules/hatchery-helper';
import infiniteEvents from './modules/infinite-events';
import noCatchDelay from './modules/no-catch-delay';
import oakPowerUp from './modules/oak-power-up';
import SafariHelper from './modules/safari-helper';
import waitForLoad from './modules/wait-for-load';

import './styles/main.scss';

// Object.defineProperty(navigator, "userAgent", {
//   value: `${navigator.userAgent} Electron`,
//   writable: false,
// });

autoBattleFrontier();
autoSafari();

waitForLoad([
  noCatchDelay,
  infiniteEvents,
  // oakPowerUp,
  // farmHelper,
  dungeonHelper,
  // hatcheryHelper,
  // SafariHelper,
]);
