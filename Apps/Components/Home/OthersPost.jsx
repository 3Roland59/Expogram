import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

export default function OthersPost({ image, name}) {
  return (
    <View style={styles.itemContainer}>
        <TouchableOpacity>
      <LinearGradient start={[0.9, 0.45]}  end={[0.07, 1.03]}
        start={[0.9, 0.45]}
        end={[0.07, 1.03]}
        colors={["yellow", "green", "blue"]}
        style={styles.unseenRainbowBorder}
      >
            <Image source={image} style={styles.imageWithStory} />
      </LinearGradient>
        </TouchableOpacity>
      <Text numberOfLines={1} className="text-center text-white mt-[3px] text-[12px] px-[4px]">
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
      width: 90,
      alignItems: "center",
    },
    seenUser: {
      marginTop: 4,
      fontSize: 12,
      color: "#bbb",
      textAlign: "center",
    },
    imageWithStory: {
      height: 72,
      width: 72,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: "#000",
    },
    unseenRainbowBorder: {
      height: 77,
      width: 77,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
    },
    addBtn: {
      backgroundColor: "#18d",
      height: 30,
      width: 30,
      borderRadius: 100,
      borderWidth: 3.5,
      borderColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      position: "absolute",
      left: 54,
      top: 54,
    },
  });