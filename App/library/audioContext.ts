import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export const useAudio = () => {
    const soundRef = useRef<Audio.Sound | null>(null);

    const playAudio = async () => {
        if (soundRef.current) return; // Already playing

        const { sound } = await Audio.Sound.createAsync(
            require('../assets/audio/keepup.mp3'), // replace with your audio file path
            { shouldPlay: true, isLooping: true }
        );

        soundRef.current = sound;
        await sound.playAsync();
    };

    useEffect(() => {
        return () => {
            soundRef.current?.unloadAsync();
        };
    }, []);

    return { playAudio };
};
