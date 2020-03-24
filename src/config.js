import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBfeI9YWQ6YcG-Yxy-8Tp4a4KIRjHVjXTg",
    authDomain: "movieimdb-2d8ac.firebaseapp.com",
    databaseURL: "https://movieimdb-2d8ac.firebaseio.com",
    projectId: "movieimdb-2d8ac",
    storageBucket: "movieimdb-2d8ac.appspot.com",
    messagingSenderId: "57433370581",
    appId: "1:57433370581:web:d0e9d4f85cf016d5ded75c",
    measurementId: "G-JLSHMRWSYK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  let firebaseDB = firebase.database();
  let firebaseAuth = firebase.auth();

  export {
      firebase,
      firebaseDB,
      firebaseAuth,
  }