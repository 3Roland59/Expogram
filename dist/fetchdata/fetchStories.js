"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchstories = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchstories = () => {
    return new Promise((resolve, reject) => {
        try {
            firebase_1.firebase
                .firestore()
                .collectionGroup('stories')
                .onSnapshot((snapshot) => {
                const stories = snapshot.docs.map((doc) => {
                    return (Object.assign({ id: doc.id }, doc.data()));
                });
                resolve(stories);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchstories = fetchstories;
// async function tes(){
//     await fetchstories()
//     .then((succ) =>{
//         console.log(succ)
//     }).catch((failure) =>{
//         console.log(failure)
//     })
// }
// tes()
