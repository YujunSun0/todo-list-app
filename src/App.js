import { useEffect, useState } from 'react';
import './App.css';
import TodoItemInputField from './component/input';
import TodoItemList from './component/list';

// SERVER

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDocs, QuerySnapshot} from "firebase/firestore"
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

// CLIENT

// let todoItemId = 0;  firebase를 사용하여 필요없어진 코드

function App() {
  const [todoItemList, setTodoItemList] = useState([]);
  
  useEffect(() => {
    getDocs(collection(db, "todoItem")).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
        });
      })
      setTodoItemList(firestoreTodoItemList);
    })
  },[])

  const onSubmit = async (item, setInput) => { //Create 기능을 하는 함수 (todoItemList에 데이터를 추가하며, 인풋창을 비워준다) 
    // 백엔드에도 사용
    const docRef = await addDoc(collection(db, "todoItem"), {
      todoItemContent: item,
      isFinished: false,
    });

    setTodoItemList([...todoItemList, {
      id: docRef.id,
      todoItemContent: item,
      isFinished: false,
    }]);
    setInput("");
  }

  const onTodoItemClick = async (item) => { // 리스트를 클릭하면 isFinished의 값을 변경시켜주는 함수
    const todoItemRef = doc(db, "todoItem", item.id);
    await setDoc(todoItemRef, { isFinished: !item.isFinished }, { merge: true });


    setTodoItemList(todoItemList.map(el => {
      if (item.id === el.id) {
        return {
          id: item.id,
          todoItemContent: item.todoItemContent,
          isFinished: !item.isFinished
        };
      } else {
        return el
      }
    }))
  }

  const onRemoveClick = async (item) => {
    const todoItemRef = doc(db, "todoItem", item.id);
    await deleteDoc(todoItemRef);

    setTodoItemList(todoItemList.filter(el => {
      return el.id !== item.id
    }))
  }

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
}

export default App;
