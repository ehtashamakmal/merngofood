const express = require('express');
const path = require('path')
const app = express()

const PORT = 5000 
const db = require('./db');
db();

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With , Content-Type, Accept" 
);
next();
})

//static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function(req,res)
{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//middleware



app.use(express.json())
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData')); 
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req,res) => {

    res.send("Hello World!")
    
    
    }) 




app.listen(PORT , () =>  {
    console.log("Server is running on port "+PORT);
});