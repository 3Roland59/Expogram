import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import useUploadComment from "../../../../Hooks/useUploadComment";
import { SIZES } from "../../../../Utils/Constants";

const FooterTextInput = ({ post, currentUser }) => {
  const [value, setValue] = useState("");
  const { uploadComment, isLoading } = useUploadComment(post, currentUser);

  const handleSubmitComment = async (value) => {
    await uploadComment(value);
    setValue("");
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.divider} />
      <View className='absolute bottom-20 left-0 right-0 px-5'>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "❤️");
          }}
        >
          <Text style={styles.chatIcon1}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "🙌");
          }}
        >
          <Text style={styles.chatIcon}>🙌</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "🔥");
          }}
        >
          <Text style={styles.chatIcon}>🔥</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "👏");
          }}
        >
          <Text style={styles.chatIcon}>👏</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "😢");
          }}
        >
          <Text style={styles.chatIcon}>😢</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "😍");
          }}
        >
          <Text style={styles.chatIcon}>😍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "😮");
          }}
        >
          <Text style={styles.chatIcon}>😮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setValue(value + "😂");
          }}
        >
          <Text style={styles.chatIcon}>😂</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.writingContainer}>
        <Image
          source={{
            uri: currentUser.profile_picture,
          }}
          style={styles.profilePicture}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={`Add a comment...`}
            placeholderTextColor={"#858585"}
            style={styles.textInput}
            defaultValue={value}
            onChangeText={(text) => setValue(text)}
            autoCapitalize="sentences"
            autoCorrect={true}
            maxLength={255}
            multiline
          />
          {!isLoading ? (
            <TouchableOpacity
              onPress={() => value !== "" && handleSubmitComment(value)}
            >
              <Text style={styles.postBtn}>{value !== "" && "Post"}</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator color={'#fff'} style={styles.activityIndicator} />
          )}
        </View>
      </View>
      </View>
    </View>
  );
};

export default FooterTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#232325",
  },
  iconContainer: {
    gap: 1,
    marginLeft: -4,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center'
  },
  chatIcon: {
    fontSize: 25,
  },
  chatIcon1: {
    fontSize: 20,
    paddingTop:10
  },
  writingContainer: {
    flexDirection: "row",
    gap: 15,
  },
  profilePicture: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  inputWrapper: {
    width: SIZES.Width*0.6,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight:15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontWeight: "400",
    color: "#fff",
    maxWidth: "78%",
  },
  postBtn: {
    color: "#07f",
    fontSize: 18,
    fontWeight: "700",
    paddingRight: 12,
  },
  activityIndicator: {
    marginRight: 20,
  },
});
