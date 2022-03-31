require('dotenv').config()

const server = require('./api/server')

const port = process.env.port
server.listen(port, () => console.log(`SERVER running on port`, port))