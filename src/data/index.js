
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxFnYY9fpa94_JkpVeXeaOP2RHiUAJECw",
  authDomain: "watertank-99754.firebaseapp.com",
  databaseURL: "https://watertank-99754-default-rtdb.firebaseio.com",
  projectId: "watertank-99754",
  storageBucket: "watertank-99754.appspot.com",
  messagingSenderId: "206975631492",
  appId: "1:206975631492:web:fdc3fc3276c2285c8e02d1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);


