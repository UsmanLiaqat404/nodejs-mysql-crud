const express = require("express");
const router = express.Router();

const service = require("../services/employee.service");

const db = require("../db");

// Get all employees
router.get("/", async (req, res) => {
  const employees = await service.getAllEmployees();
  res.send(employees);
});

// Get employee by id
router.get("/:id", async (req, res) => {
  const [employee] = await service.getEmployeeById(req.params.id);
  console.log(employee);
  if (employee === undefined)
    return res
      .status(404)
      .send("Employee not found with the given id : " + req.params.id);

  res.send(employee);
});

// delete employee
router.delete("/:id", async (req, res) => {
  const employee = await service.getEmployeeById(req.params.id);
  if (employee.length === 0)
    return res
      .status(404)
      .send("Employee not found with the given id : " + req.params.id);

  await service.deleteEmployee(req.params.id);
  res.send("Employee deleted successfully");
});

module.exports = router;

// add employee
router.post("/", async (req, res) => {
  await service.addOrEditEmployee(req.body);

  res.status(201).send("Employee added successfully");
});

// edit employee
router.put("/:id", async (req, res) => {
  const employee = await service.getEmployeeById(req.params.id);
  if (employee.length === 0)
    return res
      .status(404)
      .send("Employee not found with the given id : " + req.params.id);

  await service.addOrEditEmployee(req.body, req.params.id);
  res.send("Employee updated successfully");
});
