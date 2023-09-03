import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Backdrop,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { AddHome, Login } from "@mui/icons-material";
import client from "../axios";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../stores/UserContext";

const steps = ["Gabung atau Buat Toko", "Isi Data", "Rangkuman"];

export default function GettingStarted() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [choice, setChoice] = React.useState("");
  const [shop, setShop] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [logo, setLogo] = React.useState("");
  const [code, setCode] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [logoName, setLogoName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    shop: [],
    address: [],
    code: [],
    logo: [],
  });

  if (user) {
    if (user.shop_id) {
      return <Navigate to={"/"} />;
    }
  }

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e.preventDefault();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep !== 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (activeStep === 2) {
      setOpen(true);
      const formData = new FormData();
      if (logo !== "") {
        formData.append("logo", logo);
      }
      formData.append("choice", choice);
      formData.append("shop", shop);
      formData.append("address", address);
      formData.append("code", code);
      client
        .post("/shop/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setUser(res.data.data.user);
          localStorage.setItem("ACCESS_TOKEN", res.data.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setOpen(false);
          if (err.response.status === 422) {
            setError({ ...error, ...err.response.data.errors });
            setActiveStep(1);
          } else {
            console.log(err);
          }
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setLogoName(file.name);
    setLogo(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <React.Fragment>
          <Grid container spacing={1} sx={{ my: 2 }}>
            <Grid item xs={6}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: choice === "create" ? "#f97316" : "white",
                  color: choice === "create" ? "white" : "black",
                }}
              >
                <CardActionArea
                  sx={{ height: "100%" }}
                  onClick={() => setChoice("create")}
                >
                  <CardContent>
                    <AddHome sx={{ display: "block" }} />
                    <Typography>Buat toko baru</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: choice === "join" ? "#f97316" : "white",
                  color: choice === "join" ? "white" : "black",
                }}
              >
                <CardActionArea onClick={() => setChoice("join")}>
                  <CardContent>
                    <Login sx={{ display: "block" }} />
                    <Typography>Gabung toko yang sudah ada</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {activeStep === 1 && choice === "create" && (
        <>
          <Typography marginY={2}>Buat Toko Baru</Typography>
          <TextField
            error={error.shop.length !== 0}
            helperText={error.shop}
            fullWidth
            label="Nama Toko"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={shop}
            onChange={(e) => {
              setShop(e.target.value);
              setError({ ...error, shop: [] });
            }}
          />
          <TextField
            error={error.address.length !== 0}
            helperText={error.address}
            fullWidth
            label="Alamat Toko"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setError({ ...error, address: [] });
            }}
          />
          <FormControl>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="logo"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="logo">
              <Button
                variant="outlined"
                component="span"
                sx={{ marginRight: 2 }}
              >
                Pilih Logo
              </Button>
              <span>{logoName}</span>
            </label>
            <FormHelperText error={error.logo.length !== 0}>
              {error.logo}
            </FormHelperText>
          </FormControl>
        </>
      )}
      {activeStep === 1 && choice === "join" && (
        <>
          <Typography marginY={2}>Gabung Toko Yang Sudah Ada</Typography>
          <TextField
            error={error.code.length !== 0}
            helperText={error.code}
            value={code}
            fullWidth
            label="ID Toko"
            variant="outlined"
            sx={{ marginBottom: 2 }}
            onChange={(e) => {
              setCode(e.target.value);
              setError({ ...error, code: [] });
            }}
          />
        </>
      )}
      {activeStep === 2 && choice === "create" && (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Typography>Nama Toko: {shop}</Typography>
          <Typography>Alamat Toko: {address}</Typography>
          <Typography>Logo Toko: </Typography>
          <Avatar
            src={preview}
            alt="logo anda"
            sx={{ width: 100, height: 100 }}
          />
        </div>
      )}
      {activeStep === 2 && choice === "join" && (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Typography>ID Toko: {code}</Typography>
        </div>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", py: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Kembali
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} disabled={choice === ""}>
          {activeStep === steps.length - 1 ? "Simpan" : "Berikutnya"}
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
