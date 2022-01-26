function checkLogin() {
    var uname = Cookies.getItem("uname");
    if (uname) goToChatPage();
}

function getUname() {
    var uname = document.querySelector("#unameInput");
    return uname.value;
}

function getPasswd() {
    var passwd = document.querySelector("#passwdInput");
    return passwd.value;
}

function getMsg() {
    var msg = document.querySelector("#msgInput");
    return msg.value;
}

function loginReqConfig() {
    var reqConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uname: getUname(),
            passwd: getPasswd(),
        }),
    };
    return reqConfig;
}

function sendMsgReqConfig() {
    var date = new Date().valueOf();
    console.log(date);
    var reqConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uname: Cookies.getItem("uname"),
            time: date,
            msg: getMsg(),
        }),
    };
    return reqConfig;
}

function goToChatPage() {
    document.querySelector("#loginBox").style.display = "none";
    document.querySelector("#chatBox").style.display = "block";
}

async function login() {
    var res = await (await fetch("http://127.0.0.1:3000/login", loginReqConfig())).json();
    if (res.success) {
        console.log("You've successfully logged in!");
        Cookies.setItem("uname", res.uname);
        console.log(Cookies.getItem("uname"));
        goToChatPage();
    }
}

function printAllMsgs(res) {
    console.clear();
    res.forEach((item) => {
        var { uname, time, msg } = item;
        var date = new Date(time);
        var dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log(`${uname} ${dateStr}\n${msg}`);
    });
}

async function sendMsg() {
    var res = await (await fetch("http://127.0.0.1:3000/msg", sendMsgReqConfig())).json();
    printAllMsgs(res);
}
