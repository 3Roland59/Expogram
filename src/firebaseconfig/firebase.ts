import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  initializeAuth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  setDoc
} from "firebase/firestore";

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
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = getAuth(app);
export { getFirestore, collection, getDocs, query, orderBy };
export {
  firebase,
  db,
  storage,
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  limit,
  doc,
  setDoc,
};

// Path: src/api/server.ts
