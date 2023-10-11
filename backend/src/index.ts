require("dotenv").config();
const express = require("express");
const { connectDB } = require("./backend");
const { errorHandler, corsOptionsDelegate } = require("./middleware");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
// app.use(Secure);
app.use("/", require("./routes"));
app.use((req: any, res: any) => {
  res.status(404).json({ message: "Route not found!!" });
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`server start at http://localhost:${PORT}`));
