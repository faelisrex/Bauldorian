import { checkAndUpdateLevel } from './levelingHandler.js';
function Resource() {
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
function createBirchTree() {
  const newTree = new Resource();
  newTree.type = 'wood';
  newTree.name = 'birch tree';
  newTree.exp = 30;
  newTree.gatheringTime = 3000;
  newTree.resource = 'birch tree wood';
  newTree.skill = 'woodcutting';
  return newTree;
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

function startGathering(playerCharacter, resource, updateProgressCallback) {
  let progress = 0; // Initialize progress
  const totalTime = resource.gatheringTime * 1.0; // Use a multiplier if needed
  let startTime = Date.now(); // Record start time

  playerCharacter.currentActionId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    progress = (elapsedTime / totalTime) * 100; // Calculate progress as a continuous cycle

    if (progress >= 100) {
      // Reset progress to 0 and start time to current time for continuous looping
      startTime = Date.now();
      progress = 0;

      // Add resource to inventory every cycle
      const existingResource = resource.hasResourceInInventory(
        resource.resource,
        playerCharacter
      );
      if (existingResource) {
        existingResource.quantity += 1;
      } else {
        playerCharacter.inventory.push({
          name: resource.resource,
          type: resource.type,
          quantity: 1,
        });
      }

      // Add experience points every cycle
      playerCharacter.skills[resource.skill].exp += resource.exp;
      console.log(
        `${playerCharacter.name} successfully gathered ${resource.resource} and gained ${resource.exp} exp.`
      );
      checkAndUpdateLevel(playerCharacter, resource.skill);
    }

    // Update progress via callback even for progress reset
    updateProgressCallback(progress % 100);
  }, 100); // Interval for progress update frequency
}

function createUser() {
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
    skills: {
      woodcutting: { type: 'noncombat', level: 1, exp: 0 },
      fishing: { type: 'noncombat', level: 1, exp: 0 },
    },
    inventory: [],
    pauseGathering() {
      clearInterval(this.currentActionId);
    },
  };
}

// testing area
// setup
const player1 = createUser();
const birchTree = createBirchTree();
const salmon = createSalmon();

// test gathering
startGathering(player1, salmon, (progress) => {
  console.log(`Progress: ${progress}%`);
  // Update progress bar or UI element here with the progress value
});

setTimeout(() => {
  player1.pauseGathering();
}, 5000);
