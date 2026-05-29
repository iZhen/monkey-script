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

  /* eslint-disable eqeqeq */
  if (DungeonGuides.list[0]) { // super dungeon guide
    DungeonGuides.list[0].trainerSprite = 33;
    DungeonGuides.list[0].name = 'Zeta';
    DungeonGuides.list[0].description = 'Super Dungeon Guide';
    DungeonGuides.list[0].walk = () => {
      // Get current position
      const pos = DungeonRunner.map.playerPosition();
      const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

      // Look for any unopened chest
      const treasureTiles = DungeonRunner.map.board()[pos.floor].flat().filter((t: { type: () => any }) => t.type() == GameConstants.DungeonTileType.chest);
      if (treasureTiles.length) {
        const paths = treasureTiles.map((t: { position: any }) => DungeonRunner.map.findShortestPath(pos, t.position));
        if (paths?.length) {
          const shortestPath = Math.min(...paths.map((p: string | any[]) => p.length));
          const path = Rand.fromArray(paths.filter((p: string | any[]) => p.length == shortestPath));
          if (path.length) { // If we're not already there
            DungeonRunner.map.moveToTile(path[0]);
          }
          return;
        }
      }

      const bossPosition = DungeonRunner.map.board()[pos.floor].flat().find((t: { type: () => any }) => t.type() == GameConstants.DungeonTileType.boss)?.position;
      const ladderPosition = DungeonRunner.map.board()[pos.floor].flat().find((t: { type: () => any }) => t.type() == GameConstants.DungeonTileType.ladder)?.position;

      const path = bossPosition || ladderPosition ? DungeonRunner.map.findShortestPath(pos, bossPosition || ladderPosition) : [];

      if (path?.length) {
        // We found the boss or a ladder, move to it
        DungeonRunner.map.moveToTile(path[0]);
        return;
      }

      // We didn't find what we were looking for, We just want to move weighted randomly
      const randomTile = DungeonGuides.getRandomWeightedNearbyTile(nearbyTiles);
      DungeonRunner.map.moveToTile(randomTile.position);
    };
  }
  /* eslint-enable eqeqeq */
}
