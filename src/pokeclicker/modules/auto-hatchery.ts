const namespace = 'auto-hatchery';

enum SortOrder { ASC, DESC };

enum StatusClass {
  Enable = 'btn-success',
  Disable = 'btn-danger',
};

const AUTO_STATUS = {
  timer: 0,
  enable: 1,
  notShinyFirst: 1,
  sortKey: 8, // 4 for shiny, 8 for Times Hatched
  sortOrder: SortOrder.ASC,
};

function hatchEgg() {
  for (let i = 0; i < App.game.breeding.eggList.length; i++) {
    const egg = App.game.breeding.eggList[i]();
    if (egg.progress() >= 100) {
      App.game.breeding.hatchPokemonEgg(i);
      i--;
    }
  }
}

// Object.entries(SortOptionConfigs).find(([_, { text }]) => /shiny/i.test(text));

function addToHatchery() {
  while (
    App.game.breeding.queueList().length < 4 &&
    App.game.breeding.canBreedPokemon() &&
    App.game.party.hasMaxLevelPokemon()
  ) {
    const caughtPokemon = [...App.game.party.caughtPokemon];
    let canBreedPokemon;

    if (AUTO_STATUS.notShinyFirst) {
      canBreedPokemon = caughtPokemon.sort(PartyController.compareBy(4, Boolean(SortOrder.ASC)))
        .find((partyPokemon) => !partyPokemon.shiny && partyPokemon.level === 100 && !partyPokemon.breeding);
    }

    if (!canBreedPokemon) {
      canBreedPokemon = caughtPokemon.sort(PartyController.compareBy(AUTO_STATUS.sortKey, Boolean(AUTO_STATUS.sortOrder)))
        .find((partyPokemon) => partyPokemon.level === 100 && !partyPokemon.breeding);
    }

    if (canBreedPokemon) {
      App.game.breeding.addPokemonToHatchery(canBreedPokemon);
    }
  }
}

function clearTimer() {
  if (AUTO_STATUS.timer) {
    clearTimeout(AUTO_STATUS.timer);
    AUTO_STATUS.timer = 0;
  }
}

function autoHatch() {
  if (AUTO_STATUS.enable) {
    clearTimer();
    try {
      hatchEgg();
      addToHatchery();
    } catch(ex) {}
    AUTO_STATUS.timer = setTimeout(autoHatch, 5000);
  }
}

function renderControl() {
  let ctrl = document.getElementById(namespace);

  if (!ctrl) {
    const breedingModal = document.querySelector('#breedingModal');
    if (breedingModal) {
      const items = [];
      items.push(
        `<a class="dropdown-item active" data-key="notShinyFirst" data-value="${AUTO_STATUS.notShinyFirst}">Not Shiny First</a>`,
        `<div class="dropdown-divider"></div>`,
        `<h6 class="dropdown-header">Sort Type</h6>`,
      );
      Object.entries(SortOptionConfigs || []).forEach(([key, { text }]) => {
        const active = Number(key) === AUTO_STATUS.sortKey ? 'active' : '';
        items.push(
          `<a class="dropdown-item ${active}" data-key="sortKey" data-value="${key}">${text}</a>`
        );
      });
      items.push(
        `<div class="dropdown-divider"></div>`,
        `<h6 class="dropdown-header">Sort Order</h6>`,
        `<a class="dropdown-item active" data-key="sortOrder" data-value="${SortOrder.ASC}">ASC</a>`,
        `<a class="dropdown-item" data-key="sortOrder" data-value="${SortOrder.DESC}">DESC</a>`,
      );

      ctrl = document.createElement('div');
      ctrl.id = namespace;
      ctrl.classList.add('btn-group');
      ctrl.style.marginLeft = '25px';
      ctrl.innerHTML = [
        `<button type="button" class="btn ${StatusClass.Enable} btn-switch">auto</button>`,
        `<button type="button" class="btn ${StatusClass.Enable} dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>`,
        `<div class="dropdown-menu">${items.join('')}</div>`,
      ].join('');

      ctrl.addEventListener('click', (e) => {
        const el = e.target;
        if (el instanceof HTMLElement) {
          if (el.matches('.btn-switch')) {
            el.classList.toggle(StatusClass.Enable);
            el.classList.toggle(StatusClass.Disable);

            const nextEl = el.nextSibling as HTMLElement;
            nextEl.classList.toggle(StatusClass.Disable);
            nextEl.classList.toggle(StatusClass.Enable);

            AUTO_STATUS.enable = !AUTO_STATUS.enable ? 1 : 0;
            clearTimer();
            if (AUTO_STATUS.enable) {
              autoHatch();
            }
          } else if (el.matches('.dropdown-item:not(.active)')) {
            const key = el.dataset.key as keyof typeof AUTO_STATUS;
            const value = Number(el.dataset.value) as typeof AUTO_STATUS[keyof typeof AUTO_STATUS];
            if (key) {
              AUTO_STATUS[key] = value;
              ctrl?.querySelector(`.dropdown-item.active[data-key="${key}"]`)?.classList.remove('active');
              el.classList.add('active');
            }
          }
        }
      });

      breedingModal.querySelector('.modal-header')?.appendChild(ctrl);
    }
  }
}

export default function autoHatchery() {
  renderControl();
  autoHatch();
}
