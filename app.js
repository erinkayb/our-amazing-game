const express = require('express')
const app = express()
const port = 3000
const serv= require('http').Server(app)
let io = require('socket.io')(serv)


app.use(express.static(__dirname + '/client'))
app.get('/', (req, response) => {
      response.sendFile(__dirname + '/index.html')
})

//store sockets
let SOCKET_LIST={}
//store players
let PLAYER_LIST ={}

let Player =(id)=>{
  let self={
    x:0,
    y:0,
    velX:0,
    velY:0,
    id:id,
    dead:false
  }

  return self
}
io.sockets.on('connection', (socket)=>{
  let sessionID = socket.id
  console.log(`client connected ${socket.id}`)
  console.log(`session id  ${sessionID}`)


  SOCKET_LIST[socket.id]=socket
  let player = Player(socket.id)
  PLAYER_LIST[socket.id]=player

  socket.emit('currentPlayers',  {players:PLAYER_LIST,id:sessionID})

  socket.on('update',(data)=>{
    player.x=data.pos.x
    player.y=data.pos.y
    player.velX=data.vel.x
    player.velY=data.vel.y
    player.dead=data.dead
  })
  socket.on('shoot',(data)=>{
    io.emit('enemyFire',{dir:data.dir,id:sessionID,center:data.center})
  })

  //send players object to new player
  socket.broadcast.emit('newPlayer',PLAYER_LIST[socket.id])

  socket.on('disconnect',(socket)=>{
    console.log(`----client disconnected---- `);
    io.emit('disconnect', sessionID)
    delete SOCKET_LIST[sessionID]
    delete PLAYER_LIST[sessionID]
  })
})

//update server state to clients
setInterval(()=>{
  let pack =[]
  for (var i in PLAYER_LIST) {
    let player = PLAYER_LIST[i]
      pack.push({
        x:player.x,
        y:player.y,
        velX:player.velX,
        velY:player.velY,
        id:player.id,
        dead:player.dead
      })
  }
  for (var i in SOCKET_LIST) {
    let socket = SOCKET_LIST[i]
    socket.emit('newPosition',pack)
  }

},1000/60)

serv.listen(port, () => console.log(`listening on port ${port}!`))
