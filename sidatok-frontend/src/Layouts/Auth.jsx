import { Grid, Paper } from "@mui/material";
import Lottie from "lottie-react";
import { Outlet } from "react-router-dom";
import monitor from "../lottie/monitor.json";

function AuthLayout() {
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#d2d0dd",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ display: { xs: "block", md: "flex" } }}
      >
        <Grid item xs={12} md={10} lg={9} xl={8}>
          <Paper
            sx={{
              borderRadius: "10px",
              minHeight: "75%",
              width: "100%",
            }}
            elevation={2}
          >
            <Grid
              container
              sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
              <Grid
                item
                xs={12}
                md={6}
                container
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={10} flex sx={{ paddingY: 2 }}>
                  <Outlet />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 4, borderRadius: "10px" }} elevation={0}>
                  <Lottie animationData={monitor} />
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AuthLayout;
