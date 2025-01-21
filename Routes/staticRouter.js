const express = require("express");
const router = express.Router();
const {} = require("../Middlewares/auth")
const URL = require("../Models/url");
router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login")
  const allUrls = await URL.find({createdBy : req.user._id});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signUp", (req, res) => {
  return res.render("signUp");
}); 

router.get("/login", (req, res) => {
  return res.render("login");
}); 

module.exports = router;
