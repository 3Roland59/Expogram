import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    platform,
    Platform,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import MessageModal from "../Components/Shared/MessageModal";
import { Image } from "react-native";
import { getLocales } from "expo-localization";
import { Divider } from "react-native-elements";
import useIsEmail from '../../Utils/useIsEmail'
import { ScrollView } from "react-native";
  
  const Signup = ({ navigation }) => {
    const [obsecureText, setObsecureText] = useState(true);
    const [emailOnFocus, setEmailOnFocus] = useState(false);
    const [usernameOnFocus, setUsernameOnFocus] = useState(false);
    const [emailToValidate, SetEmailToValidate] = useState(false);
    const [usernameToValidate, SetUsernameToValidate] = useState(false);
    const [passwordToValidate, SetPasswordToValidate] = useState(false);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [country, setCountry] = useState(null);

    const {isEmail} = useIsEmail()

    useEffect(() => {
        const locales = getLocales();
        setCountry(locales[0].regionCode);
    
      }, []);
    
  
    const handleDataError = (message) => {
      setErrorMessage(message);
      setMessageModalVisible(true);
      setTimeout(() => {
        setMessageModalVisible(false);
      }, 3500);
    };
  
    const LoginFormSchema = Yup.object().shape({
      email: Yup.string()
        .required()
        .min(6, "A valid email address is required"),
      email: Yup.string()
        .required()
        .min(3, "Username too short"),
      password: Yup.string()
        .required()
        .min(6, "Your password has to have at least 8 characters"),
    });
  
    const onSignup = (email,username, password) => {
      Keyboard.dismiss();
      isEmail(email)?(navigation.navigate('Additional', {
        email,username,password, country
      })):handleDataError('Invalid email');
      console.log(email,username, password, country)
    };
  
    return (
      <View style={styles.container}>
        <ScrollView className='flex-1'>
      <View className="w-full h-[180px] items-center justify-end">
            {/* <Image source={require('../../assets/splash.gif')} className="w-[150px] h-[150px] " resizeMode='contain' /> */}
            <Image source={require('../../assets/images/header.jpeg')} className="w-[250px] h-[130px] " resizeMode='contain' />
            </View>
        <Formik
          initialValues={{ email: "", password: "", username: '' }}
          onSubmit={(values) => {
            onSignup(values.email,values.username, values.password);
          }}
          validationSchema={LoginFormSchema}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <View>
              <View
                style={[
                  styles.inputField,
                  {
                    paddingVertical: 16,
                    borderColor:
                      emailToValidate && values.email.length < 5
                        ? "#f00"
                        : "#fff",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholderTextColor={"#bbb"}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputMode="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    handleBlur("email");
                    setEmailOnFocus(false);
                    values.email.length > 0
                      ? SetEmailToValidate(true)
                      : SetEmailToValidate(false);
                  }}
                  onFocus={() => setEmailOnFocus(true)}
                  value={values.email}
                />
                <TouchableOpacity onPress={() => handleChange("email")("")}>
                  <Octicons
                    name={emailOnFocus ? "x-circle-fill" : ""}
                    size={15}
                    color={"#fff"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputField,
                  {
                    paddingVertical: 16,
                    borderColor:
                      usernameToValidate && values.username.length < 3
                        ? "#f00"
                        : "#fff",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholderTextColor={"#bbb"}
                  placeholder="Username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={handleChange("username")}
                  onBlur={() => {
                    handleBlur("username");
                    setUsernameOnFocus(false);
                    values.email.length > 0
                      ? SetUsernameToValidate(true)
                      : SetUsernameToValidate(false);
                  }}
                  onFocus={() => setUsernameOnFocus(true)}
                  value={values.username}
                />
                <TouchableOpacity onPress={() => handleChange("username")("")}>
                  <Octicons
                    name={usernameOnFocus ? "x-circle-fill" : ""}
                    size={15}
                    color={"#fff"}
                  />
                </TouchableOpacity>
              </View>
  
              <View
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      passwordToValidate && values.password.length < 6
                        ? "#f00"
                        : "#fff",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholderTextColor={"#bbb"}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={obsecureText}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={() => {
                    handleBlur("password");
                    values.password.length > 0
                      ? SetPasswordToValidate(true)
                      : SetPasswordToValidate(false);
                  }}
                  value={values.password}
                />
                <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
                  <MaterialCommunityIcons
                    name={obsecureText ? "eye-off" : "eye"}
                    size={24}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                <View style={styles.btnContainer(isValid)}>
                  <Text style={styles.btnText}>Proceed</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
              <View className="flex w-full flex-row items-center justify-center gap-1 py-10">
        <View className="w-1/3">
        <View className="border-t my-1 border-gray-400"></View>
        </View>
        <Text className="text-gray-400 px-3 font-bold text-[16px]">OR</Text>
        <View className="w-1/3">
        <View className="border-t my-1 border-gray-400"></View>
        </View>
       </View>
       <TouchableOpacity className="flex flex-row gap-3 mx-5 items-center justify-center border-2 border-gray-400 p-4 pt-[4px] rounded-xl">
        <Image source={require('../../assets/images/google.png')} className="w-[30px] h-[30px]" />
        <Text className="text-center text-[18px] text-white font-bold">Continue with Google</Text>
       </TouchableOpacity>
        </ScrollView>
  
        <MessageModal
          messageModalVisible={messageModalVisible}
          message={errorMessage}
          height={70}
          icon="wrong"
        />
        <View className=''>
      <Divider width={0.5}/>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpBtn}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
      </View>
    );
  };
  
  export default Signup;
  
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
    btnContainer: (isValid) => ({
      marginTop: 35,
      alignItems: "center",
      backgroundColor: "#07f",
      opacity: isValid ? 1 : 0.6,
      marginHorizontal: 20,
      justifyContent: "center",
      alignContent: "center",
      height: Platform.OS === "android" ? 56 : 54,
      borderRadius: 10,
    }),
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