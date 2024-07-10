"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchfollowing = exports.fetchFollowers = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchFollowers = (user) => {
    return new Promise((resolve, reject) => {
        try {
            if (user.followers.length <= 0) {
                resolve([]);
            }
            else {
                firebase_1.db
                    .collection('user')
                    .where(firebase_1.firebase.firestore.FieldPath.documentId(), 'in', user.followers)
                    .onSnapshot((snapshot) => {
                    const followers = snapshot.docs.map((doc) => {
                        return (Object.assign({}, doc.data()));
                    });
                    resolve(followers);
                });
            }
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchFollowers = fetchFollowers;
const fetchfollowing = (user) => {
    return new Promise((resolve, reject) => {
        try {
            if (user.following.length <= 0) {
                resolve([]);
            }
            else {
                firebase_1.db
                    .collection('user')
                    .where(firebase_1.firebase.firestore.FieldPath.documentId(), 'in', user.following)
                    .onSnapshot((snapshot) => {
                    const following = snapshot.docs.map((doc) => {
                        return (Object.assign({}, doc.data()));
                    });
                    resolve(following);
                });
            }
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchfollowing = fetchfollowing;
