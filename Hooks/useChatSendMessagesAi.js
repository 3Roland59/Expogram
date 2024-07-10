import { useState } from 'react'
import firebase from 'firebase/compat';

import axios from 'axios';


const useChatSendMessageAi = ({currentUser}) => {
    const [loading, setLoading] = useState(false);
    const [textMessage, setTextMessage] = useState("");

    
    const chatSendMessage = async () => {
        if (!loading) {
          setLoading(true);
          try {
                console.log('to get:', textMessage)

            const newCurrentMessage = {
            message: textMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            who: "current",
            };
    
            const batch = firebase.firestore().batch();
    
            const currentChatRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .collection("Aichat")
    
    
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
        }
        }

          try {
            // const options = {
            //   method: 'POST',
            //   url: 'https://meta-llama-2-ai.p.rapidapi.com/',
            //   headers: {
            //     'x-rapidapi-key': 'ca1b249b7bmsh36fd72e9ca0bd25p1ba44djsnb30f488bd941',
            //     'x-rapidapi-host': 'meta-llama-2-ai.p.rapidapi.com',
            //     'Content-Type': 'application/json'
            //   },
            //   data: {
            //     model: 'meta-llama/Llama-2-70b-chat-hf',
            //     messages: [
            //       {
            //         role: 'user',
            //         content: textMessage
            //       }
            //     ]
            //   }
            // };
            // const response = await axios.request(options);
            // console.log('ai: ',response.data.choices[0].message.content);

            const options = {
              method: 'POST',
              url: 'https://llama-3.p.rapidapi.com/llama3',
              headers: {
                'x-rapidapi-key': 'ca1b249b7bmsh36fd72e9ca0bd25p1ba44djsnb30f488bd941',
                'x-rapidapi-host': 'llama-3.p.rapidapi.com',
                'Content-Type': 'application/json'
              },
              data: {
                prompt: textMessage,
                system_prompt: 'you are a friendly chat bot.'
              }
            };
            const response = await axios.request(options);
console.log('ai: ',response.data.msg);
let text = response.data.msg

            const newUserMessage = {
              message: text,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              who: "Ai",
              };
      
              const batch = firebase.firestore().batch();
      
              const currentChatRef = firebase
              .firestore()
              .collection("users")
              .doc(currentUser.email)
              .collection("Aichat")
      
      
              batch.set(currentChatRef.doc(), newUserMessage);
      
              await batch.commit();


          } catch (error) {
            console.log(error)
          }
          finally{
          }
    };
  
    return { 
        chatSendMessage, 
        loading, 
        textMessage, 
        setTextMessage
    };
}

export default useChatSendMessageAi