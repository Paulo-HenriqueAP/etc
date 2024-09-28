let nameText = document.getElementById("uName");
let loginText = document.getElementById("uLogin");
let sum = 0;
let isItEmpty = document.querySelectorAll(".etc");
let activeEl = document.activeElement;
let login;
let avulso = document.getElementById("stuffs");
let saveName;
let saveLogin;
let needMoreInputs;
let control = 0;
let allInputs;
let simpleLock = true;
let registerStatus = document.getElementById("regStatus");
let create_loginCode = document.getElementById("newLoginValue");
let create_uName = document.getElementById("nameValue");
let loginFind;
let edit;

let folks = [
];
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus()
    loadState();
    formSum();
});

/*const folks = [
    { uName: "Paulo Henrique AP", loginCod: 1419 },
    { uName: "Maycon Douglas", loginCod: 1391 },
    { uName: "Rian", loginCod: 1306 },
    { uName: "Alan Matos Vecchi", loginCod: 1439 }
];*/

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
    login === "06052002" ? localStorage.clear() : null;
    if (folks && folks.length > 0) {
        loginFind = folks.find(user => user.loginCod == login);
    }

    if (loginFind) {
        nameText.textContent = loginFind.uName;
        document.getElementById("loginHub").classList.add("hidden");
        document.getElementById("bodyTable").classList.remove("hidden");
        loginText.textContent = `(${login})`;
        avulso.focus();
        localStorage.setItem("LastLoginCode", login);
        simpleLock = false;
    } else {
        document.getElementById("loginHub").classList.add("hidden");
        document.getElementById("registerHub").classList.remove("hidden");
        registerStatus.textContent = `Login '${login}' não encontrado
   `
        createEditFolk();
    };
};

function createEditFolk() {
    simpleLock = true;
    create_loginCode.value = login;
    create_uName.value = nameText.textContent
    create_uName.focus();
    registerStatus.textContent == "Criando novo" ? create_loginCode.focus() : null
}

function saveFolks() {
    nameText.textContent = create_uName.value
    loginText.textContent = create_loginCode.value

    findToEdit = create_loginCode.value
    edit = folks.find(user => user.loginCod == findToEdit);

    if (nameText.textContent == "" || loginText.textContent == "") {
        return;
    }

    if (edit) {
        edit.uName = create_uName.value;
        edit.loginCod = create_loginCode.value;
        document.getElementById("registerTittle").textContent = "Editado com sucesso"
        if (nameText.textContent === "EXCLUIR") {
            folks.splice(edit);
            document.getElementById("loginHub").classList.remove("hidden");
            clearAll();
        }
    } else {
        createFolk = { uName: create_uName.value, loginCod: parseInt(create_loginCode.value) }
        folks.push(createFolk)
        document.getElementById("registerTittle").textContent = "Criado com sucesso"
    }
    folksJson = JSON.stringify(folks);
    localStorage.setItem("folks", folksJson);
    setTimeout(function () {
        location.reload()
    }, 1000)
}

function formSum() {
    sum = 0;
    control = 0;

    isItEmpty.forEach((input) => {
        if (input.value != "") {
            sum += parseFloat(input.value)
        }
        if (input.value === "" && !input.id) {
            control++;
        };
    }
    );
    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    saveState();//está criando novos inputs
    updateInput();
    if (control <= 2) {
        needMoreInputs = 4;
        createInputs();
    };
};
function updateInput() {
    let findEmpty;//remove the classList if the element is Empty
    check = document.getElementsByClassName("becomeDev").length;
    check === 0 ? document.getElementById("dev").textContent = "SEM DEVOLUÇÕES" : document.getElementById("dev").textContent = "DEVOLUÇÕES";

    check = document.getElementsByClassName("becomeSin").length
    check === 0 ? document.getElementById("sin").textContent = "SEM SINAIS" : document.getElementById("sin").textContent = "SINAIS";

    findEmpty = document.querySelectorAll(".becomeDev");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeDev") : null;
    });

    findEmpty = document.querySelectorAll(".becomeSin");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeSin") : null;
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

function clearAll() {
    isItEmpty.forEach(function (input) {
        input.value = ""
    });
    document.getElementById("loginValue").value = ""
    sum = 0;
    nameText.textContent = "";
    loginText.textContent = "";
    login = "";
    updateInput();
    saveState();
    localStorage.removeItem("LastLoginCode");
    localStorage.removeItem("time");
    location.reload();
    localStorage.setItem("allInputs", 36);
}

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
            clearAll()
            break;
        case "KeyT":
            if (simpleLock) return;
            avulso.focus();
            break;
        case "KeyL":
            if (simpleLock) return;
            findEmpty = document.querySelectorAll(".etc");
            goToFreeInput();
            break;
        case "KeyD":
            if (simpleLock) return;
            putItOnDevolucoes();
            break;
        case "KeyS":
            if (simpleLock) return;
            putItOnSinais();
            break;
        case "F2":
            if (simpleLock === false) {
                document.getElementById("registerHub").classList.toggle("hidden");
                document.getElementById("bodyTable").classList.toggle("hidden");
            } else {
                document.getElementById("registerHub").classList.toggle("hidden");
                document.getElementById("registerHub").classList.contains("hidden") ? location.reload() : null
            }
            login ? registerStatus.textContent = `editando '${login}'` : registerStatus.textContent = "Criando novo";
            createEditFolk();
            break;
        case "F9":
            console.log("trocar fonte")
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
        console.log(inputs.length)
        localStorage.setItem("allInputs", inputs.length);
    };// SOLUCAO TEMPORÁRIA para nn criar novos ao recarregar a pág
};

function loadState() {
    folksJson = localStorage.getItem("folks");

    folks = JSON.parse(folksJson)

    if (folks == null) {
        folks = [
        ];
    }//primeira utilização

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

        savedValue !== null ? input.value = savedValue : null
        savedClass !== null ? input.className = savedClass : null
    });
    if (localStorage.getItem("LastLoginCode")) {
        document.getElementById("loginValue").value = localStorage.getItem("LastLoginCode");
        showUserInfos();
    };

    document.getElementById("lastTime").textContent += localStorage.getItem("time");
    formSum();
};

simpleCheck = () => {
    nameText.textContent = create_uName.value
    loginText.textContent = create_loginCode.value

    if (nameText.textContent == "" || loginText.textContent == "") {
        document.getElementById("saveButton").style = "font-weight: bolder; background-color: red;color: black; "
    } else {
        document.getElementById("saveButton").style = " font-weight: bolder;background-color: #009440;color: white;"
    }
}
removeColor = (remove) => {
    document.getElementById(remove.id).style = " background-color: none;font-weight: normal;"
}