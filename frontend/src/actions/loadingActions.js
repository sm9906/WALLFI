export const SET_BATTLE_LOADING = "SET_BATTLE_LOADING";
export const SET_GUTS = "SET_GUTS";
export const SET_HP_BAR = "SET_HP_BAR";
export const RESET_LOADING = "RESET_LOADING";

export const setBattleLoading = (isLoading) => ({
    type: SET_BATTLE_LOADING,
    payload: isLoading
})

export const setHpBar = (target, hp) => ({
    type: SET_HP_BAR,
    target,
    hp
});

export const setGuts = (target, guts) => ({
    type: SET_GUTS,
    target,
    guts
});

export const resetLoading = (reset) => ({
    type: RESET_LOADING,
    reset
})