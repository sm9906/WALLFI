export const SET_BATTLE_LOADING = "SET_BATTLE_LOADING";
export const SET_GUTS = "SET_GUTS";
export const SET_HP_BAR = "SET_HP_BAR";

export const setBattleLoading = (isLoading) => ({
    type: SET_BATTLE_LOADING,
    payload: isLoading
    // payload: false // 오버레이 설정
})

export const setGuts = (target, direction) => ({
    type: SET_GUTS,
    target,
    direction
});

export const setHpBar = (target, damage) => ({
    type: SET_HP_BAR,
    target,
    damage
})