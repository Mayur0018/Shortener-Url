const { nanoid } = require("nanoid");
const URL = require("../Models/url");
async function handleGenrateNewUrl(req, res) {
  const body = req.body;
  if (!body.URL) return res.status(400).json({ error: "Url  is required" });
  const shortId = nanoid(8);
  URL.create({
    shortId: shortId,
    redirectURL: body.URL,
    visitHistory: [],
    createdBy: req.user._id
  });

  return res.render("home", {
    id: shortId,
  });
}

async function handlegetanlysis(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenrateNewUrl,
  handlegetanlysis,
};
