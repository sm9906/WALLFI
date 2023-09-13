import selectCardMatching from "./selectCardMatching";
import { setBattleLoading, setGuts } from "../../../actions/loadingActions";
import {
  setPlayerSelect,
  setEnemySelect,
  decreaseCard,
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

const handleExchange = (
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyCard,
  playerCard,
  dispatch
) => {
  if (
    playerSelect === "exchange" &&
    playerAnimal.exchange === 1 &&
    enemySelect === "exchange" &&
    enemyAnimal.exchange === 1
  ) {
    return;
  }

  if (enemySelect === "exchange" && enemyAnimal.exchange === 1) {
    dispatch(setPlayerSelect({ type: "", number: "" }));
    dispatch(
      setEnemySelect({ type: playerSelect, number: playerCard[playerSelect] })
    );
  } else if (playerSelect === "exchange" && playerAnimal.exchange === 1) {
    dispatch(
      setPlayerSelect({ type: enemySelect, number: enemyCard[enemySelect] })
    );
    dispatch(setEnemySelect({ type: "", number: "" }));
  }
};

const setGuts = (
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyAnimal,
  dispatch
) => {
  if (playerAnimal.name === "호랑이" && playerSelect === "skill") {
    if (enemySelect === "exchange" && enemyAnimal.exchange === 1) {
      dispatch(setGuts("enemy", "up"));
    } else {
      dispatch(setGuts("player", "up"));
    }
  } else if (enemyAnimal.name === "호랑이" && enemySelect === "skill") {
    if (playerSelect === "exchange" && playerAnimal.exchange === 1) {
      dispatch(setGuts("player", "up"));
    } else {
      dispatch(setGuts("enemy", "up"));
    }
  }
};

const startBattle = (
  dispatch,
  playerSelect,
  playerCard,
  enemyCard,
  playerAnimal,
  enemyAnimal
) => {
  const enemySelect = getRandomCardType(enemyCard);

  dispatch(setBattleLoading(true));
  dispatch(
    setEnemySelect({ type: enemySelect, number: enemyCard[enemySelect] })
  );
  dispatch(decreaseCard(enemySelect, "enemy"));

  handleExchange(
    // 상대랑 카드 바꾸는 연출
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyCard,
    playerCard,
    dispatch
  );
  setGuts(playerSelect, enemySelect, playerAnimal, enemyAnimal, dispatch);
  const damageResult = selectCardMatching(
    playerSelect,
    enemySelect,
    playerAnimal,
    enemyAnimal
  );
  // console.log(damageResult)
  dispatch(reducePlayerHP(damageResult.playerTotalDmg));
  dispatch(reduceEnemyHP(damageResult.enemyTotalDmg));
};

export default startBattle;
