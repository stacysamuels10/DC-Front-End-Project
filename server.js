const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const es6Renderer = require("express-es6-template-engine");

app.use(express.static("./public"));

app.use(express.json());
app.engine("html", es6Renderer);
app.set("views", "./public/html");
app.set("view engine", "html");

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
app.get("/api_secret", async (req, res) => {
  try {
    var apiKey = {
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
    };
    console.log(apiKey);
    res.status(200).send(apiKey);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(PORT);
