const Unit={
  1000:'K',
  1000000:'M',
  1000000000 : 'B'
}


const CoinUnit=(mount)=>{
  mount = Number(mount);
  if(mount >= 1000000000 ){
    mount /= 1000000000;
    mount = mount.toFixed(1) + 'B';
  }else if(mount >= 1000000 ){
    mount /= 1000000;
    mount = mount.toFixed(1) + 'M';
  }else if(mount >= 1000){
    mount/=1000
    mount = mount.toFixed(1) + 'K';
  }else if(mount < 1){
    mount = mount.toFixed(3);
  }else{
    mount = mount.toFixed(1);
  }
  return mount
}

export default CoinUnit