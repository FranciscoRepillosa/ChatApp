const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const authController = require("./user/controllers/auth.controller");

const app = express();

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cors())

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

/*
app.use((req,res,next) => {
  console.log("test middleware");
  console.log(req.url);
  next();
}) 
*/

const userRoutes = require("./user/routes.config");
const invitationRoutes = require("./invitation/routes.config");
const taskRoutes = require("./task/routes.config");
const companyRoutes = require("./company/routes.config");

app.use("/user", userRoutes);
app.use("/invitation", invitationRoutes);
app.use("/task", taskRoutes);
app.use("/company", companyRoutes);
app.use("/", authController.protect, (req,res) => {
  res.render("homepage");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TaskApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(" we're connected!! ");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server running on ${port}`);
})