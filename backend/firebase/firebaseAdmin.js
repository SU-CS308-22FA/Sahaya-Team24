var admin = require("firebase-admin");

var serviceAccount = require("./sahaya-1c292-firebase-adminsdk-5mlix-86a86dda31.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin