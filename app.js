const express = require('express')
const app = express()
const port = 3000
const serv= require('http').Server(app)
let io = require('socket.io')(serv)
//let howler = require('howler')

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
    x:800,
    y:300,
    velX:0,
    velY:0,
    id:id,
    pressingRight:false,
    pressingLeft:false,
    pressingUp:false,
    pressingDown:false,
    speed:10
  }
  self.updatePosition=()=>{
    if(self.pressingRight){
      self.x+=self.speed
    }
    if(self.pressingLeft){
      self.x-=self.speed
    }
    if(self.pressingUp){
      self.y-=self.speed
    }
    if(self.pressingDown){
      self.y+=self.speed
    }
  }
  return self
}
io.sockets.on('connection', (socket)=>{
  let sessionID = socket.id
  console.log(`client connected ${socket.id}`)
  console.log(`session id  ${sessionID}`)
  // socket.on('happy',(data)=>{
  //   console.log(`happy ${data.reason}`);
  // });

  SOCKET_LIST[socket.id]=socket
  let player = Player(socket.id)
  PLAYER_LIST[socket.id]=player

  socket.emit('currentPlayers',  {players:PLAYER_LIST,id:sessionID})

  socket.on('keyPress',(data)=>{
      // player.x=data.pos.x
      // player.y=data.pos.y
      // player.velX=data.vel.x
      // player.velY=data.vel.y
    // if(data.inputId=='left'){
    //   player.pressingLeft=data.state
    // }if(data.inputId=='right'){
    //   player.pressingRight=data.state
    //
    // }if(data.inputId=='down'){
    //   player.pressingDown=data.state
    // }if(data.inputId=='up'){
    //   player.pressingUp=data.state
    // }
  });
  socket.on('update',(data)=>{
    player.x=data.pos.x
    player.y=data.pos.y
    player.velX=data.vel.x
    player.velY=data.vel.y
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
      player.updatePosition()
      pack.push({
        x:player.x,
        y:player.y,
        velX:player.velX,
        velY:player.velY,
        id:player.id,
        up:player.pressingUp,
        down:player.pressingDown,
        left:player.pressingLeft,
        right:player.pressingRight
      })
  }
  for (var i in SOCKET_LIST) {
  let socket = SOCKET_LIST[i]
  socket.emit('newPosition',pack)
  }

},1000/60)

serv.listen(port, () => console.log(`listening on port ${port}!`))
