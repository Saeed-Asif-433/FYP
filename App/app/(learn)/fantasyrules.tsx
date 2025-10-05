import CustomHeader from '@/components/customheader';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, ImageBackground } from "expo-image";
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function FantasyRules() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}></View>
      <ImageBackground source={require('../../assets/images/bgufc3.png')} style={{ width: '100%', height: '100%' }}>
        {/* Top View */}
        <View style={{ flex: 1 }}>
          <CustomHeader name={'FANTASY RULES'} onPress={() => router.push('/learn')} />
        </View>

        {/* Middle View */}
        <View style={{ flex: 6, flexDirection: 'row' }}>

          <ScrollView contentContainerStyle={styles.scrollContainer} horizontal>
            {/* PURCHASE */}
            <View style={{ minWidth: 150, backgroundColor: '#1b1f2a', marginLeft: 8 }}>
              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>PURCHASE</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#ccc', lineHeight: 22, textAlign: 'center' }}>BUY A TOURNAMENT{'\n'}FROM THE SHOP</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10 }}>
                <Image source={require('../../assets/images/psl.png')} style={{ width: 60, height: 50 }} contentFit='contain' />
                <Image source={require('../../assets/images/bpl.png')} style={{ width: 60, height: 50 }} contentFit='contain' />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 5 }}>
                <Image source={require('../../assets/images/bbl.png')} style={{ width: 50, height: 50 }} contentFit='contain' />
                {/* <Image source={require('../../assets/images/psl.png')} style={{ width: 50, height: 50 }} contentFit='contain' /> */}
              </View>
            </View>
            <Entypo name="arrow-bold-right" size={30} color="orange" style={{ alignSelf: 'center' }} />

            {/* PLAY */}
            <View style={{ minWidth: 150, backgroundColor: '#1b1f2a', }}>
              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>DRAFT</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#ccc', lineHeight: 22, textAlign: 'center' }}>DRAFT YOUR SQUAD</Text>
              </View>
              <View style={{ flex: 1, marginTop: 0 }}>
                <Image source={require('../../assets/images/dsgc.png')} style={{ width: '100%', height: '100%', bottom: 0, position: 'absolute' }} contentFit='cover' />
              </View>
            </View>
            <Entypo name="arrow-bold-right" size={30} color="orange" style={{ alignSelf: 'center' }} />

            {/* FORMULATE + CAPTAIN */}
            <View style={{ minWidth: 150, backgroundColor: '#1b1f2a', }}>

              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>BONUS</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#ccc', lineHeight: 22, textAlign: 'center' }}>PICK YOUR{'\n'}CAPTAIN & VC</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <Image source={require('../../assets/images/zakir.png')} style={{ width: '100%', height: '100%', bottom: 0, position: 'absolute' }} contentFit='cover' />
              </View>
            </View>
            <Entypo name="arrow-bold-right" size={30} color="orange" style={{ alignSelf: 'center' }} />

            {/* EARN POINTS */}
            <View style={{ minWidth: 150, backgroundColor: '#1b1f2a', }}>
              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>EARN POINTS</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#ccc', lineHeight: 22, textAlign: 'center' }}>EARN POINTS{'\n'}BASED ON{'\n'}PERFORMANCE</Text>
              </View>
              <View style={{ flex: 1, marginTop: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="star-four-points-outline" size={30} color="green" />
                <MaterialCommunityIcons name="star-four-points-outline" size={30} color="green" />
                <MaterialCommunityIcons name="star-four-points-outline" size={30} color="green" />
              </View>
            </View>
            <Entypo name="arrow-bold-right" size={30} color="orange" style={{ alignSelf: 'center' }} />

            {/* LEADERBOARD */}
            <View style={{ minWidth: 150, backgroundColor: '#1b1f2a', marginRight: 8 }}>
              <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>LEADERBOARD</Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, color: '#ccc', lineHeight: 22, textAlign: 'center' }}>CLIMB THE{'\n'}LEADERBOARD TO{'\n'}EARN REWARDS!</Text>
              </View>
              <View style={{ flex: 1, marginTop: 0, }}>
                <Image source={require('../../assets/images/rashid.png')} style={{ width: '100%', height: '100%', bottom: 0, position: 'absolute' }} contentFit='cover' />
              </View>
            </View>
          </ScrollView>


        </View>

        {/* Bottom View */}
        <View style={{ flex: 0.6 }}>
          <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10 }}>
            <Image source={require('../../assets/images/1.png')} style={{ width: '100%', height: '100%' }} contentFit='contain' />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1f2a',
    padding: 20,
    margin: 10
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
});