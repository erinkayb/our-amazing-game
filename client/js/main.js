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
  let gameStart =false
  let winner =false
  let restart = false
  let winnerId = null
  let timeCounter = 10
  let waiting="waiting for players"
  let centreScreen={x:windowWidth/2,y:windowHeight/2}
  var defaultCategory = 0x0001,
         redCategory = 0x0002,
         greenCategory = 0x0004,
         blueCategory = 0x0008,
         yellowCategory=0x0009
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
  var barrel = Bodies.circle(1200,300,70,{mass:500,collisionFilter:{category:defaultCategory}})
  var barrel2 = Bodies.circle(1100,300,70,{mass:500,collisionFilter:{category:defaultCategory}})
  var barrel3 = Bodies.circle(1280,425,70,{mass:500,collisionFilter:{category:defaultCategory}})
  var barrel4 = Bodies.circle(1150,425,70,{mass:500,collisionFilter:{category:defaultCategory}})

  var polgon =Bodies.polygon(0, 1500, 5, 40)
  var polgon1 =Bodies.polygon(0, 1500, 8, 40)
  var polgon2 =Bodies.polygon(0, 1500, 3, 40)
  var polgon3 =Bodies.polygon(0, 1500, 6, 40)
  var polgon4 =Bodies.polygon(0, 1500, 7, 40)
  var polgon5 =Bodies.polygon(0, 1500, 1, 40)
  let trap =Bodies.trapezoid(0, 1500, 40, 70, 1)
  var vertices = [{x : 50,y : 0},{x : 63,y : 38},{x : 100,y : 38},{x : 69,y : 59},
                  {x : 82 ,y : 100},{x : 50,y : 75},{x : 18,y : 100},{x : 31,y : 59},
                  {x : 0,y : 38},{x : 37,y : 38}];

  var concavePolygon = [
  {x: 10,y:   20},
  {x: 10,y:   10},
  {x:  10,y:   0},
  {x:  10,y:   10},
  {x:5,y: 5}
  ];
    var star = Bodies.fromVertices(0, 1500, vertices,true);
    var con = Bodies.fromVertices(0, 1000, concavePolygon,true);
    var vert = [
        {x:0,y:0},
        {x:10,y:100},
        {x:20,y:120},
        {x:30,y:60},
        {x:40,y:100},
        {x:50,y:200},
        {x:60,y:100},
        {x:70,y:200},
        {x:80,y:180},
        {x:90,y:100},
        {x:100,y:180},
        {x:100,y:0},
        {x:0,y:0}]
