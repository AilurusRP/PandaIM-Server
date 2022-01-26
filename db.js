import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({ uname: String, passwd: String });
const msgsSchema = new mongoose.Schema({ uname: String, time: Number, msg: String });
var users = null;
var msgs = null;

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

async function authenticate(uname, passwd) {
    console.log(uname);
    var info = (await users.findOne({ uname: uname }))?.toObject();
    return info?.passwd === passwd ? true : false;
}

async function saveMsg(uname, time, msg) {
    msgs.create({
        uname: uname,
        time: time,
        msg: msg,
    });
    return await getAllMsgs();
}

async function getAllMsgs() {
    var allMsgs = await msgs.find({});
    return allMsgs;
}

export { initDataBase, authenticate, saveMsg };
