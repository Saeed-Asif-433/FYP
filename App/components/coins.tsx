import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CoinsHome({ onPress }: any) {
    return (
        <TouchableOpacity

            style={styles.rewardButton}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#000000', '#1b1f2a']}
                style={styles.gradientBackground}
                start={{ x: 0.8, y: 0.5 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Glow Effect */}
                {/* <View style={styles.glow} /> */}

                {/* Content */}
                <View style={styles.buttonContent}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="coins" size={15} color="#FFD700" />
                        {/* <View style={styles.iconGlow} /> */}
                    </View>
                    <Text style={styles.buttonText}>100</Text>
                </View>

                {/* Shine Effect */}
                {/* <View style={styles.shine} /> */}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rewardButton: {
        backgroundColor: '#1b1f2a',
        borderRadius: 5, // Slightly rounded corners
        overflow: 'hidden',
        marginTop: 5
        // shadowColor: 'gold',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // elevation: 5,
    },
    gradientBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderColor: 'transparent',
        position: 'relative',
        borderRadius: 5
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        zIndex: 2,
    },
    iconContainer: {
        position: 'relative',
    },
    iconGlow: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        // backgroundColor: 'rgba(255, 215, 0, 0.2)',
        top: -2,
        left: -2,
        zIndex: -1,
    },
    buttonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',

        // textShadowColor: 'rgba(0,0,0,0.5)',
        // textShadowOffset: { width: 1, height: 1 },
        // textShadowRadius: 1,
    },
    glow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 215, 0, 0.05)',
    },
    shine: {
        position: 'absolute',
        top: -10,
        left: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: [{ rotate: '45deg' }],
    },
});