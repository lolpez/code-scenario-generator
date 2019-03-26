(function () {
    const socket = io("/socket-index");
    const codeScenarioElement = document.getElementById("code-scenario");
    const codeResultElement = document.getElementById("code-result");
    const pasteButtonElement = document.getElementById("paste-button");
    const copyButtonElement = document.getElementById("copy-button");

    codeScenarioElement.addEventListener("keyup", () => {
        sendData();
    });

    socket.on("scenario-generated", (response) => {
        codeResultElement.value = response.result;
    });

    pasteButtonElement.addEventListener("click", () => {
        navigator.clipboard.readText()
            .then((text) => {
                codeScenarioElement.value = text;
                sendData();
            })
            .catch((err) => {
                alert("Failed to read clipboard contents");
            });
    });

    copyButtonElement.addEventListener("click", () => {
        codeResultElement.select();
        document.execCommand("copy");
    });

    function sendData() {
        socket.emit("new-scenario", codeScenarioElement.value);
    }
})();