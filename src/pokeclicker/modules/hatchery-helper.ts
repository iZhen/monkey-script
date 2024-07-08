export default function hatcheryHelper() {
  // Hatchery Helpers only cost 1
  App.game.breeding.hatcheryHelpers
    .available()
    .forEach((hatcheryHelper: any) => {
      if (hatcheryHelper.cost) {
        hatcheryHelper.cost.amount = 1;
        hatcheryHelper.cost.currency = 0;
      }
      hatcheryHelper.attackEfficiencyBase = 100;
      hatcheryHelper.stepEfficiencyBase = 100;
    });
}
