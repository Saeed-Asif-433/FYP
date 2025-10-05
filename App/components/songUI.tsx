import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, AppState, Text } from 'react-native';

export default function SongUI() {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const [shouldAnimate, setShouldAnimate] = useState(false);


    useEffect(() => {
        const checkIfShown = async () => {
            const shown = await AsyncStorage.getItem('songUI_shown');
            if (!shown) {
                setShouldAnimate(true);
                await AsyncStorage.setItem('songUI_shown', 'true');
            }
        };

        checkIfShown();

        const appStateListener = AppState.addEventListener('change', (state) => {
            if (state === 'inactive' || state === 'background') {
                AsyncStorage.removeItem('songUI_shown');
            }
        });

        return () => appStateListener.remove();
    }, []);

    useEffect(() => {
        if (shouldAnimate) {
            const delay = setTimeout(() => {
                Animated.sequence([
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.delay(3000),
                    Animated.timing(slideAnim, {
                        toValue: -100,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 4000);
        }
    }, [shouldAnimate]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: '#1b1f2a',
                padding: 8,
                zIndex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 100,
                borderRadius: 10,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <Image
                source={require('../assets/images/notlikeus.jpg')}
                style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
            />
            <Text style={{ color: 'white', textAlign: 'center' }}>🎵 Now Playing: NOT LIKE US</Text>
        </Animated.View>
    );
}


