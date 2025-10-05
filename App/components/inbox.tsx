import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Inbox({ visible, onClose }: { visible: boolean; onClose: () => void }) {


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '100%', zIndex: 50 }}>
            <View style={{ backgroundColor: '#2d2d2d', borderRadius: 10, padding: 20, marginVertical: '5%', width: '50%' }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>INBOX</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Notifications Section */}
                    <Divider title="NOTIFICATIONS" />
                    <RewardSection title="Star Pass Reward" subtitle="Reward Available!" />
                    <RewardSection title="Daily Login Bonus" subtitle="Reward Available!" />

                    {/* Requests Section */}
                    <Divider title="REQUESTS" />
                    <Section title="Friend Request" subtitle="JohnDoe wants to add you" icon="person-add" />
                    <Section title="Team Invitation" subtitle="Join Team Galaxy!" icon="people" />

                </ScrollView>

            </View>
        </View>
    );
}

// REWARD section with Collect button
function RewardSection({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
                <Text style={{ color: 'gray', fontSize: 12 }}>{subtitle}</Text>
            </View>
            <TouchableOpacity style={{
                backgroundColor: 'green',
                // borderColor: 'green',
                // borderWidth: 2,
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 20,
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>COLLECT</Text>
            </TouchableOpacity>
        </View>
    );
}

// Normal section for friend requests
function Section({ title, subtitle, icon }: { title: string; subtitle: string; icon: any }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
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
        </View>
    );
}

// Divider function
function Divider({ title }: { title: string }) {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }}>
            <Text style={{ color: 'gray', fontSize: 12, marginTop: 5 }}>{title}</Text>
        </View>
    );
}

