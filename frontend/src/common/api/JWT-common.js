import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageData = async(token) => {
  try{
    await AsyncStorage.setItem('WALFI', JSON.stringify({'token':token}));
  }catch(err){
    console.error('토큰 저장 실패, JWT-common')
  }
}

export const retrieveData = async() => {
  try{
    const response = await AsyncStorage.getItem('WALFI');
    const data = JSON.parse(response);
    return data.token;
  }catch(err){
    console.error('토큰 불러오기 실패, JWT-common');
  }
}