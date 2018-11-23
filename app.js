const express = require('express')
const app = express()
const port = 3000
const serv= require('http').Server(app)
let io = require('socket.io')(serv)

app.use(express.static(__dirname + '/client'))
app.get('/', (req, response) => {
      response.sendFile(__dirname + '/index.html')
})

let SOCKET_LIST={}
let PLAYER_LIST ={}
let Player =(id)=>{
  let self={
    x:120,
    y:120,
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
    if(self.pressingDpwn){
      self.y+=self.speed
    }
  }
  return self
}
io.sockets.on('connection', (socket)=>{
  console.log(`connected ${socket.id}`)
  socket.on('happy',(data)=>{
    console.log(`happy ${data.reason}`);
  });

  SOCKET_LIST[socket.id]=socket
  let player = Player(socket.id)
  PLAYER_LIST[socket.id]=player
  socket.on('keyPress',(data)=>{
    if(data.inputId=='left'){
      player.pressingLeft=data.state
    }else if(data.inputId=='right'){
      player.pressingRight=data.state
    }else if(data.inputId=='down'){
      player.pressingDown=data.state
    }else if(data.inputId=='up'){
      player.pressingUp=data.state
    }
  });

  //send players object to new player
  //socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer',PLAYER_LIST[socket.id])

  socket.on('disconnect',(socket)=>{
    console.log(`disconnected: `, socket.id);
    //remove player from players object
    io.emit('deletePlayer',socket.id)
    console.log(SOCKET_LIST[socket.id]);

    delete SOCKET_LIST[socket.id]
    delete PLAYER_LIST[socket.id]
    //tell clientes that playerID has disconnected
    io.emit('disconnect', socket.id)
  })
})
setInterval(()=>{
  let pack =[]
  for (var i in PLAYER_LIST) {
    let player = PLAYER_LIST[i]
      player.updatePosition()
      pack.push({
        x:player.x,
        y:player.y,
        id:player.id
      })
  }
  for (var i in SOCKET_LIST) {
  let socket = SOCKET_LIST[i]
  socket.emit('newPosition',pack)
  }

},1000/25)
serv.listen(port, () => console.log(`listening on port ${port}!`))
