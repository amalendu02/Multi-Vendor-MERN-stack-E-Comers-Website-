const express = require("express");
const ErrorHandler = require("./utils/Errorhandler")

const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));


// config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path:"backend/config/.env"
    })
}

// import routes
const user = require("./controller/user");

app.use("/app/v2/user", user);


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;