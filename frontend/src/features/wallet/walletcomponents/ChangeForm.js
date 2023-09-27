
// 숫자 표기식으로 변환
const ChangeForm = (state) => {
  if(typeof(state)==='string'){
    state.replace(/,/g,'')
    return Number(state).toLocaleString('es-US')
  }
  else{
    return state.toLocaleString('es-US');
  }
}

//숫자 표기식에서 숫자로
const RechangeForm = (state) => {
  if(typeof(state) !== 'string'){
    return;
  }
  state.replace(/,/g, '');
  return Number(state);
}

export default ChangeForm