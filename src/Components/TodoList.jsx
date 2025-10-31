import * as React from "react";
import { useState, useContext, useEffect, useMemo } from "react";
import { useTodo } from "../Contexts/TodoContext";
import { useToast } from "../Contexts/ToastContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Todo from "./Todo";

// { Dialog Form}
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastProvider } from "../Contexts/ToastContext";

export default function TodoList() {
  const { todos, dispatch } = useTodo();
  const { showHideToast } = useToast();
  const [todoInput, setTodoInput] = useState("");
  const [displayShowTodos, setDisplayShowTodos] = useState("all");
  const [isDeleted, setIsDeleted] = useState(false);
  const [dialogTodo, setDialogTodo] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  const DoneTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const PendingTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosUpdated = todos;

  if (displayShowTodos == "done") {
    todosUpdated = DoneTodos;
  } else if (displayShowTodos == "pending") {
    todosUpdated = PendingTodos;
  } else {
    todosUpdated = todos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function changeDisplayTodos(e) {
    setDisplayShowTodos(e.target.value);
  }

  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: todoInput } });

    setTodoInput("");
    showHideToast("Done To Add New Todo");
  }

  // function handleCheckClick(todoId) {
  //   const updatedTodos = todos.map((t) => {
  //     if (t.id == todoId) {
  //       t.isCompleted = !t.isCompleted;
  //     }
  //     return t;
  //   });
  //   setTodos(updatedTodos);
  //   localStorage.setItem("todos", JSON.stringify(updatedTodos));
  // }

  function handleDeleteClick(todoId) {
    setTodos(todos.filter((t) => todoId !== t.id));
  }

  // #### HANDLERS

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setIsDeleted(true);
  }

  function handleDeletedClose() {
    setIsDeleted(false);
  }

  function confirmDelete() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setIsDeleted(false);
    showHideToast("Delete This Todo success");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setIsUpdated(true);
  }

  function handleUpdatedClose() {
    setIsUpdated(false);
  }

  function confirmUpdate() {
    dispatch({ type: "updated", payload: dialogTodo });
    setIsUpdated(false);
    showHideToast("Update This Todo success");
  }

  // #### Todo Components ####
  const todosData = todosUpdated.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* {  *Delet Dialog *} */}
      <Dialog
        open={isDeleted}
        onClose={handleDeletedClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure To Delete This Todo From ToDoList ??
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Be Careful Because This Todo Will Delete From Local Storge And
            Cannot Undo This Action !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletedClose}>Disagree</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmDelete();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* {  *Delet Dialog *} */}

      {/* {  *Update Dialog *} */}
      <Dialog
        open={isUpdated}
        onClose={handleUpdatedClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit This Todo !!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Edit Title"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Edit Content"
            fullWidth
            variant="standard"
            value={dialogTodo.content}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, content: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatedClose}>Disagree</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmUpdate();
            }}
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* {  *Update Dialog *} */}
      <Container maxWidth="md">
        <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            background: "#3B82F6",
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          To-Do-List
        </Typography>

        <ToggleButtonGroup
          value={displayShowTodos}
          onChange={changeDisplayTodos}
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            marginBottom: "5px",
            // background: "linear-gradient(135deg, #ff00d4, #00ddff)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ToggleButton
            value="all"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#3B82F6",
              background: "rgb(28 52 91 / 36%)",
              // boxShadow: "0 1px 2px blue",
            }}
          >
            All
          </ToggleButton>
          <ToggleButton
            value="done"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#10B981",
              background: "rgb(28 52 91 / 36%)",
              // boxShadow: "0 1px 2px green",
            }}
          >
            Done
          </ToggleButton>
          <ToggleButton
            value="pending"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#F59E0B",
              background: "rgb(28 52 91 / 36%)",
              // boxShadow: "0 1px 2px orange",
            }}
          >
            Pending
          </ToggleButton>
        </ToggleButtonGroup>

        <Card
          sx={{
            minWidth: 275,
            background: "rgb(28 52 91 / 36%)",
            marginTop: 2,
            borderRadius: "15px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent
            style={{
              textAlign: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid size={9}>
                {" "}
                <TextField
                  label="ToDo"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={todoInput}
                  onChange={(e) => {
                    setTodoInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={3}>
                <Stack direction="row">
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: "55px",
                      // background: "linear-gradient(135deg, #ff00d4, #00ddff)",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                    onClick={() => {
                      handleAddClick();
                    }}
                    disabled={todoInput.length == 0}
                  >
                    Create ToDo
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            minWidth: 275,
            background: "rgb(28 52 91 / 36%)",
            backdropFilter: "blur(50px) brightness(1.1)",
            marginTop: 3,
            borderRadius: "15px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent
            style={{
              textAlign: "center",
            }}
          >
            {/* {All TODOS} */}
            {todosData}
            {/* {All TODOS} */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
