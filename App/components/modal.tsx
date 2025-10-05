import { AntDesign } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const BottomModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0);

    const toggleButtons = () => {
        setIsVisible(!isVisible);
        translateX.value = withTiming(isVisible ? 0 : 20, { duration: 300 }); // Slide in/out
        opacity.value = withTiming(isVisible ? 0 : 1, { duration: 300 }); // Fade in/out
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={{ flexDirection: 'row', }}>
            {/* Main Button */}
            <AntDesign name="rightcircle" size={24} color='white' style={{ marginTop: 0, marginHorizontal: '1%' }} onPress={toggleButtons} />

            {/* Animated Buttons (appear to the right) */}
            {isVisible && (
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.View style={[animatedStyle, { marginHorizontal: 8, }]}>
                        <TouchableOpacity onPress={() => router.push('/shop_screen')}>
                            <MaterialIcons name="local-grocery-store" size={20} color="#ffcc00" />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={[animatedStyle, { marginHorizontal: 8 }]}>
                        {/* <TouchableOpacity style={{ backgroundColor: "#e74c3c", padding: 5, borderRadius: 10 }}> */}
                        <MaterialCommunityIcons name="web" size={20} color="white" />
                        {/* </TouchableOpacity> */}
                    </Animated.View>

                    <Animated.View style={[animatedStyle, { marginHorizontal: 8 }]}>
                        {/* <TouchableOpacity style={{ backgroundColor: "#2ecc71", padding: 5, borderRadius: 10 }}> */}
                        <Entypo name="help" size={20} color="red" />
                        {/* </TouchableOpacity> */}
                    </Animated.View>
                </View>
            )}
        </View>
    );
};

export default BottomModal;
