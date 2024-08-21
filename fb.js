import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCb2OPj_izAEsM-h2Kw7vtGFGqDcJIGlHs",
  authDomain: "inline-74db2.firebaseapp.com",
  projectId: "inline-74db2",
  storageBucket: "inline-74db2.appspot.com",
  messagingSenderId: "942596851422",
  appId: "1:942596851422:web:f09dfd9cd792bcaf76644f",
  databaseURL:
    "https://inline-74db2-default-rtdb.europe-west1.firebasedatabase.app",

  measurementId: "G-8P9V8VE6KZ",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const database = getDatabase(app);

export { database };
