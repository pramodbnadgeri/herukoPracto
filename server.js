const express = require("express");
const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");
// const { stringify } = require("nodemon/lib/utils");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(5000, () => {
    console.log("welcome to mongoDB and server running on 5000");
})

try {
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) =>
        console.log("connected", err));
}
catch (error) {
    console.log("could not connect");
}

const userSchema = new mongoose.Schema({
    name: String, age: Number, number: Number, email: String
});

const userModel = new mongoose.model(
    "users",
    userSchema,
    "practiceCollection",
)

app.post('/createUsers', jsonParser, async (req, res) => {
    const user = await new userModel({
        name: req.body.name,
        age: req.body.dob,
        number: req.body.phone,
        email: req.body.email
    }).save();

    res.send(user);
    // await user.save()
    //     .then(data => {
    //     })
    //     .catch(err => {
    //         console.log(err, 'err');
    //         res.status(500).send({
    //             errorMessage: err.message || "Some error occurred while creating the user."
    //         });
    //     })
})