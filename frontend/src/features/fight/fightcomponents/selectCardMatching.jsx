const selectCardMatching = (
  playerSelect,
  enemySelect,
  playerAnimal,
  enemyAnimal
) => {

  let playerType = playerAnimal.animal;
  let playerAtk = playerAnimal.attack * 2;
  let playerDef = playerAnimal.defence * 2;
  let playerExc = playerAnimal.exchange;

  let enemyType = enemyAnimal.animal;
  let enemyAtk = enemyAnimal.attack * 2;
  let enemyDef = enemyAnimal.defence * 2;
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
  } 
  if (enemySelect == "exchange") {
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
    if (playerType == "EAGLE") {
      if (enemySelect == "counter" || ((enemyType == "TIGER" || enemyType == "SHIBA") && enemySelect == "skill")) {
        playerSDmg += playerAnimal.Hp * 0.6;
      } else {
        enemySDmg += playerAnimal.Hp * 0.4;
        playerSDmg += playerAnimal.Hp * 0.2;
      }
      playerSelect = "attack"
    } else if (playerType == "PANDA") {
      if (enemySelect == "counter" || ((enemyType == "TIGER" || enemyType == "SHIBA") && enemySelect == "skill")) {
        enemySDmg += -playerAnimal.Hp * 0.1;
      } else {
        playerSDmg += -playerAnimal.Hp * 0.1;
      }
      playerSelect = "defence"
    } else if (playerType == "TIGER") {
      playerSelect = "counter";
    } else if (playerType == "LION") {
      playerAtk *= 1.5;
      playerSelect = "attack";
    } else if (playerType == "QUOKKA") {
      playerDef *= 1.5;
      playerSelect = "defence";
    } else if (playerType == "SHIBA") {
      playerSiba = true;
      playerSelect = "counter";
    }
  } 
  if (enemySelect == "skill") {
    if (enemyType == "EAGLE") {
      if (playerSelect == "counter") {
        enemySDmg += enemyAnimal.Hp * 0.6;
      } else {
        playerSDmg += enemyAnimal.Hp * 0.4;
        enemySDmg += enemyAnimal.Hp * 0.2;
      }
      enemySelect = "attack"
    } else if (enemyType == "PANDA") {
      if (playerSelect == "counter") {
        playerSDmg += -enemyAnimal.Hp * 0.1;
      } else {
        enemySDmg += -enemyAnimal.Hp * 0.1;
      }
      enemySelect = "defence"
    } else if (enemyType == "TIGER") {
      enemySelect = "counter";
    } else if (enemyType == "LION") {
      enemyAtk *= 1.5;
      enemySelect = "attack";
    } else if (enemyType == "QUOKKA") {
      enemyDef *= 1.5;
      enemySelect = "defence";
    } else if (enemyType == "SHIBA") {
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
