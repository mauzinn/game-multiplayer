<template>
    <section class="background">
        <img src="../assets/background.png" :style="{ left: user.x + 'px', top: user.y + 'px' }" class="background-terrain" />
        <img v-for="player in players" :key="player.id" :src="player.url" :style="{ left: player.x + 300 + user.x + 'px', top: player.y + 300 + user.y + 'px' }" class="player" />
        <div>
            <img :src="user.url" class="player" />
            <p>{{user.id}}</p>
        </div>
    </section>
</template>

<script>
    const socket = require('socket.io-client')
    const io = socket.connect('http://localhost:2434')

    let user = {
        id: '',
        x: -20,
        y: -66,
        url: '../assets/ash_back.png'
    }

    io.on('ID_USER', (id) => {
        user.id = id
    })

    document.addEventListener('keyup', (e) => {
        if (e.key == 'w' || e.key == 's' || e.key == 'd' || e.key == 'a') {
        const Keys = {
            w: {
                x: 0,
                y: 13,
                url: './assets/ash_top.png'
            },
            s: {
                x: 0,
                y: -13,
                url: './assets/ash_back.png'
            },
            d: {
                x: -13,
                y: 0,
                url: './assets/ash_right.png'
            },
            a: {
                x: 13,
                y: 0,
                url: './assets/ash_left.png'
            }
        }

        if (user.y + Keys[e.key].y >= -56 && user.y + Keys[e.key].y <= -1 && user.x + Keys[e.key].x <= -20 && user.x + Keys[e.key].x >= -306) {
            console.log('Colisão detectada!')
        } else if (user.y + Keys[e.key].y >= -14 && user.y + Keys[e.key].y <= 116 && user.x + Keys[e.key].x <= 94 && user.x + Keys[e.key].x >= -306) {
            console.log('Colisão detectada!')
        } else if (user.y + Keys[e.key].y >= -222 && user.y + Keys[e.key].y <= -91 && user.x + Keys[e.key].x <= -371  && user.x + Keys[e.key].x >= -501) {
            console.log('Colisão detectada!')
        } else {
            user.x += Keys[e.key].x
            user.y += Keys[e.key].y,
            user.url = Keys[e.key].url

            io.emit('USER_MOVE', user)
            console.log(user)
        }
        }
    })

    export default {
        name: 'game',
        data() {
            return {
                Users: [],
                user: {
                    x: -20,
                    y: -66,
                    url: '../assets/ash_back.png',
                    zindex: "z-index"
                },
                players: []
            }
        },
        created() {
            io.on('USERS_LIST', (list) => {
                this.Users = list
                console.log((list))
            })

            io.on('USERS_UPDATE_MOVE', (users) => {
                this.Users = users

                users[user.id].x = -users[user.id].x
                users[user.id].y = -users[user.id].y

                this.user = users[user.id]
                this.players = []
                for (const item in users) {
                    if (item != this.user.id) {
                        this.players.push(users[item])
                    }
                }
            })
        }
    }
</script>

<style>
    .background {
        width: 600px;
        height: 600px;
        position: relative;
        border: 1px solid black;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .background-terrain{
        width: 1200px;
        height: 700px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    div p {
        z-index: 3;
        position: absolute;
        font-weight: 600;
        margin-top: 50px;
        color: white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-shadow: 1px 1px 1px black;
    }

    .player{
        position: absolute;
        width: 40px;
    }
</style>