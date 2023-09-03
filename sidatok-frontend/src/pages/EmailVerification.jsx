import { Login as LoginIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Snackbar, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import client from "../axios";
import { useState } from "react";

export default function EmailVerfication() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleResend() {
    setLoading(true);
    client
      .post("/auth/resend-verify-email")
      .then((res) => {
        setMessage("Verifikasi email berhasil dikirim ulang");
        setOpen(true);
        setLoading(false);
      })
      .catch((err) => {
        setMessage("Verifikasi email gagal dikirim ulang");
        setOpen(true);
        setLoading(false);
      });
  }
  return (
    <div>
      <Typography variant="h5" marginBottom={2}>
        Verifikasi Email Terkirim
      </Typography>
      <CheckCircleOutlineIcon
        fontSize="inherit"
        color="success"
        sx={{
          fontSize: "80px",
          display: "block",
          marginX: "auto",
          marginBottom: 2,
        }}
      />
      <Typography marginBottom={2}>
        Kami telah mengirim tautan untuk proses verfikasi email kepada Anda.
        Silakan buka kotak masuk pada email Anda.
      </Typography>
      <LoadingButton
        loading={loading}
        variant="contained"
        fullWidth
        loadingPosition="start"
        startIcon={<LoginIcon />}
        sx={{ marginBottom: 2 }}
        onClick={handleResend}
      >
        Kirim Ulang
      </LoadingButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
}
