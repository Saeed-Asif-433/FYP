import { useUser } from "@/library/usercontext";
import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";
export default function ProfilePreview({ onPress }: any) {
    const { user } = useUser();
    return (
        <TouchableOpacity style={{ flexDirection: 'row', width: 150, height: 25, backgroundColor: '#1b1f2a', alignItems: 'center', justifyContent: 'center', }}
            onPress={onPress}>


            {/* <View style={{ width: 150, height: 25, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}> */}
            {/* <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{user[0]?.last_name}</Text>
            <Image source={require('../assets/images/profile.png')} style={{ width: 50, height: 25, }} contentFit='contain' /> */}

            {/* </View> */}


            <Text style={{ color: 'white', fontWeight: 'bold' }}>{user[0]?.first_name}{user[0]?.last_name}</Text>

            <Image source={{ uri: user[0].image }} style={{ width: 50, height: 25, position: 'absolute', right: -30 }} contentFit='contain' />

        </TouchableOpacity>
    )
}