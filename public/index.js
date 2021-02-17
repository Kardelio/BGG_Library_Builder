document.addEventListener("DOMContentLoaded", function (event) {
    refreshAllGames();
});

function refreshAllGames() {
    document.getElementById("my-games").innerHTML = "";
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
}

function displayGame(game) {

    let playerArea = `
        <div class="game-players-all">${game.min_players}-${game.max_players} players</div>
    `;

    if (game.min_players == game.max_players) {
        playerArea = `
            <div class="game-players-all">${game.max_players} players</div>
        `;
    }

    let timeArea = `
        <div class="game-time-all">${game.min_play_time}-${game.max_play_time} mins</div>
    `;

    if (game.min_play_time == game.max_play_time) {
        timeArea = `
            <div class="game-time-all">${game.max_play_time} mins</div>
        `;
    }

    document.getElementById("my-games").innerHTML += `
    <div class="single-game-block card">
        <img class="game-image" src="${game.image}"/>
        <div class="single-game-block-overlay"></div>
        <div class="inner-game-block">
            <div class="game-name-all">${game.name} (${game.year})</div>
            ${playerArea}
            ${timeArea}
        </div>
        <div class="remove-button" onclick="removeAGame(${game.game_id})">x</div>
    </div>`;
}

function navigateToAdd() {
    window.location.href = "add.html";
}

function navigateToAllGames() {
    window.location.href = "/";
}

function removeAGame(id) {
    console.log(id);
    removeSpecificGame(id)
        .then(data => {
            console.log(data);
            refreshAllGames();
        }).catch(err => {
            console.log(err);
        })
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

function removeSpecificGame(id) {
    return new Promise((res, rej) => {
        fetch(`/removeAGame?id=${id}`)
            .then((data) => {
                return data.json()
            }).then((d) => {
                if (d.success) {
                    res(d);
                } else {
                    rej("erre");
                }
            }).catch((err) => {
                rej(err);
            })
    });
}