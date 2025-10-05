import { styles } from "@/library/Stylesheet";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { Animated, View, StyleSheet } from "react-native";

export const AnimatedForeground = () => {
  return (
    <LinearGradient
      colors={["white", "#06aed5", "#06aed5", "white"]} // Cyan takes more space #043b64
      locations={[0, 0.3, 0.6, 1]} // More weight for #06aed5
      start={{ x: 1.5, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />


  );
};

export const AnimatedBackground = () => {
  return (
    <LinearGradient
      colors={["#020d27", '#041f4a', '#020d27', "#041f4a"]} // Cyan takes more space
      locations={[0, 0.3, 0.6, 1]} // More weight for #06aed5
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />

  );
};




// export const MovingStars = () => {
//     return (
//       <View style={StyleSheet.absoluteFill}>
//         <LottieView
//           source={require('../assets/images/lottie.json')}
//           autoPlay
//           loop
//           style={{ width: "100%", height: "100%",flex:1 }}
//         />
//       </View>
//     );
//   };