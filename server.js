const express = require('express')
const config = require('config')
const mongoose = require('mongoose');
const path = require('path')

const models = require('./models/models')

const sequelize=require('./db')
const PORT = config.get('port') || 5000

const app = express()



app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todo', require('./routes/todo.routes'))

// Используется для build версии
/*
app.use('/', express.static(path.join(__dirname,'client', 'build')))
app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
})
*/
async function start()
{
try {
    await mongoose.connect(config.get('mongoUrl'),{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify: true,
    })

    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT,() => console.log(`Server run on PORT ${PORT}`))
} catch (e) {
    console.log('server error', e.message)
    process.exit(1)
}
}

start()