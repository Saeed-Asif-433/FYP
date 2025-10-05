import { View, Text } from "react-native";

export default function Coinbar() {
    return (

        <View style={{ flex: 1, backgroundColor: '#1b1f2a', marginRight: '1%', marginLeft: '1%', }}>
            <View style={{ flex: 1, }}>
                <View style={{ alignSelf: 'center', borderBottomWidth: 3.5, borderColor: '#c6121f', marginTop: '1%', marginLeft: '1%' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 2 }}>PREMIUM</Text>
                </View>
            </View>
            <View style={{ flex: 7, }}>

            </View>
            <View style={{ flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>RS 500</Text>
            </View>

        </View>

    )
}