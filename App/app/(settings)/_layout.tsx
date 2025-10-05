import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // or 'slide_from_right'

            }}
        >
            <Stack.Screen name="settings_main" />
            <Stack.Screen name="audio_settings" />
            {/* <Stack.Screen name="home" />
            <Stack.Screen name="online" />
            <Stack.Screen name="fantasy" />
            <Stack.Screen name="learns" /> */}
        </Stack>
    );
}
