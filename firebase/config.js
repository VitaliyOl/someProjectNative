// import { getAnalytics } from "firebase/analytics";

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";
// Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";

// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDRKAQNgWJBT9szxFDaoqKepQp0wYdt5z0",
//   authDomain: "firstnative-57481.firebaseapp.com",
//   projectId: "firstnative-57481",
//   storageBucket: "firstnative-57481.appspot.com",
//   messagingSenderId: "5484904072",
//   appId: "1:5484904072:web:39823b536d6f2f840ce93d",
//   measurementId: "G-JFBHY6Y1KX"
// };


const firebaseConfig = {
  apiKey: "AIzaSyDHvL4IRAhxrvFg46x8QTtTWXipjLzBq7c",
  authDomain: "secondnative-73db0.firebaseapp.com",
  projectId: "secondnative-73db0",
  storageBucket: "secondnative-73db0.appspot.com",
  messagingSenderId: "1008810977655",
  appId: "1:1008810977655:web:3eda1d0bd936a4f7579972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);