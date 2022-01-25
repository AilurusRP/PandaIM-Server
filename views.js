import { authenticate } from "./db.js";

function index(app, root) {
    app.get("/", (req, res) => res.sendFile(root + "index.html"));
}

function login(app) {
    app.post("/login", async function (req, res) {
        var info = req.body;
        if ((await authenticate(info.uname, info.passwd)) === true) {
            res.send({ text: "You've succeessfully logged in!" });
        } else {
            res.send({ text: "You are failed to login!" });
        }
    });
}

export default {
    index,
    login,
};
