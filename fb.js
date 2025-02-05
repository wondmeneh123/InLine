import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBMIdtjkfvjBDdYCOoov7Ev5NAcD-Hrz4Q",
  authDomain: "eduquest-cb4ef.firebaseapp.com",
  projectId: "eduquest-cb4ef",
  storageBucket: "eduquest-cb4ef.appspot.com",
  messagingSenderId: "948188018763",
  appId: "1:948188018763:web:597df852a66a8fa8a275ce",
  measurementId: "G-BL09DBVHR6",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
export { database };
