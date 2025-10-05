import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfilePreview from './profile_preview';

export default function CustomHeader({ name, onPress }: any) {


    return (
        <View style={styles.header}>
            {/* <Lottieanimation /> */}
            {/* Back button */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>

                <TouchableOpacity style={styles.backButton} onPress={onPress} >
                    <AntDesign name="leftcircle" size={24} color="white" />

                </TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
            </View>

            {/* Title */}
            <View style={{ flex: 1 }}>

            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', }}>
                <ProfilePreview />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        // height: 30,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '0%',
        // paddingHorizontal: 12,

        flex: 1
    },
    backButton: {
        marginLeft: 10,



    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 15,



    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    currency: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});
