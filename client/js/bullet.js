class Bullet{


    constructor(pos,dir,category,center){
      this.pos=pos//spawnPoint, player pos in world
      this.centre=center//playerPos in screen not world
      //this.click={x:100, y:100}
      this.click={x:dir.x,y:dir.y}//where we want to bullet to go
      this.dir= Matter.Vector.sub( this.click,this.centre)
      let norm = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y)
      this.dir.x = (this.dir.x/norm)*0.09
      this.dir.y = (this.dir.y/norm)*0.09
      this.b = Bodies.circle(this.pos.x+(this.dir.x*400), this.pos.y+(this.dir.y*400), 14 , {collisionFilter: {category: redCategory,mask:category|defaultCategory}, restitution:0.5})
      this.b.label="bullet"
      World.add(ourWorld, this.b);
      Body.applyForce( this.b,this.pos, this.dir);
    }



}
