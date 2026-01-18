import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import ejsMate from "ejs-mate";
import cors from "cors";

const app = express();

// 配置 CORS
app.use(
  cors({
    // origin: ["http://fuchslube.com.tw"],
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.engine("ejs", ejsMate); // 使用 ejs-mate
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/", route);

app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000"),
);
