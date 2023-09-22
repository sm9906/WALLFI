const ChangeForm = (state) => {
  if(typeof(state)==='string'){
    state.replace(/,/g,'')
    return Number(state).toLocaleString('es-US')
  }
  else{
    return state.toLocaleString('es-US');
  }
}

export default ChangeForm