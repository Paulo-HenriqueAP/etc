let nameText = document.getElementById("uName");
let loginText = document.getElementById("uLogin");
let sum = 0;
let subSum = 0;
let cashSum = 0;
let devSum = 0;
let sinSum = 0;
let activeEl = document.activeElement;
let login;
let saveName;
let saveLogin;
let create;
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
let sangriasSaved = [
    //{ sangriaValue: "R$ 500,00'", sangriaTime: "07/02/2025 | 23:01:22" }
];
let day;
const avulso = document.getElementById("stuffs");
const signature = document.getElementById("signature");
const bodyTable = document.getElementById("bodyTable");
const sangriaElement = document.getElementById("sangria");
const sangriaInput = document.getElementById("sangriaInput");
const registerHub = document.getElementById("registerHub");

const holidays = {
    "01/01": { holName: `Feliz ${new Date().getFullYear()}`, holImg: "src/icons/anoNovo.png" },
    "18/04": { holName: "Sexta Feira Santa", holImg: "src/icons/sexta.png" }/*VARIA*/,
    "21/04": { holName: "Dia de Tiradentes", holImg: "src/icons/tiradentes.png" },
    "01/05": { holName: "Dia do Trabalhador", holImg: "src/icons/trabalhador.png" },
    "15/08": { holName: "Dia de Nossa Senhora da Boa Viagem", holImg: "src/icons/viagem.png" },
    "07/09": { holName: "Independência do Brasil", holImg: "src/icons/independencia.png" },
    "12/10": { holName: "Dia de Nossa Senhora Aparecida", holImg: "src/icons/aparecida.png" },
    "02/11": { holName: "Dia dos Finados", holImg: "src/icons/finados.png" },
    "15/11": { holName: "Proclamação da República", holImg: "src/icons/republica.png" },
    "20/11": { holName: "Consciência Negra", holImg: "src/icons/consciencia.png" },
    "08/12": { holName: "Dia de Nossa Senhora Imaculada Conceição", holImg: "src/icons/Imaculada.png" },
    "25/12": { holName: "Feliz Natal 🎁", holImg: "src/icons/natal.png" },
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginValue").focus();
    loadState();
    //console.log(Object.keys(localStorage))
    day = `${new Date().toLocaleDateString().slice(0, 5)}`
    Object.keys(holidays).forEach(hol => {
        day === hol ? setHol() : null;
    });
    document.getElementById("date").textContent = `${new Date().toLocaleDateString()}`;
    document.getElementById("cx").textContent = `[${cashier}]`;
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
        input.min = "-1";
        input.addEventListener("change", function () {
            formSum();
        });
        document.getElementById("allEtcs").appendChild(input);
    };
};

function createInputs() {
    create = 8;
    for (let i = 0; i < create; i++) {
        const input = document.createElement("input");

        input.type = "number";
        input.className = "etc";
        input.min = "-1";
        input.addEventListener("change", function () {
            formSum();
        });
        document.getElementById("allEtcs").appendChild(input);
    };
};

function showUserInfos() {
    login = document.getElementById("loginValue").value;
    login === "06052002" ? localStorage.clear() : null;
    if (folks && folks.length > 0) {
        loginFind = folks.find(user => user.loginCod == login);
    };

    if (loginFind) {
        nameText.textContent = loginFind.uName;
        document.getElementById("loginHub").classList.add("hidden");
        bodyTable.classList.remove("hidden");
        loginText.textContent = `<${login}> `;
        goToFreeInput();
        localStorage.setItem("LastLoginCode", login);
        simpleLock = false;
    } else {
        document.getElementById("loginHub").classList.add("hidden");
        registerHub.classList.remove("hidden");
        registerStatus.textContent = `Login '${login}' não encontrado`
        createEditFolk();
        simpleCheck();
    };
};

function createEditFolk() {
    simpleLock = true;
    create_loginCode.value = login;
    create_uName.value = nameText.textContent
};

