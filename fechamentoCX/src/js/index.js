let sum = 0;
let isItEmpty = document.querySelectorAll(".etc");
let activeEl = document.activeElement;
const nameText = document.getElementById("uName");
const loginText = document.getElementById("uLogin");
let login;

let saveName;
let saveLogin;
let saveTime;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus()
    loadState()
    formSum()
});

function showUserInfos() {
    login = document.getElementById("loginValue").value;

    document.getElementById("loginHub").classList.add("hidden");
    document.getElementById("bodyTable").classList.remove("hidden");

    switch (login) {
        case "1419":
            nameText.textContent = "Paulo Henrique AP";
            break;
        default:
            nameText.style = "position: absolute; left: 1%;";
    };
    loginText.textContent = `(${login})`;
    document.getElementById("stuffs").focus();

    localStorage.setItem("lastUsedName", nameText.textContent);
    localStorage.setItem("LastLoginCode", login);
};

function formSum() {
    sum = 0;

    isItEmpty.forEach((input) => {
        if (input.value != "") {
            sum += parseFloat(input.value);
        }
    }
    );
    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    saveState()

    if (document.getElementsByClassName("becomeDev").length === 0) {
        document.getElementById("dev").textContent = "SEM DEVOLUÇÕES";
    } else {
        document.getElementById("dev").textContent = "DEVOLUÇÕES";
    }

    if (document.getElementsByClassName("becomeSin").length === 0) {
        document.getElementById("sin").textContent = "SEM SINAIS";
    } else {
        document.getElementById("sin").textContent = "SINAIS";
    }
}

function putItOnDevolucoes() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeDev")) {
        activeEl.classList.remove("becomeDev");
        return;
    }
    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeSin");
        activeEl.classList.add("becomeDev");
        document.getElementById("dev").textContent = "DEVOLUÇÕES";
    }
}

function putItOnSinais() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeSin")) {
        activeEl.classList.remove("becomeSin");
        return;
    }

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeDev");
        activeEl.classList.add("becomeSin");
        document.getElementById("sin").textContent = "SINAIS";
    }
}

function breakPoint() {
    document.getElementById("breakPoint1").classList.remove("hidden")
}

document.addEventListener("keydown", function (event) {
    if (event.key === "F4") {
        formSum();

        let keepProgress = document.body.cloneNode(true);
        document.getElementById("time").textContent = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString();
        //impressora: TM-T20X - tamanho papel: postcard 100x148mm
        isItEmpty.forEach((input) => {
            if (input.value == "") {
                input.style = "display: none;"
            } else {
                input.type = "text";//put it on middle
            }
        });

        let sinaisValues = document.getElementsByClassName("becomeSin");

        for (let i = 0; i < sinaisValues.length; i++) {
            console.log(sinaisValues[i].value)
            const sendToSin = document.createElement("input")
            sendToSin.value = sinaisValues[i].value;
            sendToSin.tabIndex = "-1";
            sendToSin.style = " text-align: center; width:55px;font-size: small;"

            document.getElementById("sinValues").appendChild(sendToSin);
        };

        let devValues = document.getElementsByClassName("becomeDev");

        for (let i = 0; i < devValues.length; i++) {
            console.log(devValues[i].value)
            const sendToDev = document.createElement("input")
            sendToDev.value = devValues[i].value;
            sendToDev.tabIndex = "-1";
            sendToDev.style = " text-align: center; width:55px;font-size: small;"

            document.getElementById("devValues").appendChild(sendToDev);
        };

        window.print();

        document.body.replaceWith(keepProgress);
        isItEmpty = document.querySelectorAll(".etc");
        formSum();
        document.getElementById("stuffs").focus();
    };

    if (event.key === "PageUp") {
        document.getElementById("stuffs").focus()
    }

    if (event.key === "F8") {
        localStorage.clear();
        location.reload();
    }

    if (event.which === 68) {
        putItOnDevolucoes()
    }

    if (event.which === 83) {
        putItOnSinais()
    }

});

function saveState() {
    const inputs = document.querySelectorAll('.etc');
    inputs.forEach((input, index) => {
        localStorage.setItem(`input${index}`, input.value);
        localStorage.setItem(`class${index}`, input.classList.toString());
    });

    localStorage.setItem("time", new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString())
}

function loadState() {
    const inputs = document.querySelectorAll('.etc');
    inputs.forEach((input, index) => {
        const savedValue = localStorage.getItem(`input${index}`);
        const savedClass = localStorage.getItem(`class${index}`);

        if (savedValue !== null) {
            input.value = savedValue;
        }

        if (savedClass !== null) {
            input.className = savedClass;
        }
    });

    document.getElementById("lastName").textContent += localStorage.getItem("lastUsedName");

    document.getElementById("lastLogin").textContent += localStorage.getItem("LastLoginCode");

    document.getElementById("lastTime").textContent += localStorage.getItem("time");
}