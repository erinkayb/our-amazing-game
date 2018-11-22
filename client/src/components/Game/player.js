import Bullet from './bullet'
export default class Player{

  constructor(x=100,y=100,bodies,body,world,ourworld,cat){
    this.pos={x:x,y:y}
    this.speed=5
    this.dirX=0
    this.dirY=0
    this.bulletDirectionX=0
    this.bulletDirectionY=0
    this.World=world
    this.bodies =bodies
    this.Body=body
    this.ourWorld=ourworld
    this.category=cat
    this.b =   this.bodies.rectangle(x, y, 64, 64, {collisionFilter:{mask: this.category}})
    this.b.label="player"
    this.bullets=[]
    this.World.add(this.ourWorld, this.b);
  }
  setDirX(x){
    this.dirX=x
  }
  setDirY(y){
    this.dirY=y
  }
  shoot(direct){

    this.bullets.push(new Bullet(this.pos,direct))


  }
  move(){
    switch (this.dirX) {
      case 1:
        this.Body.setVelocity( this.b, {x: this.speed, y: this.b.velocity.y})
        break;
      case -1:
        this.Body.setVelocity( this.b, {x: -this.speed, y: this.b.velocity.y})
        break;
      case 0:
        this.Body.setVelocity( this.b, {x:0, y: this.b.velocity.y});
        break;
    }
    switch (this.dirY) {
      case 1:
        this.Body.setVelocity( this.b, {x: this.b.velocity.x, y: this.speed});
        break;
      case -1:
        this.Body.setVelocity( this.b, {x: this.b.velocity.x, y: -this.speed});
        break;
      case 0:
        this.Body.setVelocity( this.b, {x:this.b.velocity.x, y: 0});
        break;
    }
  }
  updateBullets(){
    for (var i = this.bullets.length-1; i >=0; i--) {
      if (this.bullets[i].b.label==='stop') {

            //this.deleteBullet(this.bullets[i].b,i)
             this.World.remove(this.ourWorld,this.bullets[i].b)
             this.bullets.splice(i,1)

      }
    }
  }
  deleteBullet(b,index){
    // setTimeout(function(){
      //World.remove(ourWorld,b)
      //player.bullets.splice(index,1)

    // }, 100);
  }
  update(){

    this.pos = this.b.position
    this.updateBullets()
    //Body.setAngularVelocity(this.b, 0)
    this.move()



  }

}
