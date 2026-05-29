export {};

declare global {
  const App: {
    game: {
      gameState: any;
      update: any;
      profile: any;
      breeding: any;
      pokeballs: any;
      wallet: any;
      keyItems: any;
      badgeCase: any;
      oakItems: any;
      oakItemLoadouts: any;
      categories: any;
      party: any;
      gems: any;
      underground: any;
      farming: any;
      logbook: any;
      redeemableCodes: any;
      statistics: any;
      quests: any;
      specialEvents: any;
      discord: any;
      achievementTracker: any;
      challenges: any;
      multiplier: any;
      saveReminder: any;
    };
  };
  const Mine: any;
  const OakItemType: Record<string, string | number>;
  const PartyController: any;
  const SortOptionConfigs: Record<
    number,
    {
      text: string;
    }
  >;
  const GameConstants: any;
  const HatcheryHelpers: any;
  const FarmHands: any;
  const DungeonRunner: any;
  const DungeonGuides: any;
  const DungeonBattle: any;
  const Battle: any;
  const GymBattle: any;
  const SafariBattle: any;
  const Rand: any;
}