function saveFolks() {
    nameText.textContent = create_uName.value;
    loginText.textContent = create_loginCode.value;

    findToEdit = create_loginCode.value;
    edit = folks.find(user => user.loginCod == findToEdit);

    if (nameText.textContent == "" || loginText.textContent == "") {
        return;
    };

    if (edit) {
        edit.uName = create_uName.value;
        edit.loginCod = create_loginCode.value;
        document.getElementById("registerTitle").textContent = `'${loginText.textContent}' foi editado`;
        registerStatus.textContent = `editou '${login}'`
    } else {
        createFolk = { uName: create_uName.value, loginCod: parseInt(create_loginCode.value) };
        folks.push(createFolk);
        document.getElementById("registerTitle").textContent = `Login '${loginText.textContent}' foi criado`;
    }
    folksJson = JSON.stringify(folks);
    localStorage.setItem("folks", folksJson);
    setTimeout(function () {
        location.reload();
    }, 1000)
};

function formSum() {
    sum = 0;
    subSum = 0;
    cashSum = 0;
    devSum = 0;
    sinSum = 0;

    document.querySelectorAll(".etc").forEach((input) => {
        if (input.value.trim() === "") {
            return;
        };

        const iValue = parseFloat(input.value)

        if (isNaN(iValue) || iValue <= 0) {
            input.value = "";
            !input.id ? goToFreeInput() : null;
            return;
        };

        if (input.id) {
            cashSum += iValue;
        } else if (input.classList.contains("etc") && input.classList.contains("becomeDev")) {
            devSum += iValue;
        } else if (input.classList.contains("etc") && input.classList.contains("becomeSin")) {
            sinSum += iValue;
        } else if (input.classList.contains("etc")) {
            subSum += iValue;
        };

        sum += iValue;
    });

    if (localStorage.getItem("sangriasSaved")) {
        sangriasSaved.forEach(function (createSangriasLi) {
            sum += parseFloat(createSangriasLi.sangriaValue);
        });
    }

    document.getElementById("showSum").textContent = "TOTAL:" + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("subtotal").textContent = "SubTotal:" + subSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("cash").textContent = "DINHEIRO: " + cashSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    document.querySelectorAll(".etc").forEach((input) => {
        if (input.value < 1 && !input.id) {
            control++
        };
    });

    control < 2 ? createInputs() : null;
    control = 0;

    saveState();
    updateInput();
};

function updateInput() {
    let findEmpty;//remove the classList if the element is Empty
    check = document.getElementsByClassName("becomeDev").length;
    check === 0 ? document.getElementById("dev").textContent = "SEM DEVOLUÇÕES" : document.getElementById("dev").textContent = "DEVOLUÇÕES: " + devSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    check = document.getElementsByClassName("becomeSin").length
    check === 0 ? document.getElementById("sin").textContent = "SEM SINAIS" : document.getElementById("sin").textContent = "SINAIS: " + sinSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    findEmpty = document.querySelectorAll(".becomeDev");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeDev") : null;
    });

    findEmpty = document.querySelectorAll(".becomeSin");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeSin") : null;
    });
    saveState();
};

function putItOnDevolucoes() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;
    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeDev")) {
        activeEl.classList.remove("becomeDev");
        formSum()
        return;
    };//remove if alrealdy has

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeSin");
        activeEl.classList.add("becomeDev");
    };
    formSum();
};

function putItOnSinais() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;
    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.classList.contains("becomeSin")) {
        activeEl.classList.remove("becomeSin");
        formSum()
        return;
    };//remove if alrealdy has

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.remove("becomeDev");
        activeEl.classList.add("becomeSin");
        document.getElementById("sin").textContent = "SINAIS";
    };
    formSum()
};

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);

    try {
        nextEl[index + 1].focus()
    } catch (error) {
        avulso.focus()
    };
};
/*
function jumpBack() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);
    nextEl[index - 1].focus()
    index == 10 ? goToFreeInput() : null;
};
*/

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
    document.querySelectorAll(".etc").forEach((input) => {
        if (input.value == "" && !input.id) {
            input.classList.add("hidden");
        } setTimeout(function () {
            input.classList.remove("hidden");
        }, 500)

        if (input.id && input.value === "") {
            input.type = "text";
            input.value = "NÃO";
            setTimeout(function () {
                input.value = "";
                input.type = "number";
            }, 500);
        };
    });

    let sinaisValues = document.getElementsByClassName("becomeSin");

    for (let i = 0; i < sinaisValues.length; i++) {
        const sendToSin = document.createElement("input");
        sendToSin.value = sinaisValues[i].value;
        sendToSin.style = "text-align: center;width: 55px;font-size: small;margin: 1px;font-family: Arial, Helvetica, sans-serif;";

        document.getElementById("sinValues").appendChild(sendToSin);
        setTimeout(function () {
            sendToSin.remove();
        }, 1000);
    };

    let devValues = document.getElementsByClassName("becomeDev");

    for (let i = 0; i < devValues.length; i++) {
        const sendToDev = document.createElement("input");
        sendToDev.value = devValues[i].value;
        sendToDev.style = "text-align: center;width: 55px;font-size: small;margin: 1px;font-family: Arial, Helvetica, sans-serif;";

        document.getElementById("devValues").appendChild(sendToDev);
        setTimeout(function () {
            sendToDev.remove();
        }, 1000);
    };

    //setTimeout volta a pág para o estado anterior
};

