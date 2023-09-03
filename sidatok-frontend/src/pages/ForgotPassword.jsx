import { Login as LoginIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import client from "../axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState({
    email: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    client
      .post("/auth/forgot-password", {
        email,
      })
      .then((res) => {
        setLoading(false);
        setOpen(true);
        setEmail("");
        setMessage(
          "Tautan atur ulang kata sandi sudah kami kirim ke email Anda"
        );
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401) {
          setOpen(true);
          setMessage(err.response.data.message);
        }
        if (err.response.status === 422) {
          setError({ ...error, ...err.response.data.errors });
        }
      });
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Typography variant="h5" marginBottom={2}>
        Lupa Password
      </Typography>
      <Typography marginBottom={2}>Silakan masukkan email Anda</Typography>
      <TextField
        error={error.email.length !== 0}
        helperText={error.email}
        fullWidth
        label="Email"
        variant="outlined"
        onChange={(e) => {
          setError({ ...error, email: [] });
          setEmail(e.target.value);
        }}
        value={email}
        sx={{ marginBottom: 2 }}
      />
      <LoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        sx={{ marginBottom: 2 }}
      >
        Masuk
      </LoadingButton>
      <Link component={RouterLink} to={"/auth/login"}>
        Sudah punya akun? Masuk
      </Link>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </form>
  );
}
