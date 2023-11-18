let timer = 0;

function battleLogic() {
  if (App.game.gameState === GameConstants.GameState.fighting) { // in normal fight
    Battle.clickAttack();
  } else if (App.game.gameState === GameConstants.GameState.gym) { // in gym
    GymBattle.clickAttack();
  } else if (App.game.gameState === GameConstants.GameState.dungeon) { // in dungeon
    if (DungeonRunner.fighting() && !DungeonBattle.catching()) {
      DungeonBattle.clickAttack();
    } else {
      const dungeonTile = DungeonRunner.map.currentTile().type();
      if (dungeonTile === GameConstants.DungeonTile.chest) {
        DungeonRunner.openChest();
      } else if (dungeonTile === GameConstants.DungeonTile.entrance) {
        DungeonRunner.map.showAllTiles();
      }
    }
  }
}

export default function autoBattle() {
  timer = setInterval(battleLogic, 800);
}
