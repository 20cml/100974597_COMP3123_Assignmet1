const express = require('express');
const { body, validationResult } = require('express-validator');
const EmployeeModel = require('../models/employees');
const router = express.Router();
const mongoose = require('mongoose');

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
            res.status(201).send({ message: "employee created successfully", employee: newEmployee }); 
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.get("/employees/:eid", (req, res) => {
    const { eid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eid)) {
        return res.status(400).send({ message: "missing character" });
    }

    EmployeeModel.findById(eid)
        .then((employee) => {
            if (employee) {
                return res.send(employee);
            }
            throw new Error("employee not found");
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

router.put("/employees/:eid", (req, res) => {
    const { eid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eid)) {
        return res.status(400).send({ message: "missing character" });
    }

    EmployeeModel.findByIdAndUpdate(eid, req.body, { new: true })
        .then((employee) => {
            if (employee) {
                res.status(200).send({ message: "employee details updated successfully!", employee });
            } 
            throw new Error("employee not found");
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});


router.delete("/employees/:eid", (req, res) => {
    const { eid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eid)) {
        return res.status(400).send({ message: "missing character" });
    }

    EmployeeModel.findByIdAndDelete(eid)
        .then((employee) => {
            if (employee) {
                res.status(200).send({ message: "employee deleted successfully." });
            } 
            throw new Error("employee not found");
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

module.exports = router;