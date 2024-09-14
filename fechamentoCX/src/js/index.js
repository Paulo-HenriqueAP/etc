const nameText = document.getElementById("uName");
const loginText = document.getElementById("uLogin");
let sum = 0;
let isItEmpty = document.querySelectorAll(".etc");
let activeEl = document.activeElement;
let login;
let avulso = document.getElementById("stuffs");
let fiveMoney = document.getElementById("stuffs5");
let ten_20Money = document.getElementById("stuffs10_20");
let fif_100Money = document.getElementById("stuffs50_100");
let saveName;
let saveLogin;
let saveTime;
let needMoreInputs;
let control = 0;
let allInputs;
const folks = [
    { uName: "Paulo Henrique AP", loginCod: 1419 },
    { uName: "Maycon Douglas", loginCod: 1391 },
    { uName: "Rian", loginCod: 1306 },
    { uName: "Alan Matos Vecchi", loginCod: 1439}
];
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus()
    loadState();
    formSum();
});

function createRegularInputs() {
    for (let i = 0; i < allInputs; i++) {
        const input = document.createElement("input");

        input.type = "number";
        input.className = "etc";
        input.min = "1";
        input.addEventListener("change", function () {
            formSum();
        });
        document.getElementById("allEtcs").appendChild(input);
    };
};

function createInputs() {
    for (let i = 0; i < needMoreInputs; i++) {
        const input = document.createElement("input");

        input.type = "number";
        input.className = "etc";
        input.min = "1";
        input.addEventListener("change", function () {
            formSum();
        });
        document.getElementById("allEtcs").appendChild(input);
    };
    isItEmpty = document.querySelectorAll(".etc");
};

function showUserInfos() {
    login = document.getElementById("loginValue").value;
    const loginFind = folks.find(user => user.loginCod == login);

    document.getElementById("loginHub").classList.add("hidden");
    document.getElementById("bodyTable").classList.remove("hidden");

    if (loginFind) {
        nameText.textContent = loginFind.uName;
    } else {
        nameText.style = "position: absolute; left: 1%;";
    };

    loginText.textContent = `(${login})`;
    avulso.focus();

    localStorage.setItem("lastUsedName", nameText.textContent);
    localStorage.setItem("LastLoginCode", login);
};

function formSum() {
    sum = 0;
    control = 0;

    isItEmpty.forEach((input) => {
        if (input.value != "") {
            sum += parseFloat(input.value);
        };

        if (input.value === "" && !input.id) {
            control++;
        };
    }
    );
    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    saveState();//está criando novos inputs
    updateInput();
    console.log("control é " + control)
    if (control <= 2) {
        needMoreInputs = 4;
        createInputs();
    };
};
function updateInput() {
    let findEmpty;//remove the classList if the element is Empty

    if (document.getElementsByClassName("becomeDev").length === 0) {
        document.getElementById("dev").textContent = "SEM DEVOLUÇÕES";
    } else {
        document.getElementById("dev").textContent = "DEVOLUÇÕES";
    };

    if (document.getElementsByClassName("becomeSin").length === 0) {
        document.getElementById("sin").textContent = "SEM SINAIS";
    } else {
        document.getElementById("sin").textContent = "SINAIS";
    };

    findEmpty = document.querySelectorAll(".becomeDev");
    findEmpty.forEach((input) => {
        if (input.value === "") {
            input.classList.remove("becomeDev");
        };
    });

    findEmpty = document.querySelectorAll(".becomeSin");
    findEmpty.forEach((input) => {
        if (input.value === "") {
            input.classList.remove("becomeSin");
        };
    });
};

function putItOnDevolucoes() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeDev")) {
        activeEl.classList.remove("becomeDev");
        updateInput();
        return;
    };//remove if alrealdy has

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeSin");
        activeEl.classList.add("becomeDev");
        document.getElementById("dev").textContent = "DEVOLUÇÕES";
    };
    updateInput();
};

