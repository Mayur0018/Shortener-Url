const { getUser } = require("../Service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}
// async function restrictToLoggeedinUserOnly(req, res, next) {
//   const userId = req.headers["Authorization"];
//   if (!userId) return res.redirect("/login");
//   const token = userId.split("Bearer")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userId = req.headers["authorization"];
//   const token = userId.split("Bearer")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }

function restrictTo(role = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!req.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }

    return next();
  };
}
module.exports = {
  // restrictToLoggeedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
};
