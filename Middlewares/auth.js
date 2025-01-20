const { getUser } = require("../Service/auth");
async function restrictToLoggeedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) return res.redirect("/login");
  const user = getUser(userId);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req,res,next){
  const userId = req.cookies?.uid;
  const user = getUser(userId);
  req.user = user;
  next();
}
module.exports = {
    restrictToLoggeedinUserOnly,
    checkAuth
}