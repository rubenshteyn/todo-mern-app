const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/todo', require('./routes/todo.route'))


async function start() {
    try {
       await mongoose.connect('mongodb+srv://admin:12345@cluster0.6o6fqws.mongodb.net/todo-app?retryWrites=true&w=majority', {
           useNewUrlParser: true, useUnifiedTopology: true
       })
        app.listen(PORT, ()=> {
            console.log(`СЕРВАК РАБОТАЕТ ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}
start()