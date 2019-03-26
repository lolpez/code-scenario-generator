(function () {
    const socket = io("/socket-index");
    const codeScenarioElement = document.getElementById("code-scenario");
    const codeResultElement = document.getElementById("code-result");

    codeScenarioElement.addEventListener("keyup", () => {
        socket.emit("new-scenario", codeScenarioElement.value);
    });

    socket.on("scenario-generated", (response) => {
        codeResultElement.value = response.code;
    });
})();