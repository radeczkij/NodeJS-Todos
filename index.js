const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs.engine),
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use('/', todoRoutes)

async function start() {
  const url = `mongodb+srv://Maxim2:2qdf20cZwiQzogdd@cluster0.igwxd.mongodb.net/todos`
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true
    })
    app.listen(PORT, () => {
      console.log('Server is running...')
    })    
  } catch (e) {
    console.log(e)
  }
}

start()