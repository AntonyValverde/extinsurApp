import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyCP1wVaCU7-F2OvZaqmlChJUi0VkDcnrjY",
  authDomain: "extinsur-2023.firebaseapp.com",
  projectId: "extinsur-2023",
  storageBucket: "extinsur-2023.appspot.com",
  messagingSenderId: "646943978191",
  appId: "1:646943978191:web:4f9115ba2b1bdc378e3dba",
  measurementId: "G-6LS8DGD5H5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default firebaseConfig;

 