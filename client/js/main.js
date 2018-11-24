   var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
    	Body = Matter.Body
  // create an engine
  var engine = Engine.create();
  var ourWorld = engine.world
  var render = Render.create({
     element: document.body,
      engine: engine ,
      options:{
          width: window.innerWidth,
          height: window.innerHeight,
           wireframes: false,
           hasBounds:true,
           //background:'/maxresdefault.jpg'
        }
  });
  var context = render.context;
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  let WIDTH  =768
  let HEIGHT =640
  let worldWidth=3072
  let worldHeight =3072
  let windowWidth = render.options.width
  let windowHeight = render.options.height
  var defaultCategory = 0x0001,
         redCategory = 0x0002,
         greenCategory = 0x0004,
         blueCategory = 0x0008;
  let score = 0
  var dino = Bodies.rectangle(50, 500, 20, 40)
  dino.label="dino"
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true})
  var borderTop = Bodies.rectangle(0, 0, 3072, 60, { isStatic: true })
  var borderLeft = Bodies.rectangle(-1536, 1536, 60, 3072, { isStatic: true })
  var borderRight = Bodies.rectangle(1536, 1536, 60, 3072, { isStatic: true })
  var borderBottom = Bodies.rectangle(0, 3072, 3072, 60, { isStatic: true })
  var sRb = Bodies.rectangle(-1310, 500, 300, 60, { isStatic: true })
  var sRb2 = Bodies.rectangle(-1100, 700, 300, 300, { isStatic: true })
  var sRb3 = Bodies.rectangle(-650, 500, 300, 300, { isStatic: true, angle:0.785})
  var house = Bodies.rectangle(200, 1900, 60, 800, { isStatic: true })
  var house2 = Bodies.rectangle(550,1500, 700, 60, { isStatic: true })
  var house3 = Bodies.rectangle(900, 2000, 60, 650, { isStatic: true })
  var house4 = Bodies.rectangle(750, 2300, 250, 60, { isStatic: true })
  var house5 = Bodies.rectangle(300, 2300, 250, 60, { isStatic: true })
  var house6 = Bodies.rectangle(630, 1800, 500, 30, { isStatic: true })
  var l1 = Bodies.rectangle(-500, 2300, 1050, 50, { isStatic: true ,angle:-0.785})
  var l2 = Bodies.rectangle(-800, 2100, 700, 50, { isStatic: true ,angle:0.785})
  var barrel = Bodies.circle(1200,300,70,{mass:500})
  var barrel2 = Bodies.circle(1100,300,70,{mass:500})
  var barrel3 = Bodies.circle(1280,425,70,{mass:500})
  var barrel4 = Bodies.circle(1150,425,70,{mass:500})
  // add all of the bodies to the world
  World.add(ourWorld, [dino,ground,borderTop,borderLeft,borderRight,borderBottom,
            sRb,sRb2,sRb3,
            house,house2,house3,house4,house5,house6,
            l1,l2,
            barrel,barrel2,barrel3,barrel4
          ]);
  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
  //disabeling gravity
  ourWorld.gravity.scale=0


  //-------AUDIO-------
  document.addEventListener('DOMContentLoaded', function(){
      //song.play();
    }, false)
  //player shoot
  const laser = new Howl({
      volume: 0.5,
      src: ['./js/laser.mp3']
    });
  //player spawn
   const spawn = new Howl({
    volume: 0.5,
    src: ['./js/spawn.mp3']
   })
  //player dead
  const dead = new Howl({
    volume: 0.8,
    src: ['./js/killed.mp3']
   })
  //client connects
  const connect = new Howl({
    volume: 0.6,
    src: ['./js/connect.mp3']
   })
  //client disconnect
  const disconnect = new Howl({
    volume: 0.6,
    src: ['./js/disconnect.mp3']
   })
  //background song
  const song = new Howl({
      volume: 0.1,
      src: ['./js/song_compressed.mp3'],
   })

  //players on client
  let socket = io();
  let players=[]
  // socket.emit('happy',{
  //   reason:'it is working'
  // })
  socket.on('currentPlayers',(data)=>{
    console.log(data);
  })
  socket.on('newPosition',(pack)=>{
      updatePlayers(pack)
  })
  socket.on('disconnect',(id)=>{

      console.log(players.id[1])
      deletePlayer(id)
      console.log(`disconnecting: ${id}`)
  })

  socket.on('newPlayer',(id)=>{
    addNewPlayer(id.id)
    console.log(id.id);
    connect.play()
  })
  function addNewPlayer(id){
    players.push(new Player(800,300,Bodies,Body,World,ourWorld,defaultCategory,id))
  }
  function updatePlayers(pack){
//console.log(pack);
    players.forEach(p =>{
      console.log(p.id);
      pack.forEach(pac=>{
        if (pac.id==p.id) {
          ///player can be updated here
          console.log(`saysomething`)

        }

      })

    })
  }
  function deletePlayer(id){
    for (var i = players.length-1; i >=0; i--) {

        if(players[i].id==id){
          console.log('in for loop');
          World.remove(ourWorld,players[i].b)
          players.splice(i,1)

        }
      }

  }
  let lastTime=0
  const player = new Player(800,300,Bodies,Body,World,ourWorld,defaultCategory)

  //change click event to execute on mouse down
  // let mouseDownID = -1

  // let mouseDown = (event) => {
  //   if (mouseDownID == -1)                              //prevents multiple loops
  //     mouseDownID = setInterval(whileMouseDown, 100)    //runs whileMouseDown() every 100ms
  // }

  // let mouseUp = (event) => {
  //   if (mouseDownID = -1)
  //     clearInterval(mouseDownID)
  //     mouseDownID = -1
  // }

  // let whileMouseDown = (event) => {
  //    player.shoot(event)
  // }

  // document.addEventListener('mouseDown', mouseDown)
  // document.addEventListener('mouseUp', mouseUp)
  // document.addEventListener('mouseout', mouseUp)

   render.canvas.addEventListener('click', (event) => {
      player.shoot(event)
      laser.play()
    })
  
  document.addEventListener('keydown', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  		player.setDirY(1)
      socket.emit('keyPress',{inputId:'down',state:true})
  	}
    if (event.keyCode==65) {
      player.setDirX(-1)
      socket.emit('keyPress',{inputId:'left',state:true})
    }
    if (event.keyCode==87) {
      	player.setDirY(-1)
        socket.emit('keyPress',{inputId:'up',state:true})
    }
    if (event.keyCode==68) {
  	   player.setDirX(1)
       socket.emit('keyPress',{inputId:'right',state:true})
    }
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  			player.setDirY(0)
        socket.emit('keyPress',{inputId:'down',state:false})
  	}
    if (event.keyCode==65) {
    player.setDirX(0)
    socket.emit('keyPress',{inputId:'left',state:false})
    }
    if (event.keyCode==87) {
      	player.setDirY(0)
        socket.emit('keyPress',{inputId:'up',state:false})
    }
    if (event.keyCode==68) {
  	   player.setDirX(0)
       socket.emit('keyPress',{inputId:'right',state:false})
    }
  });

  //outputs playermovement to server
  // setInterval(() => {
  //   socket.emit('playerMovement', playerMovement);
  // }, 1000 / 60)

  Matter.Events.on(engine, 'collisionStart', function(event) {

  		let pairs =event.pairs
  		pairs.forEach(pair =>{
  			if (pair.bodyA.label === 'bullet') {
              pair.bodyA.label='stop'
        }
  			if (pair.bodyB.label==='bullet') {
            pair.bodyB.label='stop'
  			}
  		})


  });
  function reset(){
  	score =0
  }

  (function run(t) {

  		if(t-lastTime>1000){

  			lastTime=t
  		}
      Render.lookAt(render, player.pos, {x: WIDTH,y: HEIGHT});//player needs a .x and .y


  		// context.fillStyle = "white";
  		// context.fillText('x:y:', windowWidth/2, windowHeight/2);
      // context.fillRect(windowWidth/2, windowHeight/2,10,10)

      player.update()

      Engine.update(engine, 1000 / 60);
  			window.requestAnimationFrame(run);
  })()
  //export{windowWidth,windowHeight,World,Body,Bodies,redCategory,ourWorld}
