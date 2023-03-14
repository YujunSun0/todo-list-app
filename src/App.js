import { useState } from 'react';
import './App.css';
import TodoItemInputField from './component/input';
import TodoItemList from './component/list';

let todoItemId = 0;

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (item, setInput) => { //Create 기능을 하는 함수 (todoItemList에 데이터를 추가하며, 인풋창을 비워준다)
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: item,
      isFinished: false,
    }]);
    setInput("");
  }

  const onTodoItemClick = (item) => { // 리스트를 클릭하면 isFinished의 값을 변경시켜주는 함수
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

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
      />
    </div>
  );
}

export default App;