var terrain = Bodies.fromVertices(0,1500, vert );
  //let vert =Bodies.fromVertices(0, 1500, [[]])
  // add all of the bodies to the world
  World.add(ourWorld, [ground,borderTop,borderLeft,borderRight,borderBottom,
            sRb,sRb2,sRb3,
            house,house2,house3,house4,house5,house6,
            l1,l2,
            barrel,barrel2,barrel3,barrel4,
            polgon,polgon1,polgon2,polgon3,polgon4,polgon5,
            trap,
            star,
            con,
            terrain

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
  const player =new Player(Math.floor(Math.random()*3000)-1450,Math.floor(Math.random()*3000)+60,Bodies,Body,World,ourWorld,blueCategory,socket.id)

  socket.on('currentPlayers',(data)=>{
    player.id=data.id
      for (var p in data.players) {
        if (data.players[p].id!==player.id) {
          addNewPlayer(data.players[p].id,data.players[p].x,data.players[p].y)
        }
      }
  })
  socket.on('newPosition',(pack)=>{
      updatePlayers(pack)
  })
  socket.on('disconnect',(id)=>{
      deletePlayer(id)
      disconnect.play();
      console.log(`disconnecting: ${id}`)
  })

  socket.on('newPlayer',(id)=>{
    addNewPlayer(id.id,id.x,id.y)
    console.log('NEW PLAYER:',id.id);
    connect.play()
  })
  socket.on('enemyFire',(data)=>{
    if (data.id !==player.id) {
      players.forEach(p=>{
        if (data.id==p.id) {
          p.shoot(data.dir,blueCategory,data.center)
          laser.play();
        }
      })
    }
  })
  socket.on('gameStart',()=>{
    gameStart=true
    timeCounter=10
  })
  socket.on('timeLeft',(data)=>{
    timeCounter=data
    waiting="Game Starts In "
  })
  socket.on('restart',(data)=>{
      reset(data)
  })
  function addNewPlayer(id,x,y){
    players.push(new Player(x,y,Bodies,Body,World,ourWorld,blueCategory,id))
  }
  function updatePlayers(pack){
    players.forEach(p =>{
      pack.forEach(pac=>{
        if (pac.id==p.id) {
          Body.setPosition( p.b, {x:pac.x, y:pac.y});
          Body.setVelocity( p.b, {x:pac.velX, y:pac.velY});
          p.dead=pac.dead
        }
      })
    })
  }
  function deletePlayer(id){
    for (var i = players.length-1; i >=0; i--) {
        if(players[i].id==id){
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
     if (gameStart) {
       if (!player.dead) {
         player.shoot(event,blueCategory,centreScreen)
         socket.emit('shoot',{dir:{x:event.x,y:event.y},center:centreScreen})
       }
        laser.play()
     }
    })

  document.addEventListener('keydown', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  		player.setDirY(1)
  	}
    if (event.keyCode==65) {
      player.setDirX(-1)
    }
    if (event.keyCode==87) {
      	player.setDirY(-1)
    }
    if (event.keyCode==68) {
  	   player.setDirX(1)
    }
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault()
  	if (event.keyCode==83) {
  			player.setDirY(0)
  	}
    if (event.keyCode==65) {
        player.setDirX(0)
    }
    if (event.keyCode==87) {
      	player.setDirY(0)
    }
    if (event.keyCode==68) {
  	    player.setDirX(0)
    }
  });
  Matter.Events.on(engine, 'collisionStart', function(event) {
  		let pairs =event.pairs
  		pairs.forEach(pair =>{
  			if (pair.bodyA.label === 'bullet') {
              pair.bodyA.label='stop'
              if (pair.bodyB.label==='player') {
                if (pair.bodyB.id===player.b.id) {
                  player.health-=50
                }
              }
        }
  			if (pair.bodyB.label==='bullet') {
            pair.bodyB.label='stop'
            if (pair.bodyA.label==='player') {
              if (pair.bodyA.id===player.b.id) {
                player.health-=50
              }
            }
  			}
  		})
  });

  function deadExplosion(pos){
    let a = Bodies.rectangle(pos.x, pos.y, 15,15, {mass:1})
    let b = Bodies.rectangle(pos.x, pos.y, 15,15, {mass:1})
    let c = Bodies.rectangle(pos.x, pos.y, 15,15, {mass:1})
    let d = Bodies.rectangle(pos.x, pos.y, 15,15, {mass:1})
     World.add(ourWorld, [a,b,c,d]);
     Body.applyForce(a, {x: pos.x, y: pos.y}, {x:0.01, y:0})
     Body.applyForce(b, {x: pos.x, y: pos.y}, {x:0.05, y:0.01})
     Body.applyForce(c, {x: pos.x, y: pos.y}, {x:-0.05, y:-0.01})
     Body.applyForce(d, {x: pos.x, y: pos.y}, {x:-0.01, y:0})
  }

  function reset(data){
    window.location.reload(false);
    // restart= false
    // winner =false
    // gameStart=true
    //   for (var i = players.length-1; i >=0; i--) {
    //     World.remove(ourWorld,players[i].b)
    //     players.splice(i,1)
    //   }
    //   World.remove(ourWorld,player.b)
    //   player.reset(Math.floor(Math.random()*3000)-1450,Math.floor(Math.random()*3000)+60)
    //   for (var p in data.players) {
    //     if (data.players[p].id!==player.id) {
    //       addNewPlayer(data.players[p].id,data.players[p].x,data.players[p].y)
    //     }
    //   }

  }

  (function run(t) {

  		if(t-lastTime>1000){

  			lastTime=t
  		}
      if (!player.dead) {
        Render.lookAt(render, player.pos, {x: WIDTH,y: HEIGHT});

      }else{
        Render.lookAt(render, {x:0,y:worldHeight/2}, {x: worldWidth/2,y: worldHeight/2});
      }

      if (gameStart) {
        if (!player.dead) {
          player.update()
          socket.emit('update',{inputId:'right',state:false,pos:player.b.position,vel:player.b.velocity,dead:player.dead})
        }
        for (var i = 0; i < players.length; i++) {
          players[i].update()
          if (players[i].dead) {
            for (var j = players[i].bullets.length-1; j >=0; j--) {
              World.remove(ourWorld,players[i].bullets[j].b)
              players[i].bullets.splice(j,1)
            }
            dead.play();
            //var explosion1 = Bodies.rectangle(players[i].b.position.x, players[i].b.position.y, 15,15, {mass:100})
            //socket.emit('update',{inputId:'right',state:false,pos:player.b.position,vel:player.b.velocity,dead:player.dead})
            World.remove(ourWorld,players[i].b)
            deadExplosion(players[i].b.position);
            players.splice(i,1)
          }
          if (players.length===0) {
            console.log('i win');
            winner=true
            winnerId=player.id
          }
        }
        if (player.health<=0&&!winner) {
          if (!player.dead) {
            waiting="waiting for players"
            timeCounter=10
            World.remove(ourWorld,player.b)
            player.dead=true
            //dead sounds / particles
            dead.play();
            socket.emit('update',{inputId:'right',state:false,pos:player.b.position,vel:player.b.velocity,dead:player.dead})
            deadExplosion(player.pos)
          }
          if(winner==false&&players.length===1) {
            console.log(`${players[0].id} Wins!`);
            winner=true
            winnerId=players[0].id
          }
          context.fillStyle = "white";
      		context.fillText("DEAD", window.innerWidth/2,window.innerHeight/2);
      		context.fillText(`${waiting}`, window.innerWidth/2, window.innerHeight/2+50);
        }
        if (winner) {
          context.fillStyle = "white";
      		context.fillText("Winner!!", window.innerWidth/2,window.innerHeight/2-200);
      		context.fillText(`${winnerId}`, window.innerWidth/2, window.innerHeight/2-150);
          if(!restart){
            restart=true
            socket.emit('countdown')
          }
          if (restart) {
            context.fillText(`Next Game In`, window.innerWidth/2, window.innerHeight/2-100);
            context.fillText(`${timeCounter}`, window.innerWidth/2, window.innerHeight/2-50);
          }
        }
      }else{
        context.fillStyle = "white";
        context.fillText(`${waiting}`, window.innerWidth/2, window.innerHeight/2+50);
        context.fillText(`${timeCounter}`, window.innerWidth/2, window.innerHeight/2+100);
      }
  		context.fillStyle = "white";
  		context.fillText(`${player.health}%`, 50, 50);

      Engine.update(engine, 1000 / 60);
  		window.requestAnimationFrame(run);
  })()
