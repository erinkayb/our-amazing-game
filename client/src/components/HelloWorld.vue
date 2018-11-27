<template>
  <v-container grid-list-xl text-md-center>
    <div class="logo">
      <img src="https://res.cloudinary.com/erinkayb/image/upload/v1543240847/radOrange.png" alt="">
    </div>
    <v-layout row wrap>
<!-- #e515e1 pink
#0071bc blue
#333 gray-->

      <div class="wrap">
    		<div class="clip-block">
    			<div class="clip-each clip-solid">
    			<div class="social-share-block">
            <p>It's pretty simple, <br/> last shape standing wins. <br/>
            Create an account and <br/>keep track of your wins and kills stats.
            <br/>
            <br/>

            Movement: w, d, s, a
            <br/>
            Aim: mouse
            <br/>
            Shoot: left mouse click
            <br/> </p>
            <h1>How to play</h1>
    			</div>
    			</div>
    		</div> <!-- /clip-block -->

    		<div class="clip-block">
    			<a href="/#/register" class="clip-each clip-gradient">
    				<div class="clip-caption">Sign Up</div>
    			</a>
    			<a href="/#/login" class="clip-each clip-border">
    				<div class="clip-caption">Login</div>
    			</a>
    		</div> <!-- /clip-block -->
    		<svg class="clip-svg">
    			<defs>
    				<clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
    					<polygon points="0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5" />
    				</clipPath>
    			</defs>
    		</svg>

    		<svg class="clip-svg">
    			<defs>
    				<clipPath id="triangle-clip" clipPathUnits="objectBoundingBox">
    					<polygon points="1 0.03, 0.17 1, 1 1" />
    				</clipPath>
    			</defs>
    		</svg>
    	</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-size: 20px;
  margin-left: 25%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  margin-bottom: 40%;
  margin-left: 8%;
  /* text-align: center; */
  color: black;
  font-size: 18px;
}

.wrap {
  color: #222;
  font-size: 40px;
}

.clip-svg {
  width: 0;
  height: 0;
}

.clip-caption {
  width: 100%;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
}

.clip-each {
  display: block;
  position: relative;
  -webkit-clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  -webkit-clip-path: url("#hexagon-clip");
  clip-path: url("#hexagon-clip");
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  margin: 0 auto;
}

a.clip-each:hover {
  background: #ef6c00;
  -webkit-transition: all 0.25s ease-in;
  transition: all 0.25s ease-in;
}

.clip-solid {
  width: 500px;
  height: 500px;
  background-color: #F5EDF0;
  -webkit-transition: all 0.3s linear;
}

.clip-solid:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-clip-path: polygon(100% 3%, 17% 100%, 100% 100%);
  clip-path: polygon(100% 3%, 17% 100%, 100% 100%);
  -webkit-clip-path: url("#triangle-clip");
  clip-path: url("#triangle-clip");
  background: #0071bc;
  z-index: 1;
  width: 100%;
  height: 200px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  pointer-events: none;
}

.clip-solid:hover:after {
  height: 0;
  -webkit-transition: all 0.45s ease-in;
  transition: all 0.45s ease-in;
}

.clip-solid:hover .social-share-block {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.social-share-block {
  position: absolute;
  bottom: 20px;
  right: 75px;
  color: #F5EDF0;
  font-size: 70%;
  z-index: 2;
}

.clip-gradient {
  background: #64dd17;
  width: 230px;
  height: 230px;
}

.clip-gradient .clip-caption {
  color: #F5EDF0;
}

.clip-border {
  background-color: #e515e1;
  width: 230px;
  height: 230px;
  margin-top: 7px;
  color: white;
}

.clip-border::after {
  content: "";
  position: absolute;
  top: 4%;
  left: 4%;
  right: 4%;
  bottom: 4%;
  margin: 0 auto;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
  -webkit-clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
  -webkit-clip-path: url("#hexagon-clip");
  clip-path: url("#hexagon-clip");
  z-index: -1;
}

@media only screen and (min-width: 550px) {
  .wrap {
    display: table;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }
  @keyframes slideInFromLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
  @keyframes fadein {
      from {
          opacity:0;
      }
      to {
          opacity:1;
      }
  }
  @-moz-keyframes fadein { /* Firefox */
      from {
          opacity:0;
      }
      to {
          opacity:1;
      }
  }
  @-webkit-keyframes fadein { /* Safari and Chrome */
      from {
          opacity:0;
      }
      to {
          opacity:1;
      }
  }
  @-o-keyframes fadein { /* Opera */
      from {
          opacity:0;
      }
      to {
          opacity: 1;
      }
  }
  .clip-block {
    display: table-cell;
    vertical-align: middle;
    animation: fadein 3s;
   -moz-animation: fadein 3s; /* Firefox */
   -webkit-animation: fadein 3s; /* Safari and Chrome */
   -o-animation: fadein 3s; /* Opera */
  }
  img{
    position:fixed;
    max-height: 200px;
    left: 0;
    animation: 1s ease-out 0s 1 slideInFromLeft;
  }
  .clip-border {
    margin-top: 20px;
  }
}

</style>
