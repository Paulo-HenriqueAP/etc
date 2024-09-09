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
let needMoreInputs = 60;
let control = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus()
    createInputs();
    loadState();
    formSum();
});

function createInputs() {
    console.log("ADICIONOU > " + needMoreInputs)
    {
        for (let i = 0; i < needMoreInputs; i++) {
            const input = document.createElement("input");

            input.type = "number";
            input.className = "etc";
            input.min = "1";
            input.addEventListener("change", function () {
                formSum()
            })
            document.getElementById("allEtcs").appendChild(input);
        };
    }

    isItEmpty = document.querySelectorAll(".etc");
};

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
    avulso.focus();

    localStorage.setItem("lastUsedName", nameText.textContent);
    localStorage.setItem("LastLoginCode", login);
};

function formSum() {
    sum = 0;

    isItEmpty.forEach((input) => {
        if (input.value != "") {
            sum += parseFloat(input.value);
        };

        if (input.value === "" && !input.id) {
            control++
        }
    }
    );
    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    saveState();
    updateInput();

    console.log("TEM LIVRE " + control)

    if (control <= 2) {
        needMoreInputs = 4
        createInputs()
    }
    control = 0;
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

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);
    if (index > -1) {
        let jumpTo = nextEl[index + 1] || nextEl[0];
        jumpTo.focus()
    }
}

function goToFreeInput() {
    for (let i = 0; i < findEmpty.length; i++) {
        if (findEmpty[i].value === "" && !findEmpty[i].id) {
            findEmpty[i].focus()
            break;
        }
    }
}

function findAndClear() {
    isItEmpty.forEach((input) => {
        if (input.value == "" && !input.id) {
            input.style = "display: none;"
        } else {
            input.type = "text";//put it on middle
        }

        if (input.id && input.value === "") {
            input.value = "NÃO";
        };
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
}

document.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "F4":
            formSum();
            let keepProgress = document.body.cloneNode(true);
            document.getElementById("time").textContent = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString();

            findAndClear();
            window.print();

            document.body.replaceWith(keepProgress);
            isItEmpty = document.querySelectorAll(".etc");
            formSum();
            avulso.focus();
            //valores não estão sendo salvos ao clonar o Node e retornar
            break;
        case "F8":
            localStorage.clear();
            location.reload();
            break;
        case "KeyT":
            avulso.focus()
            break;
        case "KeyL":
            findEmpty = document.querySelectorAll(".etc");
            goToFreeInput()
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