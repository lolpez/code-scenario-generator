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
			for (var i = 0; i < steps.length; i++) {
				result += `// ${i + 1}. ${steps[i]}\n\n`;
			}
			io.emit("scenario-generated", {
				steps: 11,
				result: result
			});
		});
	});

	return router;
};

module.exports = indexRouter;
