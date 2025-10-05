import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

const challenges = [
  { title: "Play single event once", progress: 0, max: 1, rewardIcon: [require('../assets/images/coins.png')] },
  { title: "Draft 5 Players from India", progress: 2, max: 5, rewardIcon: [require('../assets/images/coins.png'), require('../assets/images/coins.png')] },
  { title: "Watch 5 Ads ", progress: 4, max: 5, rewardIcon: [require('../assets/images/coins.png'), require('../assets/images/coins.png'), require('../assets/images/coins.png')] },
];

export const Dailychallenges = ({ onSelectChallenge = () => { }, disabled = false }: any) => {
  return (
    <View style={{ padding: '5%', flex: 1 }}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectChallenge(item)} disabled={disabled}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "white", fontSize: 14 }}>{item.title}</Text>
              <Progress.Bar
                progress={item.progress / item.max}
                width={null}
                height={6}
                borderRadius={3}
                color="#06aed5"
              />
              <Text style={{ color: "gray", fontSize: 12 }}>
                {item.progress}/{item.max}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
