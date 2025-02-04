const updateClicked = async function(event){
    const response = await fetch("/results", {
        method: 'GET'
    })

    const games = await response.json();

    const div = document.getElementById("titleSelect");
    div.innerHTML = ""
    const label = document.createElement("label");
    label.for = "titleSelection";
    label.innerText = "What entry would you like to modify?"
    const select = document.createElement("select");
    select.id = "titleSelection";
    for (let i = 0; i < games.length; i++){
        const option = document.createElement("option");
        option.value = games[i].title;
        option.innerText = games[i].title;
        select.appendChild(option);
    }
    select.onchange = function(event){
        displayFields(games)
    };
    div.appendChild(label);
    div.appendChild(select);
    const insideDiv = document.createElement("div");
    insideDiv.id = "insideDiv";
    console.log("Div Created");
    div.appendChild(insideDiv)
    await createModifyForm(games);
}


const displayFields = async function(games){
    await createModifyForm(games)
}
    /*
    const select = document.getElementById("titleSelection");
    const newGenre = document.createElement("label");
    newGenre.innerText = "Enter the New Genre";
    const genreText = document.createElement("input");
    genreText.type = "text";
    genreText.value = games[games.findIndex(games => games.title === select.value)].genre;
    genreText.id = "genreInput";
    newGenre.for = "genreInput";
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(newGenre)
    insideDiv.appendChild(genreText)

    const onlineSelect = document.createElement("select")
    onlineSelect.id = "onlineInput"
    onlineSelect.value = games[games.findIndex(games => games.title === select.value)].online;
    const on = document.createElement("option")
    on.value = "true"
    on.innerText = "Yes"
    onlineSelect.appendChild(on)
    const off = document.createElement("option")
    off.value = "false"
    off.innerText = "No"
    onlineSelect.appendChild(off)
    const newOnline = document.createElement("label")
    newOnline.for = "onlineInput"
    newOnline.innerText = "Is the game Online?"
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(newOnline)
    insideDiv.appendChild(onlineSelect)
}
 */

const deleteClicked = async function (event){
    const response = await fetch("/results", {
        method: 'GET'
    })

    const games = await response.json();

    const div = document.getElementById("titleSelect");
    div.innerHTML =""
    const label = document.createElement("label");
    label.for = "titleSelection";
    label.innerText = "What entry would you like to Delete?"
    const select = document.createElement("select");
    select.id = "titleSelection";
    for (let i = 0; i < games.length; i++){
        const option = document.createElement("option");
        option.value = games[i].title;
        option.innerText = games[i].title;
        select.appendChild(option);
    }
    div.appendChild(label);
    div.appendChild(select);
    const finalizeDelete = document.createElement("button");
    finalizeDelete.onclick = removeEntry;
    finalizeDelete.innerText = "Delete";
    div.appendChild(document.createElement("br"))
    div.appendChild(document.createElement("br"))
    div.appendChild(finalizeDelete);
}

const removeEntry = async function (event){
    const entryToDelete = document.getElementById("titleSelection").value;
    const json = {
        type: "delete",
        title: entryToDelete
    }

    const body = JSON.stringify(json);

    const response = await fetch("/delete",{
        method: 'POST',
        body
    })

    window.location.href = "index.html"
}

const createModifyForm = async function (games){
    console.log("Inside the Div")
    const insideDiv = document.getElementById("insideDiv")
    insideDiv.innerHTML = "";
    const select = document.getElementById("titleSelection")
    const newGenre = document.createElement("label");
    newGenre.innerText = "Enter the New Genre";
    const genreText = document.createElement("input");
    genreText.type = "text";
    genreText.value = games[games.findIndex(games => games.title === select.value)].genre;
    genreText.id = "genreInput";
    newGenre.for = "genreInput";
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(newGenre)
    insideDiv.appendChild(genreText)

    const onlineSelect = document.createElement("select")
    onlineSelect.id = "onlineInput"
    onlineSelect.value = games[games.findIndex(games => games.title === select.value)].online;
    const on = document.createElement("option")
    on.value = "true"
    on.innerText = "Yes"
    onlineSelect.appendChild(on)
    const off = document.createElement("option")
    off.value = "false"
    off.innerText = "No"
    onlineSelect.appendChild(off)
    const newOnline = document.createElement("label")
    newOnline.for = "onlineInput"
    newOnline.innerText = "Is the game Online?"
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(newOnline)
    insideDiv.appendChild(onlineSelect)

    const yearField = document.createElement("input")
    yearField.id = "yearField"
    yearField.value = games[games.findIndex(games => games.title === select.value)].releaseYear
    const yearLabel = document.createElement("label")
    yearLabel.for = "yearField"
    yearLabel.innerText = "Enter the new Year"
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(yearLabel)
    insideDiv.appendChild(yearField)

    const submitButton = document.createElement("button")
    submitButton.onclick = submitModifiedEntry
    submitButton.innerText = "Submit"
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(document.createElement("br"))
    insideDiv.appendChild(submitButton)

}

const submitModifiedEntry = async function(){
    const title = document.getElementById("titleSelection").value
    const genre = document.getElementById("genreInput").value
    const online = document.getElementById("onlineInput").value
    const year = document.getElementById("yearField").value

    const json = {
        type: "modify",
        title: title,
        genre: genre,
        online: online,
        releaseYear: year
    }

    const body = JSON.stringify(json)

    await fetch ("/modify", {
        method: 'POST',
        body
    })

    window.location.href = "index.html"

}

window.onload = async function (event){
    const updateButton = document.getElementById("updateButton");
    updateButton.onclick = updateClicked;

    const deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = deleteClicked;
}