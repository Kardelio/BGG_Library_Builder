document.addEventListener("DOMContentLoaded", function (event) {
    getHostName()
        .then(d => {
            console.log(d);
            d.games.forEach(element => {
                document.getElementById("container").innerHTML += `<p>${element.name}</p>`;
            });
        })
        .catch(err => {
            console.log(err);

        });
});

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
                document.getElementById("searched-game-container").innerHTML += `
                <div class="game">
                    <div class="game-name">
                        ${element.name}
                    </div>
                    <div class="game-id">
                        (${element.id})
                    </div>
                    <div class="game-rank">
                        ${element.rank}
                    </div>
                    <div class="game-url">
                        ${element.url}
                    </div>
                </div>`
            });
        })
    } else {
        console.log("Nope");
    }
}

//Promise Network Calls
//---------------------

function searchForGame(query){
    return new Promise((res, rej) => {
        fetch(`/search?query=${query}`)
            .then((data) => {
                res(data.json())
            }).catch((err) => {
                rej(err.message);
            })
    });
}

function getHostName() {
    return new Promise((res, rej) => {
        fetch("/getAllGames")
            .then((data) => {
                res(data.json())
            }).catch((err) => {
                rej(err.message);
            })
    });
}


