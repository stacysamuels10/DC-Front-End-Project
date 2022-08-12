const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const es6Renderer = require("express-es6-template-engine");
const { apiKeys } = require("./models/apikeys");

app.use(express.static("./public"));

app.use(express.json());
app.engine("html", es6Renderer);
app.set("views", "./public/html");
app.set("view engine", "html");
require("dotenv").config();

//get keys from database
app.get("/config", async (req, res) => {
  try {
    const findKey = await apiKeys.findOne({
      where: {
        id: 2,
      },
    });
    if (findKey) {
      res.status(200).send(findKey);
    }
  } catch (error) {
    res.status(400).send("Database is down");
  }
});

//home page
app.get("/", (req, res) => {
  res.render("index");
});

//faq page
app.get("/faqs", (req, res) => {
  res.render("faqs");
});
//gallery page
app.get("/gallery", (req, res) => {
  res.render("gallery");
});
//playlist page
app.get("/playlist", (req, res) => {
  res.render("playlist");
});
//registry page
app.get("/registry", (req, res) => {
  res.render("registry");
});
//rsvp page
app.get("/rsvp", (req, res) => {
  res.render("rsvp");
});
//schedule page
app.get("/schedule", (req, res) => {
  res.render("schedule");
});

app.listen(PORT);
