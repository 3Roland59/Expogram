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
exports.savePost = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const savePost = (post, currentUser) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (currentUser.saved_posts.includes(post.id)) {
                yield firebase_1.db
                    .collection('users')
                    .doc(currentUser.email)
                    .update({
                    saved_posts: firebase_1.firebase.firestore.FieldValue.arrayRemove(post.id)
                });
            }
            else {
                yield firebase_1.db
                    .collection('users')
                    .doc(currentUser.email)
                    .update({
                    saved_posts: firebase_1.firebase.firestore.FieldValue.arrayUnion(post.id)
                });
            }
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.savePost = savePost;
