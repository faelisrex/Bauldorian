import { Resource } from '../Bauldorian.js';
import { checkAndUpdateLevel } from '../levelingHandler.js';
export function startCuttingWood(playerCharacter, resource, updateProgressCallback) {
  playerCharacter.pauseGathering(); // stops current task

  let progress = 0; // Initialize progress

  // Calculate Time to Gather
  const skillReduction = player.skills[resource.skill].mastery * 0.005; // 0.5% reduction per skill level
  // const toolReduction = player.inventory.some(tool => tool.effect === 'reduceGatheringTime') ? 0.10 : 0; // TODO Assuming a flat 10% reduction from a tool
  const totalTime = resource.gatheringTime * (1 - skillReduction - toolReduction);

  let startTime = Date.now(); // Record start time

  function gather() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    progress = (elapsedTime / totalTime) * 100; // Calculate progress as a continuous cycle

    // Update progress via callback even for progress reset
    // use progress variable for progress bar
    updateProgressCallback(progress);

    if (progress >= 100) {
      // Reset progress to 0 and start time to current time for continuous looping
      startTime = Date.now();
      progress = 0;

      // Add resource to inventory every cycle
      const existingResource = resource.hasResourceInInventory(resource.resource, playerCharacter);
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
        `${playerCharacter.name} successfully gathered ${resource.resource} and gained ${resource.exp} exp. Elapsed time: ${elapsedTime}ms`
      );
      checkAndUpdateLevel(playerCharacter, resource.skill);
    }

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
  newTree.gatheringTime = 5000;
  newTree.resource = 'birch tree wood';
  newTree.skill = 'woodcutting';
  return newTree;
}
