import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DailyReward({ onPress }: any) {
    return (
        <TouchableOpacity
            style={styles.rewardButton}

            onPress={onPress}
        >
            <LinearGradient
                colors={['#0f426c', '#020202',]}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Glow Effect */}
                {/* <View style={styles.glow} /> */}

                {/* Content */}
                <View style={styles.buttonContent}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="gift" size={15} color="gold" />
                        {/* <View style={styles.iconGlow} /> */}
                    </View>
                    <Text style={styles.buttonText}>DAILY REWARD</Text>
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
        borderRadius: 8, // Slightly rounded corners
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
        borderRadius: 8
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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