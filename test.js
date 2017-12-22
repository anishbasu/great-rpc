const great = require('./index.js');

const app = great('./LoginService.proto').LoginPackage.LoginService.createServer()

app.on('login', (client, response) => {
    response(null, {isLoggedIn: true})
})

app.on('register', (client, response) => {
    response({ayy: "lmao"}, {status: "OK", message: "Registered"})
})

app.listen(1997, () => console.log("Server running on 1997"))
