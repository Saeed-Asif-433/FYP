import React, { useState, useEffect, useRef } from "react";
import { View,  Dimensions, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import Dots from "react-native-dots-pagination";
import { Image } from 'expo-image';

const images = [
  require("../assets/images/bottom.png"),
  require("../assets/images/ilt20.jpg"),
  require("../assets/images/cpl.jpg"),
];

const { width, height } = Dimensions.get("window");

const ImageSlider = () => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => {
        const nextPage = (prev + 1) % images.length;
        pagerRef.current?.setPage(nextPage);
        return nextPage;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.page}>
            <Image source={image} style={styles.image} contentFit='fill'  />
          </View>
        ))}
      </PagerView>

      {/* Dots Indicator - Positioned at Top Right */}
      <View style={styles.dotsContainer}>
        <Dots length={images.length} active={page} activeColor="#fff" alignDotsOnXAxis={true}  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: height * 0.3, // Adjust height as needed
  },
  pager: {
    flex: 1,
    width: "100%",
    height: "100%", 
  },
  page: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotsContainer: {
    position: "absolute",
    right: '1%', // Align to the right
    },
});

export default ImageSlider;




