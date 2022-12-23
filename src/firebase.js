import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyDenk6c_9GskitpCQAQvO1Dx0Aky2_0TmU",
    authDomain: "netflix-2834.firebaseapp.com",
    projectId: "netflix-2834",
    storageBucket: "netflix-2834.appspot.com",
    messagingSenderId: "323115296033",
    appId: "1:323115296033:web:84ed8b51be53ea545fca60",
    measurementId: "G-JPB2DDGH6H",
    databaseURL: "https://netflix-2834-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase()