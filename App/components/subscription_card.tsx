import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SubscriptionCard({ coins, price, ads }: any) {
    return (
        <View style={styles.card}>

            <Text style={styles.title}>BONUS</Text>

            <View style={styles.row}>

                <Text style={styles.rewardText}>{coins} COINS</Text>
                <Image source={require('../assets/images/coins.png')} style={styles.image} />

            </View>

            <View style={styles.row}>
                <Text style={styles.rewardText}>SKIP THE PICK</Text>
                <Ionicons name="play-skip-forward-circle-sharp" size={24} color="white" />
            </View>

            {ads ?
                <View style={styles.row}>
                    <Text style={styles.rewardText}>NO ADS</Text>
                    <FontAwesome name="ban" size={24} color="red" />

                </View>
                :
                <View style={styles.emptyrow}></View>
            }



            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>BUY: PKR {price}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        backgroundColor: '#2c2c2c',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        justifyContent: 'center',
        marginBottom: 10,


    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 0,
    },
    row: {
        borderColor: 'green',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15,
        gap: 5,
        alignItems: 'center',

    },
    rewardText: {
        color: '#ffc400',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    buyText: {
        marginTop: 10,
        color: '#00e6e6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'gold',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    emptyrow: {
        borderColor: 'green',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15,
        gap: 5,
        alignItems: 'center',

    },
});
