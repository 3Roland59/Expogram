"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLikes = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchLikes = (likesByEmail) => {
    return new Promise((resolve, reject) => {
        try {
            {
                likesByEmail;
            }
            firebase_1.db.
                collection("users")
                .where(firebase_1.firebase.firestore.FieldPath.documentId(), "in", likesByEmail)
                .onSnapshot((snapshop) => {
                const likes = snapshop.docs.map((doc) => { doc.data(); });
                resolve(likes);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchLikes = fetchLikes;
