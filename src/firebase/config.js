import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaTCnAcBoLg4Xqyxnq9j7IIY0vV9pPdxw",
  authDomain: "clase-9-firebase.firebaseapp.com",
  projectId: "clase-9-firebase",
  storageBucket: "clase-9-firebase.firebasestorage.app",
  messagingSenderId: "921976311217",
  appId: "1:921976311217:web:350579bf380f5942154190"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);