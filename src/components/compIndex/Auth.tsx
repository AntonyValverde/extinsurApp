import firebaseConfig from "@/firebase/config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

export const AuthRoute = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const router = useRouter();
 

  useEffect(() => {
    const validation = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => validation();
  }, []);
};

 export const restPassword = (Email: string) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
   sendPasswordResetEmail(auth, Email);
};

export default AuthRoute;