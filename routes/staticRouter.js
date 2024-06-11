const express = require("express");
const URL = require("../models/url");
const homeRoute = express.Router();
const appRoute = express.Router();

homeRoute.get("/", (req, res) => {
  console.log("Hemlo from home page");
  return res.render("home-page");
});

homeRoute.get("/login", (req, res) => {
  return res.render("logIn-page");
});

homeRoute.get("/register", (req, res) => {
  return res.render("register-page");
});

appRoute.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("application-page", { urls: allUrls });
});

module.exports = { homeRoute, appRoute };
