// ==UserScript==
// @name         Pokéclicker
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Pokéclicker
// @author       Zhen
// @match        https://www.pokeclicker.com/
// @icon         https://www.google.com/s2/favicons?domain=pokeclicker.com
// @grant        none
// ==/UserScript==

import waitForLoad from './modules/wait-for-load';
import noCatchDelay from './modules/no-catch-delay';
import autoMine from './modules/auto-mine';

waitForLoad().then(() => {
  noCatchDelay();

  autoMine();
});
