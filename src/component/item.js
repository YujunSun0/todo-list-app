import { Button } from '@mui/material';

const TodoItem = ({ item, onTodoItemClick }) => {
  const style = item.isFinished ? { textDecoration: "line-through" } : {};
  return (
    <li>
      <span style={style} onClick={() => onTodoItemClick(item)}>
        {item.todoItemContent}
      </span>
      <Button variant="outlined">Outlined</Button>
    </li>
  );
};

export default TodoItem