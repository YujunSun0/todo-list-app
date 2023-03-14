import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


const TodoListAppBar = ({auth, provider, currentUser}) => {
    const loginWithGoogleButton = (
        <Button color="inherit" onClick={() => {
            signInWithRedirect(auth, provider);
    }}>Login with Google</Button>
    )
    
    const logoutButton = (
        <Button color='inherit' onClick={() => {
            signOut(auth);
        }}>Log out</Button>
    )

    const button = currentUser === null ? loginWithGoogleButton : logoutButton;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List App
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TodoListAppBar;
