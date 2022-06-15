export default function waitForLoad() {
  return new Promise<void>((reslove) => {
    const timer = setInterval(function() {
      if (!document.getElementById('game')?.classList.contains('loading')) {
        // Check if the game window has loaded
        clearInterval(timer);
        reslove();
      }
    }, 1000);
  });
}
