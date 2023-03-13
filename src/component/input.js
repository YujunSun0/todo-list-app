import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"


const TodoItemInputField = ({onSubmit}) => {
    const [input, setInput] = useState("");

    return (
      <div>
        <TextField
          id="todo-item-input"
          label="Todo Item"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="outlined" onClick={()=>onSubmit(input, setInput)}>
          Text
        </Button>
      </div>
    );
}

export default TodoItemInputField;