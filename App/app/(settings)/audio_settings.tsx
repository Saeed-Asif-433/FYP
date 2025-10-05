import { View, Text, TouchableOpacity } from 'react-native';
import { useMusic } from '@/library/MusicContext';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function AudioSettings() {
    const { getVolume, setMusicVolume } = useMusic();
    const [sliderVolume, setSliderVolume] = useState(getVolume());

    useEffect(() => {
        setSliderVolume(getVolume()); // sync on open
    }, []);

    return (
        <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>Volume</Text>
            <View>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>AUDIO SETTINGS</Text>
                <Text style={{ color: 'gray', fontSize: 12 }}>Music Volume</Text>
            </View>

            <Slider
                value={sliderVolume}
                // onValueChange={value => setSliderVolume(value)} // just update local UI
                onSlidingComplete={value => setMusicVolume(value)} // apply when done sliding
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                style={{ width: 200, }}
                minimumTrackTintColor="#1e90ff"
                maximumTrackTintColor="#555"
                thumbTintColor="#1e90ff"
            />

            {/* <TouchableOpacity >
                    <Text style={{ color: 'skyblue', marginTop: 20 }}>Close</Text>
                </TouchableOpacity> */}
        </View>

    );
}



