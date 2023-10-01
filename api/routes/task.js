const express = require("express");
const Task = require("../models/taskModel");
const { body, validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

router.post("/createTask", [
    body("title").not().isEmpty(),
    body("description").not().isEmpty(),
    body("due_Date").not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0],
            });
        }

        const taskDetails = {
            title: req.body.title,
            description: req.body.description,
            due_Date: req.body.due_Date,
        };

        const newTask = new Task(taskDetails);
        newTask.save().then((result) => {
            return res.status(200).json({ msg: "Task Created Successfully!!!", details: result });
        }).catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        });
    }
);

/*=======================================================
                    Get All Task Data
=========================================================*/

router.get("/getTasks", async (req, res) => {
    try {
        const getTask = await Task.find({});
        res.send(getTask);
    } catch (e) {
        res.send(e);
    }
});

/*=======================================================
                    Get Task by ID
=========================================================*/

router.get("/getTask/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        if (!ObjectId.isValid(_id)) {
            return res.status(400).send(`No records with given id : ${_id}`);
        }

        const getTask = await Task.findById({ _id });
        res.status(200).send(getTask);

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

/*=======================================================
                    Update Task
=========================================================*/

router.put("/updateTask/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const updateTask = await Task.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateTask);
    } catch (e) {
        res.status(500).send(e);
    }
});

/*=======================================================
                    Delete Task
=========================================================*/

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        res.send(deleteTask);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;