export const SET_TURN = "SET_TURN";
export const SET_GUIDE = "SET_GUIDE"
export const SET_END_GAME = "SET_END_GAME"
export const SET_RESULT = "SET_RESULT"
export const RESET_TURN = "RESET_TURN"

export const setTurn = (turn) => ({
  type: SET_TURN,
  turn
});

export const setGuide = (res) => ({
  type: SET_GUIDE,
  res
});

export const setEndGame = (end) => ({
  type: SET_END_GAME,
  end
})

export const setResult = (res) => ({
  type: SET_RESULT,
  res
})

export const resetTurn = (reset) => ({
  type: RESET_TURN,
  reset
})