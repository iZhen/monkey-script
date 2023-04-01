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
import autoBattle from './modules/auto-battle';
import autoHatchery from './modules/auto-hatchery';
import autoMine from './modules/auto-mine';

waitForLoad().then(() => {
  noCatchDelay();
  autoBattle();
  autoHatchery();
  autoMine();

  setTimeout(() => {
    document.querySelector('#pokemonListContainer .card-header:not(.collapsed)')?.click();
    document.querySelector('#breedingDisplay .card-header:not(.collapsed)')?.click();

    App.game.oakItems.itemList[0].bonusList[5] = 100; // Magic Ball
    App.game.oakItems.itemList[4].bonusList[5] = 10000; // Sprayduck
    App.game.oakItems.itemList[5].bonusList[5] = 10; //Shiny Charm
    App.game.oakItems.itemList[6].bonusList[5] = 1000; // Blaze Cassette
  }, 3000);
});
