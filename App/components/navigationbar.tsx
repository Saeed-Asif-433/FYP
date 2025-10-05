import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const tabs: any = [
  { label: 'HOME', route: '/home' },
  { label: 'ONLINE', route: '/online' },
  { label: 'FANTASY', route: '/fantasy' },
  { label: 'LEARN', route: '/learn' },
];

const NavigationBar = () => {
  const pathname = usePathname(); // Get current path

  return (
    <View style={styles.container}>
      {tabs.map((tab: any) => {
        const isActive = pathname === tab.route || (pathname === '/' && tab.route === '/home');

        return (
          <TouchableOpacity
            key={tab.label}
            onPress={() => router.push(tab.route)}
            style={styles.tab}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center",
    paddingVertical: 0,
    // backgroundColor: '#0a2542',

  },
  tab: {
    alignItems: "center",
    paddingVertical: 5,
    zIndex: 10


  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
  },
  activeText: {
    color: "#fff", // White color for active tab
  },
  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "#c6121f", // Red underline
    marginTop: 4,
  },
});

export default NavigationBar;
