export const SET_BATTLE_LOADING = "SET_BATTLE_LOADING";

export const setBattleLoading = (isLoading) => ({
    type: SET_BATTLE_LOADING,
    payload: isLoading
    // payload: false // 오버레이 설정
})