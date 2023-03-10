const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);
const sessSettings = expressSession({
  path: "/",
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 360000,
  },
});

//app settings
app.use(sessSettings);
const PORT = process.env.PORT || 8000;

//mongoose
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  logger.info(" Mongodb connected successfully");
});

app.get("/", (req, res) => {
  res.status(200).json({ messsage: "Server is running!" });
});

app.use("/api/Products", require("./routes/productRoutes"));
app.use("/api/Feedbacks", require("./routes/feedbackRoutes"));
app.use("/api/Complaints", require("./routes/ComplaintsRoutes"));
app.use("/api/order", require("./routes/order"));
app.use("/api/shipping", require("./routes/shipping"));
app.use("/api/delivery", require("./routes/delivery"));
app.use("/api/users", require("./routes/userManageRoutes"));
app.use("/api/store", require("./routes/storeRoutes"));

//customer routes
app.use("api/customer", require("./routes/UserRoutes"));

//cart routes
app.use("/api/customerCart", require("./routes/cartRoutes"));

app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});