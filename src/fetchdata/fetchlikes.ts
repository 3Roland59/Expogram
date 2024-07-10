import { db, firebase } from '../firebaseconfig/firebase'


export const fetchLikes = (likesByEmail : string[]): Promise<any> => {
    return new Promise((resolve,reject): void => {
        try {
            { likesByEmail }
            db.
               collection("users")
               .where(firebase.firestore.FieldPath.documentId(), "in", likesByEmail)
               .onSnapshot((snapshop) => {
                  const likes = snapshop.docs.map((doc) =>{ doc.data() })
                  resolve(likes)
               })
        } catch (error) {
            reject(error)
        }
    })
}