
const express = require("express");
const Datastore = require("nedb")
const app = express();
require('dotenv').config();
const port = process.env.PORT||3000;

app.listen(port);
app.use(express.static('public'));
app.use(express.json({limit : "1mb"}));

const database =  new Datastore('database.db');
database.loadDatabase();
app.get('/api', function(req,res){

    database.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);

    })
   
});

app.post('/api', function (req, res) {
    

    const data = req.body;

    
    const timestamp = Date.now();
    data.timestamp = timestamp;
    

    database.insert(data)
    res.json(data);
    
  });