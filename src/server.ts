import app = require("./app")

app.listen({
    host: '0.0.0.0',
    port: 3333,
}).then(() => {
    console.log(' API rodando PA!')
})
