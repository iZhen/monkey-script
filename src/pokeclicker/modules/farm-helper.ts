/**
 * Farm Hands only cost 1 Pokédollars, and speed up (1 min)
 * and max efficiency/energy are set to 50/100
 */
export default function farmHelper() {
  FarmHands.list.forEach((FarmHand: any) => {
    if (FarmHand.cost) {
      FarmHand.cost.amount = 1;
      FarmHand.cost.currency = GameConstants.Currency.money; // value 0
    }
    if (FarmHand.workTick) {
      FarmHand.workTick = 5000;
    }
    if (FarmHand.speed) {
      FarmHand.speed = 0;
    }
    if (FarmHand.maxEfficiency < 50) {
      FarmHand.maxEfficiency = 50;
    }
    if (FarmHand.maxEnergy < 100) {
      FarmHand.maxEnergy = 100;
    }
  });
}
