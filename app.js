import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import ejsMate from "ejs-mate";

const app = express();

app.engine("ejs", ejsMate);  // 使用 ejs-mate
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/", route);

app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/");
    res.render("dashboard", { username: req.session.user.username, title: "管理後台" });
});

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
