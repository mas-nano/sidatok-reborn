import { Add, AddShoppingCart, Remove, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

const drawerWidth = 350;

export default function Cashier(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Typography>Pesanan</Typography>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }} paddingX={2}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img
              src="https://picsum.photos/200/300"
              alt=""
              style={{
                width: "30%",
                aspectRatio: 1,
                borderRadius: "10px",
                objectFit: "cover",
                objectPosition: "center",
                marginRight: 10,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography>Sweet Chocolate ChocoChips Croissant</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ flex: 1 }}>Rp10000</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <IconButton size="small">
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography lineHeight={2}>1</Typography>
                  <IconButton size="small">
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex flexDirection={"column"} padding={2}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">Subtotal</Typography>
              <Typography variant="caption" fontWeight={500}>
                Rp10000
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">Diskon</Typography>
              <Typography variant="caption" fontWeight={500}>
                Rp5000
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Total</Typography>
              <Typography fontWeight={500}>Rp5000</Typography>
            </Box>
          </Box>
          <Button variant="contained" sx={{ mt: 2, width: "100%" }}>
            Bayar
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Kasir</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { sm: 200, md: 300 },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Cari Barang"
                inputProps={{ "aria-label": "Cari Barang" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>
            <IconButton
              sx={{ display: { md: "none", xs: "inline-flex" } }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AddShoppingCart />
            </IconButton>
          </Box>
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} xl={3}>
            <Card>
              <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200/300"
                title={"Coba"}
              >
                <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
                  <Button variant="contained" size="small">
                    <AddShoppingCart />
                  </Button>
                </Box>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sweet Chocolate ChocoChips Croissant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sweet Chocolate ChocoChips Croissant paling enak sedunia
                </Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  Rp10000
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            zIndex: (theme) => theme.zIndex.drawer - 2,
          }}
          anchor="right"
        >
          <Toolbar />
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            zIndex: (theme) => theme.zIndex.drawer - 2,
          }}
          open
          anchor="right"
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
