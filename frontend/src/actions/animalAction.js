export const SET_ENEMY = "SET_ENEMY";
export const SET_PLAYER = "SET_PLAYER";
export const RESET_ANIMAL = "RESET_ANIMAL";

export const setEnemy = (stat) => ({
  type: SET_ENEMY,
  stat
});

export const setPlayer = (stat) => ({
  type: SET_PLAYER,
  stat
});

export const resetAnimal = (reset) => ({
  type: RESET_ANIMAL,
  reset
});