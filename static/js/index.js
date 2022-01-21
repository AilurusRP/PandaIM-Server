function getUname() {
    var uname = document.querySelector("#unameInput");
    console.log(uname.value);
    return uname;
}

function getPasswd() {
    var passwd = document.querySelector("#passwdInput");
    return passwd;
}

function reqConfig() {
    var reqConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uname: getUname().value,
            passwd: getPasswd().value,
        }),
    };
    return reqConfig;
}

function submit() {
    fetch("http://127.0.0.1:3000/login", reqConfig())
        .then(res => res.json())
        .then(res => console.log(res.text));
}
