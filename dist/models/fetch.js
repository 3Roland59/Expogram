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
exports.getUserDetails2 = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const firestore_1 = require("firebase/firestore");
// fetching user details
// export const getUserDetails1 = (email: string) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await db.collection("users").doc(email).get();
//             if(user.exists){
//                 resolve(user.data());
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }
//fetching user details
const getUserDetails2 = (email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, "users"), (0, firestore_1.where)("email", "==", email));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            querySnapshot.forEach((doc) => {
                resolve(doc.data());
            });
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.getUserDetails2 = getUserDetails2;
