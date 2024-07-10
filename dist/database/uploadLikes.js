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
exports.handlestoryLikes = exports.handlepostlikes = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const handlepostlikes = (post, currentUserEmail, currentUserUsername, currentUserProfile) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const currentLikesStatus = !post.likes_by_users.includes(currentUserEmail);
        try {
            yield firebase_1.db
                .collection("users")
                .doc(post.email)
                .collection("Post")
                .doc(post.id)
                .update({
                likes_by_users: currentLikesStatus
                    ? firebase_1.firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
                    : firebase_1.firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
                new_likes: currentLikesStatus
                    ? [currentUserUsername, currentUserProfile]
                    : []
            });
            yield firebase_1.db
                .collection("users")
                .doc(post.email)
                .update({
                event_notification: currentLikesStatus
                    ? firebase_1.firebase.firestore.FieldValue.increment(1)
                    : firebase_1.firebase.firestore.FieldValue.increment(-1)
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.handlepostlikes = handlepostlikes;
const handlestoryLikes = (story, currentUserEmail) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const currentLikesStatus = !story.likes_by_users.includes(currentUserEmail);
        try {
            yield firebase_1.db
                .collection("users")
                .doc(story.user_email)
                .collection("stories")
                .doc(story.id)
                .update({
                likes_by_users: currentLikesStatus
                    ? firebase_1.firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
                    : firebase_1.firebase.firestore.FieldValue.arrayRemove(currentUserEmail)
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.handlestoryLikes = handlestoryLikes;
