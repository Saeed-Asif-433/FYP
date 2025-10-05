import CustomHeader from "@/components/customheader";
import SubscriptionCard from "@/components/subscription_card";
import { styles } from "@/library/Stylesheet";
import { Image, ImageBackground } from 'expo-image';
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Subscription() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../../assets/images/bgufc2.png')} style={styles.image}>
          {/* TOP VIEW */}
          <View style={{ flex: 1 }}>
            <CustomHeader name={'SUBSCRIPTION'} onPress={() => router.push('/shop_screen')} />
          </View>
          {/* MIDDLE VIEW */}
          <View style={{ flex: 6, flexDirection: 'row' }}>
            {/* BASIC */}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', margin: '1%' }}>
              {/* HEADING */}
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>BASIC</Text>
                </View>
              </View>
              {/* CONTENT */}
              <View style={{ flex: 6, flexDirection: 'row' }}>
                {/* PERKS */}
                <View style={{ flex: 1.5 }}>
                  <SubscriptionCard coins={'15000'} price={'350'} />
                </View>
                {/* IMAGE */}
                <View style={{ flex: 1 }}>
                  <Image source={require('../../assets/images/allen.png')} style={{ width: '100%', height: '110%', position: 'absolute', bottom: 0 }} contentFit="cover" />
                </View>
              </View>
            </View>
            {/* PREMIUM */}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', margin: '1%' }}>
              {/* HEADING */}
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>PREMIUM</Text>
                </View>
              </View>
              {/* CONTENT */}
              <View style={{ flex: 6, flexDirection: 'row', }}>
                {/* PERKS */}
                <View style={{ flex: 1.5, }}>
                  <SubscriptionCard coins={'30000'} price={'999'} ads={true} />
                </View>
                {/* IMAGE */}
                <View style={{ flex: 1 }}>
                  <Image source={require('../../assets/images/lynn.png')} style={{ width: '150%', height: '100%', position: 'absolute', right: 0 }} contentFit="cover" />
                </View>
              </View>
            </View>
          </View>
          {/* BOTTOM VIEW */}
          <View style={{ flex: 0.6 }}>
            <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10, }}>

              <Image source={require('../../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}