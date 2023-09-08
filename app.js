const express = require("express");
const dotenv = require("dotenv");

const indexRoute = require("./routes/index");

dotenv.config();

const app = express();
app.use("/", indexRoute);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
	const err = new Error();
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, _next) {
	res.sendStatus(err.status || 500);
});

module.exports = app;
