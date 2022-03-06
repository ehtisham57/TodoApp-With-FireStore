import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCwt4IWgSRx_9g-7snFjrTcqpxbPBlgLoc",
  authDomain: "todoappehtisham.firebaseapp.com",
  projectId: "todoappehtisham",
  storageBucket: "todoappehtisham.appspot.com",
  messagingSenderId: "154663479385",
  appId: "1:154663479385:web:70f61451069faaed0f6948"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}
