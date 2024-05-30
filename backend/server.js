const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Port number
const port = 5050;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Connecting database
mongoose.connect("mongodb://localhost:27017/finance");

// Define schema
const userSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  reason: String,
  date: Date,
});

// Create a model based on the schema
const userModel = mongoose.model("transactions", userSchema); //creating collection

app.post("/exp", async (req, res) => {
  const category = req.body.category;
  const amount = req.body.amount;
  const reason = req.body.reason;
  const date = req.body.expdate;

  try {
    // Create a new user document
    const newUser = new userModel({ category, amount, reason, date });

    // Save the user document to the database
    await newUser.save();

    console.log({ category, amount, reason, date });

    // Send a response
    res.status(200).sendFile(path.join(__dirname, "public", "Registered.html"));
    // res.send('Registered')
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).send("Error saving data to MongoDB");
  }
});


app.get("/here", (req, res) => {
  userModel.find().then((users) => {
    res.json(users);
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
