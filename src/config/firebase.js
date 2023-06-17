import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXrNsphWEoodnzDeSvg7HLsPTEgg4rT3s",
  authDomain: "nusmarkt-41131.firebaseapp.com",
  projectId: "nusmarkt-41131",
  storageBucket: "nusmarkt-41131.appspot.com",
  messagingSenderId: "518175974664",
  appId: "1:518175974664:web:984eaf2896f323452eb8bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore(app);


