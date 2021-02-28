document.addEventListener("DOMContentLoaded", function (event) {
});

var currentGames = [];

/*
        <div class="game-id game-atter">
            (${game.id})
        </div>    
*/
function displaySearchedGame(game) {
    let rankarea = `
    <div class="game-rank game-atter">
        Rank: ${game.rank}
    </div>
    `;

    if (game.rank == "NA") {
        rankarea = "";
    }

    document.getElementById("searched-game-container").innerHTML += `
    <div class="game" onclick="clickSingleGameItem(${game.id})">
        <div class="game-name game-atter">
            ${game.name}
        </div>
        ${rankarea}
        <div class="game-url game-atter">
            <a href="https://boardgamegeek.com/${game.url}">${game.url}</a>
        </div>
    </div>`
}

function clickSingleGameItem(id) {
    // console.log(id);
    console.log(getGameFromGamesList(id));
    addAGame(getGameFromGamesList(id))
        .then(d => {
            console.log(d);
            //add.js:39 {success: true, message: "Game added to list"}
        })
}

function getGameFromGamesList(id) {
    console.log(id);
    return currentGames.find(obj => {
        return obj.id === `${id}`
    })
}

function searchButtonClick() {
    document.getElementById("searched-game-container").innerHTML = "";
    let query = document.getElementById("game-search-text-input").value;
    if (query) {
        searchForGame(query)
            .then(d => {
                console.log(d);
                d.games.forEach(element => {
                    currentGames.push(element);
                    displaySearchedGame(element);
                });
            })
    } else {
        console.log("Nope");
    }
}

// const example = {"games": [{"name": "Eclipse", "url": "/boardgame/72125/eclipse", "rank": "51", "year": "2011", "id": "72125"}, {"name": "Eclipse  Second Dawn for the Galaxy", "url": "/boardgame/246900/eclipse-second-dawn-galaxy", "rank": "162", "year": "2020", "id": "246900"}, {"name": "Hapsburg Eclipse", "url": "/boardgame/149361/hapsburg-eclipse", "rank": "3841", "year": "2014", "id": "149361"}, {"name": "Eclipse", "url": "/boardgame/11542/eclipse", "rank": "9961", "year": "1999", "id": "11542"}, {"name": "The Twilight Saga  Eclipse  The Movie Board Game", "url": "/boardgame/69827/twilight-saga-eclipse-movie-board-game", "rank": "NA", "year": "2010", "id": "69827"}, {"name": "Kontact Now  Red Eclipse", "url": "/boardgame/184763/kontact-now-red-eclipse", "rank": "NA", "year": "N/A", "id": "184763"}, {"name": "Eclipse", "url": "/boardgame/23272/eclipse", "rank": "NA", "year": "N/A", "id": "23272"}, {"name": "HitchHikers Guide to the Eclipse", "url": "/boardgame/35700/hitch-hikers-guide-eclipse", "rank": "NA", "year": "1999", "id": "35700"}, {"name": "Epic Roll  Eclipse", "url": "/boardgame/209700/epic-roll-eclipse", "rank": "NA", "year": "2017", "id": "209700"}, {"name": "Eclipse Tiddlywinks", "url": "/boardgame/4792/tiddledy-winks", "rank": "20234", "year": "1888", "id": "4792"}, {"name": "Rubiks Eclipse", "url": "/boardgame/3081/rubiks-flip", "rank": "12929", "year": "1981", "id": "3081"}, {"name": "Eclipse", "url": "/boardgame/824/hijara", "rank": "16022", "year": "1995", "id": "824"}, {"name": "Eclipse", "url": "/boardgame/8148/trio", "rank": "NA", "year": "1972", "id": "8148"}]}

function navigateToAllGames() {
    window.location.href = "/";
}

//Promise Network Calls
//---------------------

function getAllGames() {
    return new Promise((res, rej) => {
        fetch("/getAllGames")
            .then((data) => {
                res(data.json())
            }).catch((err) => {
                rej(err.message);
            })
    });
}

function addAGame(gameObject) {
    return new Promise((res, rej) => {
        fetch("/addAGame", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "game": gameObject
            })
        })
            .then((data) => {
                res(data.json())
            }).catch((err) => {
                rej(err.message);
            })
    });
}

function searchForGame(query) {
    return new Promise((res, rej) => {
        fetch(`/search?query=${query}`)
            .then((data) => {
                res(data.json())
            }).catch((err) => {
                rej(err.message);
            })
    });
}