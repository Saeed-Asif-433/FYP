import CustomHeader from '@/components/customheader';
import { Dailychallenges } from '@/components/dailychallenges';
import { styles } from '@/library/Stylesheet';
import { Image, ImageBackground } from "expo-image";
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DC() {

  const [selectedChallenge, setSelectedChallenge]: any = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>

        <ImageBackground source={require('../../assets/images/bgufc3.png')} style={styles.image}>
          <View style={{ flex: 1 }}>
            <CustomHeader name={'DAILY CHALLENGES'} onPress={() => router.push('/home')} />
          </View>
          <View style={{ flex: 6, flexDirection: 'row', marginHorizontal: '2%', gap: 10 }}>
            {/* CHALLENGES */}
            <View style={{ flex: 2, backgroundColor: '#1b1f2a', }}>
              <Dailychallenges onSelectChallenge={setSelectedChallenge} />
            </View>
            {/* REWARDS */}
            <View style={{ flex: 1, backgroundColor: '#1b1f2a' }}>
              <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>REWARDS</Text>
                </View>
              </View>
              <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                {selectedChallenge ? (
                  <>
                    {selectedChallenge.rewardIcon
                      ?.reduce((acc: any[][], curr: any, i: number) => {
                        if (i % 2 === 0) acc.push([curr]);
                        else acc[acc.length - 1].push(curr);
                        return acc;
                      }, [])
                      .map((row: any, rowIndex: any) => (
                        <View key={rowIndex} style={{ flexDirection: 'row' }}>
                          {row.map((icon: any, colIndex: any) => (
                            <Image
                              key={colIndex}
                              source={icon}
                              style={{ width: 100, height: 60, margin: 5 }}
                              contentFit="contain"
                            />
                          ))}
                        </View>
                      ))}
                  </>
                ) : (
                  <Text style={{ color: 'gray', textAlign: 'center' }}>
                    Tap a challenge to see reward
                  </Text>
                )}
              </View>


              <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>COLLECT</Text>
              </View>
            </View>

          </View>
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