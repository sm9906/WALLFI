import selectCardMatching from "./selectCardMatching";
import {
  setBattleLoading,
  setGuts,
  setHpBar,
  setTimeOut
} from "../../../actions/loadingActions";
import {
  setEnemySelect,
  setPlayerSelect,
  decreaseCard,
  setPlayerCard,
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

const setAnimalGuts = (
  playerGuts,
  enemyGuts,
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyAnimal
) => {
  let newPlayerGuts = playerGuts;
  let newEnemyGuts = enemyGuts;
  if (playerAnimal.animal === "TIGER" && playerSelect === "skill") {
    if (enemySelect === "exchange" && enemyAnimal.exchange === 1) {
      newEnemyGuts += 1;
    } else {
      newPlayerGuts += 1;
    }
  }
  if (enemyAnimal.animal === "TIGER" && enemySelect === "skill") {
    if (playerSelect === "exchange" && playerAnimal.exchange === 1) {
      newPlayerGuts += 1;
    } else {
      newEnemyGuts += 1;
    }
  }
  return [newPlayerGuts, newEnemyGuts];
};

const setAnimalHp = (
  playerHp,
  enemyHp,
  playerMaxHp,
  enemyMaxHp,
  damageResult,
  newPlayerGuts,
  newEnemyGuts
) => {
  let newPlayerHp = Math.max(
    0,
    Math.min(playerMaxHp, playerHp - damageResult.playerTotalDmg)
  );
  let newEnemyHp = Math.max(
    0,
    Math.min(enemyMaxHp, enemyHp - damageResult.enemyTotalDmg)
  );
  if (newPlayerHp <= 0 && newPlayerGuts > 0) {
    newPlayerHp = 1;
    newPlayerGuts -= 1;
  }

  if (newEnemyHp <= 0 && newEnemyGuts > 0) {
    newEnemyHp = 1;
    newEnemyGuts -= 1;
  }
  return [newPlayerHp, newEnemyHp, newPlayerGuts, newEnemyGuts];
};

const startBattle = async (
  dispatch,
  playerSelect,
  playerCard,
  enemyCard,
  playerAnimal,
  enemyAnimal,
  playerHp,
  enemyHp,
  playerMaxHp,
  enemyMaxHp,
  playerGuts,
  enemyGuts
) => {
  dispatch(setBattleLoading(true)); // 터치 못하게 설정
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const enemySelect = getRandomCardType(enemyCard); // 적 카드 랜덤으로 선택

  dispatch(
    setEnemySelect({ type: enemySelect, number: enemyCard[enemySelect] }) // 적 카드 리덕스에 갱신
  );
  dispatch(decreaseCard(enemySelect, "enemy")); // 적 덱에서 뽑은카드 제거

  const guts = setAnimalGuts(
    playerGuts,
    enemyGuts,
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyAnimal
  );

  const damageResult = selectCardMatching(
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyAnimal
  );

  // console.log("적에게 공격하는 이펙트!");
  await new Promise((resolve) => setTimeout(resolve, 1500)); // 연출을 위한 시간 생성

  const animalHp = setAnimalHp(
    playerHp,
    enemyHp,
    playerMaxHp,
    enemyMaxHp,
    damageResult,
    guts[0],
    guts[1]
  );

  dispatch(setHpBar("player", animalHp[0]));
  dispatch(setHpBar("enemy", animalHp[1]));
  dispatch(setGuts("player", animalHp[2]));
  dispatch(setGuts("enemy", animalHp[3]));
  await new Promise((resolve) => setTimeout(resolve, 2500)); // 연출을 위한 시간 생성

  dispatch(setEnemySelect({ type: "enemy", number: 0 }));
  dispatch(setPlayerSelect({ type: "", number: 0 }));

  dispatch(setTimeOut(false));

  dispatch(setBattleLoading(false)); // 터치 못하게 설정
  return animalHp;
};

export default startBattle;
