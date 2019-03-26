var express = require("express");
var router = express.Router();

const indexRouter = (io) => {
	/* GET home page. */
	router.get("/", function (req, res, next) {
		res.render("index", { title: "Code Scenario Generator" });
	});

	io.on("connection", (socket) => {
		socket.on("new-scenario", (data) => {
			const steps = data.split("\n");
			var result = "";
			var stepsCount = 0;
			steps.forEach((step) => {
				stepsCount++;
				result += `// ${stepsCount}. ${step}\n\n`;
			});
			io.emit("scenario-generated", {
				stepsCount: stepsCount,
				result: result
			});
		});
	});

	return router;
};

module.exports = indexRouter;
