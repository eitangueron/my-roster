const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',api)


app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))




const port = 3000
app.listen(port, function(){
    console.log('port is live and strong')
})