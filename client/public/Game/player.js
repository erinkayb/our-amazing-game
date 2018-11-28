class Player{

  constructor(x=100,y=100){
    this.pos={x:x,y:y}
    this.speed=5
    this.dirX=0
    this.dirY=0
    this.bulletDirectionX=0
    this.bulletDirectionY=0
    this.b = Bodies.rectangle(x, y, 64, 64, {collisionFilter:{mask: defaultCategory}})
    this.b.label="player"
    this.bullets=[]
    World.add(ourWorld, this.b);
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
        Body.setVelocity( this.b, {x: this.speed, y: this.b.velocity.y})
        break;
      case -1:
        Body.setVelocity( this.b, {x: -this.speed, y: this.b.velocity.y})
        break;
      case 0:
        Body.setVelocity( this.b, {x:0, y: this.b.velocity.y});
        break;
    }
    switch (this.dirY) {
      case 1:
        Body.setVelocity( this.b, {x: this.b.velocity.x, y: this.speed});
        break;
      case -1:
        Body.setVelocity( this.b, {x: this.b.velocity.x, y: -this.speed});
        break;
      case 0:
        Body.setVelocity( this.b, {x:this.b.velocity.x, y: 0});
        break;
    }
  }
  updateBullets(){
    for (var i = this.bullets.length-1; i >=0; i--) {
      if (this.bullets[i].b.label==='stop') {

            //this.deleteBullet(this.bullets[i].b,i)
             World.remove(ourWorld,this.bullets[i].b)
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