function clearAll() {
    const keepIt = ["folks", "cashier"]
    const dataSaved = Object.keys(localStorage)
    dataSaved.forEach(key => {
        if (!keepIt.includes(key)) {
            localStorage.removeItem(key)
        };
    });

    location.reload();
};

document.addEventListener("keydown", (function (event) {
    if (event.shiftKey && event.code === "F1") {
        simpleLock = true;
        tools();
    };

    if (event.key === "Enter" && simpleLock == false) {
        jumpToNext();
    };

    switch (event.code) {
        case "KeyE":
            !simpleLock ? event.preventDefault() : null;
            break;
        case "F4":
            formSum();
            document.getElementById("time").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`;
            findAndClear();
            signature.classList.remove("hidden");
            document.getElementById("subtotal").classList.remove("hidden");
            window.print();
            setTimeout(function () {
                signature.classList.add("hidden");
                document.getElementById("subtotal").classList.add("hidden");
                goToFreeInput();
            }, 300);
            break;
        case "F8":
            if (window.confirm("Vai apagar tudo! Tem certeza?")) {
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
        /*
    case "KeyW":
        if (simpleLock) return;
        if (event.ctrlKey) return;
        seek = document.querySelectorAll(".etc");
        activeEl = Array.from(seek).indexOf(document.activeElement)
        try {
            activeEl <= 7 ? seek[activeEl -= 1].focus() : seek[activeEl -= 4].focus();
        } catch (error) {
            seek[seek.length - 1].focus();
        }
        break;
    case "KeyA":
        if (simpleLock) return;
        if (event.ctrlKey) return;
        jumpBack();
        break;
    case "KeyS":
        if (simpleLock) return;
        if (event.ctrlKey) return;
        if (event.shiftKey) {
            putItOnSinais()
        } else {
            seek = document.querySelectorAll(".etc");
            activeEl = Array.from(seek).indexOf(document.activeElement)

            try {
                activeEl <= 3 ? seek[activeEl += 1].focus() : seek[activeEl += 4].focus();
            } catch (error) {
                jumpToNext();
            }
        }
        break;
    case "KeyD":
        if (simpleLock) return;
        if (event.ctrlKey) return;
        event.shiftKey ? putItOnDevolucoes() : jumpToNext();
        break;
    */
        case "KeyS":
            if (simpleLock) return;
            event.shiftKey ? putItOnSinais() : null;
            break;
        case "KeyD":
            if (simpleLock) return;
            event.shiftKey ? putItOnDevolucoes() : null;
            break;
        case "F2":
            bodyTable.classList.add("hidden");
            sangriaElement.classList.toggle("hidden");
            !sangriaElement.classList.contains("hidden") ? sangriaInput.focus() : location.reload()
            break;
        case "F9":
            if (simpleLock === false) {
                registerHub.classList.toggle("hidden");
                bodyTable.classList.toggle("hidden");
            } else {
                registerHub.classList.toggle("hidden");
                registerHub.classList.contains("hidden") ? location.reload() : null
            }
            login ? registerStatus.textContent = `editando '${login}'` : registerStatus.textContent = "Criando novo";
            createEditFolk();
            simpleCheck();
            registerStatus.textContent == `editando '${login}'` ? create_uName.focus() : null;
            registerStatus.textContent == `editando '${login}'` ? document.getElementById("registerTitle").textContent = "Edição" : null;
            break;
    };
}));

tools = () => {
    if (document.getElementById("obsTable").classList.contains("hidden")) {
        bodyTable.classList.add("hidden");
        document.getElementById("obsTable").classList.remove("hidden");
    }
    setTimeout(function () {
        document.getElementById("obsText").focus();
    }, 200);
};

function saveState() {
    const inputs = document.querySelectorAll('.etc');
    let notEmp = 0;

    inputs.forEach((input) => {
        input.value != "" ? notEmp++ : null
    });

    inputs.forEach((input, index) => {
        localStorage.setItem(`input${index} `, input.value);
        localStorage.setItem(`class${index} `, input.classList.toString());

    });
    notEmp > 40 ? localStorage.setItem("allInputs", notEmp) : localStorage.removeItem("allInputs");
    //localStorage.setItem("time", `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
};

function loadState() {
    document.querySelectorAll(".etc").forEach((input) => {
        if (input.value < 1 && !input.id) {
            control++
        };
    });
    control < 2 ? createInputs() : null;
    folksJson = localStorage.getItem("folks");

    folks = JSON.parse(folksJson)

    if (localStorage.getItem("sangriasSaved")) {
        sangriasSaved = JSON.parse(localStorage.getItem("sangriasSaved"));

        sangriaStatus = document.getElementById("sangriasTitle");
        if (sangriasSaved.length <= 0) {
            sangriaStatus.textContent = "SEM SANGRIAS"
        } else if (sangriasSaved.length == 1) {
            sangriaStatus.textContent = "SANGRIA";
        } else {
            sangriaStatus.textContent = "SANGRIAS";
        };

        sangriasSaved.forEach(function (createSangriasLi, index) {
            li = document.createElement("li");
            li.innerHTML = `<b>${createSangriasLi.sangriaValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b> > ${createSangriasLi.sangriaTime}`;
            document.getElementById("sangriasUL").appendChild(li)

            removeSangria = document.createElement("li");
            removeSangria.textContent = `${createSangriasLi.sangriaValue}$ | `

            removeSangriaButton = document.createElement("button");
            removeSangriaButton.textContent = "✖"
            removeSangriaButton.id = "remove" + index


            removeSangriaButton.addEventListener("focus", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #d80000; color:white; border:3px solid black;";
            })

            removeSangriaButton.addEventListener("focusout", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #F8F8FF; color:black; border:3px solid black;";
            })

            removeSangriaButton.addEventListener("click", function () {
                if (window.confirm(`EXCLUIR sangria de ${sangriasSaved[this.id.slice(6)].sangriaValue}$ ?`)) {

                    this.id.slice(6) !== -1 ? sangriasSaved.splice(this.id.slice(6), 1) : null;
                    localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved))
                    location.reload();
                }
            })

            removeSangria.appendChild(removeSangriaButton)
            document.getElementById("sangriaEdit").appendChild(removeSangria)
        });

    }

    if (folks == null) {
        folks = [
        ];
    }//primeira utilização

    const lastTotalInputs = localStorage.getItem("allInputs");

    if (lastTotalInputs) {
        allInputs = parseInt(lastTotalInputs);
        createRegularInputs();
    } else {
        allInputs = 32;
        createRegularInputs();
    };

    const inputs = document.querySelectorAll('.etc');
    inputs.forEach((input, index) => {
        const savedValue = localStorage.getItem(`input${index} `);
        const savedClass = localStorage.getItem(`class${index} `);

        savedValue !== null ? input.value = savedValue : null
        savedClass !== null ? input.className = savedClass : null
    });
    if (localStorage.getItem("LastLoginCode")) {
        document.getElementById("loginValue").value = localStorage.getItem("LastLoginCode");
        showUserInfos();
    };

    //document.getElementById("lastTime").textContent += localStorage.getItem("time");
    localStorage.getItem("cashier") ? cashier = localStorage.getItem("cashier") : cashier = "69"
    workShift = new Date().getHours();
    if (workShift >= 14 && workShift < 23) {
        cashier += ".2";
    } else {
        cashier += ".1";
    };
    formSum();
    goToFreeInput();
};

