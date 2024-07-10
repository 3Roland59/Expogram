import { useState } from 'react'
import firebase from 'firebase/compat';
import useChatAddUser from "./useChatAddUser";

const useChatSendMessage = ({user, currentUser}) => {
    const { chatAddUser } = useChatAddUser();
    const [loading, setLoading] = useState(false);
    const [textMessage, setTextMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState('');
  
  
    const chatSendMessage = async (imageUrl,call,audioUrl) => {
        if (!loading) {
        setLoading(true);
        try {
            if (user.status === undefined) {
                await chatAddUser(user);
            }

            console.log('send :', imageUrl)
            console.log('send :', audioUrl)

            const notification = {
                chat_notification: firebase.firestore.FieldValue.increment(1)
            }
         
            const current = {
            email: currentUser.email,
            name: currentUser.username,
            profile_picture: currentUser.profile_picture,
            username: currentUser.username,
            status: "unseen",
            };
    
            const newCurrentMessage = selectedImage? {
            message: textMessage,
            imageUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
        }:audioUrl? {
            message: textMessage,
            audioUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
        }:call=='call'?{
                message: 'Video call',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            }:{
                message: textMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            }
    
            const newUserMessage = selectedImage? {
                message: textMessage,
                imageUrl,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                who: "user",
                }:audioUrl? {
                    message: textMessage,
                    audioUrl,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    who: "user",
                }:call=='call'?{
                    message: 'Video call',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                who: "user",
                }:{
                    message: textMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                who: "user",
                }
    
            const batch = firebase.firestore().batch();

            const userRef = firebase
            .firestore()
            .collection("users")
            .doc(user.email)
    
            const currentChatRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .collection("chat")
            .doc(user.email);
    
            const newUserChatRef = firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .collection("chat")
            .doc(currentUser.email);
    
            batch.set(userRef, notification, { merge: true });
            batch.set(newUserChatRef, current, { merge: true });
            batch.set(
            currentChatRef.collection("messages").doc(),
            newCurrentMessage
            );
            batch.set(newUserChatRef.collection("messages").doc(), newUserMessage);
    
            await batch.commit();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTextMessage("");
            setSelectedImage('')
        }
        }
    };
  
    return { 
        chatSendMessage, 
        loading, 
        textMessage, 
        setTextMessage,
        selectedImage,
        setSelectedImage
    };
}

export default useChatSendMessage
