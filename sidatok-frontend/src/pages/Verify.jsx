import { useEffect, useState } from "react";
import client from "../axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HighlightOff, Login } from "@mui/icons-material";
import { CircularProgress, Snackbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    client
      .post(searchParams.get("verify-url"))
      .then((res) => {
        navigate("/auth/getting-started");
      })
      .catch((err) => {
        setError(true);
      });
  }, [searchParams, navigate]);
  return (
    <>
      {error ? (
        <>
          <HighlightOff
            fontSize="inherit"
            color="error"
            sx={{
              fontSize: "80px",
              display: "block",
              marginX: "auto",
              marginBottom: 2,
            }}
          />
          <Typography marginBottom={2}>
            Verifikasi Email Anda gagal. silakan coba lagi
          </Typography>
          <LoadingButton
            loading={loading}
            variant="contained"
            fullWidth
            loadingPosition="start"
            startIcon={<Login />}
            sx={{ marginBottom: 2 }}
            onClick={handleResend}
          >
            Kirim Ulang
          </LoadingButton>
        </>
      ) : (
        <>
          <CircularProgress
            color="inherit"
            sx={{
              display: "block",
              marginX: "auto",
              marginBottom: 2,
            }}
          />
          <Typography marginBottom={2}>
            Mohon menunggu. Sistem melakukan proses verifikasi pada email Anda
          </Typography>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </>
  );
}
