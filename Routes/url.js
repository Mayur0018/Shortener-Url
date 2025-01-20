const express = require("express");
const { handleGenrateNewUrl ,handlegetanlysis} = require("../Controllers/url");
const router = express.Router();

router.post("/", handleGenrateNewUrl);

router.get("/analytics/:shortId",handlegetanlysis)
module.exports = router;