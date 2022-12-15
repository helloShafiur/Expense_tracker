const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorHandler, notFound } = require("../middlewares/errorMiddleware");
const dbConnect = require("./config/dbCOnnect");
const { registerUser } = require("./controllers/users/usersCtrl");
const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoutes");
const expenseRoute = require("./routes/expenses/expenseRoutes");
const app = express();

//ENV
dotenv.config();
// const logger = (req, res, next) => {
//   console.log(`I am Logger`);
//   next();
// };
// app.use(logger);
//dbConnect
dbConnect();

//Middleware
app.use(express.json());
app.use(cors());
// app.get('/', (req, res) => {
//     res.json(msg:"Welcome Expense Tracker API");
// });

//Users Route
app.use("/api/users", userRoute);

//Income Route
app.use("/api/income", incomeRoute);

//Expense Route
app.use("/api/expense", expenseRoute);

//Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
