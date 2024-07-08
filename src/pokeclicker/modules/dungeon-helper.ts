export default function dungeonHelper() {
  // Dungeon Guides only cost 1, and speed up
  DungeonGuides.list.forEach((dungeonGuide: any) => {
    if (dungeonGuide.cost) {
      dungeonGuide.cost = [[1, 0]];
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
