const express = require("express");
const {
  generateNewShortURL,
  getAnalytics,
  redirectToOriginalURL,
} = require("../controllers/url");

const generateRoute = express.Router();
const redirectRoute = express.Router();

generateRoute.post("/", generateNewShortURL);

redirectRoute.get("/:shortId", redirectToOriginalURL);
redirectRoute.get("/:shortId/analytics", getAnalytics);

module.exports = { generateRoute, redirectRoute };
