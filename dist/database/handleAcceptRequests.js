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
exports.handleAcceptRequest = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const handleAcceptRequest = (currentUser, user, accept) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.db
                .collection('users')
                .doc(user.email)
                .update(Object.assign({ followingRequest: firebase_1.firebase.firestore.FieldValue.arrayRemove(currentUser.email) }, (accept && {
                following: firebase_1.firebase.firestore.FieldValue.arrayUnion(currentUser.email)
            })));
            yield firebase_1.db
                .collection('users')
                .doc(currentUser.email)
                .update(Object.assign({ followersRequest: firebase_1.firebase.firestore.FieldValue.arrayRemove(user.email) }, (accept && {
                followers: firebase_1.firebase.firestore.FieldValue.arrayUnion(user.email)
            })));
            if (accept) {
                yield firebase_1.db
                    .collection('users')
                    .doc(user.email)
                    .update({
                    events_notification: firebase_1.firebase.firestore.FieldValue.increment(1)
                });
            }
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.handleAcceptRequest = handleAcceptRequest;
