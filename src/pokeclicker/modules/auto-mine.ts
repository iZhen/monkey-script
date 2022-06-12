
function useBomb() {
  const under = App.game.underground;
  if (under) {
    while (
      under.getMaxEnergy() -
        Math.floor(under.energy) <=
      under.getEnergyGain() *
        App.game.oakItems.calculateBonus(OakItemType.Cell_Battery)
    ) {
      Mine.bomb();
    }
  }
}

export default function autoMine() {
  var bombLoop = setInterval(function () {
    useBomb();
  }, 10000); // Every 10 seconds
}
