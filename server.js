const http = require( "node:http" ),
    fs   = require( "node:fs" ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

const appdata = [
    { "title": "Apex Legends", "genre": "First Person Shooter", "online": true, "releaseYear": 2019, "age": 6},
    { "title": "Marvel Rivals", "genre": "Third Person Shooter", "online": true, "releaseYear": 2024, "age": 1},
    { "title": "Hollow Knight", "genre": "2D Platformer", "online": false, "releaseYear": 2017, "age": 8}
]

// let fullURL = ""
const server = http.createServer( function( request,response ) {
    if( request.method === "GET" ) {
        handleGet( request, response )
    }else if( request.method === "POST" ){
        handlePost( request, response )
    }

    // The following shows the requests being sent to the server
    // fullURL = `http://${request.headers.host}${request.url}`
    // console.log( fullURL );
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )
    console.log(request.url)

    if( request.url === "/" || request.url === "/a2-ThomasBranchaud/public/index.html") {
        sendFile( response, "./public/index.html" )
    }
    else if (request.url === "/results"){
        response.end(JSON.stringify(appdata))
    }
    else if (request.url === "/a2-ThomasBranchaud/public/results.html"){
        sendFile(response, "./public/results.html")
    }
    else if (request.url === "/a2-ThomasBranchaud/public/css/main.css"){
        sendFile(response, "./public/css/main.css")
    }
    else if (request.url === "/a2-ThomasBranchaud/public/js/results.js"){
        sendFile(response, "./public/js/results.js")
    }
    else if (request.url.includes("/index.html")){
        sendFile( response, "./public/index.html" )
    }
    else if (request.url === "/a2-ThomasBranchaud/public/js/main.js"){
        sendFile(response, "./public/js/main.js")
    }
    else if(request.url === "/a2-ThomasBranchaud/public/delete.html"){
        sendFile(response, "./public/delete.html")
    }
    else if(request.url === "/a2-ThomasBranchaud/public/js/delete.js"){
        sendFile(response, "./public/js/delete.js")
    }
    else{
        sendFile( response, filename )
    }
}

const handlePost = function( request, response ) {
    let dataString = ""

    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        console.log(dataString)
        const data = JSON.parse(dataString)
        if (data.type === "delete"){
            const index = appdata.findIndex(appdata => appdata.title === data.title)
            appdata.splice(index, 1)
        }
        else if (data.type === "modify"){
            console.log(data)
            const gameToChange = appdata.find(appdata => appdata.title === data.title)
            gameToChange.genre = data.genre
            gameToChange.online = data.online
            gameToChange.releaseYear = data.releaseYear
            gameToChange.age = 2025 - data.releaseYear
            if (gameToChange.age === 0){
                gameToChange.age = 1
            }
        }
        else if (data.type === "add"){
            let age = 2025 - Number(data.releaseYear);
            if (age === 0){
                age = 1
            }
            const object = {
                "title": data.title,
                "genre": data.genre,
                "online": data.online,
                "releaseYear": Number(data.releaseYear),
                "age": age
            }
            console.log(object)
            appdata.push(object)
        }

        // ... do something with the data here and at least generate the derived data

        response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
        response.end("text")
    })
}

const sendFile = function( response, filename ) {
    const type = mime.getType( filename )

    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHeader( 200, { "Content-Type": type })
            response.end( content )

        } else {

            // file not found, error code 404
            response.writeHeader( 404 )
            response.end( "404 Error: File Not Found" )

        }
    })
}

// process.env.PORT references the port that Glitch uses
// the following line will either use the Glitch port or one that we provided
server.listen( process.env.PORT || port )

