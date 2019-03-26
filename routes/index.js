var express = require("express");
var router = express.Router();



const indexRouter = (io) => {
	/* GET home page. */
	router.get("/", function (req, res, next) {
		res.render("index", { title: "Code Scenario Generator" });
	});

	io.on("connection", (socket) => {
		socket.on("new-scenario", (data) => {
			io.emit("scenario-generated", {
				steps: 11,
				code: data
			});
		});
	});

	return router;
};

module.exports = indexRouter;
