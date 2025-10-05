import Lottieanimation from "@/components/animation";
import CustomHeader from "@/components/customheader";
import { styles } from "@/library/Stylesheet";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Online() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Main View*/}
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <ImageBackground source={require('../assets/images/bgufc3.png')} style={styles.image}>
          {/* <Lottieanimation /> */}
          {/* Top View*/}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <CustomHeader name={'ONLINE'} onPress={() => router.push('/home')} />
            {/* <Lottieanimation /> */}
          </View>

          {/* Middle View*/}
          <View style={{ flex: 6, flexDirection: 'row' }}>

            {/* Play Online View*/}
            <View style={{ flex: 2, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%' }}>
              <Lottieanimation />


              <Image source={require('../assets/images/salt.png')} style={styles.playonline_image} contentFit='cover' />
              <View style={{ alignSelf: 'flex-start', borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>PLAY ONLINE</Text>
                {/* <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}></Text> */}
              </View>

            </View>

            {/* Friends Online View*/}
            <View style={{ flex: 1 }}>

              {/* Active Friends View*/}
              <View style={{ flex: 3, backgroundColor: '#1b1f2a', marginRight: '2%' }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%', flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>ACTIVE FRIENDS</Text>

                </View>
                {[
                  { name: 'Ali', image: require('../assets/images/profile.png') },
                  { name: 'ahmed', image: require('../assets/images/1.png') },

                ].map((friend, index) => (
                  <View
                    key={index}
                    style={styles.active_friends_view}
                  >
                    <Image
                      source={friend.image}
                      style={{ width: 30, height: 30, borderRadius: 15, marginRight: 12, borderWidth: 1, borderColor: 'white' }}
                    />
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 14, flex: 1 }}>{friend.name}</Text>
                    <View
                      style={styles.online_indicator}
                    />
                  </View>
                ))}
              </View>
              {/* Add Friend View*/}
              <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginTop: '1%', marginRight: '2%', }}>

                <View style={{ alignSelf: 'flex-start', borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%', }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>INVITE FRIENDS</Text>
                  {/* <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}></Text> */}

                </View>
                <AntDesign name="addusergroup" size={25} color="white" style={{ marginTop: 10, alignSelf: 'center' }} />
              </View>
            </View>
          </View>

          {/* Bottom View*/}
          <View style={{ flex: 0.6, }}>
            {/* <Lottieanimation /> */}
            <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10, }}>
              <Image source={require('../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />
            </View>

          </View>
        </ImageBackground>
      </View>

    </SafeAreaView >
  )
}

