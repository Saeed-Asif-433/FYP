import { supabase } from "@/library/supabase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup({ log }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [loading, setLoading] = useState(false)
    const [secure, setsecure] = useState(true)

    async function signUpWithEmail() {
        if (!email?.trim() || !password?.trim()) {
            Alert.alert("Error", "Please enter all the details.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert("Error", error.message);
            setLoading(false);
            return; // Stop further execution if there's an error
        } else {
            Alert.alert("Success", "Please Sign In to Continue!");
        }

        const user = data.user;
        if (user) {
            const { error: profileError } = await supabase
                .from('Profile')
                .insert([{
                    id: user.id,

                    first_name: firstname,
                    last_name: lastname
                }]);

            if (profileError) {
                console.log("Profile insert error:", profileError.message);
            } else {
                console.log("User profile created successfully!");
            }





        }

        setLoading(false);
    }
    return (
        <View style={styles.container}>
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
                    // style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry={secure}
                    value={password}
                    onChangeText={setPassword}

                />
                <AntDesign name="eye" size={20} color="white" style={{ alignSelf: 'center', position: 'absolute', right: 10 }}
                    onPress={() => setsecure(!secure)} />
            </View>
            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                <TextInput
                    style={styles.nameinput}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={firstname}
                    onChangeText={setfirstname}
                    maxLength={12}
                />
                <TextInput
                    style={styles.nameinput}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={lastname}
                    onChangeText={setlastname}
                    maxLength={12}
                />
            </View>


            <TouchableOpacity style={styles.button} onPress={signUpWithEmail}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 2, justifyContent: 'center', marginTop: 5 }}>
                <Text style={{ color: 'rgba(255,255,255,0.7)', }}>Already have an account?</Text>
                <Pressable onPress={log} >
                    <Text style={styles.highlight}>SIGN IN</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 50,

    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#00FFAA',
        letterSpacing: 1,
        marginBottom: 10,
    },
    underline: {
        width: 80,
        height: 3,
        backgroundColor: '#00FFAA',
        borderRadius: 3,
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
    nameinput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 170, 0.3)',
        textAlign: 'center',
        width: 150,     // Or a fixed value like 300
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