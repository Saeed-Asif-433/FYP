import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AudioSettings from './audio_settings';


export default function SettingsMain({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [screen, setScreen] = useState<'main' | 'audio'>('main');

  const goBack = () => setScreen('main');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 50 }}>
      <View style={{ backgroundColor: '#2d2d2d', borderRadius: 10, padding: 20, marginVertical: '5%', width: 400, height: 300 }}>

        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{screen === 'main' ? 'SETTINGS' : 'AUDIO'}</Text>
          <TouchableOpacity onPress={screen === 'main' ? onClose : goBack}>
            <Ionicons name='close' size={24} color="white" />
          </TouchableOpacity>
        </View>

        {screen === 'main' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section title="LINK ACCOUNTS" subtitle="Link to personal accounts" icon="gift" onPress={undefined} />
            <Section title="UID" subtitle="967062356846854146" icon="copy-outline" onPress={undefined} />

            <Divider title="CUSTOMISATION" />
            <Section title="GAMEPLAY" subtitle="Adjust gameplay preferences" icon="create" onPress={undefined} />
            <Section title="GRAPHICS" subtitle="Adjust graphics level of detail" icon="create" onPress={undefined} />
            <Section title="AUDIO" subtitle="Adjust in-game volume" icon="create" onPress={() => setScreen('audio')} />
            <Section title="COMMENTARY & SFX" subtitle="Download Commentary & SFX" icon="create" onPress={undefined} />
            <Section title="LANGUAGE" subtitle="Select menu language" icon="create" onPress={undefined} />
            <Section title="UNITS" subtitle="Change between SI and US units" icon="create" onPress={undefined} />

            <Divider title="HELP & FEEDBACK" />
            <Section title="HELP MANUAL" subtitle="Learn everything about the game" icon="arrow-forward" onPress={undefined} />
            <Section title="CUSTOMER SERVICE" subtitle="Visit Customer Service Website" icon="arrow-forward" onPress={undefined} />
          </ScrollView>
        ) : (
          <AudioSettings />
        )}

      </View>
    </View>
  );
}


function Section({ title, subtitle, icon, onPress }: { title: string; subtitle: string; icon: any, onPress: any }) {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }} onPress={onPress}>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}> */}
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ color: 'gray', fontSize: 12 }}>{subtitle}</Text>
      </View>
      <View style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Ionicons name={icon} size={18} color="white" />
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
}

function Divider({ title }: { title: string }) {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }}>
      <Text style={{ color: 'gray', fontSize: 12, marginTop: 5 }}>{title}</Text>
    </View>
  );
}
