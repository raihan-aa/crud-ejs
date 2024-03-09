const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

let dataMahasiswa = [
  {
    id: 1,
    nama: "John Doe",
    nim: "123456789",
    angkatan: 2020,
    kelas: "A1",
  },
  {
    id: 2,
    nama: "Jane Doe",
    nim: "987654321",
    angkatan: 2019,
    kelas: "B2",
  },
  {
    id: 3,
    nama: "Alice",
    nim: "456789123",
    angkatan: 2021,
    kelas: "C3",
  },
  {
    id: 4,
    nama: "Bob",
    nim: "789123456",
    angkatan: 2018,
    kelas: "D4",
  },
  {
    id: 5,
    nama: "Eve",
    nim: "321654987",
    angkatan: 2022,
    kelas: "E5",
  },
];

let alert = "";
let alertHapus = "";
let alertEdit = "";

app.get("/", (req, res) => {
  res.render("index", {
    dataMahasiswa,
    title: "Halaman Utama",
    alert,
    alertHapus,
    alertEdit,
  });
  alert = "";
  alertHapus = "";
  alertEdit = "";
});

app.get("/halaman-tambah", (req, res) => {
  return res.render("tambah", {
    title: "Halaman Tambah Data",
  });
});

app.get("/halaman-edit/:id", (req, res) => {
  const id = req.params.id;
  let dataEdit;
  dataMahasiswa.forEach((dtm) => {
    if (Number(id) == dtm.id) {
      dataEdit = dtm;
    }
  });
  return res.render("edit", {
    dataEdit,
    title: "Halaman Edit Data",
  });
});

app.post("/aksi-tambah", (req, res) => {
  const { nama, nim, angkatan, kelas } = req.body;
  const lastIndex = dataMahasiswa.length - 1;
  const lastData = dataMahasiswa[lastIndex];
  const id = lastData.id + 1;

  dataMahasiswa.push({
    id,
    nama,
    nim,
    angkatan,
    kelas,
  });
  console.log(dataMahasiswa);
  alert = "Berhasil Menambahkan Data";
  return res.redirect("/");
});
app.post("/aksi-edit", (req, res) => {
  const { id, nama, nim, angkatan, kelas } = req.body;

  dataMahasiswa.forEach((dtm, index) => {
    if (Number(id) == dtm.id) {
      dataMahasiswa[index] = {
        id,
        nama,
        nim,
        angkatan,
        kelas,
      };
    }
  });
  alertEdit = "Data Berhasil Diedit";
  return res.redirect("/");
});

app.get("/aksi-hapus/:id", (req, res) => {
  const id = req.params.id;

  dataMahasiswa.forEach((dtm, index) => {
    if (Number(id) == dtm.id) {
      dataMahasiswa.splice(index, 1);
    }
  });
  alertHapus = "Data Berhasil Dihapus";
  return res.redirect("/");
});

app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});
