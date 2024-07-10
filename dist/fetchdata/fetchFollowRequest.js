"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fecthRequest = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fecthRequest = (user) => {
    return new Promise((resolve, reject) => {
        try {
            if (user.followersRequset.length <= 0) {
                resolve([]);
            }
            else {
                firebase_1.db
                    .collection('users')
                    .where(firebase_1.firebase.firestore.FieldPath.documentId(), 'in', user.followersRequset)
                    .onSnapshot((snapshot) => {
                    const followersRequset = snapshot.docs.map((doc) => {
                        return (Object.assign({}, doc.data()));
                    });
                    resolve(followersRequset);
                });
            }
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fecthRequest = fecthRequest;