simpleCheck = () => {
    loginText.textContent = create_loginCode.value;
    nameText.textContent = create_uName.value;

    if (loginText.textContent == "") {
        document.getElementById("saveButton").classList.add("error");
        create_loginCode.focus();
    } else if (nameText.textContent == "") {
        document.getElementById("saveButton").classList.add("error");
        create_uName.focus();
    } else {
        document.getElementById("saveButton").classList.remove("error");
        document.getElementById("saveButton").focus();
    };
};

/*removeColor = (remove) => {
    document.getElementById(remove.id).style = " background-color: none;font-weight: normal;";

    onfocus="simpleCheck()" onfocusout="removeColor(this)"
};*/

defSangria = () => {
    sangria = parseFloat(sangriaInput.value);
    if (sangria == 69) {
        cashier = prompt("Este PC é o Caixa");
        localStorage.setItem("cashier", cashier);
        setTimeout(function () {
            location.reload();
        }, 1000);
    };
    if (sangria < 300) {
        if (!window.confirm("Mínimo 300$, continuar?")) {
            sangriaInput.focus();
            return;
        }
    };
    document.getElementById("sangriaTable").classList.toggle("hidden");
    sangriaInput.classList.toggle("hidden");
    document.getElementById("sangria").classList.add("hidden");
    document.getElementById("sumSangria").textContent = "SANGRIA: " + sangria.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("operCod").textContent = `<${login}>`
    document.getElementById("timeSangria").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`
    document.getElementById("oper").textContent = uName.textContent;
    document.getElementById("cxNumber").textContent = `[${cashier}]`;
    sangriaMade = { sangriaValue: sangria, sangriaTime: new Date().toLocaleTimeString() }
    sangriasSaved.push(sangriaMade);
    localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved))
    window.print();
    location.reload();
};

changeFontSize = () => {
    font = document.getElementById("fontSizeVar").value;
    document.getElementById("obsText").style = "font-size:" + font + "px;";
};

changeQrSize = () => {
    qrSize = document.getElementById("qrSizeVar").value;
    qrSize <= 4 ? qrSize = 4 : null;
    qrCodeSet();
};

codBarras = () => {
    document.getElementById("barrasTable").classList.toggle("hidden");
    document.getElementById("qrTable").classList.add("hidden");
    document.getElementById("obsText").classList.toggle("hidden");
    document.getElementById("sizes").classList.toggle("hidden");
    document.getElementById("qrCheck").classList.toggle("hidden");
    document.getElementById("barrasValue").focus();
};

qrCodeSet = () => {
    document.getElementById("qrTable").classList.remove("hidden");
    document.getElementById("barCheck").classList.add("hidden");

    let stats = document.getElementById("qrCheck").checked;
    let userText = document.getElementById("obsText").textContent;
    userText.length <= 0 ? userText = "Nada" : null;
    if (stats === true) {
        document.getElementById("obsText").classList.add("hidden");
        document.getElementById("fontLabel").classList.add("hidden");
        document.getElementById("qrLabel").classList.remove("hidden");
        document.getElementById("qr").setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${userText}`);
    } else {
        document.getElementById("obsText").classList.remove("hidden");
        document.getElementById("fontLabel").classList.remove("hidden");
        document.getElementById("qrLabel").classList.add("hidden");
        document.getElementById("qrTable").classList.add("hidden");
        document.getElementById("barCheck").classList.remove("hidden");
    };
};

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
    createLi.id = "barLi" + elementoInput.value;
    barTable.appendChild(createLi);

    const barName = document.createElement("input");
    barName.classList.add("barrasTitles");
    barName.placeholder = `Nome ${elementoInput.value}`
    createLi.appendChild(barName);
    createLi.appendChild(document.createElement("br"));

    const createImg = document.createElement("img");
    createImg.id = "codBarras" + barras;
    createLi.appendChild(createImg);
    const novoCodigobarras = `#${createImg.id}`;
    createLi.style = "border: 1px solid;  margin: 0;padding: 0; float:left;";
    JsBarcode(novoCodigobarras, elementoInput.value, configuracao);

    document.getElementById("barrasValue").value = "";
    barName.focus();

    barName.addEventListener("change", function () {
        document.getElementById("barrasValue").focus();
        barCode = "barLi" + this.placeholder.slice(5)
        this.value == "#Del#" ? document.getElementById(barCode).remove() : null;
    });
}//https://www.mundojs.com.br/2018/01/16/crie-codigo-de-barras-em-javascript-com-jsbarcode/

function sMobileEvents(event) {
    let simulatedKey = event.target.textContent;
    const sendKey = new KeyboardEvent('keydown', {
        code: simulatedKey,
        bubbles: true,
    });
    document.dispatchEvent(sendKey);
};

document.getElementById("dTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    putItOnDevolucoes();
}, { passive: true });

document.getElementById("sTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    putItOnSinais();
}, { passive: true });

function setHol() {
    document.getElementById("hiddenHol").classList.remove("hidden");
    document.getElementById("holName").textContent = holidays[day].holName;
    document.getElementById("tagImg").setAttribute("src", holidays[day].holImg);
};
/*
var i;
for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
    */