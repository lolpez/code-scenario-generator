(function () {
    const codeScenarioElement = document.getElementById("code-scenario");
    const codeResultElement = document.getElementById("code-result");
    const pasteButtonElement = document.getElementById("paste-button");
    const copyButtonElement = document.getElementById("copy-button");
    const stepsCountElement = document.getElementById("steps-count");
    const loaderElement = document.getElementById("loader");

    codeScenarioElement.addEventListener("keyup", () => {
        convertScenario(codeScenarioElement.value);
    });

    pasteButtonElement.addEventListener("click", () => {
        navigator.clipboard.readText()
            .then((text) => {
                codeScenarioElement.value = text;
                convertScenario(codeScenarioElement.value);
            })
            .catch((err) => {
                alert("Failed to read clipboard contents");
            });
    });

    copyButtonElement.addEventListener("click", () => {
        codeResultElement.select();
        document.execCommand("copy");
    });

    function updateInterfaceResult(convertedScenario) {
        codeResultElement.value = convertedScenario.result;
        if (convertedScenario.stepsCount > 0) {
            stepsCountElement.innerHTML = `(${convertedScenario.stepsCount} step${(convertedScenario.stepsCount > 1) ? "s" : ""}) `;
        } else {
            stepsCountElement.innerHTML = "";
        }
        loaderElement.style.display = "none";
    }

    function convertScenario(scenario) {
        loaderElement.style.display = "inline-block";
        if (scenario.length > 0) {
            var steps = scenario.split("\n");
            var result = "";
            var stepsCount = 0;
            steps.forEach((step) => {
                stepsCount++;
                result += `// ${stepsCount}. ${step}\n\n`;
            });
            updateInterfaceResult({
                stepsCount: stepsCount,
                result: result
            });
        } else {
            updateInterfaceResult({
                stepsCount: 0,
                result: ""
            });
        }
    }

    // Service worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then((reg) => {
            console.log("Service Worker Registered 🤩", reg.scope);
        }).catch(function (err) {
            console.log("Service Worker Failed to Register 😩", err);
        });
    }
})();