function putItOnSinais() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeSin")) {
        activeEl.classList.remove("becomeSin");
        updateInput();
        return;
    };//remove if alrealdy has

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeDev");
        activeEl.classList.add("becomeSin");
        document.getElementById("sin").textContent = "SINAIS";
    };
    updateInput();
};

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);
    if (index > -1) {
        let jumpTo = nextEl[index + 1] || nextEl[0];
        jumpTo.focus();
    };
};

function goToFreeInput() {
    for (let i = 0; i < findEmpty.length; i++) {
        if (findEmpty[i].value === "" && !findEmpty[i].id) {
            findEmpty[i].focus();
            break;
        };
    };
};

function findAndClear() {
    isItEmpty.forEach((input) => {
        if (input.value == "" && !input.id) {
            input.classList.add("hidden");
            setTimeout(function () {
                input.classList.remove("hidden");
            }, 2)
        } else {
            input.type = "text";//put it on middle
            setTimeout(function () {
                input.type = "number";
            }, 2);
        };

        if (input.id && input.value === "") {
            input.value = "NÃO";
            setTimeout(function () {
                input.value = "";
            }, 2);
        };
    });

    let sinaisValues = document.getElementsByClassName("becomeSin");

    for (let i = 0; i < sinaisValues.length; i++) {
        const sendToSin = document.createElement("input");
        sendToSin.value = sinaisValues[i].value;
        sendToSin.style = " text-align: center; width:55px;font-size: small;";

        document.getElementById("sinValues").appendChild(sendToSin);
        setTimeout(function () {
            sendToSin.remove();
        });
    };

    let devValues = document.getElementsByClassName("becomeDev");

    for (let i = 0; i < devValues.length; i++) {
        const sendToDev = document.createElement("input");
        sendToDev.value = devValues[i].value;
        sendToDev.style = " text-align: center; width:55px;font-size: small;";

        document.getElementById("devValues").appendChild(sendToDev);
        setTimeout(function () {
            sendToDev.remove();
        });
    };

    //setTimeout volta a pág para o estado anterior
};

document.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "F4":
            formSum();
            document.getElementById("time").textContent = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString();
            findAndClear();
            document.getElementById("signature").classList.remove("hidden");
            window.print();
            document.getElementById("signature").classList.add("hidden");
            break;
        case "F8":
            localStorage.clear();
            location.reload();
            break;
        case "KeyT":
            avulso.focus();
            break;
        case "KeyL":
            findEmpty = document.querySelectorAll(".etc");
            goToFreeInput();
            break;
        case "KeyD":
            putItOnDevolucoes();
            break;
        case "KeyS":
            putItOnSinais();
            break;
    };

    if (event.key === "Enter") {
        jumpToNext();
    };
});

function saveState() {
    const inputs = document.querySelectorAll('.etc');
    inputs.forEach((input, index) => {
        localStorage.setItem(`input${index}`, input.value);
        localStorage.setItem(`class${index}`, input.classList.toString());
    });

    localStorage.setItem("time", new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString())

    if (inputs.length > 44) {
        localStorage.setItem("allInputs", inputs.length);
    };// SOLUCAO TEMPORÁRIA para nn criar novos ao recarregar a pág
};

function loadState() {
    const lastTotalInputs = localStorage.getItem("allInputs");

    if (lastTotalInputs) {
        allInputs = parseInt(lastTotalInputs);
        createRegularInputs();
    } else {
        allInputs = 36;
        createRegularInputs();
    };

    const inputs = document.querySelectorAll('.etc');
    inputs.forEach((input, index) => {
        const savedValue = localStorage.getItem(`input${index}`);
        const savedClass = localStorage.getItem(`class${index}`);

        if (savedValue !== null) {
            input.value = savedValue;
        };

        if (savedClass !== null) {
            input.className = savedClass;
        };
    });

    document.getElementById("lastName").textContent += localStorage.getItem("lastUsedName");

    document.getElementById("lastLogin").textContent += localStorage.getItem("LastLoginCode");

    document.getElementById("lastTime").textContent += localStorage.getItem("time");
    formSum();
};