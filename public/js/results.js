

window.onload = async function (event) {

    const response = await fetch ("/results",{
        method : 'GET'
    })

    const games = await response.json()
    console.log(games)
    const table = document.getElementById("tableBody")
    for (let i = 0; i < games.length; i++){
        const title = document.createElement("td")
        title.innerText = games[i].title;
        const genre = document.createElement("td")
        genre.innerText = games[i].genre;
        const online = document.createElement("td")
        if (games[i].online === true){
            online.innerText = "Yes";
        }
        else {
            online.innerText = "No";
        }
        const year = document.createElement("td")
        year.innerText = games[i].releaseYear;
        const age = document.createElement("td")
        age.innerText = games[i].age;

        const tr = document.createElement("tr")
        tr.appendChild(title)
        tr.appendChild(genre)
        tr.appendChild(online)
        tr.appendChild(year)
        tr.appendChild(age)
        table.appendChild(tr)
    }
}