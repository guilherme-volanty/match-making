const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const connectToMongo = require("./db/mongo");

const routes = require('./routes/matchRouter');

connectToMongo();

const port = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(routes);

app.get("/status", function(req,res){
    res.send("API IS RUNNING")
});

app.listen(port, function(){
    console.log(`Example app listening on ${port}`)
});