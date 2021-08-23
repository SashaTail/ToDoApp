const express = require('express')
const config = require('config')
const mongoose = require('mongoose');


const PORT = config.get('port') || 5000

const app = express()
app.use(express.json({extended : false}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todo', require('./routes/todo.routes'))

async function start()
{
try {
    await mongoose.connect(config.get('mongoUrl'),{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    app.listen(PORT,() => console.log(`Server run on PORT ${PORT}`))
} catch (e) {
    console.log('server error', e.message)
    process.exit(1)
}
}

start()