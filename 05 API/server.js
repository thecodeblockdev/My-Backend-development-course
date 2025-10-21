import express from "express";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 5500;

app.get("/test", (req, res) => {
    const { username, year, subs } = req.query;
    console.log(req.query);
    res.send(`Searching for ${username} ${year} ${subs}`);
});

app.post("/test", (req, res) => {
    const { username, year } = req.body;
    res.send(`Username ${username} year ${year}`);
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
