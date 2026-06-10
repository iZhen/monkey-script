/**
 *  set Safari Battle speed to Zero
 */
export default function SafariHelper() {
  if (SafariBattle?.Speed) {
    for (const i in SafariBattle.Speed) {
      SafariBattle.Speed[i] = 100;
    }
  }
}
