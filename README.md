# PandaIM

Server side code of an instant messaging application.

Add a *config.js* file to the root path of the project before running, in which you need to set your port, mongodb address and project root path in your local file system. As code shows below.

```javascript
export default {
    dbAddr: "mongodb://localhost/<Your Database Name>",
    root: "<Your Root Path>",
    port: 3000,
};
```
