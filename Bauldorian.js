import { createBirchTree, startCuttingWood } from './skills/woodcutting.js';
export function Resource() {
  return {
    resources: [],
    addToResources(newResource) {
      this.resources.push(newResource);
    },
    hasResourceInInventory(resourceName, playerCharacter) {
      return playerCharacter.inventory.find(
        (item) => item.name === resourceName
      );
    },
  };
}

function createSalmon() {
  const newFish = new Resource();
  newFish.type = 'food';
  newFish.name = 'salmon';
  newFish.exp = 20; // Experience points gained from fishing
  newFish.gatheringTime = 2000; // Time in milliseconds it takes to catch
  newFish.resource = 'salmon';
  newFish.skill = 'fishing';
  return newFish;
}

export function createCharacter() {
  return {
    name: 'Ragnar',
    currentActionId: 0,
    attributes: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    combatStats: {
      hp: 100,
      ap: 100,
      def: 100,
      attkSpeed: 3,
    },
    multipliers: {
      hpMultiplier: 1.0,
      apMultiplier: 1.0,
      defMultiplier: 1.0,
      attkSpeedMultiplier: 1.0,
    },
    skills: {
      woodcutting: { type: 'noncombat', level: 1, exp: 0, mastery: 0 },
      fishing: { type: 'noncombat', level: 1, exp: 0, mastery: 0 },
    },
    inventory: [],
    pauseGathering() {
      cancelAnimationFrame(this.currentActionId);
      clearInterval(this.currentActionId);
    },
  };
}

// testing area
// setup
const player1 = createCharacter();
const birchTree = createBirchTree();
const salmon = createSalmon();

// test gathering
// startGathering(player1, salmon, (progress) => {
//   console.log(`Progress: ${progress}%`);
//   // Update progress bar or UI element here with the progress value
// });

startCuttingWood(player1, birchTree, (progress) => {
  // console.log(`Progress: ${progress}%`);
  // Update progress bar or UI element here with the progress value
});

setTimeout(() => {
  player1.pauseGathering();
}, 30000);
