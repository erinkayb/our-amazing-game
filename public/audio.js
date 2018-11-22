//sounds
var playerFootstep = new Howl({
	src: ['playerFootstep1.mp3']
});

//on_action
document.getElementById('play').onclick=function(){playerFootstep.play();}