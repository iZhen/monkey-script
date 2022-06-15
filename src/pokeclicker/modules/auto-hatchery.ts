const namespace = 'auto-hatchery';

enum SortOrder { ASC, DESC };

const auto_status = {
  timer: 0,
  enable: 0,
  sortKey: 0,
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

function addToHatchery() {
  while (
    App.game.breeding.queueList().length < 4 &&
    App.game.breeding.canBreedPokemon() &&
    App.game.party.hasMaxLevelPokemon()
  ) {
    const canBreedPokemon = [...App.game.party.caughtPokemon]
      .sort(PartyController.compareBy(auto_status.sortKey, Boolean(auto_status.sortOrder)))
      .find((partyPokemon) => partyPokemon.level === 100 && !partyPokemon.breeding);
    if (canBreedPokemon) {
      App.game.breeding.addPokemonToHatchery(canBreedPokemon);
    }
  }
}

function clearTimer() {
  if (auto_status.timer) {
    clearTimeout(auto_status.timer);
    auto_status.timer = 0;
  }
}

function autoHatch() {
  if (auto_status.enable) {
    clearTimer();
    try {
      hatchEgg();
      addToHatchery();
    } catch(ex) {}
    auto_status.timer = setTimeout(autoHatch, 3000);
  }
}

function renderControl() {
  let ctrl = document.getElementById(namespace);

  if (!ctrl) {
    const breedingModal = document.querySelector('#breedingModal');
    if (breedingModal) {
      const items = [];
      Object.entries(SortOptionConfigs || []).forEach(([key, { text }]) => {
        items.push(
          `<a class="dropdown-item ${Number(key) === auto_status.sortKey ? 'active' : ''}" data-key="sortKey" data-value="${key}">${text}</a>`
        );
      });
      items.push(
        '<div class="dropdown-divider"></div>',
        `<a class="dropdown-item" data-key="sortOrder" data-value="${SortOrder.ASC}">ASC</a>`,
        `<a class="dropdown-item" data-key="sortOrder" data-value="${SortOrder.DESC}">DESC</a>`,
      );

      ctrl = document.createElement('div');
      ctrl.id = namespace;
      ctrl.classList.add('btn-group');
      ctrl.style.marginLeft = '25px';
      ctrl.innerHTML = [
        '<button type="button" class="btn btn-danger btn-switch">auto</button>',
        `<button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>`,
        `<div class="dropdown-menu">${items.join('')}</div>`,
      ].join('');
      ctrl.addEventListener('click', (e) => {
        const el = e.target;
        if (el instanceof HTMLElement) {
          if (el.matches('.btn-switch')) {
            el.classList.toggle('btn-danger');
            el.classList.toggle('btn-success');

            const nextEl = el.nextSibling as HTMLElement;
            nextEl.classList.toggle('btn-danger');
            nextEl.classList.toggle('btn-success');

            auto_status.enable = !auto_status.enable ? 1 : 0;
            clearTimer();
            if (auto_status.enable) {
              autoHatch();
            }
          } else if (el.matches('.dropdown-item:not(.active)')) {
            const key = el.dataset.key as keyof typeof auto_status;
            const value = Number(el.dataset.value) as typeof auto_status[keyof typeof auto_status];
            if (key) {
              auto_status[key] = value;
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
}
