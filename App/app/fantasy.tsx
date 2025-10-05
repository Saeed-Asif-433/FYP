import CustomHeader from '@/components/customheader';
import { styles } from '@/library/Stylesheet';
import { Image, ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Tournament() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1 }}>

                <ImageBackground source={require('../assets/images/bgufc2.png')} style={styles.image}>
                    {/*Top View*/}
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {/* <Fontisto name="backward" size={25} color="black" style={{ margin: 5 }} onPress={() => router.push('/home')} />
                    <View style={{ position: 'absolute', right: 55, marginTop: "2%" }}>
                      <ProfilePreview />
        
                    </View> */}

                        <CustomHeader name={'FANTASY'} onPress={() => router.push('/home')} />
                    </View>
                    {/*Middle View*/}
                    <View style={{ flex: 6, flexDirection: 'row', marginVertical: '2%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 30 }}>TBD</Text>
                    </View>
                    {/*Bottom View*/}
                    <View style={{ flex: 0.6, }}>

                        <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10, }}>

                            <Image source={require('../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />
                        </View>
                    </View>
                </ImageBackground>

            </View>
        </SafeAreaView>
    )
}