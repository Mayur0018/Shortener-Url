const User = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../Service/auth");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(user);

  if (!user)
    return res.render("login", {
      error: "InValid UserName Or Password",
    });
  const tokken = setUser(user);
  res.cookie("token", tokken);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
