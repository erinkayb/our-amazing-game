class Player{

  constructor(x=100,y=100){
    this.x=x
    this.y=y
    this.speed=5
    this.dirX=0
    this.dirY=0
    this.b = Bodies.rectangle(x, y, 64, 64)
    this.b.label="player"
    World.add(ourWorld, this.b);
  }
  setDirX(x){
    this.dirX=x
  }
  setDirY(y){
    this.dirY=y
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
  update(){

    this.x = this.b.position.x
      this.y = this.b.position.y
    Body.setAngularVelocity(this.b, 0)
    this.move()

  }

}
