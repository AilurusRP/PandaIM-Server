# PandaIM

Server side code of an instant messaging application.

Add a *config.ts* file to *src* before running, in which you need to set your port, mongodb address and your secret key to encrypt the token. As code shows below.

```javascript
export default {
    dbAddr: "mongodb://<Your Database Address>",
    port: 3000,
    secret: "Your secret key to encrypt the token",
};
```
