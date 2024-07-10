import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image,
  } from "react-native";
  import React from "react";
  import { Feather } from "@expo/vector-icons";
  
  const RenderSelf = ({ navigation, handleCamera, currentUser }) => {
   
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatingSelf");
          }}
          style={styles.rowContainer}
        >
          {currentUser.profile_picture?<Image
            source={{uri: currentUser.profile_picture}}
            style={styles.image}
          />:
      <Image source={require('../../../assets/images/profile_thumbnail.png')} style={styles.image} />}
            <View style={styles.userContainer}>
              <Text style={styles.username}>You</Text>
              <Text style={styles.status}>Personal messages</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera}>
          <Feather name="camera" size={22} color={"#fff"} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default RenderSelf;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 15,
      marginTop: Platform.OS === "android" ? 15 : 8,
    },
    rowContainer: {
      flex: 1,
      flexDirection: "row",
    },
    image: {
      height: 60,
      width: 60,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: "#000",
    },
    userContainer: {
      justifyContent: "center",
      marginLeft: 10,
    },
    username: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
    },
    status: {
      color: "#999",
      fontSize: 14,
      fontWeight: "400",
    },
    icon: {
      marginRight: 10,
    },
  });
  
