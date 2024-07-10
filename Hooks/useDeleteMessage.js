import firebase from "firebase/compat";
import { db } from "../dist/firebaseconfig/firebase";
import { useUserContext } from "../Context/UserContext";

const useDeleteMessage = () => {
    const { currentUser } = useUserContext();

    const deleteMessage = async (val, user) => {
        try {
            // Reference to the message in current user's chat
            const userMessagesRef = db
                .collection('users')
                .doc(currentUser.email)
                .collection('chat')
                .doc(user.email)
                .collection('messages')
                .where("timestamp", "==", val.timestamp);

            // Get the query snapshot
            const userMessagesSnapshot = await userMessagesRef.get();

            // Create a batch to delete the documents
            const batch = db.batch();

            userMessagesSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            // Reference to the message in the other user's chat
            if (user) {
                const otherUserMessagesRef = db
                    .collection('users')
                    .doc(user.email)
                    .collection('chat')
                    .doc(currentUser.email)
                    .collection('messages')
                    .where("timestamp", "==", val.timestamp);

                // Get the query snapshot
                const otherUserMessagesSnapshot = await otherUserMessagesRef.get();

                otherUserMessagesSnapshot.forEach(doc => {
                    batch.delete(doc.ref);
                });
            }

            // Commit the batch
            await batch.commit();
            console.log("Messages deleted successfully");
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };
    const deleteAiMessage = async (val) => {
        try {
            // Reference to the message in current user's chat
            const userMessagesRef = db
                .collection('users')
                .doc(currentUser.email)
                .collection('Aichat')
                .where("timestamp", "==", val.timestamp);

            // Get the query snapshot
            const userMessagesSnapshot = await userMessagesRef.get();

            // Create a batch to delete the documents
            const batch = db.batch();

            userMessagesSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            // Commit the batch
            await batch.commit();
            console.log("Messages deleted successfully");
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };
    const deleteSelfMessage = async (val) => {
        try {
            // Reference to the message in current user's chat
            const userMessagesRef = db
                .collection('users')
                .doc(currentUser.email)
                .collection('PersonalMessage')
                .where("timestamp", "==", val.timestamp);

            // Get the query snapshot
            const userMessagesSnapshot = await userMessagesRef.get();

            // Create a batch to delete the documents
            const batch = db.batch();

            userMessagesSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            
            // Commit the batch
            await batch.commit();
            console.log("Messages deleted successfully");
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    return {
        deleteMessage,
        deleteAiMessage,
        deleteSelfMessage
    };
};

export default useDeleteMessage;
