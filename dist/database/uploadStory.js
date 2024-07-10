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
exports.uploadStory = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const uploadStory = (imageUrl, username, name, profile_picture, user_id, user_email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newStory = {
                imageUrl: imageUrl,
                username: username,
                name: name,
                profile_picture: profile_picture,
                user_id: user_id,
                user_email: user_email,
                created_at: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                new_likes: [],
                seen_by_user: []
            };
            yield firebase_1.db
                .collection("users")
                .doc(user_email)
                .collection("stories")
                .add(newStory);
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.uploadStory = uploadStory;
