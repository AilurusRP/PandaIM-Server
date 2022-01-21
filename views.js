function index(app, root) {
    app.get("/", (req, res) => res.sendFile(root + "index.html"));
}

function login(app) {
    app.post("/login", function (req, res) {
        console.log(req.body);
        res.send({ text: "hhhhhhhhhhhh" });
    });
}

export default {
    index,
    login,
};
