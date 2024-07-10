import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Entypo } from "@expo/vector-icons";

export default function UserPost({image, navigation}) {
  return (
    <View className="pr-2">
          <View>
            {image?<Image
            source={{uri: image}}
            style={styles.image}
            className=""
          />
             : <Image
             source={require('../../../assets/images/profile_thumbnail.png')}
             style={styles.image}
             className=""
           />}
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => {
                navigation.navigate("MediaLibrary", {
                  initialSelectedType: "Add to story",
                })}}>
            <Entypo name="plus" size={18} color="#000" />
          </TouchableOpacity>

          <Text className="text-center text-white text-[12px]">
            Your story
          </Text>
        </View>
  )
}

const styles = StyleSheet.create({
    image: {
      height: 70,
      width: 70,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#444",
      marginBottom: 7,
    },
    addBtn: {
      backgroundColor: "#fff",
      height: 30,
      width: 30,
      borderRadius: 100,
      borderWidth: 3.5,
      borderColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      position: "absolute",
      left: 43,
      top: 43,
    },
  });