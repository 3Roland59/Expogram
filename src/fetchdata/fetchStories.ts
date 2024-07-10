import { db, firebase } from "../firebaseconfig/firebase";

export const fetchstories = (): Promise<object[] | string> => {
    return new Promise((resolve, reject): void => {
        try {
            firebase
            .firestore()
            .collectionGroup('stories')
            .onSnapshot((snapshot) => {
                const stories = snapshot.docs.map((doc) =>{
                    return ( { id: doc.id, ...doc.data() })
                })
                resolve(stories)
            })
        } catch (error) {
            reject(error as string)
        }
    })
}

// async function tes(){
//     await fetchstories()
//     .then((succ) =>{
//         console.log(succ)
//     }).catch((failure) =>{
//         console.log(failure)
//     })
// }
// tes()