// import {db, firebase} from '../../firebaseconfig/firebase'

// export const saveChat = (curreUserEmail: string): Promise<string> =>{
//     return new Promise(async (resolve, reject): Promise<void> =>{
//         try {
//             const newChat = {
//                 user: [],
//                 imageUrl: [],
//                 videoUrl: [],
//                 audioRecord: [],
//                 Ai: [],
//                 created_at: firebase.firestore.FieldValue.serverTimestamp()
//             }
//             const store = await db
//                .collection('users')
//                .doc(curreUserEmail)
//                .collection('chat with ai')
//                .add(newChat)
//         resolve(store.id)  
//         } catch (error) {
//             reject(error as string)
//         }
//     })
// }