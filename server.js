
const express = require("express");
const Datastore = require("nedb")
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.listen(port);
app.use(express.static('public'));
app.use(express.json({limit : "1mb"}));

const database =  new Datastore('database.db');
database.loadDatabase();
app.get('/api', function(req,res){

    console.log(" Got a GET request");

    database.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);

    })
   
});

app.post('/api', function (req, res) {
    
    console.log("*> Got a POST request");
    const data = req.body;
    console.log(data);
    
    const timestamp = Date.now();
    data.timestamp = timestamp;
    

    database.insert(data)
    res.json(data);
    
  });