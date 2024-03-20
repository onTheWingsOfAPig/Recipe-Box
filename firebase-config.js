import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCzLEaNT9XP6428X6qePfmIhJ91RLD540k",
    authDomain: "recipe-box-fb.firebaseapp.com",
    projectId: "recipe-box-fb",
    storageBucket: "recipe-box-fb.appspot.com",
    messagingSenderId: "244688777617",
    appId: "1:244688777617:web:f8d108c3b6809a4232ea30",
    measurementId: "G-QV69BLDGYX"
  };

const app = initializeApp(firebaseConfig);

export default app;
