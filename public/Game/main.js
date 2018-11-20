// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
  	Body = Matter.Body;
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
         //background:'/maxresdefault.jpg',

      }
});
var context = render.context;
context.font = "30px Arial";
context.fillStyle = "white";
context.textAlign = "center";

let WIDTH  =768//logic
let HEIGHT =640
let worldWidth=3072
let worldHeight =3072
let windowWidth = render.options.width
let windowHeight = render.options.height
//render.options.style.width = CANVAS_WIDTH
//render.options.style.height = CANVAS_HEIGHT

var defaultCategory = 0x0001,
       redCategory = 0x0002,
       greenCategory = 0x0004,
       blueCategory = 0x0008;

let score = 0
var dino = Bodies.rectangle(50, 500, 20, 40)
dino.label="dino"

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

var borderTop = Bodies.rectangle(0, 0, 3072, 60, { isStatic: true })
var borderLeft = Bodies.rectangle(-1536, 1536, 60, 3072, { isStatic: true })
var borderRight = Bodies.rectangle(1536, 1536, 60, 3072, { isStatic: true })
var borderBottom = Bodies.rectangle(0, 3072, 3072, 60, { isStatic: true })


// add all of the bodies to the world
World.add(ourWorld, [dino,ground,borderTop,borderLeft,borderRight,borderBottom]);
// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
//disabeling gravity
ourWorld.gravity.scale=0
//
let lastTime=0
const player = new Player()


render.canvas.addEventListener('click',(event)=>{
    player.shoot(event)

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
