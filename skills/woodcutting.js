import { Resource } from '../Bauldorian.js';
import { checkAndUpdateLevel } from '../levelingHandler.js';
export function startCuttingWood(
  playerCharacter,
  resource,
  updateProgressCallback
) {
  playerCharacter.pauseGathering(); // stops current task

  let progress = 0; // Initialize progress
  const totalTime = resource.gatheringTime * 1.0; // Use a multiplier if needed
  let startTime = Date.now(); // Record start time

  function gather() {
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

    // Continue gathering if progress is not 100%
    if (progress < 100) {
      playerCharacter.currentActionId = requestAnimationFrame(gather);
    }
  }

  playerCharacter.currentActionId = requestAnimationFrame(gather);
}

export function createBirchTree() {
  const newTree = new Resource();
  newTree.type = 'wood';
  newTree.name = 'birch tree';
  newTree.exp = 30;
  newTree.gatheringTime = 3000;
  newTree.resource = 'birch tree wood';
  newTree.skill = 'woodcutting';
  return newTree;
}
