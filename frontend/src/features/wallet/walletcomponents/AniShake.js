// import React from "react";
// import { 
//   View,
//   Text,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Animated,
//   Easing 
// } from "react-native";


// export default function App() {
//   const anim = useRef(new Animated.Value(0));

//   const shake = useCallback(() => {
//     // makes the sequence loop
//     Animated.loop(
//       // runs the animation array in sequence
//       Animated.sequence([
//         // shift element to the left by 2 units
//         Animated.timing(anim.current, {
//           toValue: -2,
//           duration: 50,
//         }),
//         // shift element to the right by 2 units
//         Animated.timing(anim.current, {
//           toValue: 2,
//           duration: 50,
//         }),
//         // bring the element back to its original position
//         Animated.timing(anim.current, {
//           toValue: 0,
//           duration: 50,
//         }),
//       ]),
//       // loops the above animation config 2 times
//       { iterations: 2 }
//     ).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
//         <Button mode="contained" onPress={shake}>
//           Always wrong
//         </Button>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
// });
