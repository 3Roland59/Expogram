"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const addUser_1 = require("./addUser");
const sendMessage = (user, currentUser, textMessage) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (user.status === undefined) {
                yield (0, addUser_1.addUser)(user, currentUser.email);
            }
            const notification = {
                chat_notification: firebase_1.firebase.firestore.FieldValue.increment(1)
            };
            const current = {
                email: currentUser.email,
                name: currentUser.name,
                username: currentUser.username,
                profile_picture: currentUser === null || currentUser === void 0 ? void 0 : currentUser.profile_picture,
                status: 'unseen'
            };
            const newCurrentMessage = {
                message: textMessage,
                timestamp: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                who: 'current',
            };
            const newUserMessage = {
                message: textMessage,
                timestamp: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                who: 'user',
            };
            const batch = firebase_1.db.batch();
            const userRef = firebase_1.db
                .collection('users')
                .doc(user.email);
            const currentChatRef = firebase_1.db
                .collection('users')
                .doc(currentUser.email)
                .collection('chat')
                .doc(user.email);
            const newUserChatRef = firebase_1.db
                .collection('users')
                .doc(user.email)
                .collection('chat')
                .doc(currentUser.email);
            batch.set(userRef, notification, { merge: true });
            batch.set(newUserChatRef, current, { merge: true });
            batch.set(currentChatRef.collection('messages').doc(), newCurrentMessage);
            batch.set(newUserChatRef.collection('messages').doc(), newUserMessage);
            batch.commit();
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.sendMessage = sendMessage;
