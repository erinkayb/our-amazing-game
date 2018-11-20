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
        width: 768,
        height: 640,
         wireframes: false,
         //background:'/maxresdefault.jpg',

      }
});
var context = render.context;
context.font = "30px Arial";
context.fillStyle = "white";
context.textAlign = "center";


let cactuses=[]
let score = 0
var dino = Bodies.rectangle(50, 500, 20, 40)
dino.label="dino"

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
// add all of the bodies to the world
World.add(ourWorld, [dino,ground]);
// run the engine
Engine.run(engine);
// run the renderer
Render.run(render);
//disabeling gravity
ourWorld.gravity.scale=0
//
let lastTime=0
const player = new Player()

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
			if (pair.bodyA.label === 'dino'|| pair.bodyB.label==='dino') {

				if (pair.bodyA.label === 'cactus'|| pair.bodyB.label==='cactus') {
					reset()

				}

			}
		})


});
function reset(){
	//	World.remove(ourWorld, cactuses[i].cactus)
//		cactuses.splice(i,1)

	score =0


}

(function run(t) {

		if(t-lastTime>1000){

			lastTime=t
		}
		Body.setAngularVelocity(dino, 0)
		context.fillStyle = "white";
		context.fillText('hello', 250, 80);

    player.update()

    Engine.update(engine, 1000 / 60);
			window.requestAnimationFrame(run);
})()
