import SettingsMain from "@/app/(settings)/settings_main";
import Lottieanimation from "@/components/animation";
import CoinsHome from "@/components/coins";
import CountdownTimer from "@/components/countdowntimer";
import DailyReward from "@/components/daily_reward";
import { Dailychallenges } from "@/components/dailychallenges";
import Energy from "@/components/energy";
import ImageSlider from "@/components/imageslider";
import Inbox from "@/components/inbox";
import BottomModal from "@/components/modal";
import NavigationBar from "@/components/navigationbar";
import ProfilePreview from "@/components/profile_preview";
import SongUI from "@/components/songUI";
import { styles } from "@/library/Stylesheet";
import { useUser } from "@/library/usercontext";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from 'expo-image';
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { AppState, BackHandler, ImageBackground, Share, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../assets/global.css';
import EditProfile from "./(home)/editprofile";



export default function Home() {

  const [modalVisible, setModalVisible] = useState(false);
  const [inboxVisible, setInboxVisible] = useState(false);
  const [profileVisible, setprofileVisible] = useState(false);

  const { user } = useUser();

  const slideAnim = useSharedValue(-300); // Start off-screen (left)
  const ANIMATION_KEY = 'hasAnimatedOnce';
  useEffect(() => {
    const checkAndAnimate = async () => {
      const hasAnimated = await AsyncStorage.getItem(ANIMATION_KEY);

      if (!hasAnimated) {
        // Delay and animate
        const delay = setTimeout(() => {
          slideAnim.value = withTiming(0, { duration: 1000 });
          AsyncStorage.setItem(ANIMATION_KEY, 'true');
        }, 1000);

        return () => clearTimeout(delay);
      } else {
        slideAnim.value = 0; // Skip animation
      }
    };

    checkAndAnimate();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'inactive' || state === 'background') {
        AsyncStorage.removeItem(ANIMATION_KEY); // Reset on app close or background
      }
    });

    return () => subscription.remove();
  }, []);


  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Exit the app when on the home screen
      BackHandler.exitApp();
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();

  }, []);



  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }));

  const shareid = async () => {
    const name = user[0]?.first_name + user[0]?.last_name;
    const id = user[0]?.id;

    const message = `🏏 DRAFT Player Profile 🏏

Profile Name: ${name}
Player ID: ${id}

Add me and let's play!`;

    await Share.share({ message });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>

      <View style={{ flex: 1, }}>
        <StatusBar hidden={true} />
        {/* <AnimatedBackground></AnimatedBackground> */}

        <ImageBackground source={require('../assets/images/bgufc2.png')} style={styles.image}>
          {modalVisible ?
            <SettingsMain visible={modalVisible} onClose={() => setModalVisible(false)} />
            : null}
          {inboxVisible ?
            <Inbox visible={inboxVisible} onClose={() => setInboxVisible(false)} />
            : null}
          {profileVisible ?
            <EditProfile visible={profileVisible} onClose={() => setprofileVisible(false)} />
            : null}

          <View style={{ flex: 2, flexDirection: 'row' }}>

            <View style={{ flex: 4 }}>
              {/* <AnimatedBackground></AnimatedBackground> */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: '2%', gap: '3%' }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Fontisto name="player-settings" size={15} color="white" />

                </TouchableOpacity>
                <TouchableOpacity onPress={shareid}>
                  <AntDesign name="sharealt" size={15} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setInboxVisible(true)}>
                  <MaterialCommunityIcons name="email-multiple" size={15} color="white" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', gap: '1%', backgroundColor: "black", padding: 3 }}>

                  <Text style={{ color: 'white', fontSize: 10 }}>FREE COINS</Text>
                  <AntDesign name="videocamera" size={15} color="white" />
                </TouchableOpacity> */}
                {/* <View style={{ flexDirection: 'row', flex: 1, }}> */}

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, flexDirection: 'row', gap: 10 }}>
                  {/* <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 5, backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-evenly', gap: '1%' }}>
                      <AntDesign name="gift" size={15} color="gold" />
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>DAILY REWARD</Text>
                    </TouchableOpacity> */}
                  <SongUI />
                  <DailyReward />
                  <Energy />
                  <CoinsHome />
                </View>
                {/* </View> */}
              </View>



              <View style={{ flex: 1, }}>
                {/* <AnimatedBackground></AnimatedBackground> */}

                <NavigationBar />
              </View>
            </View>



            <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
              <ProfilePreview onPress={() => setprofileVisible(true)} />

              {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2 }}
                  source={require('../assets/images/profile.png')}></Image>
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={styles.username}>SAEED</Text>
                <View style={{ flexDirection: 'row' }}>
                  <AntDesign name="star" size={15} color="#FFD700" />
                  <AntDesign name="star" size={15} color="#FFD700" />
                  <AntDesign name="star" size={15} color="white" />
                  <AntDesign name="star" size={15} color="white" />
                  <AntDesign name="star" size={15} color="white" />
                </View>
              </View> */}
            </View>
          </View>
          <View style={{ flex: 6, flexDirection: 'row', }}>
            {/* <AnimatedBackground /> */}


            {/* Play Now */}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%' }}>
              <Lottieanimation />




              {/* <AnimatedBackground /> */}
              <Animated.Image source={require('../assets/images/jordan1.png')} style={[{ width: '100%', height: '100%', position: 'absolute', bottom: 0, marginLeft: 20, zIndex: 1, }, animatedStyle]} resizeMode='cover' />

              <View style={{ alignSelf: 'flex-start', borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>PLAY</Text>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>NOW</Text>
              </View>
            </View>


            {/*Middle top Section*/}
            <View style={{ flex: 2, borderWidth: 0, }}>
              <View style={{ flex: 2, borderBottomWidth: 0, }}>
                <Image source={require('../assets/images/top.jpg')} style={styles.image} contentFit="fill" />
                <CountdownTimer />
              </View>
              <View style={{ flex: 1, marginVertical: '1%' }}>
                <ImageSlider />
              </View>
            </View>

            {/* DAILY CHALLENGES */}
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#1b1f2a', marginLeft: '1%', marginRight: '1%' }}
              onPress={() => router.push('/dc')}>
              {/* <AnimatedBackground /> */}
              <View style={{ padding: 2, alignSelf: 'flex-start', borderLeftWidth: 3.5, borderColor: '#c6121f', marginTop: '2%', marginLeft: '1%' }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>DAILY CHALLENGES</Text>
              </View>

              <Dailychallenges disabled={true} />

            </TouchableOpacity>
          </View>
          {/* Bottom Section */}
          <View style={{ flex: 1.2, flexDirection: 'row' }}>

            {/* <AnimatedBackground></AnimatedBackground> */}
            <View style={{ flex: 3, justifyContent: 'center', }}>
              <BottomModal />



            </View>
            <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -10, right: 10, }}>
              <Image source={require('../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />

            </View>
          </View>

        </ImageBackground>
      </View>

    </SafeAreaView >
  );
}



{/* <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{flexDirection:'row',backgroundColor:'black',gap: '2%',borderWidth:5}}>
                        <MaterialIcons name="workspace-premium" size={15} color="white" />
                        <Text style={{ fontWeight: 'ultralight',textAlign:'center',color:'white',fontSize:10, }}>PREMIUM</Text>
                        </TouchableOpacity>
                    </View> */}