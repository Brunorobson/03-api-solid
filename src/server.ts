import app = require("./app")
import env = require("./env")

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log(' API rodando PA!')
})
