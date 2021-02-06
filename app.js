var express = require("express");
var app = express();
var fs = require('fs');
var path = require('path');
const { PythonShell } = require('python-shell');

const SEARCH_SCRIPT = "";

const port = 8080;
app.use(express.static(__dirname + '/public'));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.html"))
// })
// app.get("/index.js", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.js"))
// })
// app.get("/main.css", (req, res) => {
//     res.sendFile(path.join(__dirname + "/mains.css"))
// })

app.get('/search', (req, res) => {
    if (req.query.query) {
        console.log(`Search for: ${req.query.query}`);
        pythonFunctionProm(req.query.query)
            .then(d => {
                res.write(d);
                res.end();
            })
            .catch(err => {
                res.status(500).send("Nah");
            });
    } else {
        res.status(500).send("No search query");
    }
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
});


function pythonFunctionProm(query) {
    return new Promise((success, reject) => {
        let options = {
            args: [query]
        };

        PythonShell.run('search.py', options, function (err, results) {
            if (err) {
                reject(err);
            } else {
                success(results[0].trim().replace(/'/g, '"'))
            }
        });
    })
}

app.listen(port);
console.log(`Listerning on port: ${port}`);