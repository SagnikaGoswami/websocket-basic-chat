import {WebSocketServer, WebSocket} from "ws"

// creating a server object
const wss = new WebSocketServer({port: 5000})

// listening to the client connection.socket
wss.on("connection", (socket, req) => {

    // ip address of the client
    const ip = req.socket.remoteAddress
    console.log(`Connected to Client: ${ip}`)

    // client sending message to the server
    socket.on("message", (rawData) => {
        const message = rawData.toLocaleString()

        // server broadcasting messages to every actve client
        wss.clients.forEach((client) => {
            if(client.readyState == WebSocket.OPEN){
                client.send(`Server Broadcast: ${message}`)
            }
        })
    })

    // checking for socket connection error
    socket.on("error", (err) => {
        console.log(`WebSocket Server Error: ${err}`)
    })

    // if clients get disconnected
    socket.on("close", () => {
        console.log(`Client Disconnected.`)
    })
})

// console message to be displayed when the server is live
console.log(`Websocket server is live at: ws://localhost:5000`)