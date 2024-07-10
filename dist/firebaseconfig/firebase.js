"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDoc = exports.doc = exports.limit = exports.getRedirectResult = exports.GoogleAuthProvider = exports.signInWithPopup = exports.auth = exports.storage = exports.db = exports.firebase = exports.orderBy = exports.query = exports.getDocs = exports.collection = exports.getFirestore = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
exports.firebase = app_1.default;
require("firebase/compat/auth");
require("firebase/compat/firestore");
require("firebase/compat/storage");
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "signInWithPopup", { enumerable: true, get: function () { return auth_1.signInWithPopup; } });
Object.defineProperty(exports, "GoogleAuthProvider", { enumerable: true, get: function () { return auth_1.GoogleAuthProvider; } });
Object.defineProperty(exports, "getRedirectResult", { enumerable: true, get: function () { return auth_1.getRedirectResult; } });
const firestore_1 = require("firebase/firestore");
Object.defineProperty(exports, "getFirestore", { enumerable: true, get: function () { return firestore_1.getFirestore; } });
Object.defineProperty(exports, "collection", { enumerable: true, get: function () { return firestore_1.collection; } });
Object.defineProperty(exports, "getDocs", { enumerable: true, get: function () { return firestore_1.getDocs; } });
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return firestore_1.query; } });
Object.defineProperty(exports, "orderBy", { enumerable: true, get: function () { return firestore_1.orderBy; } });
Object.defineProperty(exports, "limit", { enumerable: true, get: function () { return firestore_1.limit; } });
Object.defineProperty(exports, "doc", { enumerable: true, get: function () { return firestore_1.doc; } });
Object.defineProperty(exports, "setDoc", { enumerable: true, get: function () { return firestore_1.setDoc; } });
//import { getAnalytics } from "@firebase/analytics";
//import exp from "constants";
const firebaseConfig = {
    apiKey: "AIzaSyDZNniGl6HJQgKcc3S4aLHXEc1hgrv0f0o",
    authDomain: "expogram-ce49a.firebaseapp.com",
    projectId: "expogram-ce49a",
    storageBucket: "expogram-ce49a.appspot.com",
    messagingSenderId: "940006901580",
    appId: "1:940006901580:web:42132f3d0ec040ff33b1e9",
    measurementId: "G-J6Q7XBP3JF",
};
// Initialize Firebase
//!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const app = app_1.default.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = app_1.default.firestore();
exports.db = db;
const storage = app_1.default.storage();
exports.storage = storage;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
// Path: src/api/server.ts
