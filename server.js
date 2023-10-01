const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const dbURI = "mongodb+srv://user:WUwOUwxnSCSsDsAq@cluster0.etusjph.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => console.log("Database Connected"),
        app.listen(port, () => {
            console.log(`Running on port ${port}`);
        })
    )
    .catch((err) => console.log(err));

const user = require("./api/routes/user");
const task = require("./api/routes/task");

app.use("/", user);
app.use("/", task);