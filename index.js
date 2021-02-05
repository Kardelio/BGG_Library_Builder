console.log("Test");

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

