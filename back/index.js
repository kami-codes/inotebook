const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo()

const app = express()

app.use(cors())
app.use(express.json())
 
app.use('/auth/api', require('./routes/auth'))
app.use('/notes/api', require('./routes/notes'))


app.listen(5000, function(){
    console.log('server running on the port 5000')
})

