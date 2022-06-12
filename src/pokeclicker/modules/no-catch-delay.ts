
export default function noCatchDelay() {
  const balls = App?.game.pokeballs.pokeballs;
  if (balls) {
    for (let i in balls) {
      balls[i].catchTime = 0;
    }
  }
}
