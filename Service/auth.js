const jwt = require("jsonwebtoken");
const secret = "Mayur@123#123";
function setUser(user) {
  const payload = {
    ...user,
  };
  return jwt.sign(payload, secret);
}

function getUser(tokken) {
  if (!tokken) return null;
  return jwt.verify(tokken, secret);
}

module.exports = {
  setUser,
  getUser,
};
