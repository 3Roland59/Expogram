import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    platform,
    Platform,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
  import { Formik } from "formik";
import { Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { onRegister } from "../../dist/authservices/auth";
import useUploadPicture from "../../Hooks/useUploadPicture";
import MessageModal from "../Components/Shared/MessageModal";
import useResizePictures from "../../Hooks/useResizePictures";
  
  const ProfilePic = ({ navigation }) => {
    const {params} = useRoute()
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(null);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { resizeProfilePicture } = useResizePictures();

    const {uploadPicture} = useUploadPicture()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
  
    const onSignup = async (val) => {
        setLoading(true)

        if(image != ''){
          const resizedImage = await resizeProfilePicture(image);
        val.image = await uploadPicture(resizedImage, 'ProfilePicture', params.username)
      }

        try {
          const register = await onRegister(params.email, params.username, params.password, params.country, val.image, params.bio, params.link)
          setLoading(false)
          console.log(register)
        } catch (error) {
          console.log(error)
          handleDataError('Email is already taken')
        } finally {
          setLoading(false);
      } 

    };

    const handleDataError = (message) => {
      setErrorMessage(message);
      setMessageModalVisible(true);
      setTimeout(() => {
        setMessageModalVisible(false);
      }, 3500);
    };

  
    return (
      <View style={styles.container}>
        <View>
        <Formik
          initialValues={{ email: params.email,username:params.username, password: params.password, image: '' }}
          onSubmit={(values) => {
            onSignup(values);
          }}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <View>
                <View className="w-full h-[250px] items-center justify-center">

                
              {image? 
              <View className='w-[200px] h-[200px] items-center justify-center rounded-full border-4 border-white overflow-hidden'>
                  <Image source={{uri:image}} className='w-[200px] h-[200px] border-4 border-white rounded-full' resizeMode='contain' />
            </View>
              :<View className='w-[200px] h-[200px] items-center justify-center rounded-full border-4 border-white'>
                <Ionicons name="camera-outline" size={100} color={'white'} />
              </View>
            }
                </View>
                <View>
                    <Text className='font-bold text-center text-[32px] text-white'>Add profile photo</Text>
                    <Text className='mt-3 text-[18px] text-gray-400 text-center'>Add a profile photo so your friends know its you.</Text>
                </View>
              
              <TouchableOpacity onPress={pickImage} >
                <View style={styles.btnContainer}>
                  <Text style={styles.btnText}>Add a photo</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="mx-5 items-center justify-center mt-4 p-4" onPress={handleSubmit}>
        <Text className="text-center text-[16px] text-[#07f] font-bold">{loading? <ActivityIndicator size={'small'} color={'#07f'} />:(image? 'Sign Up': 'Skip to sign up')}</Text>
       </TouchableOpacity>
            </View>
          )}
        </Formik>
        </View>
        <MessageModal
          messageModalVisible={messageModalVisible}
          message={errorMessage}
          height={70}
          icon="wrong"
        />

      </View>
    );
  };
  
  export default ProfilePic;
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex:1,
      justifyContent: 'space-between',
      backgroundColor: '#000'
    },
    inputField: {
      marginTop: 14,
    //   backgroundColor: "#111",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fff",
      paddingLeft: 15,
      paddingRight: 25,
      marginHorizontal: 20,
      height: 56,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#fff",
      width: "95%",
    },
    forgotContainer: {
      alignItems: "flex-end",
      marginTop: 20,
      marginRight: 20,
    },
    forgotText: {
      color: "#1af",
      fontWeight: "700",
    },
    loginBtn: {
      backgroundColor: "#1af",
      color: "#fff",
    },
    btnContainer: {
      marginTop: 35,
      alignItems: "center",
      backgroundColor: "#07f",
      opacity:1,
      marginHorizontal: 20,
      justifyContent: "center",
      alignContent: "center",
      height: Platform.OS === "android" ? 56 : 54,
      borderRadius: 10,
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
    },
    modalContainer: {
      marginTop: 14,
      marginHorizontal: 20,
      backgroundColor: "#333",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 7,
        height: 7,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      borderRadius: 10,
      height: 56,
      paddingHorizontal: 20,
      gap: 12,
    },
    modalText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fff",
      marginBottom: Platform.OS === "android" ? 4 : 0,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: Platform.OS === "android" ? 70 : 50,
        paddingBottom: Platform.OS === "android" ? 5 : 0,
      },
      signUpText: {
        color: "#bbb",
      },
      signUpBtn: {
        color: "#1af",
        fontWeight: "700",
      },
  });