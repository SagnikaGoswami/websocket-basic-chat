import { WebSocket } from "ws";
import readline from "node:readline";

// creating a client object
const ws = new WebSocket("ws://localhost:5000")

// accessing readline module to take user input and display the same
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

// client gets connected through an open connection
ws.on("open", () => {
    console.log("Connected to ther server.")
    console.log("Type a message and press Enter: ")
})

// client receives messages from the server
ws.on("message", (rawData) => {
    console.log(`[RECEIVED]: ${rawData.toLocaleString()}`)
})

// checking for any connection error
ws.on("error", (err) => {
    console.log(`WebSocket Client Error: ${err}`)
})

// if server gets disconnected
ws.on("close", () => {
    console.log(`Server Disconnected.`)
    rl.close()
})

// reading messages and sending them to only the active clients
rl.on("line", (message) => {
    if(ws.readyState == WebSocket.OPEN){
        ws.send(message)
    } else{
        console.log("WebSocket is not connected.")
    }
})