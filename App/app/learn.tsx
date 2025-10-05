import Lottieanimation from "@/components/animation";
import CustomHeader from "@/components/customheader";
import { styles } from "@/library/Stylesheet";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Learn() {
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
            <CustomHeader name={'LEARN'} onPress={() => router.push('/home')} />
          </View>
          {/*Middle View*/}
          <View style={{ flex: 6, flexDirection: 'row' }}>
            {/*How to Play*/}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
              <Lottieanimation />

              <View style={{ borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '2%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>HOW TO PLAY</Text>

              </View>
              <Image source={require('../assets/images/owen2.png')} style={{ width: '100%', height: '95%', position: 'absolute', bottom: 0, zIndex: 1, }} contentFit="cover" />
            </View>
            {/*Fantasy Rules*/}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}
              onPress={() => router.push('/fantasyrules')}>
              <Lottieanimation />
              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>FANTASY RULES</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/akeal.png')} style={{ width: '100%', height: '85%', position: 'absolute', bottom: 0, }} contentFit='cover' />
              </View>
            </TouchableOpacity>

            {/*Third Section*/}
            <View style={{ flex: 1, marginRight: '1%', marginLeft: '1%', }}>

              {/*Terms & Conditions*/}

              <TouchableOpacity style={{ flex: 2, backgroundColor: '#1b1f2a', alignItems: 'center' }}
                onPress={() => router.push('/tc')}>
                <View style={{ borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%', marginLeft: '1%', }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>TERMS & CONDITIONS</Text>
                </View>
                <MaterialCommunityIcons name="book-open-variant" size={50} color="white" style={{ marginTop: 40 }} />

              </TouchableOpacity>

              {/*CREDITS*/}
              <TouchableOpacity style={{ flex: 1, backgroundColor: '#1b1f2a', marginTop: '1%', }}
                onPress={() => router.push('/credits')}>
                <View style={{ borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '2%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>CREDITS</Text>

                </View>
                <View style={{ marginTop: 10, alignSelf: 'center' }}>
                  <FontAwesome6 name="people-group" size={35} color="white" />
                </View>

              </TouchableOpacity>
            </View>
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