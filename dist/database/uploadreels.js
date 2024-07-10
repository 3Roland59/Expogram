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
exports.uploadReel = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const uploadReel = (username, user_id, email, profile_picture, videoUrl, caption) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reel = {
                username: username,
                user_id: user_id,
                email: email,
                profile_picture: profile_picture,
                videoUrl: videoUrl,
                caption: caption,
                created_at: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                new_likes: [],
                comments: []
            };
            yield firebase_1.db
                .collection('users')
                .doc(email)
                .collection('reels')
                .add(reel);
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.uploadReel = uploadReel;
