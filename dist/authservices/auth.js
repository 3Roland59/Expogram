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
exports.onLogout = exports.onLogin = exports.contiueWithGoogle = exports.onRegister = void 0;
const firebase_1 = require("../firebaseconfig/firebase");
const database_1 = require("../database/database");
const onRegister = (email, username, password, country, profile_picture, bio, link) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const authUsers = yield firebase_1.firebase.auth().createUserWithEmailAndPassword(email, password);
            if (((_a = authUsers.user) === null || _a === void 0 ? void 0 : _a.uid) && authUsers.user.email) {
                const create = yield (0, database_1.storeUserDetails)(authUsers.user.uid, authUsers.user.email, username, country, profile_picture, bio, link);
                if (create) {
                    resolve(true);
                }
            }
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.onRegister = onRegister;
// continue with google account
const contiueWithGoogle = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const provider = new firebase_1.firebase.auth.GoogleAuthProvider();
            yield firebase_1.firebase.auth().signInWithPopup(provider);
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.contiueWithGoogle = contiueWithGoogle;
// export const loginWithGoogle = ():Promise<boolean | any> =>{
//     return new Promise(async (resolve, reject): Promise<void> =>{
//         try {
//             const provider = new firebase.auth.GoogleAuthProvider();
//             const result = await firebase.auth().signInWithPopup(provider)
//             //const token = result.credential?.accessToken
//             const user = result.user
//             resolve(user)
//         }catch(error){
//             reject(error)
//         }
//     })
// }
// export const loginWithGoogle = ():Promise<any> => {
//     return new Promise( async (resolve, reject):Promise<void> => {
//         try {
//             //const auth = getAuth()
//             const provider = new GoogleAuthProvider()
//             await signInWithRedirect(auth, provider)
//             const result = await getRedirectResult(auth)
//             //const credential = GoogleAuthProvider.credentialFromResult(result)
//            // const token = credential?.accessToken
//            if(result){
//                 const user = result.user
//                 resolve(user)
//            }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
// Function to log in to an existing user account
const onLogin = (email, password) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.firebase.auth().signInWithEmailAndPassword(email, password);
            resolve(true);
        }
        catch (error) {
            //console.log(error)
            reject(error);
        }
    }));
};
exports.onLogin = onLogin;
const onLogout = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield firebase_1.firebase.auth().signOut();
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.onLogout = onLogout;
// async function test(){
//    const withgoogle = await loginWithGoogle()
//    console.log(withgoogle)
// }
// test()
