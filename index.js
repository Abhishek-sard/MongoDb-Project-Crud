let express = require("express");
const cors = require("cors");
const { dbConnection } = require("./dbConnection");

let app = express();

app.use(express.json());
app.use(cors());

app.get("/student-read", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");

    let data = await studentCollection.find().toArray();
    let resobj = {
        status: 1,
        msg: "Students List",
        data
    };

    res.send(resobj);
});

app.post("/student-insert", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");

    let { sName, sEmail } = req.body;
    let obj = { sName, sEmail };

    let insertRes = await studentCollection.insertOne(obj);

    let resobj = {
        status: 1,
        msg: "Data inserted",
        insertRes
    };

    res.send(resobj);
});

app.listen(8000, () => console.log("Server running on port 8000"));
