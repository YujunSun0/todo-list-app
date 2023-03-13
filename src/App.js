import { useState } from 'react';
import './App.css';
import TodoItemInputField from './component/input';
import TodoItemList from './component/list';

let todoItemId = 0;

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  console.log(todoItemList);

  const onSubmit = (item) => {
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: item,
      isFinished: false,
    }]);
   
  }

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList todoItemList={todoItemList} />
    </div>
  );
}

export default App;
