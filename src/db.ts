import { Schema } from "mongoose";
import { mongoose } from "./definitionFile.js";

const usersSchema: Schema = new mongoose.Schema({
    uname: String,
    passwd: String,
});
const msgsSchema: Schema = new mongoose.Schema({
    uname: String,
    time: Number,
    msg: String,
});
let users, msgs;

function initCollections() {
    users = mongoose.model("users", usersSchema);
    msgs = mongoose.model("msgs", msgsSchema);
}

async function initDataBase(dbAddr) {
    mongoose.connection.on("connected", () => console.log("Database connected successfully!"));
    mongoose.connection.on("error", () => console.error("Failed to connect database!"));
    mongoose.connection.on("disconnected", () => console.log("Database disconnected!"));
    await mongoose.connect(dbAddr);
    initCollections();
}

async function authenticate(uname: String, passwd: String): Promise<Boolean> {
    if (!uname || !passwd) return false;
    var info = (await users.findOne({ uname: uname }))?.toObject();
    if (!info) return false;
    return info?.passwd === passwd;
}

async function saveMsg(uname, time, msg) {
    msgs.create({
        uname: uname,
        time: time,
        msg: msg,
    });
    return await getAllMsgs();
}

async function getAllMsgs(): Promise<Object> {
    var allMsgs: Object = await msgs.find({});
    return allMsgs;
}

export { initDataBase, authenticate, saveMsg, getAllMsgs };
