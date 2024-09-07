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
        case "1391":
            nameText.textContent = "Maycon Douglas"
            break;
        default:
            nameText.style = "position: absolute; left: 1%;";
    };//store folks in an array ??

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
        };
    }
    );
    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    saveState();
    updateInput();
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
            input.classList.remove("becomeDev")
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

function addMoreInputs() {
    document.getElementById("breakPoint1").classList.remove("hidden");
};

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);
    if (index > -1) {
        let jumpTo = nextEl[index + 1] || nextEl[0];
        jumpTo.focus()
    }
}

document.addEventListener("keydown", function (event) {

    switch (event.code) {
        case "F4":
            formSum();

            let keepProgress = document.body.cloneNode(true);
            document.getElementById("time").textContent = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString();

            isItEmpty.forEach((input) => {
                if (input.value == "") {
                    input.style = "display: none;"
                } else {
                    input.type = "text";//put it on middle
                }
            });

            let sinaisValues = document.getElementsByClassName("becomeSin");

            for (let i = 0; i < sinaisValues.length; i++) {
                const sendToSin = document.createElement("input")
                sendToSin.value = sinaisValues[i].value;
                sendToSin.tabIndex = "-1";
                sendToSin.style = " text-align: center; width:55px;font-size: small;"

                document.getElementById("sinValues").appendChild(sendToSin);
            };

            let devValues = document.getElementsByClassName("becomeDev");

            for (let i = 0; i < devValues.length; i++) {
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
            break;
        case "F8":
            localStorage.clear();
            location.reload();
            break;
        case "KeyT":
            document.getElementById("stuffs").focus()
            break;
        case "KeyL":
            findEmpty = document.querySelectorAll(".etc");
            findEmpty.forEach((input) => {
                if (input.value != "") {
                    input.focus();
                    jumpToNext()
                };
            });
            break;
        case "KeyD":
            putItOnDevolucoes();
            break;
        case "KeyS":
            putItOnSinais();
            break;
        case "Enter":
            jumpToNext();
            break;
    };
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