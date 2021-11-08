const express = require('express')

const config = require('config')

const PORT = config.get('port') || 5000

const sequelize=require('./db')

const models = require('./models/models')

const app = express()
app.use(express.json({extended : false}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todo', require('./routes/todo.routes'))


async function start()
{
try {
    app.listen(PORT,() => console.log(`Server run on PORT ${PORT}`))
    await sequelize.authenticate()
    await sequelize.sync()
} catch (e) {
    console.log('server error', e.message)
    process.exit(1)
}
}


start()