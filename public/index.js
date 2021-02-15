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
    <img class="game-image" src="${game.image}"
        ${game.name}
    </div>`;
}

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
