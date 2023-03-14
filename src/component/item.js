import Button  from '@mui/material/Button';

const TodoItem = ({ item, onTodoItemClick, onRemoveClick }) => {
  const style = item.isFinished ? { textDecoration: "line-through" } : {};
  return (
    <li>
      <span style={style} onClick={() => onTodoItemClick(item)}>
        {item.todoItemContent}
      </span>
      <Button variant="outlined" onClick={() => onRemoveClick(item)}>
        Remove
      </Button>
    </li>
  );
};

export default TodoItem