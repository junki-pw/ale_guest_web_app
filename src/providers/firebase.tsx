import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCW2EqBXdk1EdVSwdIyVrwC7Wiq1K4KNEA",
    authDomain: "quuuuuuuuu-930f6.firebaseapp.com",
    databaseURL: "https://quuuuuuuuu-930f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quuuuuuuuu-930f6",
    storageBucket: "quuuuuuuuu-930f6.appspot.com",
    messagingSenderId: "710073046151",
    appId: "1:710073046151:web:e117a0b979d16b7ce3d422",
    measurementId: "G-4011WBF3DD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };