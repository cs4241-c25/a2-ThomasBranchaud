// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const title = document.querySelector("#title").value;
    const genre = document.querySelector("#genre").value;
    const year = document.querySelector("#year").value;
    let online;
    online = document.querySelector("#online").value === "true";

    const json = {
        type: "add",
        title: title,
        genre: genre,
        online: online,
        releaseYear: year
    }
    console.log(json)

    const body = JSON.stringify(json)

    const response = await fetch( "/submit", {
        method:'POST',
        body
    })

    const text = await response.text()
    console.log( "text:", text )
    document.getElementById("form").reset();
    await updateData();
}

window.onload = async function () {
    const button = document.querySelector("button");
    button.onclick = submit;

    await updateData();

}

const updateData = async function(){
    const response = await fetch("/results", {
        method: 'GET'
    })

    const games = await response.json()
    console.log(games)
    const table = document.getElementById("tableBody")
    table.innerHTML = "";
    for (let i = 0; i < games.length; i++) {
        const title = document.createElement("td")
        title.innerText = games[i].title;
        const genre = document.createElement("td")
        genre.innerText = games[i].genre;
        const online = document.createElement("td")
        if (games[i].online === true) {
            online.innerText = "Yes";
        } else {
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
