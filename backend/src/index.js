const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:8080'}})
const PORT = 2434
let Users = {}

//Socket
    io.on('connection', (socket) => {
        console.log(`[${socket.id}] conectado!`)

        Users[socket.id] = {
            id: socket.id,
            x: -20,
            y: -66,
            url: '../assets/ash_back.png'
        }

        socket.on('disconnect', () => {
            console.log(`[${socket.id}] desconectado!`)

            Users[socket.id] = undefined

            io.emit('USERS_LIST', Users)
        })

        socket.emit('ID_USER', socket.id)

        io.emit('USERS_LIST', Users)

        socket.on('USER_MOVE', (user) => {
            
            user.x = -user.x
            user.y = -user.y
            
            Users[socket.id] = user

            io.emit('USERS_UPDATE_MOVE', Users)
        })
    })






//Server
    server.listen(PORT, () => {
        console.log(' - Servidor rodando na porta: ' + PORT)
    })