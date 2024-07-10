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
exports.uploadPost = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const uploadPost = (username, user_id, email, profile_picture, imageUrl, caption, Hastag) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPost = {
                username: username,
                user_id: user_id,
                email: email,
                profile_picture: profile_picture,
                imageUrl: imageUrl,
                caption: caption,
                Hastag: Hastag,
                created_at: firebase_1.firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                new_likes: [],
                comments: []
            };
            yield firebase_1.db
                .collection("users")
                .doc(email)
                .collection("Post")
                .add(newPost);
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.uploadPost = uploadPost;
// async function test(){
//     await uploadPost('caleb','123', 'calebazumah9@gmail.com','', ['image1','image2'], 'caption', ['hashtag1','hashtag2'])
//     .then((succ) =>{
//         console.log(succ)
//     }).catch((failure) =>{
//         console.log(failure)
//     })
// }
// test()
