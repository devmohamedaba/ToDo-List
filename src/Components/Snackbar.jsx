import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function TodoSnackbar({ open, message }) {
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Note archived"
          action={action}
        >
          <Alert
            variant="filled"
            severity="success"
            sx={{
              width: "300px",
              // background: "linear-gradient(135deg, #ff00d4, #00ddff)",
              textAlign: "center",
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
