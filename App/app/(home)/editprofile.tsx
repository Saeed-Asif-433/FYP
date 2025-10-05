import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native";

export default function EditProfile({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 50 }}>
            <View style={{ backgroundColor: '#2d2d2d', borderRadius: 10, padding: 20, marginVertical: '5%', width: 400, height: 300, flexDirection: 'row' }}>
                <TouchableOpacity onPress={onClose} style={{ position: 'absolute' }}>
                    <Ionicons name='close' size={24} color="white" />
                </TouchableOpacity>




            </View>
        </View>
    )
}