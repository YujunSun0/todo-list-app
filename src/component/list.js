import React from 'react';
import TodoItem from './item';
import List from "@mui/material/List";
import Box from "@mui/material/Box";

const TodoItemList = ({ todoItemList, onTodoItemClick, onRemoveClick }) => {
  return (
    <Box>
      <List sx={{margin: "auto", maxWidth: "720px", width: "80%"}}>
        {todoItemList.map((item, idx) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
              onTodoItemClick={onTodoItemClick}
              onRemoveClick={onRemoveClick}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default TodoItemList;