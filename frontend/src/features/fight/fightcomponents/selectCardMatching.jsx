const selectCardMatching = (
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyAnimal
) => {

  let playerType = playerAnimal.name;
  let playerAtk = playerAnimal.stats.atk;
  let playerDef = playerAnimal.stats.def;
  let playerExc = playerAnimal.exchange;

  let enemyType = enemyAnimal.name;
  let enemyAtk = enemyAnimal.stats.atk;
  let enemyDef = enemyAnimal.stats.def;
  let enemyExc = enemyAnimal.exchange;

  let playerDmg = 0;
  let enemyDmg = 0;
  let playerSDmg = 0;
  let enemySDmg = 0;

  if (playerSelect == "exchange") {
    if (playerExc > 1) {
      playerAtk *= playerExc;
      playerSelect = "attack";
    } else if (playerExc < 1) {
      playerDef *= 2 - playerExc;
      playerSelect = "defence";
    } else if (playerExc == 1) {
      playerSelect = "counter";
    }
  } else if (enemySelect == "exchange") {
    if (enemyExc > 1) {
      enemyAtk *= enemyExc, enemySelect = "attack";
    } else if (enemyExc < 1) {
      enemyDef *= 2 - playerExc, enemySelect = "defence";
    } else if (enemyExc == 1) {
      enemySelect = "counter";
    }
  }

  let playerSiba = false;
  let enemySiba = false;

  if (playerSelect == "skill") {
    if (playerType == "독수리") {
      if (enemySelect == "counter" || ((enemyType == "호랑이" || enemyType == "시바") && enemySelect == "skill")) {
        playerSDmg += playerAnimal.hp * 0.6;
      } else {
        enemySDmg += playerAnimal.hp * 0.4;
        playerSDmg += playerAnimal.hp * 0.2;
      }
      playerSelect = "attack"
    } else if (playerType == "판다") {
      if (enemySelect == "counter" || ((enemyType == "호랑이" || enemyType == "시바") && enemySelect == "skill")) {
        enemySDmg += -playerAnimal.hp * 0.1;
      } else {
        playerSDmg += -playerAnimal.hp * 0.1;
      }
      playerSelect = "defence"
    } else if (playerType == "호랑이") {
      playerSelect = "counter";
    } else if (playerType == "사자") {
      playerAtk *= 1.5;
      playerSelect = "attack";
    } else if (playerType == "쿼카") {
      playerDef *= 1.5;
      playerSelect = "defence";
    } else if (playerType == "시바견") {
      playerSiba = true;
      playerSelect = "counter";
    }
  } 
  if (enemySelect == "skill") {
    if (enemyType == "독수리") {
      if (playerSelect == "counter") {
        enemySDmg += enemyAnimal.hp * 0.6;
      } else {
        playerSDmg += enemyAnimal.hp * 0.4;
        enemySDmg += enemyAnimal.hp * 0.2;
      }
      enemySelect = "attack"
    } else if (enemyType == "판다") {
      if (playerSelect == "counter") {
        playerSDmg += -enemyAnimal.hp * 0.1;
      } else {
        enemySDmg += -enemyAnimal.hp * 0.1;
      }
      enemySelect = "defence"
    } else if (enemyType == "호랑이") {
      enemySelect = "counter";
    } else if (enemyType == "사자") {
      enemyAtk *= 1.5;
      enemySelect = "attack";
    } else if (enemyType == "쿼카") {
      enemyDef *= 1.5;
      enemySelect = "defence";
    } else if (enemyType == "시바견") {
      enemySiba = true;
      enemySelect = "counter";
    }
  }

  switch (playerSelect) {
    case "attack":
      switch (enemySelect) {
        case "attack":
          playerDmg = enemyAtk;
          enemyDmg = playerAtk;
          break;
        case "defence":
          enemyDmg = Math.max(0, playerAtk - enemyDef);
          break;
        case "counter":
          playerDmg = playerAtk;
          break;
      }
      break;

    case "defence":
      switch (enemySelect) {
        case "attack":
          playerDmg = Math.max(0, enemyAtk - playerDef);
          break;
        case "defence":
          enemyDmg = -enemyDef;
          playerDmg = -playerDef;
          break;
        case "counter":
          enemyDmg = -playerDef;
          break;
      }
      break;

    case "counter":
      switch (enemySelect) {
        case "attack":
          enemyDmg = enemyAtk;
          break;
        case "defence":
          playerDmg = -enemyDef;
          break;
      }
      break;

    default:
      console.log(
        "오류 발생",
        playerSelect,
        enemySelect,
        playerAnimal,
        enemyAnimal
      );
      break;
  }
  if (enemySiba || playerSiba) {
    playerDmg *= 1.5;
    playerSDmg *= 1.5;
    enemyDmg *= 1.5
    enemySDmg *= 1.5
  }
  return {
    playerTotalDmg: playerDmg + playerSDmg,
    enemyTotalDmg: enemyDmg + enemySDmg
};
};

export default selectCardMatching;
