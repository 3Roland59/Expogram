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
exports.uploadComment = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const uploadComment = (post, currentUserEmail, currentUserUsername, currentUserProfile, content) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const snapshot = yield firebase_1.db
                .collection("users")
                .doc(post.email)
                .collection("Post")
                .doc(post.id)
                .get();
            if (snapshot.exists) {
                const postRef = snapshot.ref;
                const newComment = {
                    email: currentUserEmail,
                    profile_picture: currentUserProfile,
                    username: currentUserUsername,
                    comment: content,
                    created_at: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                    likes_by_users: "",
                };
                yield postRef.update({
                    comments: firebase_1.firebase.firestore.FieldValue.arrayUnion(newComment)
                });
                if (post.email !== currentUserEmail)
                    (yield firebase_1.db
                        .collection("users")
                        .doc(post.email)
                        .update({
                        event_notification: firebase_1.firebase.firestore.FieldValue.increment(1)
                    }));
                resolve(true);
            }
            else {
                reject("Post not found");
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.uploadComment = uploadComment;
