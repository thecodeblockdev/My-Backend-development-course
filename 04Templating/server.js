import express from "express";
const app = express();
const PORT = 3000;
import path from "path";
import { fileURLToPath } from "url";

import { readFileSync } from "fs";
// express.static setup
app.use(express.static("assets"));
// Reading and Parsing JSON Safely
const rawData = readFileSync("./data.json");
// console.log(rawData);
const redditDataMimic = JSON.parse(rawData);
// console.log(redditDataMimic);
// Setting up View Engine
app.set("view engine", "ejs");

// Always do this
const __fileName = fileURLToPath(import.meta.url); // resolved path to the file
// console.log(__fileName);
const __dirName = path.dirname(__fileName);
// console.log(__dirName);
// Changing views directory name to any other name
app.set("views", path.join(__dirName + "/views"));
// console.log(path.join(__dirName + "/views"));
// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "home" });
});
app.get("/rand", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    res.render("rand", { randomNumber, title: "rand" });
});
app.get("/r/:subreddit/:description", (req, res) => {
    const { subreddit } = req.params;
    const { description } = req.params;
    res.render("subreddit", { subreddit, description });
});
app.get("/fruits", (req, res) => {
    const fruitsData = ["Cherry", "Banana", "Mango", "Papaya"];
    res.render("fruits", { fruitsData, title: "Fruits" });
});
app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditDataMimic[subreddit];
    // redditDataMimic["cat"]
    if (data) {
        res.render("subreddit", { ...data, title: "subreddit" });
    } else {
        res.render("notfound", { subreddit, title: "subreddit" });
    }
});
// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
