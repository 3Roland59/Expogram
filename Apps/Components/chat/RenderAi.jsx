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
  
  const RenderAi = ({ navigation, handleCamera }) => {
   
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatingAi");
          }}
          style={styles.rowContainer}
        >
            <Image
            source={require('../../../assets/images/bot.jpg')}
            style={styles.image}
          />
            <View style={styles.userContainer}>
              <Text style={styles.username}>Expogram chatbot</Text>
              <Text style={styles.status}>Bot</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera}>
          <Feather name="camera" size={22} color={"#fff"} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };
  
  export default RenderAi;
  
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
  