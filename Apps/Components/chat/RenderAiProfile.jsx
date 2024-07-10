import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const RenderAiProfile = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/bot.jpg')} style={styles.image} />
      <Text style={styles.username}>Expogram chatbot</Text>
      <Text style={styles.name}>Bot - Expogram</Text>
      <View
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>Explore our friendly chatbot</Text>
      </View>
    </View>
  );
};

export default RenderAiProfile;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  username: {
    marginTop: 14,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  name: {
    marginTop: 2,
    color: "#ccc",
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
  },
});
