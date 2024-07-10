import { useState } from 'react'
import firebase from 'firebase/compat';

import axios from 'axios';


const useChatSendMessageSelf = ({currentUser}) => {
    const [loading, setLoading] = useState(false);
    const [textMessage, setTextMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState('');

    
    const chatSendMessage = async (imageUrl) => {
        if (!loading) {
          setLoading(true);
          try {

            const newCurrentMessage = selectedImage? {
            message: textMessage,
            imageUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            }:{
                message: textMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            }
    
            const batch = firebase.firestore().batch();
    
            const currentChatRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .collection("PersonalMessage")
    
    
            batch.set(
            currentChatRef.doc(),
            newCurrentMessage
            );
    
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

export default useChatSendMessageSelf
