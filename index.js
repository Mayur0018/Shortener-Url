const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication,restrictTo } = require("./Middlewares/auth");
const { ConnectionMongodb } = require("./connect");
const URL = require("./Models/url");

// Routes
const urlRoutes = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");

ConnectionMongodb(
  "mongodb+srv://mayurnish18:mayur123@cluster0.ks1hcpc.mongodb.net/"
).then(() => console.log("MongoDb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
app.use("/url", restrictTo("NORMAL"), urlRoutes);
app.use("/user", userRoute);
app.use("/", checkForAuthentication, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {   
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server Was Started At Port: ${PORT}`));
