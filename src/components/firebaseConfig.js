import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQOwu946ztonrSg9pgwx29PcARFc2Cpmg",
  authDomain: "loc456-71ff1.firebaseapp.com",
  projectId: "loc456-71ff1",
  storageBucket: "loc456-71ff1.appspot.com",
  messagingSenderId: "893585078001",
  appId: "1:893585078001:web:b787421fed3bd660c25b50"
};

export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app)
export const storage=getStorage(app);
