const express = require("express");
const app = express();

const db = require("./db");

const employeeRoutes = require("./controllers/employee.controller");

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Employee CRUD API made with Node.js and MySQL. ");
});

db.query("SELECT 1")
  .then(() => {
    console.log("db connection success");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("db connection failed. \n", err));
