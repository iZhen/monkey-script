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
    [
      '#pokemonListContainer .card-header:not(.collapsed)',
      '#breedingDisplay .card-header:not(.collapsed)',
    ].forEach((selector) => {
      document.querySelector<HTMLElement>(selector)?.click();
    });

    App.game.oakItems.itemList[0].bonusList[5] = 100; // Magic Ball
    App.game.oakItems.itemList[4].bonusList[5] = 10000; // Sprayduck
    App.game.oakItems.itemList[5].bonusList[5] = 10; //Shiny Charm
    App.game.oakItems.itemList[6].bonusList[5] = 1000; // Blaze Cassette
  }, 3000);
});
