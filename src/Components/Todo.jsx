import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState, useContext } from "react";
import { useTodo } from "../Contexts/TodoContext";
import { useToast } from "../Contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const [updatedTodo, setIsUpdatedTodo] = useState({
    title: todo.title,
    content: todo.content,
  });

  const { todos, dispatch } = useTodo();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "checked", payload: todo });
    showHideToast("Done This Todo success");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <div
      style={{
        borderLeft: todo.isCompleted ? "15px solid green" : "15px solid orange",
        borderRadius: "10px",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: 2,
          background: "#3B82F6",
          // background: "white",
          color: "black",
          padding: "10px",
          borderRadius: "0 10px 10px 0",
          boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
        }}
      >
        <Grid
          size={9}
          sx={{
            color: "white",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            sx={{
              textAlign: "left",
              textDecoration: todo.isCompleted ? "line-through" : "",
            }}
          >
            {todo.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              textAlign: "left",
              textDecoration: todo.isCompleted ? "line-through" : "",
            }}
          >
            {todo.content}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Stack
            direction="row"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton
              className="hover-done"
              size="medium"
              style={{
                color: todo.isCompleted ? "white" : "green",
                background: todo.isCompleted ? "green" : "none",
              }}
              onClick={() => {
                handleCheckClick();
              }}
            >
              <LibraryAddCheckOutlinedIcon />
            </IconButton>
            <IconButton
              className="hover-edit"
              size="medium"
              style={{
                color: "blue",
                background: "none",
              }}
              onClick={() => {
                handleUpdateClick();
              }}
            >
              <LibraryAddOutlinedIcon />
            </IconButton>
            <IconButton
              className="hover-delete"
              size="medium"
              style={{
                color: "red",
                background: "none",
              }}
              onClick={() => {
                handleDeleteClick();
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
