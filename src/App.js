import './App.css';
import TodoItemInputField from './component/input';
import TodoItemList from './component/list';


function App() {
  return (
    <div className="App">
      <TodoItemInputField onSubmit={() => { }} />
      <TodoItemList />
    </div>
  );
}

export default App;
