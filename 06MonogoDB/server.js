import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;

app.use(express.json());
// Connect Mongo Database

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongodb Connected Successfully");
    })
    .catch((err) => {
        console.log(`Error ${err}`);
    });

// SCHEMA (Blueprint)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: Number,
});

// Model

const User = mongoose.model("user", userSchema);

// CRUD Operation

app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});
// Get all the users

app.get("/users", async (req, res) => {
    const user = await User.find();
    res.json(user);
});

// Get individual user by thier ID
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Update a user data

app.put("/users/:id", async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updateUser);
});

// Delete
app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});

// A list of students data
// name: {type: String, min: max:}
// email:
// age:

// township
// bluePrint of simple 2bhk house
