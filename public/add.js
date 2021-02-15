document.addEventListener("DOMContentLoaded", function (event) {
    // getAllGames()
    //     .then(d => {
    //         console.log(d);
    //         d.games.forEach(element => {
    //             displayGame(element);
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);

    //     });
});

function displaySearchedGame(game){
    // document.getElementById("my-games").innerHTML += `
    // <div class="single-game-block">
    // <img class="game-image" src="${game.image}"
    //     ${game.name}
    // </div>`;
    document.getElementById("searched-game-container").innerHTML += `
    <div class="game">
        <div class="game-name">
            ${game.name}
        </div>
        <div class="game-id">
            (${game.id})
        </div>
        <div class="game-rank">
            ${game.rank}
        </div>
        <div class="game-url">
            ${game.url}
        </div>
    </div>`
}

//name
//url
//id
//rank
function searchButtonClick(){
    console.log("Click");
    document.getElementById("searched-game-container").innerHTML = "";
    let query = document.getElementById("game-search-text-input").value;
    if(query){
        searchForGame(query)
        .then(d => {
            console.log(d);
            d.games.forEach(element => {
                displaySearchedGame(element);
            });
        })
    } else {
        console.log("Nope");
    }
}

const example = {"games": [{"name": "Eclipse", "url": "/boardgame/72125/eclipse", "rank": "51", "id": "72125"}, {"name": "Eclipse  Second Dawn for the Galaxy", "url": "/boardgame/246900/eclipse-second-dawn-galaxy", "rank": "171", "id": "246900"}, {"name": "Hapsburg Eclipse", "url": "/boardgame/149361/hapsburg-eclipse", "rank": "3823", "id": "149361"}, {"name": "Eclipse", "url": "/boardgame/11542/eclipse", "rank": "9952", "id": "11542"}, {"name": "The Twilight Saga  Eclipse  The Movie Board Game", "url": "/boardgame/69827/twilight-saga-eclipse-movie-board-game", "rank": "NA", "id": "69827"}, {"name": "Kontact Now  Red Eclipse", "url": "/boardgame/184763/kontact-now-red-eclipse", "rank": "NA", "id": "184763"}, {"name": "Eclipse", "url": "/boardgame/23272/eclipse", "rank": "NA", "id": "23272"}, {"name": "HitchHikers Guide to the Eclipse", "url": "/boardgame/35700/hitch-hikers-guide-eclipse", "rank": "NA", "id": "35700"}, {"name": "Epic Roll  Eclipse", "url": "/boardgame/209700/epic-roll-eclipse", "rank": "NA", "id": "209700"}, {"name": "Eclipse Tiddlywinks", "url": "/boardgame/4792/tiddledy-winks", "rank": "20211", "id": "4792"}, {"name": "Rubiks Eclipse", "url": "/boardgame/3081/rubiks-flip", "rank": "12916", "id": "3081"}, {"name": "Eclipse", "url": "/boardgame/824/hijara", "rank": "16005", "id": "824"}, {"name": "Eclipse", "url": "/boardgame/8148/trio", "rank": "NA", "id": "8148"}]};


function navigateToAllGames(){
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

function searchForGame(query){
    return new Promise((res, rej) => {
        res(example);
        // fetch(`/search?query=${query}`)
        //     .then((data) => {
        //         res(data.json())
        //     }).catch((err) => {
        //         rej(err.message);
        //     })
    });
}
/*
 style="background-image: url('${game.image}')"

background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
*/
