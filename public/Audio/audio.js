//sounds
var playerFootstep = new Howl({
	src: ['/Audio/playerFootstep1.mp3']
});

//on_action
document.getElementById('playerFootstep').onclick=function(){playerFootstep.play();}
