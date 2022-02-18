# PandaIM

Server side code of an instant messaging application.

Add a *config.ts* file to the root path of the project before running, in which you need to set your port, mongodb address and the project root path in your local file system. As code shows below.

```javascript
export default {
    dbAddr: "mongodb://<Your Database Address>",
    root: "<Your Root Path>",
    port: 3000,
    secret: "Your secret key to encrypt the token",
};
```
