import CustomHeader from '@/components/customheader';
import { styles } from '@/library/Stylesheet';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopScreen() {
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>

        <ImageBackground source={require('../../assets/images/bgufc2.png')} style={styles.image}>
          {/*Top View*/}
          <View style={{ flex: 1, flexDirection: 'row', }}>
            {/* <Fontisto name="backward" size={25} color="black" style={{ margin: 5 }} onPress={() => router.push('/home')} />
            <View style={{ position: 'absolute', right: 55, marginTop: "2%" }}>
              <ProfilePreview />

            </View> */}
            <CustomHeader name={'SHOP'} onPress={() => router.push('/home')} />
          </View>
          {/*Middle View*/}
          <View style={{ flex: 6, flexDirection: 'row', marginVertical: '2%' }}>
            {/*COINS*/}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', alignItems: "center", marginVertical: '1%' }}
              onPress={() => router.push('/coins')}>

              {/* <Lottieanimation /> */}

              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>COINS</Text>

              </View>
              <Image source={require('../../assets/images/coins.png')} style={{ width: '100%', height: '100%', marginLeft: 25 }} contentFit='contain' />

            </TouchableOpacity>
            {/*SUBSCRIPTION*/}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', alignItems: "center", marginVertical: '1%' }}
              onPress={() => router.push('/subscription')}>

              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>SUBSCRIPTION</Text>
              </View>

              <Image source={require('../../assets/images/subscribe.png')} style={{ width: '90%', height: '100%', }} contentFit='contain' />

            </TouchableOpacity>
            {/*TOURNAMENT*/}

            <TouchableOpacity style={{ flex: 1, marginRight: '1%', marginLeft: '1%', marginVertical: '1%', }}
              onPress={() => router.push('/tournament')}>

              <View style={{ flex: 1, backgroundColor: '#1b1f2a', }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>TOURNAMENT</Text>

                </View>
                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                  <Entypo name="ticket" size={100} color="white" />
                </View>
              </View>

            </TouchableOpacity>
            {/* Fourth Section */}
            <View style={{ flex: 2, }}>
              <ImageBackground source={require('../../assets/images/london2.png')} style={{ position: 'absolute', bottom: -20, right: 0, zIndex: 0, left: -20, width: 300, height: 320, }} contentFit='contain' />
            </View>
          </View>
          {/*Bottom View*/}
          <View style={{ flex: 0.6, }}>

            <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10, }}>

              <Image source={require('../../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />
            </View>
          </View>
        </ImageBackground>

      </View>
    </SafeAreaView>

  );
}
