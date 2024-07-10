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
exports.handleFollowRequest = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const handleFollowRequest = (currentUser, userEmail) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const batch = firebase_1.db.batch();
            yield firebase_1.db
                .collection('users')
                .doc(userEmail)
                .update({
                followersRequset: !currentUser.followingRequest.includes(userEmail)
                    ? firebase_1.firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                    : firebase_1.firebase.firestore.FieldValue.arrayRemove(currentUser.email)
            });
            yield firebase_1.db
                .collection('users')
                .doc(currentUser.email)
                .update({
                followingRequest: !currentUser.followingRequest.includes(userEmail)
                    ? firebase_1.firebase.firestore.FieldValue.arrayUnion(userEmail)
                    : firebase_1.firebase.firestore.FieldValue.arrayRemove(userEmail)
            });
            yield batch.commit();
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.handleFollowRequest = handleFollowRequest;
