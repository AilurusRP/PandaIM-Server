import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./views.js";
import config from "./config.js";

const app = express();
const { dbAddr, root, port } = config;

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function initDataBase() {
    mongoose.connect(dbAddr);
    mongoose.connection.on("connected", () => console.log("Database connected successfully!"));
    mongoose.connection.on("error", () => console.error("Failed to connect database!"));
    mongoose.connection.on("disconnected", () => console.log("Database disconnected!"));
}

function setStatic() {
    app.use(express.static(root + "static"));
}

function setRouter() {
    Object.values(routes).forEach(route => route(app, root));
}

function startServer() {
    initDataBase();
    setStatic();
    setRouter();
    app.listen(port, () => console.log(`Listening to http://127.0.0.1:${port}`));
}

startServer();
