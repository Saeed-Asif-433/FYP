import Login from '@/components/login';
import Signup from '@/components/signup';
import { styles } from '@/library/Stylesheet';
import { Image, ImageBackground } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
  const [log, setlog] = useState(false);

  // Shared animation values
  const rootOffset = useSharedValue(-300);
  const contentOffset = useSharedValue(300);

  // Animate on mount
  useEffect(() => {

    rootOffset.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });

  }, []);

  // Animate Login/Signup every time `log` changes
  useEffect(() => {
    contentOffset.value = 300; // Reset position
    contentOffset.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) });
  }, [log]);

  const rootStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rootOffset.value }]
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: contentOffset.value }]
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar hidden={true} />

      <View style={{ flex: 1 }}>

        <ImageBackground source={require('../assets/images/auth2.png')} style={styles.image} contentFit='cover'>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* PLAYER */}
            <View style={{ flex: 1 }}>
              <Animated.View style={[{ width: '150%', height: '100%', position: 'absolute', left: -150 }, rootStyle]}>
                <Image source={require('../assets/images/root.png')} style={{ width: '100%', height: '100%' }} contentFit='cover' />
              </Animated.View>
            </View>

            {/* LOGIN / SIGNUP */}
            <View style={{ flex: 1 }}>

              <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/1.png')} style={{ width: '100%', height: '100%', marginLeft: 50 }} contentFit='contain' />
              </View>

              <Animated.View style={[{ flex: 2, marginLeft: 70, marginBottom: 50 }, contentStyle]}>
                {log
                  ? <Signup log={() => setlog(false)} />

                  : <Login log={() => setlog(true)} />}
              </Animated.View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
