import express from "express";

const app = express();

// example is "sportsnews.com"

// root of ur website is fetched

// Routings

app.get("/", (req, res) => {
    res.send("<h4>Hello and welcome the sportsnews.com</h4>");
});
app.get("/score", (req, res) => {
    // res.send("Live score");
    res.json({
        name: "Sportsnews.com",
        old: "3 years old",
    });
});

// Dynacmic route patterns using express Path Parameters
app.get("/news/:topics/:sortby", (Req, res) => {
    console.log(req.params.topics);
    const { topics, sortby } = req.params;
    // const { sortby } = req.params;
    res.send(`You are fetching the details for ${topics} sorted by ${sortby}`);
});
// Query Strings
app.get("/search", (req, res) => {
    // console.log(req.query)
    const { q, color, model } = req.query;
    res.send(`Searching... for ${q} with ${color} color and model is ${model}`);
});
// Create multiple routes such as contact, about

// Server configured here
app.listen("3000", () => {
    console.log(`Server is listening on port 3000`);
});
