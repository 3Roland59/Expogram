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
exports.seenStory = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const seenStory = (stories, user_email, currentStoryIndex) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!stories[currentStoryIndex].seen_by_user.includes(user_email)) {
                yield firebase_1.db
                    .collection("users")
                    .doc(stories[0].user_email)
                    .collection("stories")
                    .doc(stories[currentStoryIndex].id)
                    .update({
                    seen_by_user: firebase_1.firebase.firestore.FieldValue.arrayUnion(user_email)
                });
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.seenStory = seenStory;
