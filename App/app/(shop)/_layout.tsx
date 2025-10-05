import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // or 'slide_from_right'
                // freezeOnBlur: true,
            }}
        >
            <Stack.Screen name="shop_screen" />
            <Stack.Screen name="coins" />
            <Stack.Screen name="subscription" />
            {/* <Stack.Screen name="online" />
            <Stack.Screen name="fantasy" />
            <Stack.Screen name="learn" /> */}
        </Stack>
    );
}