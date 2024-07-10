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
exports.likeComment = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const likeComment = (singleComment, tagetedIndex, allcomments, user_email, post_id, currentUserEmail) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentLikesStatus = singleComment.likes_by_users.includes(currentUserEmail);
            let updatedValues = allcomments;
            if (currentLikesStatus === true) {
                updatedValues[tagetedIndex].likes_by_users = updatedValues[tagetedIndex].likes_by_users.replace(currentUserEmail + ',', '');
            }
            else {
                updatedValues[tagetedIndex].likes_by_users += currentUserEmail + ',';
            }
            yield firebase_1.db
                .collection('users')
                .doc(user_email)
                .collection('Post')
                .doc(post_id)
                .update({
                comments: updatedValues
            });
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.likeComment = likeComment;
