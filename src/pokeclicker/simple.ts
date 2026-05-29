export default {
  name: 'Pokéclicker',
  namespace: 'Pokéclicker',
  version: '1.0',
  author: 'Zhen',
  match: 'https://www.pokeclicker.com/',
  icon: 'https://www.google.com/s2/favicons?domain=pokeclicker.com',
};

if (DungeonGuides && DungeonGuides.list && Array.isArray(DungeonGuides.list) && DungeonGuides.list[0]) {
  DungeonGuides.list.forEach((dungeonGuide) => {
    if (dungeonGuide.cost)
      dungeonGuide.cost = [[1, GameConstants.Currency.money]];
    if (dungeonGuide.fixedCost)
      dungeonGuide.fixedCost = [];
    if (dungeonGuide.interval)
      dungeonGuide.interval = 100;
  });
  DungeonGuides.list[0].walk = () => {
  // Get current position
    const pos = DungeonRunner.map.playerPosition();
    const nearbyTiles = DungeonRunner.map.nearbyTiles(pos);

    // Look for any unopened chest
    const treasureTiles = DungeonRunner.map.board()[pos.floor].flat().filter(t => t.type() == GameConstants.DungeonTileType.chest);
    if (treasureTiles.length) {
      const paths = treasureTiles.map(t => DungeonRunner.map.findShortestPath(pos, t.position));
      if (paths?.length) {
        const shortestPath = Math.min(...paths.map(p => p.length));
        const path = Rand.fromArray(paths.filter(p => p.length == shortestPath));
        if (path.length) { // If we're not already there
          DungeonRunner.map.moveToTile(path[0]);
        }
        return;
      }
    }

    const bossPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.boss)?.position;
    const ladderPosition = DungeonRunner.map.board()[pos.floor].flat().find(t => t.type() == GameConstants.DungeonTileType.ladder)?.position;

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
