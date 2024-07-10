import firebase from 'firebase/compat';
import { useUserContext } from "../Context/UserContext";

const useChatAddUser = () => {
    const { currentUser } = useUserContext();

    const chatAddUser = async (user) => {

        const newUser = {
            email: user.email,
            username: user.username,
            name: user.username,
            profile_picture: user.profile_picture,
            status: "seen"
        }

        firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .collection("chat")
            .doc(user.email)
            .set(newUser);
    }

  return {
    chatAddUser
  }
}

export default useChatAddUser