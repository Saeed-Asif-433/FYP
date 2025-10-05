import CustomHeader from '@/components/customheader';
import { Image, ImageBackground } from "expo-image";
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TC() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1 }}></View>
            <ImageBackground source={require('../../assets/images/bgufc2.png')} style={{ width: '100%', height: '100%' }}>
                {/* Top View */}
                <View style={{ flex: 1 }}>
                    <CustomHeader name={'TERMS & CONDITIONS'} onPress={() => router.push('/learn')} />
                </View>

                {/* Middle View */}
                <View style={{ flex: 6 }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>TERMS & CONDITIONS</Text>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <Text style={styles.text}>
                                By using this application, you agree to the following terms and conditions. Please read them carefully.
                            </Text>

                            <Text style={styles.text}>
                                1. This app is for **educational purposes** only. It is not intended for commercial use.
                            </Text>

                            <Text style={styles.text}>
                                2. All assets, including images, animations, and sounds, are either open-source or used with proper attribution.
                            </Text>

                            <Text style={styles.text}>
                                3. The developers are **not liable** for any misuse or damages resulting from the use of this application.
                            </Text>

                            <Text style={styles.text}>
                                4. This app may collect limited usage data for performance optimization purposes. No personal information is stored or shared.
                            </Text>

                            <Text style={styles.text}>
                                5. Any reproduction or redistribution of this app without permission is strictly prohibited.
                            </Text>

                            <Text style={styles.text}>
                                If you have questions about these terms, please contact the development team.
                            </Text>
                        </ScrollView>
                    </View>
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
