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
let cashier;
let qrSize = 150;
let barras = 0;
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
        loginText.textContent = `<${login}>`;
        goToFreeInput();
        localStorage.setItem("LastLoginCode", login);
        simpleLock = false;
    } else {
        document.getElementById("loginHub").classList.add("hidden");
        document.getElementById("registerHub").classList.remove("hidden");
        registerStatus.textContent = `Login '${login}' não encontrado`
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
        document.getElementById("registerTitle").textContent = `'${loginText.textContent}' foi editado`
        if (nameText.textContent === "EXCLUIR") {
            folks.splice(edit);
            document.getElementById("loginHub").classList.remove("hidden");
            clearAll();
        }
    } else {
        createFolk = { uName: create_uName.value, loginCod: parseInt(create_loginCode.value) }
        folks.push(createFolk)
        document.getElementById("registerTitle").textContent = `Login '${loginText.textContent}' foi criado`
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
            input.value <= 0 ? input.value = "" : null;
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
    findEmpty = document.querySelectorAll(".etc");
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
            setTimeout(function () {
                goToFreeInput()
            }, 500)
            break;
        case "F8":
            if (window.confirm("Tem certeza?")) {
                clearAll();
            } else {
                goToFreeInput();
            }
            break;
        case "KeyT":
            if (simpleLock) return;
            avulso.focus();
            break;
        case "KeyL":
            if (simpleLock) return;
            goToFreeInput();
            break;
        case "KeyD":
            if (simpleLock) return;
            activeEl = document.activeElement;
            activeElBackup = activeEl.value;
            putItOnDevolucoes();
            break;
        case "KeyS":
            if (simpleLock) return;
            activeEl = document.activeElement;
            activeElBackup = activeEl.value;
            putItOnSinais();
            break;
        case "F2":
            document.getElementById("bodyTable").classList.add("hidden");
            sangriaElement = document.getElementById("sangria");
            sangriaElement.classList.toggle("hidden");
            !sangriaElement.classList.contains("hidden") ? document.getElementById("sangriaInput").focus() : location.reload()
            break;
        case "F9":
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
    };
    if (event.shiftKey && event.key === "!") {
        simpleLock = true;
        if (document.getElementById("obsTable").classList.contains("hidden")) {
            document.getElementById("bodyTable").classList.add("hidden");
            document.getElementById("obsTable").classList.remove("hidden");
        }
        setTimeout(function () {
            document.getElementById("obsText").focus()
        }, 200)
    }

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
    cashier = localStorage.getItem("cashier");
    workShift = new Date().getHours();
    if (workShift >= 14 && workShift < 23) {
        cashier += ".2";
    } else {
        cashier += ".1";
    };
    document.getElementById("cxNumber").textContent = " CAIXA " + cashier;
    formSum();
    goToFreeInput();
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

defSangria = () => {
    sangria = parseFloat(document.getElementById("sangriaInput").value);
    if (sangria == 69) {
        cashier = prompt("Este PC é o Caixa")
        localStorage.setItem("cashier", cashier);
        location.reload()
    }
    if (sangria < 300) {
        document.getElementById("sangriaTitle").innerHTML = 'Sangria <br><br> <span style="font-size:smaller;">(Mínimo 300$)</span>'
        document.getElementById("sangriaInput").focus();
        return;
    }
    document.getElementById("sangriaTable").classList.toggle("hidden");
    document.getElementById("sangriaInput").classList.toggle("hidden");
    document.getElementById("sangria").classList.add("hidden");
    document.getElementById("sumSangria").textContent = "SANGRIA: " + sangria.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("operCod").textContent = loginText.textContent
    document.getElementById("timeSangria").textContent = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString();
    document.getElementById("oper").textContent = "Operador: " + uName.textContent;
    window.print();
    location.reload();
}

changeFontSize = () => {
    font = document.getElementById("fontSizeVar").value
    document.getElementById("obsText").style = "font-size:" + font + "px;"
}
changeQrSize = () => {
    qrSize = document.getElementById("qrSizeVar").value;
    qrSize <= 0 ? qrSize = 150 : null;
    qrCodeSet()
}

codBarras = () => {
    document.getElementById("barrasTable").classList.toggle("hidden");
    document.getElementById("qrTable").classList.toggle("hidden");
    document.getElementById("obsText").classList.toggle("hidden");
    document.getElementById("sizes").classList.toggle("hidden");
    document.getElementById("qrCheck").classList.toggle("hidden");
    document.getElementById("barrasValue").focus();
}

qrCodeSet = () => {
    let qrCodePNG = document.getElementById("qr");
    let stats = document.getElementById("qrCheck").checked;
    let userText = document.getElementById("obsText").textContent;
    userText.length <= 0 ? userText = "Nada" : null;
    if (stats === true) {
        document.getElementById("obsText").classList.add("hidden");
        document.getElementById("fontLabel").classList.add("hidden")
        document.getElementById("qrLabel").classList.remove("hidden")
        qrURL = `https://image-charts.com/chart?chs=${qrSize}x${qrSize}&cht=qr&chl=${userText}`
        qrCodePNG.setAttribute("src", qrURL);
    } else {
        qrCodePNG.setAttribute("src", "");
        document.getElementById("obsText").classList.remove("hidden");
        document.getElementById("obsText").focus()
        document.getElementById("fontLabel").classList.remove("hidden")
        document.getElementById("qrLabel").classList.add("hidden")
    }
}

function GerarCódigoDeBarras(elementoInput) {
    if (!elementoInput.value) {
        elementoInput.value = 0;
    }
    barras++;
    const barTable = document.getElementById("barrasElements");

    let configuracao = {
        width: 1,
        height: 30,
        fontSize: 13,
        margin: 0
    };
    const createLi = document.createElement("li");
    barTable.appendChild(createLi);

    const barName = document.createElement("input");
    barName.classList.add("barrasTitles");
    barName.placeholder = `Nome <${elementoInput.value}>`
    createLi.appendChild(barName);

    const createImg = document.createElement("img");
    createImg.id = "codBarras" + barras;
    createLi.appendChild(createImg);
    const novoCodigobarras = `#${createImg.id}`;
    createLi.style = " border-bottom: 1px solid;  margin: 0;padding: 0;";
    JsBarcode(novoCodigobarras, elementoInput.value, configuracao);

    document.getElementById("barrasValue").value = "";
    barName.focus();

    barName.addEventListener("change", function () {
        document.getElementById("barrasValue").focus();
    });
}//https://www.mundojs.com.br/2018/01/16/crie-codigo-de-barras-em-javascript-com-jsbarcode/

/*
function sMobileEvents(event) {
    <li> <strong onclick="sMobileEvents(event)">F2</strong><span style="font-size: small;"> ></span> papel para sangria</li>
    <li> <strong onclick="sMobileEvents(event)">F4</strong><span style="font-size: small;"> ></span> imprimi o fechamento</li>
    <li><strong onclick="sMobileEvents(event)">F8</strong><span style="font-size: small;"> ></span> apaga a última seção</strong>
    <li> <strong onclick="sMobileEvents(event)">F9</strong><span style="font-size: small;"> ></span> cadastros</li>





    let chave = event.target.textContent;

    const teclado = new KeyboardEvent('keydown', {
        code: chave,
        bubbles: true,
    });
    document.dispatchEvent(teclado);
}
    
funcao para funcionar sem a necessidade do teclado. nao esta 100% funcional 
*/