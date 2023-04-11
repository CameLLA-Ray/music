import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  //连接到firebase
  apiKey: "AIzaSyDg_f8cFeZ2ARk9uhigKr5HalUwkn3YDEw",
  //身份验证
  authDomain: "music-e9b33.firebaseapp.com",
  //id
  projectId: "music-e9b33",
  //数据储存的地方
  storageBucket: "music-e9b33.appspot.com",
  // 即时通讯功能
  messagingSenderId: "10260437835",

  appId: "1:10260437835:web:8261ef48804f3cb08766ce",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");
export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
