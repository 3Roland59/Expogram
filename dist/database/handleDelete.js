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
exports.deleteComment = exports.deleteReelComment = exports.deleteReel = exports.deleteStrory = exports.deletePost = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const deletePost = (post, user_email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.db
                .collection('users')
                .doc(user_email)
                .collection('Post')
                .doc(post.id)
                .delete();
            resolve('Post Deleted');
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deletePost = deletePost;
const deleteStrory = (story) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.db
                .collection('users')
                .doc(story.user_email)
                .collection('stories')
                .doc(story.id)
                .delete();
            resolve('Story Deleted');
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteStrory = deleteStrory;
const deleteReel = (reel) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.db
                .collection('users')
                .doc(reel.email)
                .collection('reels')
                .doc(reel.id)
                .delete();
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteReel = deleteReel;
const deleteReelComment = (reel, tagetedIndex, allComments, email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedValues = allComments;
            updatedValues.splice(tagetedIndex, 1);
            yield firebase_1.db
                .collection('users')
                .doc(reel.email)
                .collection('reels')
                .doc(reel.id)
                .update({
                comments: updatedValues,
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteReelComment = deleteReelComment;
const deleteComment = (tagetedIndex, allComments, postId, email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedValues = allComments;
            updatedValues.splice(tagetedIndex, 1);
            yield firebase_1.db
                .collection('users')
                .doc(email)
                .collection('Post')
                .doc(postId)
                .update({
                comments: updatedValues,
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.deleteComment = deleteComment;
