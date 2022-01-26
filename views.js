import { authenticate, saveMsg } from "./db.js";

function index(app, root) {
    app.get("/", (req, res) => res.sendFile(root + "index.html"));
}

function login(app) {
    app.post("/login", async function (req, res) {
        var info = req.body;
        var success = Boolean(await authenticate(info.uname, info.passwd));
        res.send({
            uname: info.uname,
            success: success,
        });
    });
}

function msg(app) {
    app.post("/msg", async function (req, res) {
        var { uname, time, msg } = req.body;
        console.log(uname, time, msg);
        var allMsgs = await saveMsg(uname, time, msg);
        res.send(allMsgs);
    });
}

export default {
    index,
    login,
    msg,
};
