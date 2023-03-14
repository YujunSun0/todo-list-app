import React from "react";
import Button from "@mui/material/Button";
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const TodoItem = ({ item, onTodoItemClick, onRemoveClick }) => {
  const style = item.isFinished ? { textDecoration: "line-through" } : {};
  return (
   <ListItem secondaryAction={
      <IconButton edge="end" aria-label="comments" onClick={() => onRemoveClick(item)}>
        <DeleteIcon />
      </IconButton>
    }>
      <ListItemButton role={undefined} onClick={() => onTodoItemClick(item)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.isFinished}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText style={style} primary={item.todoItemContent} />
      </ListItemButton>
    </ListItem>

  );
};

export default TodoItem;
