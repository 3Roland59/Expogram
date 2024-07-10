"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNotifications = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchNotifications = (userEmail) => {
    return new Promise((resolve, reject) => {
        try {
            firebase_1.db
                .collection('users')
                .doc(userEmail)
                .collection(' notifications')
                .onSnapshot((snapshot) => {
                const notifications = snapshot.docs.map((doc) => {
                    return (Object.assign({ id: doc.id }, doc.data()));
                });
                resolve(notifications);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchNotifications = fetchNotifications;
