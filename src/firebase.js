import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDLyRYOM3XK-Ya5mUAOxBx-fvzuTPCntpk",
  authDomain: "netflix-clone-ece0b.firebaseapp.com",
  projectId: "netflix-clone-ece0b",
  storageBucket: "netflix-clone-ece0b.appspot.com",
  messagingSenderId: "531536750968",
  appId: "1:531536750968:web:699063c2fd9fe25c6a008d",
  measurementId: "G-49E1J6NJ1P"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore()

const auth = getAuth()

export {auth}

export default db