import firebase from "firebase/compat";
import { useState } from "react";

const useHandleCommentDelete = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentDelete = async (targetIndex, allComments, email, postId) => {
        setIsLoading(true);
        try {
            let updatedValues = allComments;
            
            updatedValues.splice(targetIndex, 1);

            const snapshot = await firebase
            .firestore()
            .collection("users")
            .doc(email)
            .collection("Post")
            .doc(postId)
            .update({
                comments: updatedValues,
            });
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            setIsLoading(false)
        }
    };

    return { handleCommentDelete, isLoading }
}

export default useHandleCommentDelete