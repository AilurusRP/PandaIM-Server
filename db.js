import mongoose from "mongoose";

var users = null;

async function initDataBase(dbAddr) {
    mongoose.connection.on("connected", () => console.log("Database connected successfully!"));
    mongoose.connection.on("error", () => console.error("Failed to connect database!"));
    mongoose.connection.on("disconnected", () => console.log("Database disconnected!"));
    await mongoose.connect(dbAddr);
    users = mongoose.model("users", {});
}

async function authenticate(uname, passwd) {
    var info = (await users.findOne({ uname: uname })).toObject();
    return info.passwd === passwd ? true : false;
}

export { initDataBase, authenticate };
