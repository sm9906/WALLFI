import { setBattleLoading } from "../../../actions/loadingActions";
import { setEnemySelect, decreaseCard } from "../../../actions/cardActions";
import animals from "../dummy/animals";

const startBattle = (dispatch, playerSelect, enemyCard) => {

  console.log(animals)

  const cardTypes = ["skill", "exchange", "defence", "counter", "attack"];

  const checkEnemyCard = (enemyCard) => {
    return cardTypes.filter((key) => {
      return (
        (key === "skill" && enemyCard[key] === 3) ||
        (key !== "skill" && enemyCard[key] > 0)
      );
    });
  };

  const getRandomCardType = () => {
    const availableEnemyCards = checkEnemyCard(enemyCard);
    const randomIndex = Math.floor(Math.random() * availableEnemyCards.length);
    return availableEnemyCards[randomIndex];
  };

  const enemySelect = getRandomCardType();

  dispatch(setBattleLoading(true));
  dispatch(
    setEnemySelect({
      type: enemySelect,
      number: enemyCard[enemySelect],
    })
  );
  dispatch(decreaseCard(enemySelect, "enemy"));
};

export default startBattle;
