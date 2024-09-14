import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const RenderSelfProfile = ({currentUser}) => {
  return (
    <View style={styles.container}>
      {currentUser?.profile_picture?<Image
            source={{uri: currentUser?.profile_picture}}
            style={styles.image}
          />:
      <Image source={require('../../../assets/images/profile_thumbnail.png')} style={styles.image} />}
      <Text style={styles.username}>You</Text>
      <Text style={styles.name}>Personal messages - Expogram</Text>
      <View
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>Notes or personal messages you dont want to forget</Text>
      </View>
    </View>
  );
};

export default RenderSelfProfile;

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
