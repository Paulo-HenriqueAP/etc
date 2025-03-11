let nameText = document.getElementById("uName");
let loginText = document.getElementById("uLogin");
let sum = 0;
let subSum = 0;
let cashSum = 0;
let devSum = 0;
let sinSum = 0;
let activeEl = document.activeElement;
let login = "SEM LOGIN";
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

let sViasSaved = [];
let day;
let optName = document.getElementById("toolsH2");

const topo = document.getElementById("stuffs50_100_200");
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
    document.getElementById("cxName").textContent = `ALTERAR CAIXA [${cashier}]`
});

/*const folks = [
    { uName: "Paulo Henrique AP", loginCod: 1419 },
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

        document.getElementById("etcValues").appendChild(input);
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
        document.getElementById("etcValues").appendChild(input);
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
        document.getElementById("operCod").textContent = `<${login}> `;
        document.getElementById("oper").textContent = uName.textContent;
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
        localStorage.setItem("LastLoginCode", login);
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
    pixSum = 0;
    errSum = 0;
    sanSum = 0;
    etcCount = 0;

    document.querySelectorAll(".etc").forEach((input) => {
        input.value.length >= 8 ? input.style = `width:${input.value.length}ch;` : input.style = "width:default";

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
        } else if (input.classList.contains("etc") && input.classList.contains("becomePix")) {
            pixSum += iValue;
        } else if (input.classList.contains("etc") && input.classList.contains("becomeError")) {
            errSum += iValue;
        } else {
            etcCount++
            subSum += iValue;
        };
        sum += iValue;
    });

    if (localStorage.getItem("sangriasSaved")) {
        sangriasSaved.forEach(function (createSangriasLi) {
            sanSum += parseFloat(createSangriasLi.sangriaValue);
        });
        sum += sanSum;
    };
    cashSum += sanSum

    updateInput();
};

function updateInput() {
    let findEmpty;//remove the classList if the element is Empty

    findEmpty = document.querySelectorAll(".becomeDev");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeDev") : null;
    });

    findEmpty = document.querySelectorAll(".becomeSin");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeSin") : null;
    });

    findEmpty = document.querySelectorAll(".becomePix");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomePix") : null;
    });

    findEmpty = document.querySelectorAll(".becomeError");
    findEmpty.forEach((input) => {
        input.value === "" ? input.classList.remove("becomeError") : null;
    });

    checkDev = document.getElementsByClassName("becomeDev").length;
    devText = document.getElementById("dev");
    checkSin = document.getElementsByClassName("becomeSin").length;
    sinText = document.getElementById("sin");
    sangriaStatus = document.getElementById("sangriasTitle");
    checkPix = document.getElementsByClassName("becomePix").length;
    pixText = document.getElementById("pix");
    checkError = document.getElementsByClassName("becomeError").length;
    errorText = document.getElementById("error");

    checkDev <= 0 ? devText.textContent = "SEM DEVOLUÇÕES" : devText.textContent = `${checkDev} DEVOLUÇÕES: ${devSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
    checkDev == 1 ? devText.textContent = `UMA DEVOLUÇÃO ⤦` : null

    checkSin <= 0 ? sinText.textContent = "SEM SINAIS" : sinText.textContent = `${checkSin} SINAIS: ${sinSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
    checkSin == 1 ? sinText.textContent = `UM SINAL ⤦` : null;

    if (checkPix <= 0) {
        document.getElementById("pixHub").classList.add("hidden");
        document.getElementById("pixValues").parentElement.classList.add("hidden");
    } else {
        document.getElementById("pixHub").classList.remove("hidden");
        document.getElementById("pixValues").parentElement.classList.remove("hidden");
        pixText.textContent = `${checkPix} PIX CELULAR: ${pixSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
    }
    checkPix == 1 ? pixText.textContent = "UM PIX CELULAR ⤦" : null;

    if (checkError <= 0) {
        document.getElementById("errorHub").classList.add("hidden");
        document.getElementById("errorValues").parentElement.classList.add("hidden");
    } else {
        document.getElementById("errorHub").classList.remove("hidden");
        document.getElementById("errorValues").parentElement.classList.remove("hidden");
        errorText.textContent = `${checkError} ERROS: ${errSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
    }

    checkError == 1 ? errorText.textContent = "UM ERRO ⤦" : null;

    if (checkDev == 0 && checkSin == 0) {
        devText.textContent = "SEM DEVOLUÇÕES / SINAIS"
        document.getElementById("sinValues").parentElement.classList.add("hidden");
        document.getElementById("sinHub").classList.add("hidden");
    } else {
        document.getElementById("sinHub").classList.remove("hidden");
        document.getElementById("sinValues").parentElement.classList.remove("hidden");
    };

    sangriasSaved.length <= 0 ? sangriaStatus.textContent = "SEM SANGRIAS" : sangriaStatus.textContent = `${sangriasSaved.length} SANGRIAS: ${sanSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} `;
    sangriasSaved.length == 1 ? sangriaStatus.textContent = "UMA SANGRIA ⤦" : null;

    document.getElementById("showSum").textContent = "TOTAL: " + sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("subtotal").textContent = "SOMA: " + subSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("cash").textContent = "TOTAL EM DINHEIRO: " + cashSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    document.getElementById("etcTitle").textContent = etcCount + " VIAS"
    document.querySelectorAll(".etc").forEach((input) => {
        if (input.value < 1 && !input.id) {
            control++;
        };
    });

    control < 2 ? createInputs() : null;
    control = 0;

    saveState();
};

function putItOnDevolucoes() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    activeEl.classList.remove("becomeSin");
    activeEl.classList.remove("becomePix");
    activeEl.classList.remove("becomeError")

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it


    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.toggle("becomeDev");
    };
    formSum();
};

function putItOnSinais() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    activeEl.classList.remove("becomeDev");
    activeEl.classList.remove("becomePix");
    activeEl.classList.remove("becomeError")

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.toggle("becomeSin");
    };
    formSum();
};

function putItOnPix() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    activeEl.classList.remove("becomeDev");
    activeEl.classList.remove("becomeSin");
    activeEl.classList.remove("becomeError")

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.toggle("becomePix");
    }
    formSum();
}

function putItOnError() {
    activeEl = document.activeElement;
    activeElBackup = activeEl.value;

    activeEl.classList.remove("becomeDev");
    activeEl.classList.remove("becomeSin");
    activeEl.classList.remove("becomePix");

    setTimeout(function () {
        activeEl.value = activeElBackup;
    });//The input becomes empty if Shif + Tab. This function prevents it

    if (activeEl.tagName === "INPUT" && activeEl.value != "" && !activeEl.id) {
        activeEl.classList.toggle("becomeError");
    }
    formSum();
};

function jumpToNext() {
    let nextEl = document.querySelectorAll("input");
    let index = Array.prototype.indexOf.call(nextEl, document.activeElement);

    try {
        nextEl[index + 1].focus()
    } catch (error) {
        topo.focus()
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
        sendToSin.classList.add("tempInput");
        sendToSin.value.length >= 8 ? sendToSin.style.width = `${sendToSin.value.length}ch` : null;

        document.getElementById("sinValues").appendChild(sendToSin);
        setTimeout(function () {
            sendToSin.remove();
        }, 1000);
    };

    let devValues = document.getElementsByClassName("becomeDev");

    for (let i = 0; i < devValues.length; i++) {
        const sendToDev = document.createElement("input");
        sendToDev.value = devValues[i].value;
        sendToDev.classList.add("tempInput");
        sendToDev.value.length >= 8 ? sendToDev.style.width = `${sendToDev.value.length}ch` : null;

        document.getElementById("devValues").appendChild(sendToDev);
        setTimeout(function () {
            sendToDev.remove();
        }, 1000);
    };

    let pixValues = document.getElementsByClassName("becomePix");

    for (let i = 0; i < pixValues.length; i++) {
        const sendToPix = document.createElement("input");
        sendToPix.value = pixValues[i].value;
        sendToPix.classList.add("tempInput");
        sendToPix.value.length >= 8 ? sendToPix.style.width = `${sendToPix.value.length}ch` : null;

        document.getElementById("pixValues").appendChild(sendToPix);
        setTimeout(function () {
            sendToPix.remove();
        })
    }

    let errorValues = document.getElementsByClassName("becomeError");

    for (let i = 0; i < errorValues.length; i++) {
        const sendToError = document.createElement("input");
        sendToError.value = errorValues[i].value;
        sendToError.classList.add("tempInput");
        sendToError.value.length >= 8 ? sendToError.style.width = `${sendToError.value.length}ch` : null;

        document.getElementById("errorValues").appendChild(sendToError);
        setTimeout(function () {
            sendToError.remove();
        })
    }

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
        case "F4":
            try {
                formSum();
                document.getElementById("time").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `;
                findAndClear();
                signature.classList.remove("hidden");
                document.getElementById("subtotal").classList.remove("hidden");
            } catch (err) {
                alert("Ocorreu um erro ao imprimir > " + err);
                location.reload()

            } finally {
                window.print();
            }
            setTimeout(function () {
                signature.classList.add("hidden");
                document.getElementById("subtotal").classList.add("hidden");
                goToFreeInput();
            }, 300);
            break;
        case "F8":
            if (window.confirm("APAGAR todos os valores da seção? (vai gerar um arquivo com os valores declarados)")) {
                processJson();
                /*
                document.getElementById("loginHub").classList.add("lastChange");
                document.getElementById("loginValue").classList.add("hidden");
                document.getElementById("infosTitle").innerHTML = `'F5' < br > <strong style="color: #16161D;">abortar (3)</strong>`
                let i = 3;
                setInterval(function () {
                    i--
                    document.getElementById("infosTitle").innerHTML = `'F5' < br > <strong style="color: #16161D;">abortar (${i})</strong>`
                }, 1000)
                setTimeout(function () {
                    clearAll();
                }, 3000)
                */
            } else {
                goToFreeInput();
            }
            break;
        case "KeyT":
            if (simpleLock) return;
            topo.focus();
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
        case "KeyD":
            if (simpleLock) return;
            putItOnDevolucoes();
            break;
        case "KeyS":
            if (simpleLock) return;
            putItOnSinais();
            break;
        case "KeyP":
            if (simpleLock) return;
            putItOnPix();
            break;
        case "KeyE":
            if (simpleLock) return;
            event.preventDefault();
            putItOnError();
            break;
        case "F2":
            bodyTable.classList.add("hidden");
            sangriaElement.classList.toggle("hidden");
            !sangriaElement.classList.contains("hidden") ? sangriaInput.focus() : location.reload();
            registerHub.classList.add("hidden");
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
        simpleLock = true;
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
    //localStorage.setItem("time", `${ new Date().toLocaleDateString() } - ${ new Date().toLocaleTimeString() } `);
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

        sangriasSaved.forEach(function (createSangriasLi, index) {
            li = document.createElement("li");

            li.textContent = `${createSangriasLi.sangriaValue}$`

            document.getElementById("sangriasUL").appendChild(li)

            removeSangria = document.createElement("li");
            removeSangria.innerHTML = `<b> ${createSangriasLi.sangriaValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</b> | ${createSangriasLi.sangriaTime} `;

            removeSangriaButton = document.createElement("button");
            removeSangriaButton.textContent = "✖"
            removeSangriaButton.id = "remove" + index


            removeSangriaButton.addEventListener("focus", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #d80000; color:white; border:3px solid black;";
            })

            removeSangriaButton.addEventListener("focusout", function () {
                document.getElementById(this.id).parentNode.style = "background-color: #F8F8FF; color:black; border:default;";
            })

            removeSangriaButton.addEventListener("click", function () {
                if (window.confirm(`APAGAR sangria de ${sangriasSaved[this.id.slice(6)].sangriaValue} $ ? `)) {
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

    document.getElementById("cxNumber").textContent = `[${cashier}]`;

    if (localStorage.getItem("sViasSaved")) {
        sViasSaved = JSON.parse(localStorage.getItem("sViasSaved"));

        sViasSaved.map(obj => {
            const div = document.createElement("div");
            div.classList.add("sVias");
            const button = document.createElement("button");
            button.innerHTML = "🖨️";

            button.addEventListener("click", function () {
                let div = document.createElement("div");
                let divInfos = document.createElement("div");

                divInfos.innerHTML = `<h3> REIMPRESSÃO DE SANGRIA - VIAS</h3> ${nameText.textContent} <br> ${loginText.textContent} [${cashier}] <br><br> ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} <br><br>`;
                div.appendChild(divInfos)

                div.appendChild(this.parentElement)
                document.getElementById("sangriaViasTable").appendChild(div);

                this.remove();
                window.print();
                location.reload();
            })

            button.classList.add("botao");
            div.appendChild(button)
            Object.entries(obj).forEach(([key, values]) => {
                const nSangria = document.createElement("div");
                key == "sVdevolucoes" ? nSangria.innerHTML = "DEVOLUÇÕES <br>" : nSangria.innerHTML = `${key.toUpperCase().slice(2)} <br>`;
                values.forEach(val => {
                    const span = document.createElement("span");
                    span.textContent = val;
                    nSangria.appendChild(span);
                });
                div.appendChild(nSangria);

                values.length < 1 ? nSangria.remove() : null;
            });
            document.getElementById("sangriaVias").appendChild(div);

        });
    }

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

defSangria = () => {
    sangria = parseFloat(sangriaInput.value);
    if (isNaN(sangria) || sangria < 0) {
        return;
    } else if (sangria == 0 && window.confirm("Sangria de VIAS?")) {
        //console.log(document.querySelectorAll(".etc").length)
        sangriaVias();
        return;
    }
    
    if (sangria == 0) {
        location.reload()
    } else {
        try {
            document.getElementById("sangriaTable").classList.toggle("hidden");
            sangriaInput.classList.toggle("hidden");
            document.getElementById("sangria").classList.add("hidden");
            document.getElementById("sumSangria").textContent = "SANGRIA: " + sangria.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
            document.getElementById("timeSangria").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `
            sangriaMade = { sangriaValue: sangria, sangriaTime: new Date().toLocaleTimeString() }
            sangriasSaved.push(sangriaMade);
            localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved))
            window.print();
            location.reload();
        } catch (err) {
            alert("ERRO AO FAZER SANGRIA: " + err)
            location.reload()
        };
    }

};

defCashier = () => {
    cashier = prompt("Este PC é o Caixa");
    cashier == null ? cashier = 69 : null;
    localStorage.setItem("cashier", cashier);
    setTimeout(function () {
        location.reload();
    }, 1000);
}

function sangriaVias() {
    let viaSum = 0;

    let sVnormais = []
    let sVdevolucoes = []
    let sVsinais = []
    let svErros = []
    let sVpix = []

    try {
        document.querySelectorAll(".sTD").forEach((hid) => {
            hid.remove()
        });

        findAndClear();
        document.getElementById("sangriasTitle").classList.add("hidden");;
        document.getElementById("sangriasUL").parentElement.classList.add("hidden");
        document.getElementById("subtotal").classList.add("hidden")
        document.getElementById("cash").textContent = "SANGRIA DE NOTINHAS"
        document.getElementById("time").textContent = `${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} `;
        signature.classList.remove("hidden");
        bodyTable.classList.remove("hidden");

        document.querySelectorAll(".etc").forEach((input) => {
            if (input.value.trim() === "") {
                return;
            };

            const iValue = parseFloat(input.value)

            if (isNaN(iValue) || iValue <= 0 || iValue.id) {
                input.value = "";
                return;
            };

            viaSum += iValue;

            if (input.classList.contains("becomeDev")) {
                sVdevolucoes.push(iValue)
            } else if (input.classList.contains("becomeSin")) {
                sVsinais.push(iValue)
            } else if (input.classList.contains("becomePix")) {
                sVpix.push(iValue)
            } else if (input.classList.contains("becomeError")) {
                svErros.push(iValue)
            } else {
                sVnormais.push(iValue)
            }
        });

        sViasSaved.push({ sVnormais, sVdevolucoes, sVsinais, sVpix, svErros })
        //localStorage.setItem("sangriasSaved", JSON.stringify(sangriasSaved))
        localStorage.setItem("sViasSaved", JSON.stringify(sViasSaved))

        document.getElementById("showSum").textContent = "TOTAL: " + viaSum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } catch (err) {
        alert("Ocorreu um erro ao fazer a sangria das vias > " + err);
        location.reload();
    } finally {
        window.print();;
    };

    document.querySelectorAll(".etc").forEach((input) => {
        if (!input.id) {
            input.value = "";
        };
        input.classList.remove("hidden");
    });
    saveState();
    location.reload()
}
//clearAll()

changeFontSize = () => {
    font = document.getElementById("fontSizeVar").value;
    document.getElementById("obsText").style = "font-size:" + font + "px;";
};

changeQrSize = () => {
    qrSize = document.getElementById("qrSizeVar").value;
    qrSize <= 4 ? qrSize = 4 : null;
    qrCodeSet();
};

qrCodeSet = () => {
    let userText = document.getElementById("obsText").textContent;
    userText.length <= 0 ? userText = "Nada" : null;
    document.getElementById("qr").setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${userText}`);
    document.getElementById("obsText").focus();

};

function hClass(opt, index, toolName, startPoint) {
    document.getElementById("obsText").classList.add("hidden");
    document.getElementById("barSec").classList.add("hidden");
    document.getElementById("qrSec").classList.add("hidden");
    document.getElementById("etiSec").classList.add("hidden");
    document.getElementById("caSec").classList.add("hidden");
    document.getElementById("qrTable").classList.add("hidden");
    document.getElementById("barrasTable").classList.add("hidden");
    document.getElementById("fontLabel").classList.add("hidden");
    document.getElementById("backSec").classList.remove("hidden");
    document.getElementById("etiquetar").classList.add("hidden");
    document.getElementById("etiquetarTable").classList.add("hidden");

    optName.textContent = toolName;
    setTimeout(() => document.getElementById(startPoint).focus(), 100)

    let ions = {
        0: ["barrasTable", "barrasValue"],
        1: ["obsText", "qrTable"],
        2: ["etiquetar"]
    }

    if (document.getElementById(opt).classList.contains("hidden")) {
        ions[index].forEach(function (id) {
            document.getElementById(id).classList.remove("hidden");
        });
    }
}

sClass = () => {
    document.getElementById("qrTable").classList.add("hidden");
    document.getElementById("barrasTable").classList.add("hidden");
    document.getElementById("barSec").classList.remove("hidden");
    document.getElementById("qrSec").classList.remove("hidden");
    document.getElementById("etiSec").classList.remove("hidden");
    document.getElementById("caSec").classList.remove("hidden");
    document.getElementById("obsText").classList.remove("hidden");
    document.getElementById("fontLabel").classList.remove("hidden");
    document.getElementById("backSec").classList.add("hidden");
    document.getElementById("etiquetar").classList.add("hidden");
    optName.textContent = "Texto ⤵";
    document.getElementById("obsText").focus();
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
        margin: 3,
        border: 1
    };
    const createLi = document.createElement("li");
    createLi.id = "barLi" + elementoInput.value;
    barTable.appendChild(createLi);

    const barName = document.createElement("input");
    barName.classList.add("barrasTitles");
    //barName.placeholder = `Nome ${elementoInput.value}`
    barName.placeholder = "#Del# exclui"
    createLi.appendChild(barName);
    createLi.appendChild(document.createElement("br"));

    const createImg = document.createElement("img");
    createImg.id = "codBarras" + barras;
    createLi.appendChild(createImg);
    const novoCodigobarras = `#${createImg.id}`;
    JsBarcode(novoCodigobarras, elementoInput.value, configuracao);

    document.getElementById("barrasValue").value = "";
    barName.focus();

    barName.addEventListener("change", function () {
        document.getElementById("barrasValue").focus();
        barCode = "barLi" + this.placeholder.slice(5)
        this.value == "#Del#" ? this.parentElement.remove() : null;
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

document.getElementById("pTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    putItOnPix();
}, { passive: true });

document.getElementById("eTouch").addEventListener("touchstart", () => {
    if (simpleLock) return;
    putItOnError();
}, { passive: true });

function setHol() {
    document.getElementById("hiddenHol").classList.remove("hidden");
    document.getElementById("holName").textContent = holidays[day].holName;
    document.getElementById("tagImg").setAttribute("src", holidays[day].holImg);
};

function labelProduct() {
    let product = document.getElementById("etiNameValue").value;
    let price = document.getElementById("etiPriceValue").value;

    let priceFormated = parseFloat(price).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById("etiName").textContent = product.toUpperCase();
    document.getElementById("etiPrice").textContent = priceFormated;

    document.getElementById("etiquetar").classList.add("hidden");
    document.getElementById("etiquetarTable").classList.remove("hidden");
    window.print();
    document.getElementById("etiquetar").classList.remove("hidden");
    document.getElementById("etiquetarTable").classList.add("hidden");

    document.getElementById("etiNameValue").value = "";
    document.getElementById("etiPriceValue").value = "";
    document.getElementById("etiNameValue").focus();
};

function processJson() {
    let data = document.querySelectorAll('.etc');
    let dataJson = [];

    let inputsNormais = [];
    let inputsDevolucoes = [];
    let inputsSinais = [];
    let inputsPix = [];
    let inputsErros = [];


    data.forEach((input) => {
        if (!input.value == "" && !input.id) {
            if (input.classList.contains("becomeDev")) {
                inputsDevolucoes.push(input.value);
            } else if (input.classList.contains("becomeSin")) {
                inputsSinais.push(input.value);
            } else if (input.classList.contains("becomePix")) {
                inputsPix.push(input.value);
            } else if (input.classList.contains("becomeError")) {
                inputsErros.push(input.value);
            } else {
                inputsNormais.push(input.value);
            }
        }
    });
    dataJson.push({ data: new Date().toLocaleDateString() });
    dataJson.push(loginFind);
    dataJson.push({ caixa: cashier });

    dataJson.push({ notas_50_100_200: document.getElementById("stuffs50_100_200").value });
    dataJson.push({ notas20: document.getElementById("stuffs20").value });
    dataJson.push({ notas10: document.getElementById("stuffs10").value });
    dataJson.push({ avulso: document.getElementById("stuffs").value });

    dataJson.push({ viasNormais: inputsNormais });
    dataJson.push({ devolucoes: inputsDevolucoes });
    dataJson.push({ sinais: inputsSinais });
    dataJson.push({ pixCel: inputsPix });
    dataJson.push({ erros: inputsErros });

    dataJson.push({ sangrias: sangriasSaved });
    dataJson.push({ sangriasCartoes: sViasSaved });


    saveJson = JSON.stringify(dataJson, null, 2);
    fileName = `FECHAMENTO_${login}_${nameText.textContent}_${date.textContent}`;

    try {
        exportJson(saveJson, fileName);
    } catch (err) {
        alert("ERRO AO EXPORTAR> " + err);
        location.reload();
    } finally {
        setTimeout(function () {
            clearAll();
        }, 900)
    }

};

function exportJson(items, jsonName) {
    const blob = new Blob([items], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = jsonName;
    link.click();
};

/*
var i;
for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
    */