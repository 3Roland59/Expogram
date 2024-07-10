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
exports.fetchUserPost = exports.fetchPost = exports.fetchAllPost = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const fetchAllPost = (limits) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usercollectionref = (0, firebase_1.collection)(firebase_1.db, "users");
            const allusersSnapshot = yield (0, firebase_1.getDocs)(usercollectionref);
            let allPost = [];
            for (const userDoc of allusersSnapshot.docs) {
                const email = userDoc.id;
                const postsCollectionRef = (0, firebase_1.collection)(firebase_1.db, `users/${email}/Post`);
                const postsQuery = (0, firebase_1.query)(postsCollectionRef, (0, firebase_1.orderBy)('created_at', 'desc'), (0, firebase_1.limit)(limits));
                const allpostSnapshot = yield (0, firebase_1.getDocs)(postsQuery);
                allpostSnapshot.forEach((postDoc) => {
                    const postData = Object.assign({ id: postDoc.id }, postDoc.data());
                    allPost.push(postData);
                });
            }
            resolve(allPost);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.fetchAllPost = fetchAllPost;
const fetchPost = (email, post_id) => {
    return new Promise((resolve, reject) => {
        try {
            firebase_1.db
                .collection("users")
                .doc(email)
                .collection("Post")
                .doc(post_id)
                .onSnapshot((doc) => {
                const postData = Object.assign({ id: post_id }, doc.data());
                resolve(postData);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchPost = fetchPost;
const fetchUserPost = (email, limits) => {
    return new Promise((resolve, reject) => {
        try {
            firebase_1.db.
                collection("users")
                .doc(email)
                .collection("Post")
                .orderBy("created_at", "desc")
                .limit(limits)
                .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
                if (data.length <= 0) {
                    reject("No post found");
                }
                else {
                    resolve(data);
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.fetchUserPost = fetchUserPost;
// async function test() {
//     await fetchAllPost().then((succ) =>{
//         console.log(succ)
//     }).catch((fail) =>{
//         console.log(fail)
//     })
// }
// test()
