const originTime: Record<string, number> = {};

export default function noCatchDelay() {
  const balls = App?.game.pokeballs.pokeballs;
  if (balls) {
    for (let i in balls) {
      originTime[i] = balls[i].catchTime;
      balls[i].catchTime = 0;
    }
  }
}
