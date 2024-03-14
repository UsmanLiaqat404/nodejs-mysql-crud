const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("express-async-errors");

const db = require("./db");

const employeeRoutes = require("./controllers/employee.controller");

app.use(bodyParser.json());
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Employee CRUD API made with Node.js and MySQL. ");
});

app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(err.status || 500).send("Something went wrong!");
});

db.query("SELECT 1")
  .then(() => {
    console.log("db connection success");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("db connection failed. \n", err));
