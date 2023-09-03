import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import client from "../axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: [],
    password: [],
    password_confirmation: [],
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    client
      .post("/auth/reset-password", {
        token: searchParams.get("token"),
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((res) => {
        setLoading(false);
        navigate("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 422) {
          setError({ ...error, ...err.response.data.errors });
        }
      });
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Typography variant="h5" marginBottom={2}>
        Atur Ulang Kata Sandi
      </Typography>
      <Typography marginBottom={2}>
        Silakan masukkan email dan kata sandi baru Anda
      </Typography>
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
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password">Kata Sandi Baru</InputLabel>
        <OutlinedInput
          id="password"
          error={error.password.length !== 0}
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setError({ ...error, password: [] });
            setPassword(e.target.value);
          }}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Kata Sandi Baru"
        />
        <FormHelperText error={error.password.length !== 0}>
          {error.password}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password-confirmation">
          Konfirmasi Kata Sandi Baru
        </InputLabel>
        <OutlinedInput
          id="password-confirmation"
          type={showPassword ? "text" : "password"}
          error={error.password_confirmation.length !== 0}
          onChange={(e) => {
            setError({ ...error, password_confirmation: [] });
            setPasswordConfirmation(e.target.value);
          }}
          value={passwordConfirmation}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Konfirmasi Kata Sandi Baru"
        />
        <FormHelperText error={error.password_confirmation.length !== 0}>
          {error.password_confirmation}
        </FormHelperText>
      </FormControl>
      <LoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        sx={{ marginBottom: 2 }}
      >
        Atur Ulang Kata Sandi
      </LoadingButton>
    </form>
  );
}
