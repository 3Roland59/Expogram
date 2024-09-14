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
  
  const RenderAi = ({ navigation }) => {
   
    return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatingAi");
          }}
        >
            <Image
            source={require('../../../assets/images/bot.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
    );
  };
  
  export default RenderAi;
  
  const styles = StyleSheet.create({
    image: {
      height: 62,
      width: 62,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#82f",
    },
  });
  