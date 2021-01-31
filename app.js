var express = require("express");
var app = express();
var fs = require('fs');

const port = 8080;

app.get('/getSpecificGames', (req, res) => {
    console.log(`===> /getAllGames with query of: ${req.query.query}`);
    if(req.query.query){
        try{
            let raw = fs.readFileSync("games.json", "utf8");
            let parsed = JSON.parse(raw);
            let now = {}
            now.games = parsed.games.filter(e => e.name.includes(req.query.query))
            res.write(JSON.stringify(now));
        } catch (err){
            res.status(500).send("Could not find games file");
        }
        res.end();
    } else {
        res.status(500).send("No input query");
    }
})

app.get('/getAllGames', (req, res) => {

})

app.listen(port);