import {
  Google,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import client from "../axios";
import UserContext from "../stores/UserContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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
      .post("auth/login", {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("ACCESS_TOKEN", res.data.data.token);
        setUser(res.data.data.user);
        if (res.data.data.user.shop_id) {
          navigate("/");
        } else {
          navigate("/auth/getting-started");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 401 || err.response.status === 422) {
          setOpen(true);
          setMessage("Email atau kata sandi Anda salah");
        }
      });
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Typography variant="h5" marginBottom={2}>
        Selamat datang di SIDATOK
      </Typography>
      <Typography marginBottom={2}>Silakan masukkan akun Anda</Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                type="button"
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Box
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={2}
        sx={{ display: "flex" }}
      >
        <FormControlLabel control={<Checkbox />} label="Ingat Saya?" />
        <Link component={RouterLink} to={"/auth/forgot-password"}>
          Lupa Kata Sandi?
        </Link>
      </Box>
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
      <Button
        variant="contained"
        fullWidth
        type="button"
        sx={{ marginBottom: 2 }}
        startIcon={<Google />}
      >
        Masuk Dengan Google
      </Button>
      <Link component={RouterLink} to={"/auth/register"}>
        Belum punya akun? Daftar
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
