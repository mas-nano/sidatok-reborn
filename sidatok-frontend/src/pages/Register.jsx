import {
  Google,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import client from "../axios";
import UserContext from "../stores/UserContext";

export default function Register() {
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  });
  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    client
      .post("/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((res) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.data.token);
        setUser(res.data.data.user);
        setLoading(false);
        navigate("/auth/verification");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status) {
          setError({ ...error, ...err.response.data.errors });
        }
      });
  }

  return (
    <div>
      <Typography variant="h5" marginBottom={2}>
        Selamat datang di SIDATOK
      </Typography>
      <Typography marginBottom={2}>Silakan masukkan data diri Anda</Typography>
      <TextField
        error={error.name.length !== 0}
        helperText={error.name}
        fullWidth
        label="Nama Lengkap"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError({ ...error, name: [] });
        }}
      />
      <TextField
        error={error.email.length !== 0}
        helperText={error.email}
        fullWidth
        label="Email"
        variant="outlined"
        sx={{ marginBottom: 2 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError({ ...error, email: [] });
        }}
      />
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password">Kata Sandi</InputLabel>
        <OutlinedInput
          error={error.password.length !== 0}
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError({ ...error, password: [] });
          }}
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
          label="Kata Sandi"
        />
        <FormHelperText error={error.password.length !== 0}>
          {error.password}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password-confirmation">
          Konfirmasi Kata Sandi
        </InputLabel>
        <OutlinedInput
          error={error.password_confirmation.length !== 0}
          id="password-confirmation"
          type={showPassword ? "text" : "password"}
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
            setError({ ...error, password_confirmation: [] });
          }}
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
          label="Konfirmasi Kata Sandi"
        />
        <FormHelperText error={error.password_confirmation.length !== 0}>
          {error.password_confirmation}
        </FormHelperText>
      </FormControl>
      <LoadingButton
        variant="contained"
        fullWidth
        loading={loading}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        sx={{ marginBottom: 2 }}
        onClick={handleSubmit}
      >
        Daftar
      </LoadingButton>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBottom: 2 }}
        startIcon={<Google />}
      >
        Masuk Dengan Google
      </Button>
      <Link component={RouterLink} to={"/auth/login"}>
        Sudah punya akun? Masuk
      </Link>
    </div>
  );
}
