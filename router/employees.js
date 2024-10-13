const express = require('express');
const { body, validationResult } = require('express-validator');
const EmployeeModel = require('../models/employees');
const router = express.Router();

router.get("/employees", (req, res) => {
    EmployeeModel.find()
        .then((employees) => {
            res.send(employees);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.post("/employees", (req, res) => {
    const employeeData = req.body; 
    console.log(employeeData); 
    const employee = new EmployeeModel(employeeData);
    
    employee.save()
        .then((newEmployee) => {
            res.status(201).send({ message: "Employee created successfully", employee: newEmployee }); 
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.get("/employees/:eid", (req, res) => {
    EmployeeModel.findById(req.params.eid)
        .then((employee) => {
            if (employee) {
                res.send(employee);
            } else {
                res.status(404).send({ message: "Employee not found" });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.put("/employees/:eid", (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.params.eid, req.body, { new: true })
        .then((employee) => {
            if (employee) {
                res.status(200).send({ message: "Employee details updated successfully." });
            } else {
                res.status(404).send({ message: "Employee not found." });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.delete("/employees/:eid", (req, res) => {
    EmployeeModel.findByIdAndDelete(req.params.eid)
        .then((employee) => {
            if (employee) {
                res.status(200).send({ message: "Employee deleted successfully." });
            } else {
                res.status(404).send({ message: "Employee not found." });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

module.exports = router;