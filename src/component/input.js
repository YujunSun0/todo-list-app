import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const TodoItemInputField = ({onSubmit}) => {
    const [input, setInput] = useState("");

    return (
    <Box sx={{margin: "auto"}}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <TextField
          id="todo-item-input"
          label="Todo Item"
          variant="outlined"
          onChange={(e) => setInput(e.target.value)} value={input}
        />
        <Button variant="outlined" onClick={onSubmit}>Submit</Button>
      </Stack>
    </Box>
  );

}

export default TodoItemInputField;