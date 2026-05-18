/**
 * Dungeon Guides only cost 1 Pokédollars, and speed up (100ms)
 * and show all tiles
 * Movement Speed 0.1s
 */
export default function dungeonHelper() {
  DungeonGuides.list.forEach((dungeonGuide: any) => {
    if (dungeonGuide.cost) {
      dungeonGuide.cost = [[1, GameConstants.Currency.money]];
    }
    if (dungeonGuide.fixedCost) {
      dungeonGuide.fixedCost = [];
    }
    if (dungeonGuide.interval) {
      dungeonGuide.interval = 100;
    }
  });

  // dungeon show all tiles
  DungeonRunner.dungeonFinished.subscribe((dungeonFinished: any) => {
    if (dungeonFinished === false) {
      DungeonRunner.map.showAllTiles();
    }
  });
}
