require("dotenv").config();
const express = require('express');
const app = express();
const configs = require("./payments/configs");

const { default: helmet } = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const path = require("path");

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors({
	origin: "*",
	// credentiahttpls: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	expressSession({
		secret: "SUDTECH",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);
app.use(express.static(path.join(__dirname, "public")));


app.use("/payments/v1", require("./payments/routes"));

// init routers
app.get("/", (req, res, next) => {
	return res.status(200).json({
		msg: "Payment gateways Initialization",
	});
});

// handling error

app.use((req, res, next) => {
	const error = new Error("❌ 404 Not Found");
	error.status = 404;

	next(error);
});

app.use((err, req, res, next) => {
	const statusCode = err.code || 500;
	return res.status(statusCode).json({
		success: false,
		code: statusCode,
		stack: err.stack,
		message: err.message || "❌ Internal Server Error",
	});
});

app.listen(configs["port"], () => {
	console.log(`🚀 Server ready on port ${configs["port"]}`);
});
