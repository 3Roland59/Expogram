import { db } from "../firebaseconfig/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// fetching user details
// export const getUserDetails1 = (email: string) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await db.collection("users").doc(email).get();
//             if(user.exists){
//                 resolve(user.data());
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
//fetching user details
export const getUserDetails2 = (email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                resolve(doc.data());
            });
        } catch (error) {
            reject(error);
        }
    });
}
