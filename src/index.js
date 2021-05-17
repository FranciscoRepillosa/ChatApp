const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

const userRoutes = require("./user/routes.config");
const teamRoutes = require("./teams/routes.config");
const taskRoutes = require("./task/routes.config");

app.use("/user", userRoutes);
app.use("/teams", teamRoutes);
app.use("/task", taskRoutes);
console.log(taskRoutes);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ManagmentApp', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(" we're connected!! ");
});


const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`server running on ${port}`);
})