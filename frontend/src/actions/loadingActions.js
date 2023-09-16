export const SET_TIMEOUT = "SET_TIMEOUT";
export const SET_BATTLE_LOADING = "SET_BATTLE_LOADING";
export const SET_GUTS = "SET_GUTS";
export const SET_HP_BAR = "SET_HP_BAR";
export const SET_MAX_HP_BAR = "SET_MAX_HP_BAR";
export const SET_BANK_IDX = "SET_BANK_IDX";
export const RESET_LOADING = "RESET_LOADING";

export const setTimeOut = (isTimeout) => ({
    type: SET_TIMEOUT,
    payload: isTimeout
});

export const setBattleLoading = (isLoading) => ({
    type: SET_BATTLE_LOADING,
    payload: isLoading
})

export const setHpBar = (target, hp) => ({
    type: SET_HP_BAR,
    target,
    hp
});

export const setMaxHpBar = (target, hp) => ({
    type: SET_MAX_HP_BAR,
    target,
    hp
});

export const setGuts = (target, guts) => ({
    type: SET_GUTS,
    target,
    guts
});

export const setBankIdx = (idx) => ({
    type: SET_BANK_IDX,
    payload: idx
});

export const resetLoading = (reset) => ({
    type: RESET_LOADING,
    reset
})