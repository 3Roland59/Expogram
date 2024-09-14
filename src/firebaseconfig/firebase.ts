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
  getReactNativePersistence
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

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore and Storage
const db = firebase.firestore();
const storage = firebase.storage();

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
