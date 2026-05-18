type Callback = () => void;

export default function waitForLoad(callback?: Callback | Callback[]) {
  return new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      if (!document.getElementById('game')?.classList.contains('loading')) {
        // Check if the game window has loaded
        clearInterval(timer);
        if (Array.isArray(callback)) {
          callback.forEach(cb => cb());
        }
        else if (typeof callback === 'function') {
          callback();
        }
        resolve();
      }
    }, 1000);
  });
}
