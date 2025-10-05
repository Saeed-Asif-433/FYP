import { setid } from '@/library/services';
import { supabase } from '@/library/supabase';
import { useUser } from '@/library/usercontext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, AppState, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Login({ log }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setusername] = useState('');
    const [loading, setLoading] = useState(false)
    const [secure, setsecure] = useState(true)
    const { refreshUser } = useUser();



    async function signInWithEmail() {
        if (!email?.trim() || !password?.trim()) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert("Error", error.message);
            setLoading(false);
            return;
        }

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
            Alert.alert("Error", "Failed to retrieve user details.");
            setLoading(false);
            return;
        }

        setid(userData.user.id);
        await refreshUser();

        router.push('/home');
        setLoading(false);
    }





    const progress = useSharedValue(0);

    useEffect(() => {
        if (loading) {
            progress.value = withTiming(100, { duration: 2000 });
        } else {
            progress.value = 0;
        }
    }, [loading]);

    const progressBarStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));



    return (

        <View style={styles.container}>



            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.underline} />


            <View style={{ marginTop: 10, alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.input}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={secure}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <AntDesign name="eye" size={20} color="white" style={{ alignSelf: 'center', position: 'absolute', right: 10 }}
                        onPress={() => setsecure(!secure)} />
                </View>
            </View>

            {
                loading ? (
                    <View style={{
                        height: 6,
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        overflow: 'hidden',
                        marginBottom: 20,
                    }}>
                        <Animated.View style={[{
                            height: 6,
                            backgroundColor: '#00FFAA',
                        }, progressBarStyle]} />
                    </View>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>
                )
            }



            <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'center', marginTop: 5 }}>
                <Text style={{ color: 'rgba(255,255,255,0.7)', }}>Don't have an account?</Text>
                <Pressable onPress={log} >
                    <Text style={styles.highlight}>SIGN UP</Text>
                </Pressable>
            </View>

        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,

    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#00FFAA',
        letterSpacing: 1,
        marginLeft: 20,
        textAlign: 'center',


    },
    underline: {
        width: 80,
        height: 3,
        backgroundColor: '#00FFAA',
        borderRadius: 3,
        alignSelf: 'center',
        marginLeft: 25,
    },
    formContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 170, 0.3)',
        width: 200,     // Or a fixed value like 300
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#b32420',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#00FFAA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,


    },
    buttonText: {
        color: '#020202',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    switchAuth: {
        alignSelf: 'center',
    },
    switchText: {
        color: 'rgba(255,255,255,0.7)',
    },
    highlight: {
        color: '#00FFAA',
        fontWeight: '600',
    },
});