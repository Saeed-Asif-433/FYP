import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COUNTDOWN_DURATION = 31 * 3600 + 12 * 60 + 56; // 31:12:56 in seconds

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);

  useEffect(() => {
    const initializeTimer = async () => {
      const storedStartTime = await AsyncStorage.getItem("startTime");
      const currentTime = Math.floor(Date.now() / 1000);

      if (storedStartTime) {
        const elapsedTime = currentTime - parseInt(storedStartTime, 10);
        const remainingTime = COUNTDOWN_DURATION - elapsedTime;

        if (remainingTime <= 0) {
          await resetTimer(); // Reset if timer has finished
        } else {
          setTimeLeft(remainingTime);
        }
      } else {
        await AsyncStorage.setItem("startTime", currentTime.toString());
        setTimeLeft(COUNTDOWN_DURATION);
      }
    };

    initializeTimer();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resetTimer = async () => {
    const newStartTime = Math.floor(Date.now() / 1000);
    await AsyncStorage.setItem("startTime", newStartTime.toString());
    setTimeLeft(COUNTDOWN_DURATION);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.eventText}>DRAFT</Text>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderBottomWidth: 2,
    backgroundColor: "#06aed5",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  timerContainer: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: '2%',
    borderBottomStartRadius:25,
    right:0
  },
  eventText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign:'center'
  },
  timerText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    
  },
});

export default CountdownTimer;
