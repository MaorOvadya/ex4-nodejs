const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");

/* ---------------------------- setups and config --------------------------- */
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/* ------------------------------- middleware ------------------------------- */
app.use("/api/members", require("./routes/members"));

app.get("/", async (req, res, next) => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/members");
    const members = data;
    res.render("index", { members });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/members/${id}`);
    const members = data[0];
    res.render("index", { members });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", (req, res) => res.json({ msg: "Health Check" }));

app.use((req, res) => res.sendFile(path.join(__dirname, "public", "404.html")));

/* -------------------------------- listener -------------------------------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT);
