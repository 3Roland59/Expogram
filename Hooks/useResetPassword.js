import { useState } from 'react'
import { Alert } from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from '@react-navigation/native';


const useResetPassword = () => {
    const navigation = useNavigation()
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const resetPassword = async () => {
        try {
            setLoading(true)
        await firebase.auth().sendPasswordResetEmail(value);
        Alert.alert(
            "Password Recovery Email Sent",
            "Please check your email for instructions on how to reset your password."
        );
        setLoading(false)
        navigation.navigate("Login");
        } catch (error) {
        if (error.code === "auth/user-not-found") {
            Alert.alert(
            "Email Not Found",
            "There is no email record corresponding to this identifier."
            );
        } else {
            console.log(error);
            Alert.alert("Error", "An error occurred. Please try again later.");
        }
        }
    };

    return {
        value,
        setValue,
        resetPassword,
        loading
    }
}

export default useResetPassword