(function () {
    const socket = io("/socket-index");
    const codeScenarioElement = document.getElementById("code-scenario");
    const codeResultElement = document.getElementById("code-result");
    const pasteButtonElement = document.getElementById("paste-button");
    const copyButtonElement = document.getElementById("copy-button");
    const stepsCountElement = document.getElementById("steps-count");

    codeScenarioElement.addEventListener("keyup", () => {
        sendData();
    });

    socket.on("scenario-generated", (response) => {
        codeResultElement.value = response.result;
        stepsCountElement.innerHTML = ` (${response.stepsCount} step${(response.stepsCount > 1) ? "s" : ""})`;
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
        if (codeScenarioElement.value.length > 0) {
            socket.emit("new-scenario", codeScenarioElement.value);
        } else {
            updateResult("", 0);
        }
    }

    function updateResult(result, stepsCount) {
        codeResultElement.value = result;
        if (stepsCount > 0) {
            stepsCountElement.innerHTML = ` (${stepsCount} step${(stepsCount > 1) ? "s" : ""})`;
        } else {
            stepsCountElement.innerHTML = "";
        }
    }
})();