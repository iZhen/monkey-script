/**
 * Hatchery Helpers only cost 1 Pokédollars
 * and have at least 100% efficiency
 */
export default function hatcheryHelper() {
  App.game.breeding.hatcheryHelpers.MAX_HIRES = 4;
  HatcheryHelpers.list // alt: App.game.breeding.hatcheryHelpers.available()
    .forEach((hatcheryHelper: any) => {
      if (hatcheryHelper.cost) {
        hatcheryHelper.cost.amount = 1;
        hatcheryHelper.cost.currency = GameConstants.Currency.money; // value 0
      }
      if (hatcheryHelper.attackEfficiencyBase < 100) {
        hatcheryHelper.attackEfficiencyBase = 100;
      }
      if (hatcheryHelper.stepEfficiencyBase < 100) {
        hatcheryHelper.stepEfficiencyBase = 100;
      }
    });
}
