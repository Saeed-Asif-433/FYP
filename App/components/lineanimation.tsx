import LottieView from 'lottie-react-native';
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
export default function Lineanimation() {
    const animationRef = useRef<LottieView>(null);
    useEffect(() => {
        animationRef.current?.play();

        return () => {
            animationRef.current?.pause(); // or .pause(), or .stop()
        };
    }, []);
    return (

        <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]} >
            <LottieView
                source={require('../assets/images/bganimatetrans.json')}
                autoPlay
                loop
                style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
                resizeMode='contain'
                speed={-2}
                ref={animationRef}
            />
            {/* <LottieView
                source={require('../assets/images/bganimate.json')}
                autoPlay
                loop
                style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
                resizeMode='cover'
                speed={1}
                ref={animationRef}
            /> */}


        </View>

    )
}