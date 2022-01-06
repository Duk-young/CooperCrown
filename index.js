const express = require('express')
const app = express();

const root = require("path").join(__dirname , 'client/build')

app.use(express.static(root))


app.get('*',(req, res )=>{

    res.sendFile(__dirname + 'client/build/index.html')
})
app.listen(process. env.PORT || 5000,  ( )=>{
    console.log('react server started')
})