import { useState } from 'react'
import firebase from "firebase/compat";

const useEditPostCaption = ({navigation, post}) => {
    const [loading, setLoading] = useState(false);

    const editPostCaption = (value) => {
        setLoading(true);
        try {
        const res = firebase
            .firestore()
            .collection("users")
            .doc(post.email)
            .collection("Post")
            .doc(post.id)
            .update({
            caption: value,
            });
            return ()=>res()
        } catch (error) {
            console.log(error)
        } finally {
        setLoading(false);
        navigation.goBack();
        }
    };

    return { editPostCaption, loading };
}

export default useEditPostCaption