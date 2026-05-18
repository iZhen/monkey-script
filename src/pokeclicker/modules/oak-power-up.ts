/**
 * oak items power up (10x)
 */
export default function oakItemsPowerUp() {
  // enum OakItemType {
  //     'Magic_Ball' = 0,
  //     'Amulet_Coin',
  //     'Rocky_Helmet',
  //     'Exp_Share',
  //     'Sprayduck',
  //     'Shiny_Charm',
  //     'Magma_Stone',
  //     'Cell_Battery',
  //     'Squirtbottle',
  //     'Sprinklotad',
  //     'Explosive_Charge',
  //     'Treasure_Scanner',
  // }
  if (Array.isArray(App.game.oakItems.itemList)) {
    App.game.oakItems.itemList.forEach((item: any) => {
      if (Array.isArray(item.bonusList)) {
        item.bonusList.forEach((bonus: number, index: number, array: number[]) => {
          array[index] = bonus * 10;
        });
      }
    });
  }
}
