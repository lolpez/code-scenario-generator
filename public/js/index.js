(function () {
    const defaultRule = "{// }{counter}{. }{step}{br}{br}";
    const codeScenarioElement = document.getElementById("code-scenario");
    const codeResultElement = document.getElementById("code-result");
    const pasteButtonElement = document.getElementById("paste-button");
    const copyButtonElement = document.getElementById("copy-button");
    const stepsCountElement = document.getElementById("steps-count");
    const loaderElement = document.getElementById("loader");
    const configurationElement = document.getElementById("configuration");
    const ruleElement = document.getElementById("rule");
    const ruleResetElement = document.getElementById("reset-rule");
    const offlineElement = document.getElementById("offline");

    ruleElement.value = defaultRule;

    codeScenarioElement.addEventListener("keydown", () => {
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

    configurationElement.addEventListener("click", () => {
        configurationElement.classList.toggle("active");
        var content = configurationElement.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });

    ruleResetElement.addEventListener("click", () => {
        ruleElement.value = defaultRule;
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

    function getRule() {
        var rules = [];
        for (var i = 0; i < ruleElement.value.length; i++) {
            if (ruleElement.value.charAt(i) == "{") {
                var rule = "";
                for (var j = i + 1; j < ruleElement.value.length; j++) {
                    if (ruleElement.value.charAt(j) == "}") {
                        break;
                    }
                    rule += ruleElement.value.charAt(j);
                }
                rules.push(rule);
            }
        }
        return rules;
    }

    function convertScenario(scenario) {
        loaderElement.style.display = "inline-block";
        if (scenario.length > 0) {
            var steps = scenario.split("\n");
            var result = "";
            var stepsCount = 0;
            steps.forEach((step) => {
                stepsCount++;
                getRule().forEach((rule) => {
                    switch (rule) {
                        case "counter":
                            result += stepsCount;
                            break;
                        case "step":
                            result += step;
                            break;
                        case "br":
                            result += "\n";
                            break;
                        default:
                            result += rule;
                    }
                });
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
            offlineElement.innerHTML = "Ready to work offline";
        }).catch(function (err) {
            console.log("Service Worker Failed to Register 😩", err);
        });
    }
})();