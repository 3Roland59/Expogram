import firebase from "firebase/compat";
import { useUserContext } from "../Context/UserContext";

const useHandleFollow = () => {
    const { currentUser } = useUserContext();

    const handleFollow = async (userEmail) => {
        try {
            const batch = firebase.firestore().batch();
            await firebase
                .firestore()
                .collection("users")
                .doc(userEmail)
                .update({
                  followersRequset: !currentUser.followingRequest.includes(userEmail)
                    ? firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                    : firebase.firestore.FieldValue.arrayRemove(currentUser.email),
                });
            await firebase
                .firestore()
                .collection("users")
                .doc(currentUser.email)
                .update({
                  followingRequest: !currentUser.followingRequest.includes(userEmail)
                    ? firebase.firestore.FieldValue.arrayUnion(userEmail)
                    : firebase.firestore.FieldValue.arrayRemove(userEmail),
                });
                await batch.commit();
                console.log("yay");
        } catch (error) {
            console.log(error);
        }
    };

    return {
        handleFollow
    };
}

export default useHandleFollow;