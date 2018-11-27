   var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
    	Body = Matter.Body,
      Common = Matter.Common,
      Query = Matter.Query,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      Vertices = Matter.Vertices,
      Composite = Matter.Composite,
      Composites = Matter.Composites


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
           showAngleIndicator: true
           //background:'/maxresdefault.jpg'
        }
  });
  var lightCanvas = Render.create({
     element: document.body,
      engine: engine ,
      options:{
          width: window.innerWidth,
          height: window.innerHeight,
           wireframes: false,
           hasBounds:true,
           showAngleIndicator: true
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
  var l1 = Bodies.rectangle(-500, 2300, 1050, 50, { isStatic: true,angle:-0.785})
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

//------raycasting-----//

  let mouseConstraint = Matter.MouseConstraint
  let walls = []
  let polygons = [];
  // var context = render.context;

Events.on(render, 'afterRender', function(){
  bodies = Composite.allBodies(engine.world)
  let startPoint = player.pos
  let endPoint = { x: player.pos.x+400, y: player.pos.y+400 };

  var collisions = Query.ray(bodies, startPoint, endPoint)


  let lightCanvas = document.getElementById('lightCanvas')
  lightCanvas.height = window.innerHeight;
  lightCanvas.width = window.innerWidth;
  const context2 = lightCanvas.getContext('2d')
  //context2.setTransform(0, 0, 0, 0, windowWidth, windowHeight)
  context2.lineWidth = 0;
  context2.strokeStyle = '#FFCC00'
  context.fillStyle = '#FFCC00'


//Render.startViewTransform(lightCanvas); //broken when turned on
        context2.beginPath();
        //top left box - TOP
        context2.moveTo(startPoint.x, startPoint.y)
        context2.lineTo(-1250,550)
        context2.lineTo(-950,500)
        context2.closePath();
        //top left box - LEFT
        context2.moveTo(startPoint.x, startPoint.y)
        context2.lineTo(-1250,550)
        context2.lineTo(-1250,850)
        context2.closePath();
        //top left box - BOTTOM
        context2.moveTo(startPoint.x, startPoint.y)
        context2.lineTo(-1250,850)
        context2.lineTo(-950,850)
        context2.closePath();
        // top left box - RIGHT
        context2.moveTo(startPoint.x, startPoint.y)
        context2.lineTo(-950,550)
        context2.lineTo(-950,850)
        context2.closePath();

        //
        //
        //HOUSE - LEFT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(200,1500);
        context2.lineTo(200,2300);
        context2.closePath();
        //HOUSE - TOP
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(200,1500);
        context2.lineTo(900,1500);
        context2.closePath();
        //HOUSE - RIGHT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(900,2300);
        context2.lineTo(900,1500);
        context2.closePath();
        // HOUSE - DOWN
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(200,2300);
        context2.lineTo(900,2300);
        context2.closePath();

        //GROUND
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(10,610);
        context2.lineTo(810,610);
        context2.closePath();

        //TERRILE SQUARE - TOP-TO-RIGHT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(-640,300);
        context2.lineTo(-440,500);
        context2.closePath();
        //TERRILE SQUARE - TOP-TO-LEFT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(-640,300);
        context2.lineTo(-850,500);
        context2.closePath();
        //TERRILE SQUARE - BOTTOM-TO-LEFT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(-640,700);
        context2.lineTo(-850,500);
        context2.closePath();
        //TERRILE SQUARE - BOTTOM-TO-RIGHT
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(-440,500);
        context2.lineTo(-640,700);
        context2.closePath();

        //Y-SHAPE - LONG
        context2.moveTo(startPoint.x, startPoint.y);
        context2.lineTo(-1035,1860);
        context2.lineTo(-873,2665);
        context2.closePath();
        //Y-SHAPE - SHORT
        // context2.moveTo(startPoint.x, startPoint.y);
        // context2.lineTo(x,y);
        // context2.lineTo(x,y);
        // context2.closePath();

        if (collisions.length > 0) {
            context2.strokeStyle = '#fff';
        } else {
            context2.strokeStyle = '#555';
        }
        context2.lineWidth = 0.5;
        context2.stroke();

        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            context2.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
        }

        context2.stroke();
        context2.fill();
      
      //Render.endViewTransform(lightCanvas);
  });
//-----raycast end-----//


  //-------AUDIO-------
  document.addEventListener('DOMContentLoaded', function(){
      //song.play();
    }, false)
  //player shoot
  const laser = new Howl({
      volume: 1,
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
    volume: 1,
    src: ['./js/connect.mp3']
   })
  //client disconnect
  const disconnect = new Howl({
    volume: 1,
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
  //const player = new Player(800,300,Bodies,Body,World,ourWorld,defaultCategory)
  //console.log('socket',socket.id);
  let player =new Player(800,300,Bodies,Body,World,ourWorld,defaultCategory,socket.id)


  // socket.emit('happy',{
  //   reason:'it is working'
  // })
  socket.on('currentPlayers',(data)=>{
//console.log('player:',player.id);
console.log('currentPlayers');
  player.id=data.id
    for (var p in data.players) {
      if (data.players[p].id!==player.id) {
        //console.log(data[p].id);
        //console.log(player.id);
        addNewPlayer(data.players[p].id,data.players[p].x,data.players[p].y)
    }
  }

  })
  socket.on('newPosition',(pack)=>{
      updatePlayers(pack)
  })
  socket.on('disconnect',(id)=>{

      deletePlayer(id)
      disconnect.play()
      console.log(`disconnecting: ${id}`)
  })

  socket.on('newPlayer',(id)=>{
    addNewPlayer(id.id,id.x,id.y)
    console.log('NEW PLAYER:',id.id);
    connect.play()
  })
  function addNewPlayer(id,x,y){
    players.push(new Player(x,y,Bodies,Body,World,ourWorld,defaultCategory,id))
    // console.log(players);
    // console.log(player.id);
  }
  function updatePlayers(pack){
    players.forEach(p =>{
      pack.forEach(pac=>{
        if (pac.id==p.id) {
          Body.setPosition( p.b, {x:pac.x, y:pac.y});
          Body.setVelocity( p.b, {x:pac.velX, y:pac.velY});
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

   // render.canvas.addEventListener('mousemove', (e) => {
   //      xMousePos = e.x
   //      yMousePos = e.y
   //    })

  document.addEventListener('keydown', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  		player.setDirY(1)
      socket.emit('keyPress',{inputId:'down',state:true,pos:player.b.position,vel:player.b.velocity})
  	}
    if (event.keyCode==65) {
      player.setDirX(-1)
      socket.emit('keyPress',{inputId:'left',state:true,pos:player.b.position,vel:player.b.velocity})
    }
    if (event.keyCode==87) {
      	player.setDirY(-1)
        socket.emit('keyPress',{inputId:'up',state:true,pos:player.b.position,vel:player.b.velocity})
    }
    if (event.keyCode==68) {
  	   player.setDirX(1)
       socket.emit('keyPress',{inputId:'right',state:true,pos:player.b.position,vel:player.b.velocity})
    }
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  			player.setDirY(0)
        socket.emit('keyPress',{inputId:'down',state:false,pos:player.b.position,vel:{x:player.b.velocity.x,y:0}})

  	}
    if (event.keyCode==65) {
    player.setDirX(0)
    socket.emit('keyPress',{inputId:'left',state:false,pos:player.b.position,vel:{x:0,y:player.b.velocity.y}})
    }
    if (event.keyCode==87) {
      	player.setDirY(0)
        socket.emit('keyPress',{inputId:'up',state:false,pos:player.b.position,vel:{x:player.b.velocity.x,y:0}})
    }
    if (event.keyCode==68) {
  	   player.setDirX(0)
       socket.emit('keyPress',{inputId:'right',state:false,pos:player.b.position,vel:{x:0,y:player.b.velocity.y}})
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

      player.update()
      //move()
      socket.emit('update',{inputId:'right',state:false,pos:player.b.position,vel:player.b.velocity})

      Engine.update(engine, 1000 / 60);
  			window.requestAnimationFrame(run);
  })()
