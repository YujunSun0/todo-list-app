import { useEffect, useState } from 'react';
import './App.css';
import TodoItemInputField from './component/input';
import TodoItemList from './component/list';
import TodoListAppBar from './component/Appbar';
import Container from '@mui/material/Container';

// SERVER

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDocs, query, orderBy, where } from "firebase/firestore"
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAShy2X9kjPsLgjUvA9s5CMws9vFeGnS_Q",
  authDomain: "todoapp-bde00.firebaseapp.com",
  projectId: "todoapp-bde00",
  storageBucket: "todoapp-bde00.appspot.com",
  messagingSenderId: "994556642538",
  appId: "1:994556642538:web:7b2d515f8752fd34368393",
  measurementId: "G-VW659HSNBE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
// CLIENT

// let todoItemId = 0;  firebase를 사용하여 필요없어진 코드

function App() {
  const [todoItemList, setTodoItemList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // 로그인 되있는지 확인하는 상태

  onAuthStateChanged(auth, (user) => { //user가 로그인상태이면 uid로 상태를 변경 , 없으면 null (firebase에서 기본적으로 제공하는 함수이다)
    if (user) { 
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
  });
  
// Firestore의 "todoItem" 컬렉션에서 Todo 항목의 목록을 가져와서 로컬 상태의 TodoItemList와 동기화하는 함수
  const syncTodoItemListStateWithFirestore = () => {
    const q = query(collection(db, "todoItem"), where("userId", "==", currentUser) ,orderBy("created", "desc")); // 내림차순으로 정렬된 쿼리 생성

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = []; // Firestore에서 가져온 데이터를 저장하기 위한 배열
      querySnapshot.forEach((doc) => { // 반환된 각각의 문서(doc)에 대해 반복하며 firestoreTodoItemList 배열에 추가
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          created: doc.data().created ?? 0,
          userId: doc.data().userId
        });
      });
      setTodoItemList(firestoreTodoItemList); // 상태 업데이트
    });
  }

  useEffect(() => { // 첫 렌더링 시, Firestore에서 데이터를 가져와서 표시해줌  currentUser 상태가 변경될 때(로그인, 로그아웃)
    syncTodoItemListStateWithFirestore();
  }, [currentUser]);

  const onSubmit = async (item, setInput) => { //Create 기능을 하는 함수 (todoItemList에 데이터를 추가하며, 인풋창을 비워준다) 
    // 백엔드에도 사용
      await addDoc(collection(db, "todoItem"), {
      todoItemContent: item,
      isFinished: false,
      created: Math.floor(Date.now() / 1000),
      userId: currentUser
    });
    syncTodoItemListStateWithFirestore();
    setInput("");
  }

  const onTodoItemClick = async (item) => { // 리스트를 클릭하면 isFinished의 값을 변경시켜주는 함수
    const todoItemRef = doc(db, "todoItem", item.id);
    await setDoc(todoItemRef, { isFinished: !item.isFinished }, { merge: true });

    syncTodoItemListStateWithFirestore();
  }

  const onRemoveClick = async (item) => {
    const todoItemRef = doc(db, "todoItem", item.id);
    await deleteDoc(todoItemRef);

    syncTodoItemListStateWithFirestore();
  }

  return (
    <div className="App">
      <TodoListAppBar
        provider={provider}
        auth={auth}
        currentUser={currentUser}
      />
      <Container sx={{ paddingTop: "20px" }}>
        <TodoItemInputField onSubmit={onSubmit} />
        <TodoItemList
          todoItemList={todoItemList}
          onTodoItemClick={onTodoItemClick}
          onRemoveClick={onRemoveClick}
        />
      </Container>
    </div>
  );
}

export default App;
