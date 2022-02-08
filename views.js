import jwt from "jsonwebtoken";
import config from "./config.js";
import {authenticate, saveMsg, getAllMsgs} from "./db.js";

const {secret} = config;
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
        let info = req.body;
        console.log(info);
        let success = Boolean(await authenticate(info.uname, info.passwd));

        let token = "Bearer " + jwt.sign({
            uname: info.uname,
        }, secret, {
            expiresIn: "7d",
        });

        console.log(token);

        res.send({
            success,
            token,
        });
    });
}

function longConnect(app) {
    const setHeader = async (req, res) => {
        let allMsgs = await getAllMsgs();
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders(); // flush the headers to establish SSE with client
        if (req.query.client === "rn") res.write(`\n\ndata:${JSON.stringify(allMsgs)}\n\n`);
    };

    app.get("/longConnect", async (req, res) => {
        await setHeader(req, res);
        if (clients.map(x => x.uname)) {
            clients = clients.filter(x => x.uname !== req.user.uname);
        }
        res.uname = req.user.uname;
        clients.push(res);
        console.log(`${clients.length} clients connected.`);
    });
}

function msg(app) {
    app.post("/msg", async function (req, res) {
        let uname = req.user.uname;
        let {time, msg} = req.body;
        console.log(uname, time, msg);
        let allMsgs = await saveMsg(uname, time, msg);
        sendToAllClients(allMsgs);
        res.end();
    });
}

export default {
    index,
    login,
    longConnect,
    msg,
};
