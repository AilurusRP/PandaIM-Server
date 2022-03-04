import { Schema, Model } from "mongoose";
import { mongoose } from "./definitionFile.js";

const usersSchema: Schema = new Schema({
    uname: String,
    passwd: String,
});
const msgsSchema: Schema = new Schema({
    uname: String,
    time: Number,
    msg: String,
});
let users: Model<any>, msgs: Model<any>;

function initCollections() {
    users = mongoose.model("users", usersSchema);
    msgs = mongoose.model("msgs", msgsSchema);
}

async function initDataBase(dbAddr: string) {
    mongoose.connection.on("connected", () => console.log("Database connected successfully!"));
    mongoose.connection.on("error", () => console.error("Failed to connect database!"));
    mongoose.connection.on("disconnected", () => console.log("Database disconnected!"));
    await mongoose.connect(dbAddr);
    initCollections();
}

async function authenticate(uname: string, passwd: string): Promise<Boolean> {
    if (!uname || !passwd) return false;
    let info = (await users.findOne({ uname: uname }))?.toObject();
    if (!info) return false;
    return info?.passwd === passwd;
}

async function saveMsg(uname: string, time: string, msg: string): Promise<Object> {
    msgs.create({
        uname: uname,
        time: time,
        msg: msg,
    });
    return await getAllMsgs();
}

async function getAllMsgs(): Promise<Object> {
    let allMsgs: Object = await msgs.find({});
    return allMsgs;
}

export { initDataBase, authenticate, saveMsg, getAllMsgs };
