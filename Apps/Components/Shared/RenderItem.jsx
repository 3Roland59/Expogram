import { StyleSheet, TouchableOpacity, View, Platform, Image } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { SIZES } from "../../../Utils/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RenderItem = ({ navigation, item }) => {
  return (
    <View>
      {item?.imageUrl[0] && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { item: item })}
          style={styles.imagesContainer}
          key={item.id}
        >
          {
      item.imageUrl.length > 1 &&(<View className='absolute top-2 right-2 z-50'>
      <MaterialCommunityIcons name='card-multiple' size={24} color={'#fff'} />
      </View>)
    }
          {Platform.OS === "ios" && (
            <Animated.Image
              sharedTransitionTag={item.id.toString()}
              style={styles.images}
              source={{ uri: item.imageUrl[0] }}
            />
          )}
          <Image
            source={{ uri: item.imageUrl[0] }}
            style={styles.fastImages}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  imagesContainer: {
    width: SIZES.Width * 0.33,
    height: SIZES.Width * 0.33,
    borderWidth:1
  },
  images: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    zIndex: -1,
  },
  fastImages: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
});
