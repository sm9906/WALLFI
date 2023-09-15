import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron

if (__DEV__) {
  reactotron = Reactotron.configure({ host: '10.0.2.2' }) // host 추가 가능. ex) .configure({ host: 'your IP' })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

  console.tron = reactotron
}
export default reactotron