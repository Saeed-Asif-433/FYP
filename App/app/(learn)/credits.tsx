import CustomHeader from '@/components/customheader';
import { Image, ImageBackground } from "expo-image";
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Credits() {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1 }}></View>
            <ImageBackground source={require('../../assets/images/bgufc2.png')} style={{ width: '100%', height: '100%' }}>
                {/*Top View*/}
                <View style={{ flex: 1, }}>
                    <CustomHeader name={'CREDITS'} onPress={() => router.push('/learn')} />
                </View>

                {/*Middle View*/}
                <View style={{ flex: 6, }}>
                    <View style={styles.container}>

                        <Text style={styles.title}>CREDITS</Text>
                        <ScrollView contentContainerStyle={styles.scrollContainer}  >
                            <Text style={styles.text}>
                                THIS SOFTWARE PRODUCT WAS DESIGNED, DEVELOPED, AND TESTED BY A DEDICATED TEAM OF STUDENTS AS PART OF THEIR FINAL YEAR PROJECT.
                            </Text>

                            <Text style={styles.text}>
                                FRONTEND DEVELOPMENT:{'\n'}
                                - Muhammad Ammar{'\n'}
                                - Faizan Mehmood
                            </Text>

                            <Text style={styles.text}>
                                BACKEND & GAME LOGIC:{'\n'}
                                - Muhammad Ammar
                            </Text>

                            <Text style={styles.text}>
                                MACHINE LEARNING & AI:{'\n'}
                                - Saeed Asif
                            </Text>

                            <Text style={styles.text}>
                                UI/UX DESIGN:{'\n'}
                                - Faizan Mehmood
                            </Text>

                            <Text style={styles.text}>
                                SUPERVISOR:{'\n'}
                                - Mr. Akhzar Nazir
                            </Text>

                            <Text style={styles.text}>
                                SPECIAL THANKS TO:{'\n'}
                                - Our mentors and faculty at COMSATS University Lahore{'\n'}
                                - The Expo & React Native community
                            </Text>

                            <Text style={styles.text}>
                                ALL CONTENT USED IN THIS APPLICATION IS FOR EDUCATIONAL PURPOSES ONLY. NO TRADEMARKS, LOGOS, OR NAMES ARE USED TO MISREPRESENT OR VIOLATE ANY COPYRIGHT.
                            </Text>
                        </ScrollView>
                    </View>
                </View>

                {/*Bottom View*/}
                <View style={{ flex: 0.6, }}>
                    <View style={{ position: 'absolute', width: 60, height: 60, zIndex: 10, bottom: -12, right: 10, }}>

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
        padding: 10,
        margin: 10
    },
    scrollContainer: {
        paddingBottom: 40,
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
