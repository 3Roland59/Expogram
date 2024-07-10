import { useState } from 'react';
import firebase from 'firebase/compat';

const useSavePost = () => {
    const [isLoading, setIsLoading] = useState(false)

    const savePost = async (post, currentUser) => {
        if (!isLoading) {
            setIsLoading(true)
            try {
                if (currentUser.saved_posts.includes(post.created_at.seconds)) {

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayRemove(post.created_at.seconds),
                        });

                } else {

                    await firebase
                        .firestore()
                        .collection("users")
                        .doc(currentUser.email)
                        .update({
                            saved_posts: firebase.firestore.FieldValue.arrayUnion(post.created_at.seconds),
                        });

                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
    }

    return { savePost }

}

export default useSavePost
