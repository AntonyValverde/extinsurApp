import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpZMPoVxxAEmofR8_gRqvvm35RhdeAM7Y",
  authDomain: "extinsur-14739.firebaseapp.com",
  projectId: "extinsur-14739",
  storageBucket: "extinsur-14739.appspot.com",
  messagingSenderId: "714223961690",
  appId: "1:714223961690:web:6fb8bc789f49a82124fa63",
  measurementId: "G-0SKGFDB3JJ"
};


const app = initializeApp(firebaseConfig);
export default firebaseConfig




 