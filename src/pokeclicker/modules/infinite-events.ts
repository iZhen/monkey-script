export default function infiniteEvents() {
  // Infinite Events
  if (App.game.specialEvents) {
    for (const event of App.game.specialEvents.events) {
      if (!event.hasStarted()) {
        event.eventCalendarTimeLeft(7 * 24 * 60 * 60);
      }
    }
  }
}
