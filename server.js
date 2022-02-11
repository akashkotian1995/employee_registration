var express = require("express");
var mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/employeeData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;

app.use(express.json());

// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });

    return res.redirect("index.html");
});

app.post("/formFillUp", (req, res) => {
    console.log(req.body);

    var data = {
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        bloodGroup: req.body.bloodGroup,
        designation: req.body.designation,
        skills: req.body.skills
    };

    db.collection("employee").insertOne(
        data, (err, result) => {
            if (err) {
                throw err;
            }
            if (result) {
                console.log(result);
            }
            console.log("Data inserted successfully!");
        });

    return res.redirect("formSubmitted.html");
});

app.get("/viewEmployees", (req, res) => {
    db.collection("employee").find().toArray((err, data) => {
        if (err) {
            throw err
        }
        if (data) {
            console.log(data);
            res.send(data)
        }
    })
})

app.listen(port, () => {
    console.log(`The application started
successfully on port ${port}`);
});
