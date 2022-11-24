import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCzISxELqjHx8qjoqPtFQVEQnXlZ3eqPok",
    authDomain: "honeymoon-9e399.firebaseapp.com",
    projectId: "honeymoon-9e399",
    storageBucket: "honeymoon-9e399.appspot.com",
    messagingSenderId: "1050128247495",
    appId: "1:1050128247495:web:36c74cd9996162e8616ce2"
};

const app = initializeApp(firebaseConfig);
// export const authentication = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app)

// export const storage = getStorage(app)

