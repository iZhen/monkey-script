export default function farmHelper() {
  // Farm Hands only cost 1, and speed up
  FarmHands.list.forEach((FarmHand: any) => {
    if (FarmHand.cost) {
      FarmHand.cost.amount = 1;
      FarmHand.cost.currency = 0;
    }
    if (FarmHand.workTick) {
      FarmHand.workTick = 5000;
    }
    FarmHand.maxEfficiency = 50;
    FarmHand.maxEnergy = 100;
  });
}
