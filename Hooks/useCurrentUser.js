import firebase from "firebase/compat";
import { useEffect, useState } from "react";
import { getUserDetails2 } from "../dist/models/fetch";
import { getAuth } from "firebase/auth";
import { ToastAndroid } from "react-native";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const user = getAuth().currentUser

    const fetchData = async() =>{
        try {
            setIsLoading(true)
            // const userDetails = await getUserDetails2(user.email)
            // setCurrentUser(userDetails)

            if (user) {
                const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .doc(user.email)
                    .onSnapshot(snapshot => {
                      setCurrentUser(snapshot.data())
                    });

                return () => unsubscribe;
                } 
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            } 
        }

        const refetch = () => {
            setIsLoading(true)
            // ToastAndroid.show("Refreshing", ToastAndroid.SHORT)
            fetchData();
        }

        useEffect(() => {
            fetchData();
          }, [])

    return {
        currentUser, refetch
    };
};