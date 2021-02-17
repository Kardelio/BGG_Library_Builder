document.addEventListener("DOMContentLoaded", function (event) {
    getAllGames()
        .then(d => {
            console.log(d);
            d.games.forEach(element => {
                displayGame(element);
            });
        })
        .catch(err => {
            console.log(err);

        });
});

function displayGame(game){
    document.getElementById("my-games").innerHTML += `
    <div class="single-game-block">
        <img class="game-image" src="${game.image}"/>
        <div class="single-game-block-overlay"></div>
        <div class="inner-game-block">
            <div>${game.name} (${game.year})</div>
            <div>${game.min_players}-${game.max_players} players</div>
            <div>${game.min_play_time}-${game.max_play_time} mins</div>
        </div>
    </div>`;
}
{/* <div class="single-game-block-overlay"></div> */}

function navigateToAdd(){
    window.location.href = "add.html";
}

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
/*
 style="background-image: url('${game.image}')"

background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
*/
