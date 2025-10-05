import { MusicProvider } from '@/library/MusicContext';
import { UserProvider } from '@/library/usercontext';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
    useEffect(() => {
        const hideNavBar = async () => {
            await NavigationBar.setBackgroundColorAsync('#000000');
            // await NavigationBar.setPositionAsync('absolute');
            await NavigationBar.setVisibilityAsync('hidden');
            await NavigationBar.setBehaviorAsync('overlay-swipe');


        };
        hideNavBar();
    }, []);
    return (
        <UserProvider>
            <SafeAreaProvider>
                <MusicProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'slide_from_right', // or 'slide_from_right'
                            // freezeOnBlur: true,
                        }}
                    >
                        <Stack.Screen name="index" />
                        <Stack.Screen name="auth" />
                        <Stack.Screen name="home"
                        />
                        <Stack.Screen name="online" />
                        <Stack.Screen name="fantasy" />
                        <Stack.Screen name="learn" />

                    </Stack>
                </MusicProvider>
            </SafeAreaProvider>
        </UserProvider>
    );
}

