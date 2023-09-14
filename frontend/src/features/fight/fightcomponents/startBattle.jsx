import selectCardMatching from "./selectCardMatching";
import {
  setBattleLoading,
  setGuts,
  setHpBar,
} from "../../../actions/loadingActions";
import {
  setPlayerSelect,
  setEnemySelect,
  decreaseCard,
  increaseSkillCard,
} from "../../../actions/cardActions";

const cardTypes = ["skill", "exchange", "defence", "counter", "attack"];

const checkEnemyCardAvailability = (enemyCard) => {
  return cardTypes.filter((key) => {
    return (
      (key === "skill" && enemyCard[key] === 3) ||
      (key !== "skill" && enemyCard[key] > 0)
    );
  });
};

const getRandomCardType = (enemyCard) => {
  const availableEnemyCards = checkEnemyCardAvailability(enemyCard);
  const randomIndex = Math.floor(Math.random() * availableEnemyCards.length);
  return availableEnemyCards[randomIndex];
};

// const handleExchange = (
//   playerSelect,
//   enemySelect,
//   playerAnimal,
//   enemyAnimal,
//   playerCard,
//   enemyCard,
//   dispatch
// ) => {
//   if (
//     playerSelect === "exchange" &&
//     playerAnimal.exchange === 1 &&
//     enemySelect === "exchange" &&
//     enemyAnimal.exchange === 1
//   ) {
//     return;
//   }

//   if (enemySelect === "exchange" && enemyAnimal.exchange === 1) {
//     dispatch(setPlayerSelect({ type: "", number: "" }));
//     dispatch(
//       setEnemySelect({ type: playerSelect, number: playerCard[playerSelect] })
//     );
//   } else if (playerSelect === "exchange" && playerAnimal.exchange === 1) {
//     dispatch(
//       setPlayerSelect({ type: enemySelect, number: enemyCard[enemySelect] })
//     );
//     dispatch(setEnemySelect({ type: "", number: "" }));
//   }
// };

const setAnimalGuts = (
  playerGuts,
  enemyGuts,
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyAnimal,
) => {
  let newPlayerGuts = playerGuts;
  let newEnemyGuts = enemyGuts;
  if (playerAnimal.name === "호랑이" && playerSelect === "skill") {
    if (enemySelect === "exchange" && enemyAnimal.exchange === 1) {
      newEnemyGuts += 1;
    } else {
      newPlayerGuts += 1;
    }
  } 
  if (enemyAnimal.name === "호랑이" && enemySelect === "skill") {
    if (playerSelect === "exchange" && playerAnimal.exchange === 1) {
      newPlayerGuts += 1;
    } else {
      newEnemyGuts += 1;
    }
  }
  return [newPlayerGuts, newEnemyGuts]
};

const setAnimalHp = (playerHp, enemyHp, damageResult, newPlayerGuts, newEnemyGuts) => {
  let newPlayerHp = Math.max(0, Math.min(1000, playerHp - damageResult.playerTotalDmg));
  let newEnemyHp = Math.max(0, Math.min(1000, enemyHp - damageResult.enemyTotalDmg));
  if (newPlayerHp <= 0 && newPlayerGuts > 0) {
    newPlayerHp = 1;
    newPlayerGuts -= 1;
  }

  if (newEnemyHp <= 0 && newEnemyGuts > 0) {
    newEnemyHp = 1;
    newEnemyGuts -= 1;
  }
  return [newPlayerHp, newEnemyHp]
}

const startBattle = (
  dispatch,
  playerSelect,
  playerCard,
  enemyCard,
  playerAnimal,
  enemyAnimal,
  playerHp,
  enemyHp,
  playerGuts,
  enemyGuts
) => {
  const enemySelect = getRandomCardType(enemyCard);

  dispatch(setBattleLoading(true));
  dispatch(
    setEnemySelect({ type: enemySelect, number: enemyCard[enemySelect] })
  );
  dispatch(decreaseCard(enemySelect, "enemy"));

  const guts = setAnimalGuts(
    playerGuts,
    enemyGuts,
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyAnimal,
  )

  const damageResult = selectCardMatching(
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyAnimal
  );

  const animalHp = setAnimalHp(playerHp, enemyHp, damageResult, guts[0], guts[1])

  dispatch(setHpBar("player", animalHp[0]));
  dispatch(setHpBar("enemy", animalHp[1]));
  dispatch(setGuts("player", guts[0]));
  dispatch(setGuts("enemy", guts[1]));

  // dispatch(setBattleLoading(false));

  return animalHp;
};


export default startBattle;
