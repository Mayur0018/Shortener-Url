const { getUser } = require("../Service/auth");

async function restrictToLoggeedinUserOnly(req, res, next) {
  try {
    const userId = req.headers["authorization"];
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const token = userId.split("Bearer ")[1]?.trim();
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const user = await getUser(token); // Assuming getUser is async
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function checkAuth(req, res, next) {
  try {
    const userId = req.headers["authorization"];
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const token = userId.split("Bearer ")[1]?.trim();
    const user = token ? await getUser(token) : null; // Assuming getUser is async
    req.user = user || null; // Attach user or null
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  restrictToLoggeedinUserOnly,
  checkAuth,
};
