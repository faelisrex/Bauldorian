export function startCombat(player, enemy) {
  while (player.hp > 0 && enemy.hp > 0) {
    // have enemy take damage
    if (enemy.hp <= 0) {
      console.log(`${enemy.name} defeated!`);
      break;
    }

    // hav player take damage
    if (player.hp <= 0) {
      console.log(`${player.name} has been defeated.`);
      break;
    }
  }
}
