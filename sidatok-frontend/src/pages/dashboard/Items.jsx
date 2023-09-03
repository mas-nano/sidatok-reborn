import {
  Add,
  AddShoppingCart,
  Delete,
  Edit,
  Save,
  Search,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Pagination,
  PaginationItem,
  Paper,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import client from "../../axios";
import { Link, useLocation } from "react-router-dom";

export default function Items() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [photo, setPhoto] = useState({});
  const [detail, setDetail] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uuidItem, setUuidItem] = useState("");
  const [message, setMessage] = useState("");
  const [dialogLoading, setDialogLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [errors, setErrors] = useState({
    name: [],
    price: [],
    discount: [],
    detail: [],
    photo: [],
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    setErrors({ ...errors, photo: [] });
    setPhotoName(file.name);
    setPhoto(file);
    reader.onloadend = () => {
      setPhotoUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  async function getData(page) {
    setInitLoading(true);
    const res = await client.get(`/item?page=${page}&search=${search}`);
    setItems(res.data.data);
    setInitLoading(false);
  }
  useEffect(() => {
    getData(page).catch((err) => {
      setInitLoading(false);
      console.log(err);
    });
  }, [page]);
  useEffect(() => {
    const fetch = setTimeout(() => {
      getData(page).catch((err) => {
        setInitLoading(false);
        console.log(err);
      });
    }, 500);
    return () => clearTimeout(fetch);
  }, [search]);
  function handleClose() {
    setOpen(!open);
    setName("");
    setPrice("");
    setDiscount("");
    setDetail("");
    setPhoto("");
    setPhotoName("");
    setPhotoUrl("");
    if (!isCreate) {
      setIsCreate(true);
    }
  }
  function handleSubmit() {
    setDialogLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("detail", detail);
    formData.append("discount", discount);
    if (isCreate) {
      formData.append("photo", photo);
      client
        .post("/item/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDialogLoading(false);
          setSnackbar(true);
          setMessage("Barang berhasil ditambahkan");
          handleClose();
          getData(page).catch((err) => {
            setSnackbar(true);
            setMessage("Data barang gagal diambil");
            console.log(err);
          });
        })
        .catch((err) => {
          setDialogLoading(false);
          console.log(err);
          if (err.response.status === 422) {
            setErrors({ ...errors, ...err.response.data.errors });
          } else {
            setSnackbar(true);
            setMessage("Barang gagal ditambahkan");
          }
        });
    } else {
      if (photo) {
        formData.append("photo", photo);
      }
      formData.append("_method", "PUT");
      client
        .post(`/item/${uuidItem}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDialogLoading(false);
          setSnackbar(true);
          setMessage("Barang berhasil diperbarui");
          handleClose();
          getData(page).catch((err) => {
            setSnackbar(true);
            setMessage("Data barang gagal diambil");
            console.log(err);
          });
        })
        .catch((err) => {
          setDialogLoading(false);
          console.log(err);
          if (err.response.status === 422) {
            setErrors({ ...errors, ...err.response.data.errors });
          } else {
            setSnackbar(true);
            setMessage("Barang gagal diperbarui");
          }
        });
    }
  }
  function getSingleData(uuid) {
    setButtonLoading(true);
    client
      .get(`/item/${uuid}`)
      .then((res) => {
        setOpen(true);
        setUuidItem(res.data.data.uuid);
        setName(res.data.data.name);
        setPrice(res.data.data.price);
        setDiscount(res.data.data.discount ?? "");
        setDetail(res.data.data.detail);
        setPhotoUrl(
          `${process.env.REACT_APP_BASE_URL_API_STORAGE}/${res.data.data.photo}`
        );
        setIsCreate(false);
        setButtonLoading(false);
      })
      .catch((err) => {
        setSnackbar(true);
        setMessage("Data barang gagal diambil");
        setButtonLoading(false);
        console.log(err);
      });
  }
  function alertOpen(uuid) {
    setUuidItem(uuid);
    setAlert(true);
  }
  function handleCloseAlert() {
    setDialogLoading(true);
    client
      .delete(`/item/${uuidItem}`)
      .then((res) => {
        setAlert(false);
        setSnackbar(true);
        setMessage("Barang berhasil dihapus");
        setDialogLoading(false);
        getData(page).catch((err) => {
          setSnackbar(true);
          setMessage("Data barang gagal diambil");
          console.log(err);
        });
      })
      .catch((err) => {
        setSnackbar(true);
        setMessage("Data gagal dihapus");
        setDialogLoading(false);
        setAlert(false);
        console.log(err);
      });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5">Barang</Typography>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              mr: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Cari Barang"
              inputProps={{ "aria-label": "cari barang" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
          <Button variant="contained" onClick={() => setOpen(!open)}>
            <Add sx={{ mr: { xs: 0, md: 1 } }} />
            <Typography sx={{ display: { xs: "none", md: "block" } }}>
              Tambah Barang
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            flex: 1,
            mr: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Cari Barang"
            inputProps={{ "aria-label": "cari barang" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <Button variant="contained" onClick={() => setOpen(!open)}>
          <Add sx={{ mr: { xs: 0, md: 1 } }} />
          <Typography sx={{ display: { xs: "none", md: "block" } }}>
            Tambah Barang
          </Typography>
        </Button>
      </Box>
      {initLoading ? (
        <Grid container spacing={2} mt={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val) => (
            <Grid item xs={12} md={4} lg={3} xl={2} key={val}>
              <Card>
                <Skeleton
                  sx={{ height: 140 }}
                  animation="wave"
                  variant="rectangular"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Skeleton animation="wave" />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Skeleton animation="wave" />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {items.data.length > 0 ? (
            <Grid container spacing={2} mt={2}>
              {items.data.map((val) => (
                <Grid item xs={12} md={4} lg={3} xl={2} key={val.id}>
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`${process.env.REACT_APP_BASE_URL_API_STORAGE}/${val.photo}`}
                      title={val.name}
                    >
                      <Box
                        sx={{ display: "flex", justifyContent: "end", p: 1 }}
                      >
                        <Button variant="contained" size="small">
                          <AddShoppingCart />
                        </Button>
                      </Box>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {val.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {val.detail}
                      </Typography>
                      <Typography variant="h5" sx={{ marginTop: 1 }}>
                        Rp{val.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => alertOpen(val.uuid)}
                      >
                        Hapus
                      </Button>
                      <LoadingButton
                        startIcon={<Edit />}
                        loading={buttonLoading}
                        size="small"
                        onClick={() => getSingleData(val.uuid)}
                      >
                        Ubah
                      </LoadingButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h5" textAlign={"center"} marginTop={2}>
              Tidak ada barang yang tersedia
            </Typography>
          )}
        </>
      )}
      <Box my={2} sx={{ display: "flex", justifyContent: "end" }}>
        <Pagination
          page={page}
          count={items.last_page}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/items${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isCreate ? "Tambah Barang" : "Perbarui Barang"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            Silakan isi data barang Anda
          </DialogContentText>
          <TextField
            autoFocus
            label="Nama"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            error={errors.name.length !== 0}
            helperText={errors.name}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: [] });
            }}
          />
          <TextField
            label="Harga"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            error={errors.price.length !== 0}
            helperText={errors.price}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors({ ...errors, price: [] });
            }}
          />
          <TextField
            label="Diskon"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            error={errors.discount.length !== 0}
            helperText={errors.discount}
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
              setErrors({ ...errors, discount: [] });
            }}
          />
          <TextField
            label="Detail"
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            error={errors.detail.length !== 0}
            helperText={errors.detail}
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
              setErrors({ ...errors, detail: [] });
            }}
          />
          <FormControl>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="gambar"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label
              htmlFor="gambar"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Button
                variant="outlined"
                component="span"
                sx={{ marginRight: 2 }}
              >
                Pilih Gambar
              </Button>
              <span>{photoName}</span>
            </label>
            <FormHelperText error={errors.photo.length !== 0}>
              {errors.photo}
            </FormHelperText>
          </FormControl>
          {photoUrl && <img src={photoUrl} alt="" style={{ width: "100%" }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <LoadingButton
            loading={dialogLoading}
            startIcon={<Save />}
            onClick={handleSubmit}
          >
            Simpan
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus barang ini?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Barang akan terhapus dari sistem dan tidak dapat dikembalikan
            kembali.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlert(false)}>Batal</Button>
          <LoadingButton
            onClick={handleCloseAlert}
            autoFocus
            color="error"
            loading={dialogLoading}
            startIcon={<Save />}
          >
            Hapus
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        message={message}
      />
    </>
  );
}
