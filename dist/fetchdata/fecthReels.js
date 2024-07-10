"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchReels = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchReels = () => {
    return new Promise((resolve, reject) => {
        try {
            firebase_1.db
                .collectionGroup('reels')
                .onSnapshot((snapshot) => {
                const videos = snapshot.docs.map((doc) => {
                    return Object.assign({ id: doc.id }, doc.data());
                });
                resolve(videos);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchReels = fetchReels;
