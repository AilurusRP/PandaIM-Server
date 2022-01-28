import { authenticate, saveMsg } from "./db.js";

let clients = [];

function sendToAllClients(msg) {
    clients.forEach(item => {
        item.write(`data:${JSON.stringify(msg)}\n\n`);
    });
}

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

function longConnect(app) {
    app.get("/longConnect", (req, res) => {
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders(); // flush the headers to establish SSE with client
        clients.push(res);
        console.log(`${clients.length} clients connected.`);
    });
}

function msg(app) {
    app.post("/msg", async function (req, res) {
        var { uname, time, msg } = req.body;
        console.log(uname, time, msg);
        var allMsgs = await saveMsg(uname, time, msg);
        sendToAllClients(allMsgs);
        res.send({});
    });
}

export default {
    index,
    login,
    longConnect,
    msg,
};
