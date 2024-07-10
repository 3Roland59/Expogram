import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import useUploadPost from "../../Hooks/useUploadPost";
import {SIZES} from "../../Utils/Constants";
import { Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import MessageModal, {
  handleFeatureNotImplemented,
} from "../Components/Shared/MessageModal";
import { ScrollView } from "react-native-gesture-handler";

const NewPost = ({ navigation, route }) => {
  const { selectedImage } = route.params || {};
  const { currentUser } = useUserContext();
  const { UploadPost, loader } = useUploadPost();
  const [caption, setCaption] = useState("");
  const [hashtag, setHashtag] = useState([]);
  const [focusedBar, setFocusedBar] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(selectedImage)

  const handleFocus = () => {
    setFocusedBar(true);
  };
  const handleBlur = () => {
    Keyboard.dismiss();
    setFocusedBar(false);
  };

  const handleNextButton = async () => {
    setLoading(true)
    try {
      // let resizedImage =[]
      // for(let i = 0;i<selectedImage.length; i++){
      //   let done = await resizePostPicture(selectedImage[i])
      //   resizedImage = [...resizedImage, done]
      // }
      const result = await UploadPost(selectedImage, caption,currentUser, hashtag);
      console.log('res:',result)
      navigation.navigate("Main Screen");
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={23} color={"#fff"} />
        </TouchableOpacity>
        <Text style={styles.headerText} >New Post</Text>

        <TouchableOpacity
          onPress={() => (focusedBar ? handleBlur() : null)}
        >
          <Text style={styles.nextButton}>
            {loading ? <ActivityIndicator color={'#fff'} /> : focusedBar ? "OK" : ""}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => handleBlur()}>
        <ScrollView className='mb-20'>
          <View className='justify-center items-center'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                selectedImage.map((item, index)=>
            <Image
            key={index}
              source={{
                uri: item,
              }}
              className='w-[250px] h-[250px] rounded-lg ml-2'
            />)
}
            </ScrollView>
            </View>
            <View className='m-2 '>
              <TextInput
                value={caption}
                onChangeText={(caption) => setCaption(caption)}
                placeholder="Write a caption..."
                placeholderTextColor={"#999"}
                style={styles.captionText}
                multiline={true}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                maxLength={2200}
                autoCorrect={true}
                autoFocus={true}
                textAlignVertical="center"
              />
          </View>
          <Divider width={0.3} color="#333" />
            <View className='m-2 '>
              <TextInput
                value={hashtag}
                onChangeText={(hashtag) => setHashtag(hashtag.split(' '))}
                placeholder="Add a hashtag..."
                placeholderTextColor={"#999"}
                style={styles.captionText}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                maxLength={2200}
                autoCorrect={true}
                textAlignVertical="center"
              />
          </View>
          <Divider width={0.3} color="#333" />
          <ScrollView className='px-5 py-3 ' horizontal showsHorizontalScrollIndicator={false}>
            <Text className='p-2 bg-[#333] text-white w-[90px] text-center rounded-lg mr-2'># Hashtags</Text>
            {
              hashtag.map((item, index)=>(
                <View key={index} className='p-2 bg-[#333] text-white rounded-lg' style={{marginRight: (index==hashtag.length -1)?30:10}}>
                  <Text className='text-white'>{item}</Text>
                  </View>
              ))
            }
          </ScrollView>

          {/* <View style={styles.secondContainer}>
            <Divider width={0.4} color="#333" />

            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.optionsContainer}
            >
              <Text style={styles.optionText}>Tag people</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={26}
                color={"#999"}
                style={styles.optionIcon}
              />
            </TouchableOpacity>

            <Divider width={0.3} color="#333" />
            <TouchableOpacity
              onPress={() =>
                handleFeatureNotImplemented(setMessageModalVisible)
              }
              style={styles.optionsContainer}
              >
              <Text style={styles.optionText}>Advanced settings-sharp</Text>
              <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color={"#999"}
              style={styles.optionIcon}
              />
              </TouchableOpacity>
            </View> */}
        </ScrollView>
      </TouchableWithoutFeedback>
      </View>
            <View className=' m-3'>
            <Divider width={1} color="#333" />
            <TouchableOpacity onPress={handleNextButton} className='bg-white rounded-lg p-3 mt-3'>
              <Text className='text-black text-[16px] font-bold text-center'>Post</Text>
            </TouchableOpacity>
            </View>
      <MessageModal
        messageModalVisible={messageModalVisible}
        message={"This feature is not yet implemented."}
      />
    </SafeAreaView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: 'space-between'
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    height: 70,
  },
  iconCorrection: {
    marginLeft: -10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
  nextButton: {
    color: "#08f",
    fontWeight: "800",
    fontSize: 16,
  },
  nullButton: {
    color: "#000",
    fontWeight: "700",
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? 15 : 12,
    marginHorizontal: 15,
    marginBottom: 14,
  },
  captionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  captionText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal:20,
    paddingTop:20
  },
  secondContainer: {
    minHeight: 500,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
