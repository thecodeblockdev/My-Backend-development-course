import express from "express";
import { v4 as uuid } from "uuid";

uuid(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
import methodOverride from "method-override";
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

let comments_array = [
    {
        id: uuid(),
        username: "Ankit",
        comments: "Hello world my name is Ankit",
    },
    {
        id: uuid(),
        username: "Rom",
        comments: "I am rom",
    },
    {
        id: uuid(),
        username: "Cheeky",
        comments: "Hello world This is cheeky",
    },
    {
        id: uuid(),
        username: "John Wick",
        comments: "Who killed my dog?",
    },
];

const port = 5500;

app.get("/comments", (req, res) => {
    res.render("comments/index", { comments_array });
});

app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});
app.post("/comments/new", (req, res) => {
    const { username, comments } = req.body;
    comments_array.push({ username, comments, id: uuid() });
    res.redirect("/comments");
});
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments_array.find((c) => {
        return c.id === id;
    });
    res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comment = comments_array.find((c) => {
        return c.id === id;
    });
    res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
    // console.log(req.body.comments);
    const { id } = req.params;
    const newCommentText = req.body.comments;
    const foundComment = comments_array.find((c) => {
        return c.id === id;
    });
    foundComment.comments = newCommentText;
    res.redirect("/comments");
});
// CRU => D
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments_array = comments_array.filter((c) => c.id !== id);
    res.redirect("/comments");
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

// GET /comments => Showing all the comments
// POST /comments => Make a new comment
// GET /comments/:id => Get a comment with it's id
// PATCH /comments/:id => Updates a comment
// GET /comments/:id/edit => edit a comment
// DELETE /comments/:id => Deletes a comment with provided ID

// []

// comments

// username
// text

// Ankit says hiii

// GET / allcomments;
// GET / all;
// GET / hereisallthecomments;

// POST / newcomment;
// POST / makeanewcomment;
// POST / postyourcomment;
