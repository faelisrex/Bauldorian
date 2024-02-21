// Function to check and update the skill level based on exp
function getNextLevelExp(level) {
  const baseExp = 100; // Base experience required for level 1
  const multiplier = 1.5; // Adjusts the curve's steepness
  return Math.floor(baseExp * Math.pow(level, multiplier));
}

export function checkAndUpdateLevel(playerCharacter, skillName) {
  const skill = playerCharacter.skills[skillName];

  while (skill.exp >= getNextLevelExp(skill.level)) {
    skill.exp -= getNextLevelExp(skill.level); // Deduct exp for the current level
    skill.level += 1; // Increase level
    console.log(
      `${skillName} leveled up to ${skill.level}! Current exp: ${skill.exp}`
    );
  }
}
