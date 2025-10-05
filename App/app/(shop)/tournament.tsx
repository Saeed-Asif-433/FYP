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

        <ImageBackground source={require('../../assets/images/bgufc2.png')} style={styles.image}>
          {/*Top View*/}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {/* <Fontisto name="backward" size={25} color="black" style={{ margin: 5 }} onPress={() => router.push('/home')} />
                    <View style={{ position: 'absolute', right: 55, marginTop: "2%" }}>
                      <ProfilePreview />
        
                    </View> */}

            <CustomHeader name={'TOURNAMENT'} onPress={() => router.push('/shop_screen')} />
          </View>
          {/*Middle View*/}
          <View style={{ flex: 6, flexDirection: 'row', marginVertical: '2%' }}>
            {/* PSL*/}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
              <View style={{ flex: 1, }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>PSL</Text>
                </View>
              </View>
              <View style={{ flex: 7 }}>
                <Image source={require('../../assets/images/psl.png')} style={styles.image} contentFit='contain' />
              </View>
              <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>RS 500</Text>
              </View>

            </View>
            {/*BPL COINS*/}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
              <View style={{ flex: 7 }}>
                <View style={{ flex: 1, }}>
                  <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>BPL</Text>
                  </View>
                </View>
                <View style={{ flex: 7, }}>
                  <Image source={require('../../assets/images/bpl.png')} style={styles.image} contentFit='contain' />
                </View>
              </View>
              <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>RS 500</Text>
              </View>

            </View>
            {/*1000 COINS*/}
            <View style={{ flex: 1, marginRight: '1%', marginLeft: '1%', }}>


              <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
                <View style={{ flex: 1, }}>
                  <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>ILT20</Text>
                  </View>
                </View>
                <View style={{ flex: 7, }}>
                  <Image source={require('../../assets/images/bpl.png')} style={styles.image} contentFit='contain' />
                </View>
                <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>RS 500</Text>
                </View>

              </View>

            </View >
            {/* 5000 COINS */}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
              <View style={{ flex: 1, }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>BBL</Text>
                </View>
              </View>
              <View style={{ flex: 7, }}>
                <Image source={require('../../assets/images/bbl.png')} style={styles.image} contentFit='contain' />
              </View>
              <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>RS 500</Text>
              </View>

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
  )
}