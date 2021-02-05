var express = require("express");
var app = express();
var fs = require('fs');
var path = require('path');

const port = 8080;

// app.use(express.static('static'));

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname + "/index.html"))
})
app.get("/index.js", (req, res)=> {
    res.sendFile(path.join(__dirname + "/index.js"))
})

app.get('/getSpecificGames', (req, res) => {
    console.log(`===> /getAllGames with query of: ${req.query.query}`);
    if (req.query.query) {
        try {
            let raw = fs.readFileSync("games.json", "utf8");
            let parsed = JSON.parse(raw);
            let now = {}
            now.games = parsed.games.filter(e => {
                let myReg = new RegExp(".*" + req.query.query + ".*", 'gi');
                return e.name.match(myReg);
            })
            res.write(JSON.stringify(now));
        } catch (err) {
            res.status(500).send("Could not find games file");
        }
        res.end();
    } else {
        res.status(500).send("No input query");
    }
})

app.get('/getAllGames', (req, res) => {
    try {
        let raw = fs.readFileSync("games.json", "utf8");
        let parsed = JSON.parse(raw);
        let now = {}
        now.games = parsed.games
        res.write(JSON.stringify(now));
    } catch (err) {
        res.status(500).send("Could not find games file");
    }
    res.end();
})

app.listen(port);
console.log(`Listerning on port: ${port}`);