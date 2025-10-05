import { Audio } from 'expo-av';
import { createContext, useContext, useEffect, useRef } from 'react';

const MusicContext = createContext<any>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const soundRef = useRef<Audio.Sound | null>(null);
    const volumeRef = useRef(1); // use ref instead of useState

    const playMusic = async () => {
        if (soundRef.current) return;

        const { sound } = await Audio.Sound.createAsync(require('../assets/audio/notlikeus.mp3'), {
            shouldPlay: true,
            isLooping: true,
            volume: volumeRef.current,
        });

        soundRef.current = sound;
        await sound.playAsync();
    };

    const stopMusic = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }
    };

    const setMusicVolume = async (value: number) => {
        volumeRef.current = value;
        if (soundRef.current) {
            await soundRef.current.setVolumeAsync(value);
        }
    };

    const getVolume = () => volumeRef.current;

    useEffect(() => {
        playMusic();
        return () => { stopMusic(); }
    }, []);

    return (
        <MusicContext.Provider value={{ playMusic, stopMusic, setMusicVolume, getVolume }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) throw new Error('useMusic must be used within MusicProvider');
    return context;
};
